var y = $(".warship").offset().top;
var x = $(".warship").offset().left;
var yParent = $(".warship").parent().offset().top;
var xParent = $(".warship").parent().offset().left;
var yFParent = yParent + $(".warship").parent().height();
var xFParent = xParent + $(".warship").parent().width();
var newY = y,
    newX = x,
    s = 20, // step or how many pixels it is moving
    r = 10, // dimension of warship square
    jump = 60, // jump height
    keys = {}; // track multiple keypress at once

$(document).on("keydown", function(e) {

    console.clear();

    y = getY();
    x = getX();

    var key = getKey(e);
    keys[key] = true;
    var keyList = getKeyList(keys);
    console.log("keys pressed ", keyList);

    switch (keyList) {
        case "w":
            // $(".warship").animate({ top: "-=" + jump }, "slow");
            // $(".warship").animate({ top: "+=" + jump }, "slow");
            break;
        case "a":
            newX = x - s;
            break;
        case "wa":
            //newX = x - s;
            break;
        case "aw":
            //newX = x - s;
            break;
        case "d":
            newX = x + s;
            break;
        case "wd":
            //newX = x + s;
            break;
        case "dw":
            //newX = x + s;
            break;
        default:
            break;
    }

    if (newX < xParent) { newX = xParent + 1; }
    if (newX + r + 20 > xFParent) { newX = xFParent - r - 10; }

    $(".warship").offset({
        top: newY,
        left: newX
    });

});

$(document).on("keyup", function(e) {

    var key = getKey(e);
    delete keys[key];

});


function getKey(e) {
    var code = e.keyCode;
    var key = String.fromCharCode(code).toLowerCase();
    return key;
}

function getKeyList(keys) {
    var keyList = "";
    for (var i in keys) {
        if (!keys.hasOwnProperty(i)) continue;
        keyList += i;
    }
    return keyList;
}

function getX() {
    var x = $(".warship").offset().left;
    return x;
}

function getY() {
    var y = $(".warship").offset().top;
    return y;
}