import { useState, useCallback, useEffect } from 'react';

interface Options<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

/**
 * Hook for controllable value pattern
 */
export function useControllableValue<T>(options: Options<T> = {}) {
  const { value, defaultValue, onChange } = options;

  const [stateValue, setStateValue] = useState<T>(() => {
    if (value !== undefined) {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return undefined as unknown as T;
  });

  useEffect(() => {
    if (value !== undefined) {
      setStateValue(value);
    }
  }, [value]);

  const setValue = useCallback(
    (newValue: T) => {
      if (value === undefined) {
        setStateValue(newValue);
      }
      onChange?.(newValue);
    },
    [value, onChange]
  );

  return [stateValue, setValue] as const;
}
