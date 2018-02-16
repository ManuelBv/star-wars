var keysPressed = {
    getKey: function(e) {
        var code = e.keyCode;
        var key = String.fromCharCode(code).toLowerCase();
        return key;
    },
    getKeyList: function(keys) {
        var keyList = "";
        for (var i in keys) {
            if (!keys.hasOwnProperty(i)) continue;
            keyList += i;
        }
        return keyList;
    }
}