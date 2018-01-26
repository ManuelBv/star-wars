var y = $(".warship").offset().top;
var x = $(".warship").offset().left;
var yParent = $(".warship").parent().offset().top;
var xParent = $(".warship").parent().offset().left;
var yFParent = yParent + $(".warship").parent().height();
var xFParent = xParent + $(".warship").parent().width();
var newY = y,
    newX = x,
    bulletNo = 0, // no. of bullets fired
    alienNo = 1, // no. of aliens
    s = 20, // step or how many pixels it is moving
    r = 10, // dimension of warship square
    jump = 60, // jump height
    keys = {}; // track multiple keypress at once


genAlien(newX, yParent, alienNo);
genTurret(newX, yParent, alienNo);

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
            calculateTurretAngle(alienNo);
            break;
        case "wa":
            //newX = x - s;
            break;
        case "aw":
            //newX = x - s;
            break;
        case "d":
            newX = x + s;
            calculateTurretAngle(alienNo);
            break;
        case "wd":
            //newX = x + s;
            break;
        case "dw":
            //newX = x + s;
            break;
        case " ":
            bulletNo++;
            genBullet(bulletNo);
            break;
        case " d":
            bulletNo++;
            genBullet(bulletNo);
            break;
        case "d ":
            bulletNo++;
            genBullet(bulletNo);
            break;
        case " a":
            bulletNo++;
            genBullet(bulletNo);
            break;
        case "a ":
            bulletNo++;
            genBullet(bulletNo);
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

    updateShotsFired();

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

/* warship bullet is only able to shoot vertically */
function genBullet(i) {
    var bullet = $("<div class='bullet bulletNo" + i + "'></div>").appendTo(".star_container");
    bullet.offset({
        top: newY,
        left: newX + 5
    });

    bullet.animate({
        top: "-20px"
    }, {
        step: function(now, fx) {
            // var data = fx.elem.nodeName + " " + fx.prop + ": " + now;
            var y = now;
            var xAlien = getAlienX(alienNo);
            var xBullet = $(this).offset().left;
            // console.log("y is " + y + " Xalien is " + xAlien + " and xBulllet is " + xBullet );
            if ( (y < yParent ) && (  ( x > xAlien - 25 ) && ( x <  xAlien + 25 )  ) ) {
                destroyAlien(alienNo);
                destroyTurret();

                $(this).stop();
                $(this).remove();
                alienNo++;

                var newAlienX = xParent + 50 + parseInt( ( Math.random() * 100) * ( ( Math.random() / 2 )* 9 ) );
                genAlien(newAlienX, yParent, alienNo);
                genTurret(newAlienX, yParent, alienNo);
            }
            // console.log("y is " + y + " and yParent is " + yParent);


        },
        duration: "slow",
        easing: "linear",
        complete: function() {
            $(this).remove();
        }
    })
}

function updateShotsFired() {
    $(".bullets span").text(bulletNo);
}


function updateAliensKilled() {
    $(".hits span").text(alienNo);
}

function genAlien(x, y, i) {
    var alien = $("<div class='alien alienNo" + i + "'></div>").appendTo(".star_container");
    alien.text(i);
    alien.offset({
        top: y + 10,
        left: x - 15
    });
}

function getAlienX(i) {

    var alien = $("div[class*='alienNo" + i + "']");
    var x = alien.offset().left;
    return x;

}

function getAlienY(i) {

    var alien = $("div[class*='alienNo" + i + "']");
    var y = alien.offset().top;
    return y;

}

function destroyAlien(i) {
    var alien = $("div[class*='alienNo" + i + "']");
    //alien.css("background", "red");
    //console.log("Alien hit", i);

    alien.remove();
    updateAliensKilled();

}

function destroyTurret() {
    var turret = $('.alien_turret');
    turret.remove();
}


function genTurret(x, y, i) {
    var turret = $('<div class="alien_turret"></div>').appendTo(".star_container");
    turret.offset({
        top: y,
        left: x + 7
    });

}


function calculateTurretAngle(i) {
    var adj = getY() - getAlienY(i), //get adjacent side of the triangle by subtracting y from warship and alien pos
        oppos = getX() - getAlienX(i), // get oppos by subtractinx X pos from warship and alien X
        hypo = Math.sqrt( (adj*adj) + (oppos * oppos) ), // get hypo by running the calc adj^2 + oppos^2 and then getting the square root
        acos = Math.acos( adj / hypo );

    if ( oppos < 0 ) {
        angle = acos / (Math.PI / 180) ;
    } else {
        angle = 0 - acos / (Math.PI / 180);
    }
        
    console.log('cos in rad is ' + acos + ' and angle in degree is ' + angle + '  adj, oppos, hypo', adj, oppos, hypo);

    var turret = $('.alien_turret');

    turret.css({
        transform: 'rotate(' + angle + 'deg)'
    })

}


