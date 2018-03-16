var explosion = {
    run: function(x, y, type, explosionOffsetX, explosionOffsetY, callback) {
        var explosion = $('<div class="'+ type +'Explosion"></div>');
        explosion.appendTo('.star_container');
        explosion.offset({
            left: x - explosionOffsetX,
            top: y - explosionOffsetY
        });

        explosion.animate({
            width: 0,
            height: 0,
            left: '+=' + explosionOffsetX,
            top: '+=' + explosionOffsetY
        }, {
            step: function() {

            },
            duration: 1000,
            easing: 'linear',
            complete: function() {
                $(this).remove();
                if (callback ) {
                    callback();
                }
            }
        });
    },
}