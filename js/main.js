/*
Prerequisites:

js/lib/modules/init.js
js/lib/modules/key.utils.js
js/lib/modules/dashboard.updates.js

js/lib/modules/alien.js
js/lib/modules/warship.js

*/


alien.generate(newX, yParent, alienNo);
alien.turret.generate(newX, yParent, alienNo);

$(document).on("keydown", function(e) {

    console.clear();
    x = warship.getX();

    var key = keysPressed.getKey(e);
    keys[key] = true;
    var keyList = keysPressed.getKeyList(keys);
    console.log("keys pressed ", keyList);

    switch (keyList) {
        case "w":
            // $(".warship").animate({ top: "-=" + jump }, "slow");
            // $(".warship").animate({ top: "+=" + jump }, "slow");
            break;
        case "a":
            newX = x - s;
            // calculateTurretAngle(alienNo);
            alien.turret.move(alienNo);
            alien.generateBolt(newX, yParent, alienNo);
            break;
        case "wa":
            //newX = x - s;d
            break;
        case "aw":
            //newX = x - s;
            break;
        case "d":
            newX = x + s;
            // calculateTurretAngle(alienNo);
            alien.turret.move(alienNo);
            alien.generateBolt(newX, yParent, alienNo);
            break;
        case "wd":
            //newX = x + s;
            break;
        case "dw":
            //newX = x + s;
            break;
        case " ":
            bulletNo++;
            warship.generateBullet(bulletNo);
            break;
        case " d":
            bulletNo++;
            warship.generateBullet(bulletNo);
            break;
        case "d ":
            bulletNo++;
            warship.generateBullet(bulletNo);
            break;
        case " a":
            bulletNo++;
            warship.generateBullet(bulletNo);
            break;
        case "a ":
            bulletNo++;
            warship.generateBullet(bulletNo);
            break;
        default:
            break;
    }

    if (newX < xParent) { newX = xParent + 1; }
    if (newX + r + 20 > xFParent) { newX = xFParent - r - 10; }

    $(".warship").offset({
        left: newX
    });

    dashboard.updateShotsFired();

});

$(document).on("keyup", function(e) {
      var key = keysPressed.getKey(e);
    delete keys[key];
});

