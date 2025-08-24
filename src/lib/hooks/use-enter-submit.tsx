/**
 * @fileoverview Form submission via Enter key with Shift+Enter for new lines
 *
 * This file provides a custom hook for handling keyboard-based form submission
 * for the prompt form (chat component). It enables Enter key submission while
 * preserving Shift+Enter for new line creation in textarea elements.
 *
 * @author LeetCare Development Team
 */
import { useRef, type RefObject } from "react";

/**
 * Custom hook for handling Enter key form submission with textarea support.
 *
 * Provides keyboard shortcuts for form submission while maintaining standard
 * textarea behavior. Enter alone submits the form, while Shift+Enter creates
 * a new line.
 *
 * @example
 * ```tsx
 * function ChatForm() {
 *   const { formRef, onKeyDown } = useEnterSubmit();
 *   const [message, setMessage] = useState('');
 *
 *   const handleSubmit = (e: FormEvent) => {
 *     e.preventDefault();
 *     console.log('Submitting:', message);
 *     setMessage('');
 *   };
 *
 *   return (
 *     <form ref={formRef} onSubmit={handleSubmit}>
 *       <textarea
 *         value={message}
 *         onChange={(e) => setMessage(e.target.value)}
 *         onKeyDown={onKeyDown}
 *         placeholder="Type your message..."
 *       />
 *       <button type="submit">Send</button>
 *     </form>
 *   );
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit} For requestSubmit documentation
 */
export function useEnterSubmit(): {
  /** React ref to attach to the form element */
  formRef: RefObject<HTMLFormElement>;

  /** Keyboard event handler for textarea elements */
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
} {
  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef.current?.requestSubmit();
      event.preventDefault();
    }
  };

  return { formRef, onKeyDown: handleKeyDown };
}
