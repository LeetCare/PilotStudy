import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import { MemoizedReactMarkdown } from "../markdown/markdown";
import { Card } from "../ui/card";

interface ChatInstructionsProps {
  description: string;
  setBegun?: (begun: boolean) => void;
}

export default function ChatInstructions({
  description,
  setBegun,
}: ChatInstructionsProps) {
  const handleButtonClick = () => {
    if (setBegun) {
      setBegun(true);
    }
  };

  return (
    <div className="flex h-full max-h-full flex-col">
      <div className="mx-auto min-h-0 w-full max-w-4xl flex-1 px-8 md:px-12 lg:px-16">
        <Card className="flex size-full max-h-[calc(100dvh-10rem)] flex-col items-end gap-2 overflow-y-auto rounded-lg p-4">
          <div className="flex h-fit w-full flex-col items-end gap-2">
            <MemoizedReactMarkdown
              className="prose dark:prose-invert prose-p:leading-relaxed prose-table:my-0 prose-th:border prose-th:border-neutral-300 prose-th:p-4 prose-th:text-center prose-td:border prose-td:border-neutral-300 prose-td:p-4 prose-td:py-4 prose-table:table-fixed size-full min-h-[calc(100dvh-25rem)] break-words"
              remarkPlugins={[remarkGfm]}
            >
              {description}
            </MemoizedReactMarkdown>
            <Button onClick={handleButtonClick}>Start</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
