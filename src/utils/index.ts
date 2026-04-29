/**
 * Classnames utility function
 * Combines class names conditionally
 */
import classNames from 'classnames';

export { classNames };

/**
 * Merge class names with conditional logic
 */
export function cx(...args: any[]): string {
  return classNames(...args);
}

/**
 * Check if a value is empty
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const targetValue = result[key];
      const sourceValue = source[key];
      
      if (
        typeof targetValue === 'object' &&
        typeof sourceValue === 'object' &&
        targetValue !== null &&
        sourceValue !== null &&
        !Array.isArray(targetValue) &&
        !Array.isArray(sourceValue)
      ) {
        result[key] = deepMerge(targetValue as any, sourceValue as any);
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue as any;
      }
    }
  }
  
  return result;
}

/**
 * Generate unique ID
 */
let uuidCounter = 0;
export function generateUuid(prefix = 'soui'): string {
  return `${prefix}-${++uuidCounter}-${Date.now().toString(36)}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Get scroll parent element
 */
export function getScrollParent(element: HTMLElement | null): HTMLElement | Document {
  if (!element) return document.documentElement;
  
  const overflowPattern = /(auto|scroll|overlay)/;
  
  let parent = element.parentElement;
  while (parent) {
    const style = window.getComputedStyle(parent);
    if (overflowPattern.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
    parent = parent.parentElement;
  }
  
  return document.documentElement;
}

/**
 * Convert size to pixels
 */
export function getSize(size: string | number): number {
  if (typeof size === 'number') return size;
  if (size.endsWith('px')) return parseInt(size, 10);
  if (size.endsWith('%')) return (parseInt(size, 10) / 100) * window.innerWidth;
  if (size.endsWith('rem')) return parseInt(size, 10) * 16;
  if (size.endsWith('em')) return parseInt(size, 10) * 14;
  return parseInt(size, 10);
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement, offset = 0): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}
