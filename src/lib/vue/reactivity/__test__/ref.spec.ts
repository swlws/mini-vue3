import { describe, it, expect, test } from "vitest";

import { effect, ref } from "../index";

describe("reactivity/ref", () => {
  test("basic data type", () => {
    const val = ref(0);

    let v;
    effect(() => {
      v = val.value; // get操作，触发track
    });

    val.value++; // 先get、后set，触发track、trigger
    expect(v).toBe(1);
  });

  test("reference data type", () => {
    const obj = ref({ num: 0 });

    let v;
    effect(() => {
      v = obj.value.num; // get操作，触发track
    });

    obj.value.num++; // 先get、后set，触发track、trigger
    expect(v).toBe(1);
  });
});
