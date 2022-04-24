import { activeEffect, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";
import { toReactive } from "./reactive";

export function isRef(r: any) {
  return !!(r && r.__v_isRef === true);
}

declare const RefSymbol: unique symbol;

export interface Ref<T = any> {
  value: T;
  /**
   * Type differentiator only.
   * We need this to be in public d.ts but don't want it to show up in IDE
   * autocomplete, so we use a private Symbol instead.
   */
  [RefSymbol]: true;
}

type RefBase<T> = {
  value: T;
};

export function ref(value?: unknown) {
  return createRef(value);
}

function createRef(rawValue: unknown): RefImpl<any> {
  if (isRef(rawValue)) {
    return rawValue as RefImpl<any>;
  }
  return new RefImpl(rawValue);
}

class RefImpl<T> {
  private _value: T;

  public readonly __v_isRef = true;

  constructor(value: T) {
    this._value = toReactive(value);
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newVal) {
    // 这里仅仅是简单比较
    // 当是Object时，这个比对毫无意义
    if (newVal !== this._value) {
      this._value = toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}

export function trackRefValue(ref: RefBase<any>) {
  if (activeEffect) {
    track(ref, TrackOpTypes.GET, "value");
  }
}

export function triggerRefValue(ref: RefBase<any>, newVal?: any) {
  trigger(ref, TriggerOpTypes.SET, "value");
}
