/*
Prerequisites:

js/lib/vendor/jquery.min.js

js/lib/modules/init.js
js/lib/modules/key.utils.js
js/lib/modules/dashboard.updates.js

js/lib/modules/alien.js
js/lib/modules/warship.js

js/lib/modules/resources.js
*/

alien.generate(newX, yParent, alienNo);
alien.turret.generate(newX, yParent, alienNo);

$(document).on("keydown", function(e) {

    console.clear();
    x = warship.getX();

    var key = keysPressed.getKey(e);
    keys[key] = true;
    var keyList = keysPressed.getKeyList(keys);
    console.log("keys pressed [" + keyList + "]");

    switch (keyList) {
        case "a":
            newX = x - s;
            alien.turret.move(alienNo);
            alien.generateBolt(newX, yParent, alienNo);
            break;
        case "d":
            newX = x + s;
            alien.turret.move(alienNo);
            alien.generateBolt(newX, yParent, alienNo);
            break;
        case " ":
            bulletNo++;
            newX = x;
            warship.generateBullet(bulletNo);
            break;
        case " d":
            bulletNo++;
            newX = x + s;
            warship.generateBullet(bulletNo);
            break;
        case "d ":
            bulletNo++;
            newX = x + s;
            warship.generateBullet(bulletNo);
            break;
        case " a":
            bulletNo++;
            newX = x - s;
            warship.generateBullet(bulletNo);
            break;
        case "a ":
            bulletNo++;
            newX = x - s;
            warship.generateBullet(bulletNo);
            break;
        default:
            break;
    }

    if (newX < xParent) { newX = xParent + 1; }
    if (newX + r + 20 > xFParent) { newX = xFParent - r - 10; }

    warship.setX(newX);
    dashboard.updateShotsFired();

});

$(document).on("keyup", function(e) {
      var key = keysPressed.getKey(e);
    delete keys[key];
});

