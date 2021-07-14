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

export { createApp };
//# sourceMappingURL=mini-vue3.esm.js.map
