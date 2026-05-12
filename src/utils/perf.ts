import { useEffect, useRef } from 'react';

const isDev = import.meta.env.DEV;

/**
 * Tracks the execution time of a synchronous operation.
 * Returns a function to call when the operation ends.
 */
export function perfTrack(label: string) {
  if (!isDev) return () => {};

  const start = performance.now();
  return () => {
    const end = performance.now();
    const duration = end - start;
    if (duration > 5) {
      console.warn(`[Perf] ${label} took ${duration.toFixed(2)}ms`);
    } else {
      console.log(`[Perf] ${label} took ${duration.toFixed(2)}ms`);
    }
  };
}

/**
 * React Hook to track how many times a component renders.
 */
export function useRenderProfiler(componentName: string, id?: string) {
  if (!isDev) return;

  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    console.log(`[Render] ${componentName} ${id ? `(${id}) ` : ''}rendered ${renderCount.current} times`);
  });
}
