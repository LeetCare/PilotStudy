/**
 * @fileoverview Chat Scroll Anchor Component for Auto-Scroll Behavior
 *
 * This file contains the scroll anchor component that manages automatic scrolling behavior
 * in chat interfaces. It uses the Intersection Observer API to track message visibility
 * and ensures the chat stays at the bottom during streaming responses.
 *
 * @author LeetCare Development Team
 */

"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";

interface ChatScrollAnchorProps {
  /** Whether to track the visibility of the anchor element for auto-scroll functionality */
  trackVisibility?: boolean;

  /** Whether the user is currently at the bottom of the chat */
  isAtBottom: boolean;

  /** Reference to the scrollable chat container element */
  scrollRef: React.RefObject<HTMLDivElement>;
}

/**
 * Chat Scroll Anchor Component
 *
 * Manages automatic scrolling behavior in chat interfaces by tracking the visibility
 * of an anchor element at the bottom of the chat. Uses Intersection Observer and
 * MutationObserver to maintain scroll position during streaming AI responses.
 *
 * @example
 * ```tsx
 * <ChatScrollAnchor
 *   trackVisibility={status === "streaming"}
 *   isAtBottom={isAtBottom}
 *   scrollRef={chatContainerRef}
 * />
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API} For Intersection Observer documentation
 * @see {@link https://github.com/vercel/ai-chatbot/blob/main/components/chat-scroll-anchor.tsx} For original implementation reference
 *
 * @todo figure out how to make the scrolling animation smoother
 */
export function ChatScrollAnchor({
  trackVisibility,
  scrollRef,
  isAtBottom,
}: ChatScrollAnchorProps) {
  // track the visibility of the bottom of the chat using the `useInView` hook
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: "0px 0px -4px 0px",
  });

  /*
   * Observes DOM changes and automatically scrolls to bottom when content updates
   * if user is at bottom and tracking is enabled.
   */
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

    // need to track changes in text (characterData) to detect when the AI sends a new character
    observer.observe(scrollRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Needed to cleanup observer on unmount
    return () => observer.disconnect();
  }, [inView, entry, isAtBottom, trackVisibility, scrollRef]);

  return <div ref={ref} className="h-px w-full pb-12" />;
}
