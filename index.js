function myFunction() {
    var txt;
    var person = prompt("Please enter your latitude:", "37");
    if (person == null || person == "") {
        txt = "User cancelled the prompt.";
    } else {
        txt = "Your latitude is " + person + " degrees north.";
        /*
        var longitude = prompt("Please enter your longitude", "-122");
        if (latitude == null || person == "") {
            txt = "User cancelled the prompt.";
        } else {
            txt = txt + "The coordinates are " + person + " north and " + longitude + "east."
        }
        */
    }
    document.getElementById("demo").innerHTML = txt;
}


function onClick() {
    var json;
    function reqListener () {
        //console.log(this.responseText);
        json = JSON.parse(this.responseText);
        var test;
        test = json[0].neighbourhood_cleansed;
        console.log(test);
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "https://api.myjson.com/bins/v6wo3");
    oReq.send();
}

 
