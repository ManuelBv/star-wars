var alien = {
    generate: function(x, y, i) {
        var alien = $("<div class='alien alienNo" + i + "'></div>").appendTo(".star_container");
        alien.text(i);
        alien.offset({
            top: y + 10,
            left: x - 15
        });
        // alien.generateBolt(x, y, i);
    },
    getX: function(i) {
        var alien = $("div[class*='alienNo" + i + "']");
        var x = alien.offset().left;
        return x;
    },
    getY: function(i) {
        var alien = $("div[class*='alienNo" + i + "']");
        var y = alien.offset().top;
        return y;
    },
    destroy: function(i) {
        var alien = $("div[class*='alienNo" + i + "']");
        alien.remove();
        dashboard.updateAliensKilled();
    },
    turret: {
        destroy: function() {
            var turret = $('.alien_turret');
            turret.remove();
        },
        generate: function(x, y, i) {
            var turret = $('<div class="alien_turret"></div>').appendTo(".star_container");
            turret.offset({
                top: y,
                left: x + 7
            });
            alien.turret.move(i);
        },
        move: function(i) {
            var turret = $(".alien_turret");
            var angle =  alien.turret.calculateTurretAngle(i);
            turret.css({
                transform: 'rotate(' + angle + 'deg)'
            })
        },
        calculateTurretAngle: function(i) {
            var adj = warship.getY() - alien.getY(i), //get adjacent side of the triangle by subtracting y from warship and alien pos
                oppos = warship.getX() - alien.getX(i), // get oppos by subtractinx X pos from warship and alien X
                hypo = Math.sqrt((adj * adj) + (oppos * oppos)), // get hypo by running the calc adj^2 + oppos^2 and then getting the square root
                acos = Math.acos(adj / hypo);
            if (oppos < 0) {
                angle = acos / (Math.PI / 180);
            } else {
                angle = 0 - acos / (Math.PI / 180);
            }
            return angle;
        }
    },
    generateBolt: function(x, y, i) {
        var bolt = $("<div class='bolt'></div>").appendTo(".star_container");
        bolt.offset({
            top: y + 10,
            left: alien.getX(alienNo) + 22
        });
        var angle = alien.turret.calculateTurretAngle(i);
        bolt.css({
            transform: 'rotate(' + angle + 'deg)'
        })
        console.log("x warship", warship.getX())
        var boltXY = [x + 7, y + 29];
        bolt.animate({
            top: (warship.getY() - yParent) + "px",
            left: (warship.getX() - xParent) + "px"
        }, {
            step: function(now, fx) {
                // var data = fx.elem.nodeName + " " + fx.prop + ": " + now;
                if (fx.prop === "left") {
                    var x = now;
                    boltXY[0] = x;
                }
                if (fx.prop === "top") {
                    var y = now;
                    boltXY[1] = y;
                }

                var xBolt = boltXY[0];
                var yBolt = boltXY[1];

                var xShip = warship.getX() - xParent;
                var yShip = warship.getY() - yParent;

                // console.log(now);
                // console.log(fx);
                // console.log("now is ", x, y, xBolt, yBolt);
                // console.log("ship is ", xShip, yShip);
                console.log("now is ", xBolt, yBolt);

                if (yBolt > yShip - 20 && yBolt < yShip + 15 && xBolt > xShip - 15 && xBolt < xShip + 15) {
                    warship.destroy(warshipNo);
                    console.log("out out out")

                    $(this).stop();
                    $(this).remove();

                    var newX = xParent + 50 + parseInt((Math.random() * 100) * ((Math.random() / 2) * 9));
                    warshipNo++;
                    warship.generate(newX, newY, warshipNo);
                    dashboard.updateShipsDestroyed(warshipNo);

                }
            },
            duration: 3000,
            easing: "linear",
            complete: function() {
                $(this).stop();
                $(this).remove();
            }
        })
    }
}