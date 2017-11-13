var arr = [];
var vals = [];

/* These functions pull JSONs that I created in R with the relevant data */
function onClick() {
    var left = prompt("Please enter your latitude:", "37");
    var right = prompt("Please enter your longitude:", "-122");
    vals[0] = left;
    vals[1] = right;
    console.log(vals);
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", addGeo);
    oReq.open("GET", "https://api.myjson.com/bins/glscj");
    oReq.send();
}

function addGeo () {
        var json = JSON.parse(this.responseText);
        arr[0] = json; 
        nextOne();      
}

function nextOne() {
    var oReq1 = new XMLHttpRequest();
    oReq1.addEventListener("load", addWeekly);
    oReq1.open("GET", "https://api.myjson.com/bins/85o1n");
    oReq1.send();
}

function addWeekly() {
    var json1 = JSON.parse(this.responseText);
    arr[1] = json1; 
    computeWeekly();   
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

 
