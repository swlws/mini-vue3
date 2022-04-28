import { config } from "process";
import { describe, expect, test } from "vitest";

describe("Proxy", () => {
  test("get/set in array", () => {
    const target = [11, 22, 33];
    const arr = new Proxy(target, {
      get: (target, key) => {
        console.log(`get ${key}`);
        return Reflect.get(target, key);
      },
      set: (target, key, value) => {
        console.log(`set ${key} to ${value}`);
        return Reflect.set(target, key, value);
      },
    });

    arr.push(44);
    console.log();
    arr.indexOf(44);
  });
});
