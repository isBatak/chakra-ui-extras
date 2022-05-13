import { useEffect } from "react";
import raf from "raf";

import { useEvent } from "./use-event";

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
    window.removeEventListener("test", null, options);
  } catch (err) {
    passiveSupported = false;
  }

  return passiveSupported;
};

interface IUseHeadromProps {
  /**
   * provide a custom 'parent' element for scroll events.
   * parent should be a function which resolves to the desired element.
   */
  parent: () => any;
  disable: boolean;
  // TODO: figure out how pin should work
  // pin: boolean;
  upTolerance: number;
  downTolerance: number;
  /**
   * callback called when header is pinned
   */
  onPin: () => void;
  onUnpin: () => void;
  onUnfix: () => void;
  pinStart: number;
  calcHeightOnResize: boolean;
}

export const useHeadroom = ({
  parent = () => window,
  disable,
  pin,
  upTolerance,
  downTolerance,
  onPin,
  onUnpin,
  onUnfix,
  pinStart,
  calcHeightOnResize
}: IUseHeadromProps) => {
  const ref = useRef<HTMLElement>(null);
  const currentScrollYRef = useRef(0);
  const lastKnownScrollYRef = useRef(0);
  const scrollTickingRef = useRef(false);
  const resizeTickingRef = useRef(false);
  const eventListenerOptionsRef = useRef(false);

  const [state, setState] = useState(() => ({
    state: "unfixed",
    translateY: 0
  }));

  const setHeightOffset = useEvent(() => {
    setState((prevState) => ({
      ...prevState,
      height: ref.current ? ref.current.offsetHeight : ""
    }));

    resizeTickingRef.current = false;
  });

  const handleScroll = useEvent(() => {
    if (!scrollTickingRef.current) {
      crollTickingRef.current = true;

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
