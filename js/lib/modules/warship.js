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
            left: newX + 5
        });

        bullet.animate({
            top: "-20px"
        }, {
            step: function(now, fx) {
                // var data = fx.elem.nodeName + " " + fx.prop + ": " + now;
                var y = now;
                var xAlien = alien.getX(alienNo);
                var xBullet = $(this).offset().left;
                // console.log("y is " + y + " Xalien is " + xAlien + " and xBulllet is " + xBullet );
                if ((y < yParent) && ((x > xAlien - 50) && (x < xAlien + 50))) {
                    alien.destroy(alienNo);
                    alien.turret.destroy();

                    $(this).stop();
                    $(this).remove();
                    alienNo++;

                    var newAlienX = xParent + 50 + parseInt((Math.random() * 100) * ((Math.random() / 2) * 9));
                    alien.generate(newAlienX, yParent, alienNo);
                    alien.turret.generate(newAlienX, yParent, alienNo);
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
}

// function destroyShip(warshipNo) {
//     var warship = $(".warship");
//     warship.remove();
// }


// function genShip(x, y, warshipNo) {
//     var warship = $("<div class='warship warshipNo" + warshipNo + "'></div>").appendTo(".star_container");
//     warship.offset({
//         top: y,
//         left: x
//     });

//     alien.turret.move(alienNo);
// }

// function getX() {
//     var x = $(".warship").offset().left;
//     return x;
// }

// function getY() {
//     var y = $(".warship").offset().top;
//     return y;
// }

/* warship bullet is only able to shoot vertically */
// function genBullet(i) {
//     var bullet = $("<div class='bullet bulletNo" + i + "'></div>").appendTo(".star_container");
//     bullet.offset({
//         top: newY,
//         left: newX + 5
//     });

//     bullet.animate({
//         top: "-20px"
//     }, {
//         step: function(now, fx) {
//             // var data = fx.elem.nodeName + " " + fx.prop + ": " + now;
//             var y = now;
//             var xAlien = alien.getX(alienNo);
//             var xBullet = $(this).offset().left;
//             // console.log("y is " + y + " Xalien is " + xAlien + " and xBulllet is " + xBullet );
//             if ((y < yParent) && ((x > xAlien - 50) && (x < xAlien + 50))) {
//                 alien.destroy(alienNo);
//                 alien.turret.destroy();

//                 $(this).stop();
//                 $(this).remove();
//                 alienNo++;

//                 var newAlienX = xParent + 50 + parseInt((Math.random() * 100) * ((Math.random() / 2) * 9));
//                 alien.generate(newAlienX, yParent, alienNo);
//                 alien.turret.generate(newAlienX, yParent, alienNo);
//             }
//             // console.log("y is " + y + " and yParent is " + yParent);


//         },
//         duration: "slow",
//         easing: "linear",
//         complete: function() {
//             $(this).remove();
//         }
//     })
// }