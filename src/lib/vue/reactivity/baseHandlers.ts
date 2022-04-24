import { hasOwn } from "../shared";
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";
import { Target } from "./reactive";

const get = /*#__PURE__*/ createGetter();

function createGetter() {
  return function get(target: Target, key: string | symbol, receiver: object) {
    const res = Reflect.get(target, key, receiver);
    track(target, TrackOpTypes.GET, key);
    return res;
  };
}

const set = /*#__PURE__*/ createSetter();

function createSetter() {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    const res = Reflect.set(target, key, value, receiver);
    trigger(target, TriggerOpTypes.SET, key);
    return res;
  };
}

function deleteProperty(target: object, key: string | symbol): boolean {
  const hadKey = hasOwn(target, key);
  const oldValue = (target as any)[key];
  const result = Reflect.deleteProperty(target, key);

  return result;
}

function has(target: object, key: string | symbol): boolean {
  const result = Reflect.has(target, key);

  return result;
}

function ownKeys(target: object): (string | symbol)[] {
  return Reflect.ownKeys(target);
}

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys,
};
