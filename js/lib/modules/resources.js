var explosion = {
    run: function(x, y, type, explosionOffsetX, explosionOffsetY) {
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
            duration: 'slow',
            easing: 'linear',
            complete: function() {
                // $(this).remove();
            }
        });
    },
}