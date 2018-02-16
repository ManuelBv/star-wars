var dashboard = {
    updateShotsFired: function() {
        $(".bullets span").text(bulletNo);
    },
    updateAliensKilled: function() {
        $(".hits span").text(alienNo);
    },
    updateShipsDestroyed: function(warshipNo) {
        $(".status span").text("You lost " + (warshipNo - 1) + " ships! Moron!");
    }
}