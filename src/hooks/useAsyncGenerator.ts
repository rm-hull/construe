import { useEffect, useState } from "react";

/**
 * Generic hook that consumes any async generator and returns
 * the yielded values as an array. Values are collected as they stream in.
 *
 * @param generatorFactory A function returning a fresh AsyncGenerator each time dependencies change
 * @param deps Dependency list that determines when to restart the generator
 */
export function useAsyncGenerator<T>(generatorFactory: () => AsyncGenerator<T>, deps: React.DependencyList = []): T[] {
  const [values, setValues] = useState<T[]>([]);

  useEffect(() => {
    let cancelled = false;
    const results: T[] = [];

    async function run() {
      setValues([]);
      for await (const item of generatorFactory()) {
        if (cancelled) break;
        results.push(item);
        setValues([...results]); // or: setValues(prev => [...prev, item]) for incremental updates
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, deps);

  return values;
}
