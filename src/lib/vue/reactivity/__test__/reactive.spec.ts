import { describe, expect, test } from "vitest";

import { reactive, effect } from "../index";

describe("响应式 reactive", () => {
  test("Object", () => {
    const ret = reactive({ num: 0 });

    let val, val2;
    effect(() => {
      val = ret.num; // get操作，触发track
    });

    effect(() => {
      val2 = ret.num * 2; // get操作，触发track
    });

    ret.num++; // 先get、后set，触发track、trigger
    expect(val).toBe(1);
    expect(val2).toBe(2);

    ret.num = 10;
    expect(val).toBe(10);
    expect(val2).toBe(20);
  });

  test("Array", () => {
    const ret = reactive([1, 2, 3]);

    let val;
    effect(() => {
      val = ret.map((v) => v * 2);
    });

    ret.push(4);
    expect(val).toEqual([2, 4, 6, 8]);
  });
});
