import { describe, it, expect, test } from "vitest";

import { effect, ref } from "../index";

describe("响应式 Ref", () => {
  test("基本数据类型", () => {
    const val = ref(0);

    let v;
    effect(() => {
      v = val.value; // get操作，触发track
    });

    val.value++; // 先get、后set，触发track、trigger
    expect(v).toBe(1);
  });

  test("引用数据类型", () => {
    const obj = ref({ num: 0 });

    let v;
    effect(() => {
      v = obj.value.num; // get操作，触发track
    });

    obj.value.num++; // 先get、后set，触发track、trigger
    expect(v).toBe(1);
  });
});
