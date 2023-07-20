import { type RefObject, useEffect, useRef, useState } from "react";

interface useNearScreenProps {
  distance?: number;
  once?: boolean;
  externalRef: RefObject<Element> | null;
}

export default function useNearScreen({
  distance = 100,
  once = true,
  externalRef,
}: useNearScreenProps) {
  const [isNearScreen, setIsNearScreen] = useState<boolean>(false);
  const fromRef = useRef<Element>(null);

  useEffect(() => {
    let observer: IntersectionObserver;

    const element = externalRef ? externalRef.current : fromRef.current;

    const onChange: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      observer
    ) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setIsNearScreen(true);
        once && observer.disconnect();
      } else {
        !once && setIsNearScreen(false);
      }
    };

    Promise.resolve(
      typeof IntersectionObserver !== "undefined"
        ? IntersectionObserver
        : import("intersection-observer")
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: `${distance}px`,
      });

      if (element) observer.observe(element);
    });
    return () => observer && observer.disconnect();
  });

  return { isNearScreen, fromRef };
}
