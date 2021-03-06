var warship = {
    destroy: function(warshipNo) {
        var warship = $(".warship");
        warship.remove();
    },
    generate: function(x, y, warshipNo) {
        var warship = $("<div class='warship warshipNo" + warshipNo + "'></div>").appendTo(".star_container");
        warship.offset({
            top: y,
            left: x
        });

        alien.turret.move(alienNo);
    },
    setX: function(x) {
        var warship = $(".warship");
        warship.offset({
            left: x
        });
    },
    getX: function() {
        var x = $(".warship").offset().left;
        return x;
    },
    getY: function() {
        var y = $(".warship").offset().top;
        return y;
    },
    generateBullet: function(i) {
        var bullet = $("<div class='bullet bulletNo" + i + "'></div>").appendTo(".star_container");
        bullet.offset({
            top: newY,
            // left: newX + 5
            left: warship.getX() + 5
        });

        bullet.animate({
            top: "-20px"
        }, {
            step: function(now, fx) {
                // var data = fx.elem.nodeName + " " + fx.prop + ": " + now;
                var animatedBullet = $(this);

                var y = now;
                var xAlien = alien.getX(alienNo);
                var xBullet = animatedBullet.offset().left;
                // console.log("y is " + y + " Xalien is " + xAlien + " and xBulllet is " + xBullet );
                if ((y < yParent) && ((x > xAlien - 50) && (x < xAlien + 50))) {
                    alien.destroy(alienNo);
                    alien.turret.destroy();
                    explosion.run(xAlien, y, 'ship', 20, -30);

                    animatedBullet.stop();
                    animatedBullet.remove();
                    alienNo++;


                    var newAlienX = xParent + 50 + parseInt((Math.random() * 100) * ((Math.random() / 2) * 9));
                    alien.generate(newAlienX, yParent, alienNo);
                    alien.turret.generate(newAlienX, yParent, alienNo);


                }
                // console.log("y is " + y + " and yParent is " + yParent);

                warship.bulletLineOfSightDestruction(animatedBullet, y, xBullet);

            },
            duration: "slow",
            easing: "linear",
            complete: function() {
                $(this).remove();
            }
        })
    },
    bulletLineOfSightDestruction: function(bullet, y, x) {
        var alienBolts = $('.bolt');


        alienBolts.each(function(index) {
            var bolt = $(this),
                boltY = bolt.offset().top,
                boltX = bolt.offset().left;
            if (boltY > y - 10 && boltY < y + 10 && boltX > x - 10 && boltX < x + 10) {
                bolt.remove();
                bolt.stop();
                bullet.remove();
                bullet.stop();

                explosion.run(x, y, 'bullet', 25, 25);

            } // end if  
        }); // end each 


    },
}