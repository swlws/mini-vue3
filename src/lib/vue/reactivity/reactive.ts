import { isObject } from "../shared";
import { mutableHandlers } from "./baseHandlers";

export interface Target {}

function createReactiveObject(target: Target) {
  if (!isObject(target)) {
    return target;
  }

  return new Proxy(target, mutableHandlers);
}

export function reactive<T extends Record<string, any>>(obj: T) {
  return createReactiveObject(obj) as T;
}

export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value;
