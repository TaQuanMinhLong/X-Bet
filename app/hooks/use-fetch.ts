import type { SerializeFrom } from "@remix-run/node";
import { useDidUpdate } from "./use-did-update";
import { useFetcher } from "@remix-run/react";
import { useMemo } from "react";

export function useFetch<T>(onHasData: (data: SerializeFrom<T>) => any) {
  const fetcher = useFetcher<T>();

  const hasData = useMemo(
    () => fetcher.state === "idle" && !!fetcher.data,
    [fetcher.data, fetcher.state]
  );

  const submitting = useMemo(() => fetcher.state !== "idle", [fetcher.state]);

  useDidUpdate(() => {
    if (fetcher.state === "idle" && !!fetcher.data) {
      onHasData(fetcher.data);
    }
  }, [fetcher.state, fetcher.data]);

  return { fetcher, hasData, submitting };
}
