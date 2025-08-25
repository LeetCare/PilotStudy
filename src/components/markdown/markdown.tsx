/**
 * @fileoverview Markdown Rendering Components
 *
 * This file contains components for rendering markdown content with custom
 * styling and specialized table handling for patient case data. Includes
 * memoized React Markdown component and custom renderers.
 *
 * @author LeetCare Development Team
 */

import React, { FC, memo, ReactNode, HTMLAttributes } from "react";
import ReactMarkdown, { Options as ReactMarkdownOptions } from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Props interface for MemoizedReactMarkdown component
 */
interface MemoizedReactMarkdownProps extends ReactMarkdownOptions {
  children: string;
  className?: string;
}

/**
 * Memoized React Markdown Component
 *
 * Optimized markdown renderer with GitHub Flavored Markdown support.
 * Prevents unnecessary re-renders when content remains unchanged.
 *
 * @example
 * ```tsx
 * <MemoizedReactMarkdown className="prose">
 *   {markdownContent}
 * </MemoizedReactMarkdown>
 * ```
 *
 * @see {@link https://github.com/remarkjs/react-markdown} For react-markdown documentation
 * @see {@link https://github.com/remarkjs/remark-gfm} For GitHub Flavored Markdown support
 * @see {@link https://www.npmjs.com/package/react-markdown} For react-markdown documentation
 * @see {@link https://www.npmjs.com/package/react-markdown#options} For react-markdown options
 * @see {@link https://github.com/vercel/ai-chatbot/blob/main/components/markdown.tsx} For the original implementation
 *
 * * @notes
 * - This component is taken from the Vercel AI SDK example chat application.
 * - the MDX plugin seems to break the markdown rendering when using `<` or `>` in the case, so we'll remove it for now.
 */
export const MemoizedReactMarkdown: FC<MemoizedReactMarkdownProps> = memo(
  ({ className, children, ...props }: MemoizedReactMarkdownProps) => (
    <div className={className}>
      <ReactMarkdown
        {...props}
        remarkPlugins={[remarkGfm, ...(props.remarkPlugins || [])]}
        components={{
          ...(props.components || {}),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  ),
  (
    prevProps: MemoizedReactMarkdownProps,
    nextProps: MemoizedReactMarkdownProps
  ) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className &&
    prevProps.remarkPlugins === nextProps.remarkPlugins &&
    prevProps.components === nextProps.components
);

MemoizedReactMarkdown.displayName = "MemoizedReactMarkdown";

/**
 * Custom Markdown Components for Patient Case Rendering
 *
 * Specialized renderers for markdown elements with custom styling and
 * table logic. Includes automatic column spanning for header rows when
 * adjacent cells are empty.
 */
export const dataComponents = {
  em({ children }: { children?: ReactNode }) {
    return <em>{children}</em>;
  },
  p({ children }: { children?: ReactNode }) {
    return <p className="last:pb-0">{children}</p>;
  },
  table({ children }: { children?: ReactNode }) {
    return (
      <div className="w-full overflow-x-auto">
        <table className="w-full border border-neutral-300">{children}</table>
      </div>
    );
  },
  thead({ children }: { children?: ReactNode }) {
    return (
      <thead className="bg-neutral-50 dark:bg-neutral-900">{children}</thead>
    );
  },
  th({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLTableCellElement>) {
    return (
      <th
        className="border border-neutral-300 p-4 text-center font-semibold dark:border-neutral-700"
        {...props}
      >
        {children}
      </th>
    );
  },

  td({ children }: { children?: ReactNode }) {
    return (
      <td className="border border-neutral-300 p-4 first:p-4 last:p-4 dark:border-neutral-700">
        {children}
      </td>
    );
  },
};
