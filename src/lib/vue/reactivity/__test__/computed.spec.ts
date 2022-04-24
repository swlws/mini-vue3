import { describe, expect, test } from "vitest";

import { ref, computed, effect } from "../index";
// import { ref, computed, effect } from "vue";

describe("computed", () => {
  test("function", () => {
    const v1 = ref(1);

    const v2 = computed(() => v1.value * 2);

    expect(v2.value).toBe(2);

    v1.value++;
    expect(v2.value).toBe(4);
  });

  test("setter getter", () => {
    const v1 = ref(1);
    const v2 = computed({
      get() {
        return v1.value * 2;
      },
      set(val: number) {
        v1.value = val;
      },
    });

    // 初始化时，v1为1，v2为2
    expect(v2.value).toBe(2);

    // v1变为10，v2为20
    v1.value = 10;
    expect(v2.value).toBe(20);

    // 主动调用v2的set方法，将修改v1的值
    // v1的值变化后，再次调用v2的get方法，触发计算
    v2.value = 4;
    expect(v2.value).toBe(8);
  });

  test("sum of two number", () => {
    const v1 = ref(1);
    const v2 = ref(2);

    const v3 = computed(() => v1.value + v2.value);

    expect(v3.value).toBe(3);

    v1.value = 10;
    expect(v3.value).toBe(12);

    v2.value = 20;
    expect(v3.value).toBe(30);
  });

  /**
   * computed的变化时，是如何触发effect的回调的呢？
   */
  test("first computed then effect", () => {
    const v1 = ref(1);
    const v2 = computed(() => v1.value * 2);

    let v3;
    effect(() => {
      v3 = v2.value * 2;
    });

    v1.value++;
    expect(v2.value).toBe(4);
    expect(v3).toBe(8);
  });
});
