import { useState, useEffect, useCallback } from "react";
import type { ApiResponse } from "../types/apiResponse";

type ApiFunction<T, P = void> = (params?: P) => Promise<T>;

export function useApi<T, P = void>(
  apiFunction: ApiFunction<T, P>,
  immediate = false,
  immediateParams?: P
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (params?: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(params);
        setData(result);
        return result;
      } catch (err) {
        const err2 = err as ApiResponse<T>;
        const errorMessage = err2.errors?.join() || "请求失败";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute(immediateParams as P);
    }
  }, [execute, immediate, immediateParams]);

  return { data, loading, error, execute };
}
