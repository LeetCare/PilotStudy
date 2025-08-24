/**
 * @fileoverview Chat Instructions Component for Scenario Initialization
 *
 * This file contains the instructions display component for interactive learning
 * scenarios with markdown-rendered descriptions and scenario start controls.
 *
 * @author LeetCare Development Team
 */

import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import { PromptForm } from "./promptForm";
import { MemoizedReactMarkdown } from "../markdown/markdown";
import { Card } from "../ui/card";
import { useState, useCallback } from "react";
import { Edit3, Save } from "lucide-react";
import { Plate, PlateEditor, usePlateEditor } from "platejs/react";
import { Value } from "platejs";
import { EditorKit } from "@/components/editor/editor-kit";
import { MarkdownPlugin, serializeMd } from "@platejs/markdown";
import { Editor, EditorContainer } from "@/components/ui/editor/editor";

interface ChatInstructionsProps {
  /** The scenario instructions to guide the student through the patient interaction */
  description: string;

  /** Handler to begin the scenario and transition to chat interface */
  setBegun?: (begun: boolean) => void;

  /** Optional: Handler for editing the description content */
  onDescriptionChange?: (description: string) => void;

  /** Optional: Whether this component is in editable mode */
  editable?: boolean;

  /** Optional: Button text override */
  buttonText?: string;

  /** Optional: Show button or not */
  showButton?: boolean;

  /** Callback for evaluation button click */
  onEvaluate?: () => void;
}

/**
 * Chat Instructions Component
 *
 * scenario instruction component that displays formatted instructions before
 * users begin the chat session. This component renders markdown and provides
 * a start button with disabled prompt form preview.
 *
 * @example
 * ```tsx
 * <ChatInstructions
 *   description="## Scenario Overview\nYou are treating a patient with..."
 *   setBegun={handleScenarioStart}
 * />
 * ```
 *
 * @see {@link https://github.com/remarkjs/remark-gfm} For GitHub Flavored Markdown support
 */
export default function ChatInstructions({
  description,
  setBegun,
  onDescriptionChange,
  editable = false,
  buttonText = "Start",
  showButton = true,
  onEvaluate,
}: ChatInstructionsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const editor = usePlateEditor({
    plugins: EditorKit,
    value: (editor) =>
      editor
        .getApi(MarkdownPlugin)
        .markdown.deserialize(
          description || "# Background\n\nClick to edit...",
        ),
  });

  const handleEditorChange = useCallback(
    ({ value, editor }: { value: Value; editor: PlateEditor }) => {
      if (onDescriptionChange) {
        try {
          const markdownContent = serializeMd(editor);
          onDescriptionChange(markdownContent);
        } catch (error) {
          console.error("Error serializing editor content:", error);
        }
      }
    },
    [onDescriptionChange],
  );

  const handleButtonClick = () => {
    if (setBegun) {
      setBegun(true);
    }
  };

  return (
    <div className="flex h-full max-h-full flex-col">
      <div className="mx-auto min-h-0 w-full max-w-4xl flex-1 px-8 md:px-12 lg:px-16">
        <Card
          className={`flex size-full max-h-[calc(100dvh-20rem)] flex-col items-end gap-2 overflow-y-auto rounded-lg p-4 ${
            editable && !isEditing
              ? "group cursor-pointer p-8 transition-all hover:bg-blue-50"
              : ""
          }`}
          onClick={
            editable && !isEditing ? () => setIsEditing(true) : undefined
          }
        >
          {editable && isEditing ? (
            <>
              <div className="min-h-0 w-full max-w-4xl flex-1">
                <Plate editor={editor} onValueChange={handleEditorChange}>
                  <EditorContainer>
                    <Editor variant="default" />
                  </EditorContainer>
                </Plate>
              </div>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                }}
                className="shrink-0"
              >
                <Save className="mr-1 h-4 w-4" />
                Done Editing
              </Button>
            </>
          ) : (
            <div className="flex h-fit w-full flex-col items-end gap-2">
              <MemoizedReactMarkdown
                className="prose dark:prose-invert prose-p:leading-relaxed size-full min-h-[calc(100dvh-25rem)] break-words"
                remarkPlugins={[remarkGfm]}
              >
                {description || "# Background\n\nClick to edit..."}
              </MemoizedReactMarkdown>
              {editable && (
                <Edit3 className="absolute top-2 right-2 h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
              {showButton && (
                <Button onClick={handleButtonClick}>{buttonText}</Button>
              )}
            </div>
          )}
        </Card>
      </div>
      <div
        className={`w-full max-w-4xl pt-6 pr-6 pl-4 ${!editable && "mb-8"} shrink-0`}
      >
        <PromptForm
          type="scenario"
          disabled={true}
          onSubmit={async () => {}}
          input=""
          setInput={null as any}
          status="ready"
          placeholder="Write a message"
          setIsVoice={null as any}
          isVoice={false}
          onEvaluate={onEvaluate}
          messages={[]}
        />
      </div>
    </div>
  );
}
