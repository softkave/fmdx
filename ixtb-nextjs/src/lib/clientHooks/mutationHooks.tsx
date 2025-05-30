import { isString } from "lodash-es";
import { useCallback } from "react";
import { toast } from "sonner";

export function useMutationFnWithRetry<
  TFn extends (...args: unknown[]) => unknown
>(fn: TFn) {
  const wrapper = useCallback(
    async (...args: Parameters<TFn>) => {
      try {
        return await fn(...args);
      } catch (error) {
        console.error(error);
        toast.error("Error", {
          description: isString((error as Error | undefined)?.message)
            ? (error as Error).message
            : "An error occurred",
          action: {
            label: "Retry",
            onClick: () => wrapper(...args),
          },
        });
      }
    },
    [fn]
  );

  return wrapper;
}
