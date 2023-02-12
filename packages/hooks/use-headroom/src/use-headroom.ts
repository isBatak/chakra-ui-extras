import { useCallback, useEffect, useRef, useState } from "react";
import raf from "raf";

import { useEvent } from "./use-event";
import { getScrollY, isOutOfBound, shouldUpdate, mergeRefs } from "./utils";

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
      },
    };

    // @ts-ignore
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
  status: "unfixed" | "pinned" | "unpinned";
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
  /**
   *
   */
  disable?: boolean;
  /**
   *
   */
  pin?: boolean;
  /**
   * scroll tolerance in px when scrolling up before component is pinned
   */
  upTolerance?: number;
  /**
   * scroll tolerance in px when scrolling down before component is pinned
   */
  downTolerance?: number;
  /**
   * callback called when header is pinned
   */
  onPin?: () => void;
  /**
   * callback called when header is unpinned
   */
  onUnpin?: () => void;
  /**
   * callback called when header position is no longer fixed
   */
  onUnfix?: () => void;
  /**
   * height in px where the header should start and stop pinning. Useful when you have another element above Headroom component.
   */
  pinStart?: number;
  /**
   *
   */
  calcHeightOnResize?: boolean;
}

export const useHeadroom = (props: IUseHeadroomProps = {}) => {
  const {
    parent = () => window,
    disable = false,
    pin = false,
    upTolerance = 5,
    downTolerance = 0,
    onPin,
    onUnpin,
    onUnfix,
    pinStart = 0,
    calcHeightOnResize = true,
  } = props;
  const innerRef = useRef<HTMLElement>(null);
  const currentScrollYRef = useRef(0);
  const lastKnownScrollYRef = useRef(0);
  const scrollTickingRef = useRef(false);
  const resizeTickingRef = useRef(false);

  // refactor this to useReducer
  const [state, setState] = useState<IUseHeadroomState>(() => ({
    status: "unfixed",
    translateY: 0,
  }));

  const handleUnpin = useEvent(() => {
    onUnpin?.();

    setState((prevState) => ({
      ...prevState,
      translateY: "-100%",
      animation: true,
      status: "unpinned",
    }));
  });

  const handleUnpinSnap = useEvent(() => {
    onUnpin?.();

    setState((prevState) => ({
      ...prevState,
      translateY: "-100%",
      animation: false,
      status: "unpinned",
    }));
  });

  const handlePin = useEvent(() => {
    onPin?.();

    setState((prevState) => ({
      ...prevState,
      translateY: 0,
      animation: true,
      status: "pinned",
    }));
  });

  const handleUnfix = useEvent(() => {
    onUnfix?.();

    setState((prevState) => ({
      ...prevState,
      translateY: 0,
      animation: false,
      status: "unfixed",
    }));
  });

  const handleUpdate = useEvent(() => {
    const parentElement = parent();
    currentScrollYRef.current = getScrollY(parentElement);

    // move to useMemo
    if (!isOutOfBound(currentScrollYRef.current, parentElement)) {
      // move to useMemo
      const { action } = shouldUpdate(
        lastKnownScrollYRef.current,
        currentScrollYRef.current,
        disable,
        pin,
        pinStart,
        downTolerance,
        upTolerance,
        state
      );

      if (action === "pin") {
        handlePin();
      } else if (action === "unpin") {
        handleUnpin();
      } else if (action === "unpin-snap") {
        handleUnpinSnap();
      } else if (action === "unfix") {
        handleUnfix();
      }
    }

    lastKnownScrollYRef.current = currentScrollYRef.current;
    scrollTickingRef.current = false;
  });

  const setHeightOffset = useEvent(() => {
    setState((prevState) => ({
      ...prevState,
      height: innerRef.current ? innerRef.current.offsetHeight : 0,
    }));

    resizeTickingRef.current = false;
  });

  const handleScroll = useEvent(() => {
    if (!scrollTickingRef.current) {
      scrollTickingRef.current = true;

      raf(handleUpdate);
    }
  });

  const handleResize = useEvent(() => {
    if (!resizeTickingRef.current) {
      resizeTickingRef.current = true;

      raf(setHeightOffset);
    }
  });

  useEffect(() => {
    setHeightOffset();
  }, [])

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

  const getWrapperProps = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      style: {
        height: state.height ? state.height : null,
      },
    }),
    [state.height]
  );

  const getInnerProps = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(ref, innerRef),
      style: {
        position: disable || state.status === "unfixed" ? "relative" : "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        WebkitTransform: `translate3D(0, ${state.translateY}, 0)`,
        MsTransform: `translate3D(0, ${state.translateY}, 0)`,
        transform: `translate3D(0, ${state.translateY}, 0)`,
        ...(state.animation
          ? {
              WebkitTransition: "all .2s ease-in-out",
              MozTransition: "all .2s ease-in-out",
              OTransition: "all .2s ease-in-out",
              transition: "all .2s ease-in-out",
            }
          : {}),
      },
      'data-headroom': state.status
    }),
    [disable, state]
  );

  return {
    getWrapperProps,
    getInnerProps,
    status: state.status,
  };
};
