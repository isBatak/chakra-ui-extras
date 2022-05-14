import * as React from "react";
import { useRef, useCallback, useInsertionEffect } from "react";

let _dispatcher = null;

function getCurrentDispatcher() {
  // @ts-ignore
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    .ReactCurrentDispatcher.current;
}

function useRenderTracker() {
  if (_dispatcher === null) {
    _dispatcher = getCurrentDispatcher();
  }
}

function isInRender() {
  return _dispatcher !== null && _dispatcher === getCurrentDispatcher();
}

/**
 * https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 * https://gist.github.com/raibima/b2b63b3fdc733faa694a90d351b5004f
 */
 export const useEvent = (handler: (...args: Array<any>) => void) => {
  useRenderTracker();
  const ref = useRef(null);

  useInsertionEffect(() => {
    ref.current = handler;
  });

  return useCallback((...args: Array<any>) => {
    if (isInRender()) {
      throw new Error("Cannot call event in Render!");
    }

    const fn = ref.current;

    fn(...args);
  }, []);
}
