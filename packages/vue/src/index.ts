import { Logger } from "@mini-vue/shared";

export function createApp() {
  const app = {
    mount: () => {
      Logger.info("mount");
    },
  };

  return app;
}
