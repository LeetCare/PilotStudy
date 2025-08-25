import React, { FC, memo, ReactNode, HTMLAttributes } from "react";
import ReactMarkdown, { Options as ReactMarkdownOptions } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MemoizedReactMarkdownProps extends ReactMarkdownOptions {
  children: string;
  className?: string;
}

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
