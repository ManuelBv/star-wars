var dashboard = {
    updateShotsFired: function() {
        $(".bullets span").text(bulletNo);
    },
    updateAliensKilled: function() {
        $(".hits span").text(alienNo);
    },
    updateShipsDestroyed: function(warshipNo) {
		var shipSingularPlural = 'ship';
    	if ( warshipNo > 2 ) shipSingularPlural = 'ships';
        $(".status span").html("You lost <span class='shipsLost'>" + (warshipNo - 1) + "</span> " + shipSingularPlural + ", you fool!");
    },
}