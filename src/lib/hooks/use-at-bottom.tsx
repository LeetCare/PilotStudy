/**
 * @fileoverview Scroll position detection for bottom of container
 *
 * This file provides a custom hook for detecting when a scrollable element
 * is scrolled to the bottom. It is meant to allow the chat to scroll to the
 * bottom when a new message is added to the message list (chat component).
 *
 * @author LeetCare Development Team
 */
import { useEffect, useState, useCallback } from "react";

/**
 * Custom hook for detecting scroll position at bottom of container.
 *
 * Monitors scroll position and provides both state tracking and scroll control.
 * Handles responsive layout changes by listening to window resize events. Takes
 * in a ref to the scrollable element and an optional offset to determine when
 * the bottom is reached.
 *
 * @example
 * ```tsx
 * function ChatWindow() {
 *   const messagesRef = useRef<HTMLDivElement>(null);
 *   const { isAtBottom, scrollToBottom } = useAtBottom(messagesRef, 50);
 *
 *   useEffect(() => {
 *     if (newMessage && isAtBottom) {
 *       scrollToBottom();
 *     }
 *   }, [newMessage, isAtBottom, scrollToBottom]);
 *
 *   return (
 *     <div ref={messagesRef}>
 *       {messages.map(msg => <div key={msg.id}>{msg.text}</div>)}
 *     </div>
 *   );
 * }
 * ```
 *
 * @notes
 * - Uses debounced resize listeners for performance optimization
 * - Automatically handles responsive layout changes
 * - Provides both state tracking and imperative scroll control
 */
export function useAtBottom(ref: React.RefObject<HTMLElement>, offset = 50) {
  const [isAtBottom, setIsAtBottom] = useState(false);

  /*
   * Scrolls the element to the bottom with smooth animation.
   * Uses native scrollTo API for optimal performance.
   */
  const scrollToBottom = () => {
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  /*
   * Checks if the current scroll position is at the bottom within the offset threshold.
   * Compares scroll position against element dimensions to determine bottom state.
   */
  const checkIsAtBottom = useCallback(() => {
    if (ref?.current) {
      const { scrollHeight, scrollTop, clientHeight } = ref.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - offset);
    }
  }, [ref, offset]);

  /*
   * Debounces function calls to limit execution frequency during rapid events.
   * Used specifically for resize events to prevent excessive recalculations.
   */
  const debounce = (fn: Function, ms = 100) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), ms);
    };
  };

  // Create debounced version of the check function
  const debouncedCheck = useCallback(
    debounce(() => checkIsAtBottom(), 100),
    [checkIsAtBottom],
  );

  useEffect(() => {
    const scrollRef = ref.current;

    // Check on scroll
    const handleScroll = () => checkIsAtBottom();

    // Check on resize - this is key for responsive layouts
    const handleResize = () => debouncedCheck();

    // Initial check
    checkIsAtBottom();

    // Add event listeners
    if (scrollRef) {
      scrollRef.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Add window resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up event listeners
      if (scrollRef) {
        scrollRef.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, checkIsAtBottom, debouncedCheck]);

  return { isAtBottom, scrollToBottom };
}
