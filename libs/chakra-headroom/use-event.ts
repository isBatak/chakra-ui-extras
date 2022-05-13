import { useSafeLayoutEffect } from "@chakra-ui/hooks";
import { useCallback, useRef } from "react";

/**
 * https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 */
export const useEvent = (handler: (...args: Array<any>) => void) => {
  const handlerRef = useRef(null);

  useSafeLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: Array<any>) => {
    const fn = handlerRef.current;
    return fn(...args);
  }, []);
};
