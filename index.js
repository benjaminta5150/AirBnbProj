/* Containers for user inputs and JSONs */
var arr = [];
var vals = [];

var arr2 = [];
var vals2 = [];

/* These functions pull JSONs that I created in R from the inputted web links. */
function onClick() {
    var left = prompt("Please enter your latitude coordinate:", "37");
    var right = prompt("Please enter your longitude coordinate:", "-122");
    vals[0] = left;
    vals[1] = right;
    console.log(vals);
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", addGeo);
    /* This is a link to my JSON with each neighbourhood's average geolocation */
    oReq.open("GET", "https://api.myjson.com/bins/glscj");
    oReq.send();
}

function onClick2() {
    var left = prompt("Please enter your latitude coordinate:", "37");
    var right = prompt("Please enter your longitude coordinate:", "-122");
    vals2[0] = left;
    vals2[1] = right;
    console.log(vals2);
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", addGeo2);
    oReq.open("GET", "https://api.myjson.com/bins/glscj");
    oReq.send();
}

function addGeo () {
        var json = JSON.parse(this.responseText);
        arr[0] = json; 
        nextOne();      
}

function addGeo2 () {
        var json = JSON.parse(this.responseText);
        arr2[0] = json; 
        nextOne1();      
}


function nextOne() {
    var oReq1 = new XMLHttpRequest();
    oReq1.addEventListener("load", addWeekly);
    /* Web link to JSON of neighbourhoods and average weekly prices */
    oReq1.open("GET", "https://api.myjson.com/bins/85o1n");
    oReq1.send();
}

function nextOne1() {
    var oReq2 = new XMLHttpRequest();
    oReq2.addEventListener("load", addDaily);
    /* Web link to JSON of neighbourhoods and average daily prices */
    oReq2.open("GET", "https://api.myjson.com/bins/1beciz");
    oReq2.send();
}

function addWeekly() {
    var json1 = JSON.parse(this.responseText);
    arr[1] = json1; 
    computeWeekly();   
}

function addDaily() {
    var json1 = JSON.parse(this.responseText);
    arr2[1] = json1; 
    computeDaily();   
}

/* This function finds the neighbourhood that is closest to the given coordinates
   and returns the average weekly income for that neighbourhood */
function computeWeekly() {
    var geoloc = arr[0];
    var weekly = arr[1];
    var diffFactor = 9007199254740991; /* Integer.MAX_VALUE in JavaScript */
    var lat = vals[0];
    var longit = vals[1];
    var neighbourhood;
    var txt;

    for (i = 0; i < geoloc.length; i++) {
        var currDiff = 0;
        var currLat = geoloc[i].avg_latitude;
        //console.log(currLat);
        var currLongit = geoloc[i].avg_longitutde;

        /* This block finds the squared distance between the current neighborhood and the inputted coordinates */
        currDiff += Math.pow((currLat - lat), 2);
        currDiff += Math.pow((currLongit - longit), 2);

        if (currDiff < diffFactor) {
            neighbourhood = geoloc[i].neighbourhood_cleansed;
            diffFactor = currDiff;
        }
    }
    txt = "That location is closest to the " + neighbourhood + " neighbourhood.";
    var weeklyInc;
    for (j = 0; j < weekly.length; j++) {
        if (weekly[j].neighbourhood_cleansed === neighbourhood) {
            weeklyInc = weekly[j].avg_weekly;
            break;
        }
    }
    txt += " Your average weekly income would be " + weeklyInc + ".";
    document.getElementById("demo").innerHTML = txt;
    
}

/* This function finds the neighbourhood that is closest to the given coordinates
   and returns the average daily income for that neighbourhood */
function computeDaily() {
    var geoloc = arr2[0];
    var daily = arr2[1];
    var diffFactor = 9007199254740991; /* Integer.MAX_VALUE in JavaScript */
    var lat = vals2[0];
    var longit = vals2[1];
    var neighbourhood;
    var txt;

    for (i = 0; i < geoloc.length; i++) {
        var currDiff = 0;
        var currLat = geoloc[i].avg_latitude;
        var currLongit = geoloc[i].avg_longitutde;

        /* This block finds the squared distance between the current neighborhood and the inputted coordinates */
        currDiff += Math.pow((currLat - lat), 2);
        currDiff += Math.pow((currLongit - longit), 2);

        if (currDiff < diffFactor) {
            neighbourhood = geoloc[i].neighbourhood_cleansed;
            diffFactor = currDiff;
        }
    }
    txt = "That location is closest to the " + neighbourhood + " neighbourhood.";
    var dailyInc;
    for (j = 0; j < daily.length; j++) {
        if (daily[j].neighbourhood_cleansed === neighbourhood) {
            dailyInc = daily[j].avg_price;
            break;
        }
    }
    txt += " Your average daily income would be " + dailyInc + ".";
    document.getElementById("demo").innerHTML = txt;
    
}


 
