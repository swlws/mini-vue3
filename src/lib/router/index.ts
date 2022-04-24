import { ref, inject, Ref, App } from "vue";
const ROUTER_KEY = "__router__";

import RouterView from "./RouterView.vue";
import RouterLink from "./RouterLink.vue";

interface RouterOptions {
  history: {
    bindEvents: (fn: any) => void;
    url: string;
  };
  routes: {
    path: string;
    component: any;
  }[];
}

function createRouter(options: RouterOptions) {
  return new Router(options);
}

function useRouter(): Router {
  return inject(ROUTER_KEY) as Router;
}

function createWebHashHistory() {
  function bindEvents(fn: () => void) {
    window.addEventListener("hashchange", fn);
  }

  return {
    bindEvents,
    url: window.location.hash.slice(1) || "/",
  };
}

class Router {
  history!: RouterOptions["history"];
  routes!: RouterOptions["routes"];
  current!: Ref<string>;

  constructor(options: RouterOptions) {
    this.history = options.history;
    this.routes = options.routes;
    this.current = ref(this.history.url);

    this.history.bindEvents(() => {
      this.current.value = window.location.hash.slice(1);
      console.log("new router: ", this.current.value);
    });
  }

  install(app: App) {
    app.provide(ROUTER_KEY, this);

    app.component("RouterView", RouterView);
    app.component("RouterLink", RouterLink);
  }
}

export { createRouter, createWebHashHistory, useRouter };
