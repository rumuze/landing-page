import React, { useEffect, useRef, useState } from "react";

/**
 * Loads a heavy visual only when it is about to scroll into view. The wrapper has the
 * visual's final size from the start (set by `className`), so nothing moves when it
 * arrives, and the server-rendered page and the first client render are identical.
 * `load` is a dynamic import returning the component as its default export.
 */
const Deferred = ({ load, props, className = "" }) => {
  const ref = useRef(null);
  const [Visual, setVisual] = useState(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let cancelled = false;
    let observer = null;

    const fetchVisual = () => {
      load()
        .then((module) => {
          if (!cancelled) setVisual(() => module.default);
        })
        .catch(() => {
          // The visual is decoration; a failed chunk leaves the empty box in place.
        });
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          fetchVisual();
        },
        { rootMargin: "600px 0px" },
      );
      observer.observe(node);
    } else {
      fetchVisual();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
    // `load` is a constant import() for each use; it must not restart the observer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className}>
      {Visual ? <Visual {...props} /> : null}
    </div>
  );
};

export default Deferred;
