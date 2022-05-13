import { useEffect, useRef, useState } from "react";
import raf from "raf";

import { useEvent } from "./use-event";
import { getScrollY, isOutOfBound, shouldUpdate } from "./utils";

/**
 * Used to detect browser support for adding an event listener with options
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
 * @returns Boolean
 */
const supportsPassiveEvents = () => {
  let passiveSupported = false;

  try {
    const options = {
      get passive() {
        // This function will be called when the browser
        // attempts to access the passive property.
        passiveSupported = true;
        return false;
      }
    };

    window.addEventListener("test", null, options);
    // @ts-ignore
    window.removeEventListener("test", null, options);
  } catch (err) {
    passiveSupported = false;
  }

  return passiveSupported;
};

export type ParentElement = Window | HTMLElement;

export interface IUseHeadroomState {
  state: "unfixed" | "pinned" | "unpinned";
  translateY: number | string;
  animation?: boolean;
  height?: number;
}
export interface IUseHeadroomProps {
  /**
   * provide a custom 'parent' element for scroll events.
   * parent should be a function which resolves to the desired element.
   */
  parent?: () => ParentElement;
  disable?: boolean;
  pin?: boolean;
  upTolerance?: number;
  downTolerance?: number;
  /**
   * callback called when header is pinned
   */
  onPin?: () => void;
  onUnpin?: () => void;
  onUnfix?: () => void;
  pinStart?: number;
  calcHeightOnResize?: boolean;
}

// const defaultProps: IUseHeadroomProps = {
//   parent: () => window,
//   disable: false,
//   // pin: false,
//   upTolerance: 5,
//   downTolerance: 0,
//   pinStart: 0,
//   calcHeightOnResize: true
// }

export const useHeadroom = (props: IUseHeadroomProps = {}) => {
  const {
    parent = () => window,
    disable = false,
    // pin = false,
    upTolerance = 5,
    downTolerance = 0,
    onPin,
    onUnpin,
    onUnfix,
    pinStart = 0,
    calcHeightOnResize = true
  } = props;
  const ref = useRef<HTMLElement>(null);
  const currentScrollYRef = useRef(0);
  const lastKnownScrollYRef = useRef(0);
  const scrollTickingRef = useRef(false);
  const resizeTickingRef = useRef(false);
  const eventListenerOptionsRef = useRef(false);

  const [state, setState] = useState<IUseHeadroomState>(() => ({
    state: "unfixed",
    translateY: 0
  }));

  const unpin = useEvent(() => {
    onUnpin?.();

    setState((prevState) => ({
      ...prevState,
      translateY: "-100%",
      animation: true,
      state: "unpinned"
    }));
  });

  const unpinSnap = useEvent(() => {
    onUnpin?.();

    setState((prevState) => ({
      ...prevState,
      translateY: "-100%",
      animation: false,
      state: "unpinned"
    }));
  });

  const pin = useEvent(() => {
    onPin?.();

    setState((prevState) => ({
      ...prevState,
      translateY: 0,
      animation: true,
      state: "pinned"
    }));
  });

  const unfix = useEvent(() => {
    onUnfix?.();

    setState((prevState) => ({
      ...prevState,
      translateY: 0,
      animation: false,
      state: "unfixed"
    }));
  });

  const update = useEvent(() => {
    const parentElement = parent();
    currentScrollYRef.current = getScrollY(parentElement);

    if (!isOutOfBound(currentScrollYRef.current, parentElement)) {
      const { action } = shouldUpdate(
        lastKnownScrollYRef.current,
        currentScrollYRef.current,
        props,
        state
      );

      if (action === "pin") {
        pin();
      } else if (action === "unpin") {
        unpin();
      } else if (action === "unpin-snap") {
        unpinSnap();
      } else if (action === "unfix") {
        unfix();
      }
    }

    lastKnownScrollYRef.current = currentScrollYRef.current;
    scrollTickingRef.current = false;
  });

  const setHeightOffset = useEvent(() => {
    setState((prevState) => ({
      ...prevState,
      height: ref.current ? ref.current.offsetHeight : 0
    }));

    resizeTickingRef.current = false;
  });

  const handleScroll = useEvent(() => {
    if (!scrollTickingRef.current) {
      scrollTickingRef.current = true;

      raf(update);
    }
  });

  const handleResize = useEvent(() => {
    if (!resizeTickingRef.current) {
      resizeTickingRef.current = true;

      raf(setHeightOffset);
    }
  });

  useEffect(() => {
    const eventListenerOptions = supportsPassiveEvents()
      ? { passive: true, capture: false }
      : false;
    const root = parent();


    if (!disable) {
      root.addEventListener("scroll", handleScroll, eventListenerOptions);

      if (calcHeightOnResize) {
        root.addEventListener("resize", handleResize, eventListenerOptions);
      }
    }

    return () => {
      root.removeEventListener("scroll", handleScroll, eventListenerOptions);

      if (calcHeightOnResize) {
        root.removeEventListener("resize", handleResize, eventListenerOptions);
      }
    };
  }, [disable, calcHeightOnResize]);

  return {
    ref
  };
};
