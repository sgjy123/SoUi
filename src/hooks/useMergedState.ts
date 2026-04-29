import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing merged state (controlled/uncontrolled)
 */
export function useMergedState<T>(
  defaultStateValue?: T | (() => T),
  option?: {
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
    postState?: (value: T) => T;
  }
): [T, (value: T) => void] {
  const { defaultValue, value, onChange, postState } = option || {};

  // Get initial state
  const getInitialValue = (): T => {
    if (value !== undefined) {
      return value;
    }
    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue;
    }
    return typeof defaultStateValue === 'function' 
      ? (defaultStateValue as any)() 
      : defaultStateValue;
  };

  const [innerValue, setInnerValue] = useState<T>(getInitialValue);

  // Update inner value when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setInnerValue(value);
    }
  }, [value]);

  // Apply postState transformation
  const mergedValue = postState ? postState(innerValue) : innerValue;

  // Create stable setter function
  const setValue = useCallback(
    (newValue: T) => {
      if (value === undefined) {
        setInnerValue(newValue);
      }
      onChange?.(newValue);
    },
    [value, onChange]
  );

  return [mergedValue, setValue];
}
