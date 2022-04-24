import logger from "../shared/logger";

import { TrackOpTypes, TriggerOpTypes } from "./operations";

/**
 *
 * {
 *    obj: {
 *      key1: [effect1, effect2],
 *      key2: [effect1, effect2],
 *    }
 * }
 */
const targetMap = new WeakMap<any, Map<any, Set<any>>>();

export let activeEffect: any;

/**
 * 设置追踪函数
 *
 * @param target
 * @param type
 * @param key
 */
export function track(target: object, type: TrackOpTypes, key: unknown) {
  logger.info("track", target, type, key);

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  // 多次get操作时，若activeEffect存在，需要检验activeEffect是否已经在deps中
  if (!deps.has(activeEffect) && activeEffect) {
    // 防止重复注册
    deps.add(activeEffect);
  }
  depsMap.set(key, deps);
}

/**
 * 触发追踪回掉函数
 *
 * @param target
 * @param type
 * @param key
 * @returns
 */
export function trigger(target: object, type: TriggerOpTypes, key?: unknown) {
  logger.info("trigger", target, type, key);

  const depsMap = targetMap.get(target);
  if (!depsMap) {
    // never been tracked
    return;
  }

  const deps = depsMap.get(key);
  if (!deps) return;

  deps.forEach((effectFn) => {
    if (effectFn.scheduler) {
      effectFn.scheduler();
    } else {
      effectFn();
    }
  });
}

export function effect<T = any>(fn: () => T, options: Record<any, any> = {}) {
  const effectFn = () => {
    logger.info("effectFn");

    try {
      activeEffect = effectFn;
      // fn执行的时候，内部读取响应式数据的时候，就能在get配置里读取到activeEffect
      return fn();
    } finally {
      activeEffect = undefined;
    }
  };

  if (!options.lazy) {
    // 没有配置lazy 直接执行
    effectFn();
  }

  effectFn.scheduler = options.scheduler;
  return effectFn;
}
