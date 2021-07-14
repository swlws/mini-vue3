'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function info(str) {
    console.info(str);
}

function createApp() {
    var app = {
        mount: function () {
            info("mount");
        },
    };
    return app;
}

exports.createApp = createApp;
//# sourceMappingURL=mini-vue3.cjs.js.map
