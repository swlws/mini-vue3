import { createRouter, createWebHashHistory } from "@lib/router/index";

import Page01 from "../components/Page01.vue";
import Page02 from "../components/Page02.vue";
import Page03 from "../components/Page03";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/page01",
      component: Page01,
    },
    {
      path: "/page02",
      component: Page02,
    },
    {
      path: "/page03",
      component: Page03,
    },
  ],
});

export default router;
