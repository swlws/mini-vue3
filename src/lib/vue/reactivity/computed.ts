import { isFunction, NOOP } from "../shared";
import { effect } from "./effect";
import { trackRefValue, triggerRefValue } from "./ref";

export type ComputedGetter<T> = (...args: any[]) => T;
export type ComputedSetter<T> = (v: T) => void;

export interface WritableComputedOptions<T> {
  get: ComputedGetter<T>;
  set: ComputedSetter<T>;
}

export class ComputedRefImpl<T> {
  private _value!: T;
  public readonly effect: any;

  public readonly __v_isRef = true;
  public _dirty = true;

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>
  ) {
    // TODO：这里为要使用_dirty、scheduler控制，待研究
    this.effect = effect(getter, {
      lazy: true,
      scheduler: () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerRefValue(this);
        }
      },
    });
    this.effect.computed = this;
  }

  get value() {
    trackRefValue(this);

    if (this._dirty) {
      this._dirty = false;
      this._value = this.effect();
    }

    return this._value;
  }

  set value(newValue: T) {
    this._setter(newValue);
  }
}

export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
) {
  let getter: ComputedGetter<T>;
  let setter: ComputedSetter<T>;

  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  const cRef = new ComputedRefImpl(getter, setter);

  return cRef as any;
}
