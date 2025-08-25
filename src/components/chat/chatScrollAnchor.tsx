"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";

interface ChatScrollAnchorProps {
  trackVisibility?: boolean;
  isAtBottom: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export function ChatScrollAnchor({
  trackVisibility,
  scrollRef,
  isAtBottom,
}: ChatScrollAnchorProps) {
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: "0px 0px -4px 0px",
  });

  React.useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    const observer = new MutationObserver(() => {
      if (isAtBottom && trackVisibility && !inView) {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }
    });

    observer.observe(scrollRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [inView, entry, isAtBottom, trackVisibility, scrollRef]);

  return <div ref={ref} className="h-px w-full pb-12" />;
}
