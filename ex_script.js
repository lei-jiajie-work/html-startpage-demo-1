const d = new Date();
let day = d.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// getting local json files is fucked up with javascript,
// so we are going to use another javascript file to only store configuration data
// In the html file should be a second script called "config.js";
// It holds only one object/dictionary called "config"
var cfg_data = config;


updateClock();
setInterval(updateClock, 1000);
loadLinks();


//function get_day() {
//    document.getElementById("dinwLabel").innerHTML = "Day: " + days[day] + " " + (day + 1) + "/7";
//    document.getElementById("dinw").setAttribute("value", day);
//}

//function search() {
//    var query = document.getElementById("search-bar-input").value;
//    window.open(config["search-engines"][config["search-engine-index"]] + query, "_blank");
//    document.getElementById("search-bar-input").value = null;
//}

function search() {
    var query = document.getElementById("search-bar-input").value;
    
    // Checks to see if we are using a different search engine than the default one
    if (query.includes("@")) {
        var split_query = query.split(" ");
        // This gets the engine number
        var param = Number(split_query[0].replaceAll("@", ""));
        
        var stripped_query = "";
        
        // Recombines everything that isn't the engine number
        for (var p = 1; p < split_query.length; p++) {
            stripped_query = stripped_query + split_query[p] + " "
        }
        
        // Checks to make sure the engine number is valid, then uses it with the stripped query
        if ((! isNaN(param)) && (param < cfg_data["search-engines"].length)) {
            window.open(cfg_data["search-engines"][param] + stripped_query, "_blank");
        } else {
            window.open(cfg_data["search-engines"][cfg_data["search-engine-index"]] + query, "_blank");
        }
    } else {
        window.open(cfg_data["search-engines"][cfg_data["search-engine-index"]] + query, "_blank");
    }
    // Clears search field
    document.getElementById("search-bar-input").value = null;
}

function modSearch(event) {
    if (event.keyCode == 13) {
        search();
    }
}

function updateClock() {
    // We are using a new Date object because we want it to get the time at the moment,
    // if we used the date object at the top the time wouldn't change
    const date = new Date();
    document.getElementById("clock").innerHTML = date.toLocaleTimeString("en-GB").substring(0, 5);
}

function loadLinks() {
    var sidebarLinks = Object.getOwnPropertyNames(cfg_data["sidebar-links"]);
    for (var l = 0; l < (sidebarLinks.length); l++) {
        const lin = document.createElement("a");
        lin.innerHTML = sidebarLinks[l];
        lin.href = cfg_data["sidebar-links"][sidebarLinks[l]];
        lin.className = "sidebar-link";
        document.getElementById("collapsed-items").appendChild(lin);
        document.getElementById("collapsed-items").appendChild(document.createElement("br"));
    }
}



