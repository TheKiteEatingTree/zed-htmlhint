define(function(require, exports, module) {
    var HTMLHint = require("configfs!/net.andrewstephan.zed.htmlhint/htmlhint.js").HTMLHint;
    var session = require("zed/session");

    return function(info, callback) {
        var path = info.path;
        session.getText(path, function(err, text) {
            var result = HTMLHint.verify(text);
            callback(null, result.map(function(msg) {
                return {
                    row: msg.line - 1,
                    column: msg.col - 1,
                    text: msg.message,
                    type: msg.type
                };
            }));
        });
    };
});