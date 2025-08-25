import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import { PromptForm } from "./promptForm";
import { MemoizedReactMarkdown } from "../markdown/markdown";
import { Card } from "../ui/card";

interface ChatInstructionsProps {
  description: string;
  setBegun?: (begun: boolean) => void;
  buttonText?: string;
  showButton?: boolean;
  onEvaluate?: () => void;
}

export default function ChatInstructions({
  description,
  setBegun,
  buttonText = "Start",
  showButton = true,
  onEvaluate,
}: ChatInstructionsProps) {
  const handleButtonClick = () => {
    if (setBegun) {
      setBegun(true);
    }
  };

  return (
    <div className="flex h-full max-h-full flex-col">
      <div className="mx-auto min-h-0 w-full max-w-4xl flex-1 px-8 md:px-12 lg:px-16">
        <Card className="flex size-full max-h-[calc(100dvh-20rem)] flex-col items-end gap-2 overflow-y-auto rounded-lg p-4">
          <div className="flex h-fit w-full flex-col items-end gap-2">
            <MemoizedReactMarkdown
              className="prose dark:prose-invert prose-p:leading-relaxed size-full min-h-[calc(100dvh-25rem)] break-words"
              remarkPlugins={[remarkGfm]}
            >
              {description}
            </MemoizedReactMarkdown>
            {showButton && (
              <Button onClick={handleButtonClick}>{buttonText}</Button>
            )}
          </div>
        </Card>
      </div>
      <div className="w-full max-w-4xl pt-6 pr-6 pl-4 mb-8 shrink-0">
        <PromptForm
          type="scenario"
          disabled={true}
          onSubmit={async () => {}}
          input=""
          setInput={() => {}}
          status="ready"
          placeholder="Write a message"
          onEvaluate={onEvaluate}
          messages={[]}
        />
      </div>
    </div>
  );
}
