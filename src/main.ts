import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");

window.onerror = function (e) {
  console.log("https://stackoverflow.com/search?q=[js]+" + e);
};
