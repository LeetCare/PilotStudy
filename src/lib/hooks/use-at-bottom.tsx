import { useEffect, useState, useCallback } from "react";

export function useAtBottom(ref: React.RefObject<HTMLElement>, offset = 50) {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollToBottom = () => {
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  const checkIsAtBottom = useCallback(() => {
    if (ref?.current) {
      const { scrollHeight, scrollTop, clientHeight } = ref.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - offset);
    }
  }, [ref, offset]);

  const debounce = (fn: () => void, ms = 100) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(), ms);
    };
  };

  const debouncedCheck = useCallback(() => {
    const debouncedFn = debounce(() => checkIsAtBottom(), 100);
    return debouncedFn();
  }, [checkIsAtBottom]);

  useEffect(() => {
    const scrollRef = ref.current;

    const handleScroll = () => checkIsAtBottom();

    const handleResize = () => debouncedCheck();

    checkIsAtBottom();
    if (scrollRef) {
      scrollRef.addEventListener("scroll", handleScroll, { passive: true });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollRef) {
        scrollRef.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, checkIsAtBottom, debouncedCheck]);

  return { isAtBottom, scrollToBottom };
}
