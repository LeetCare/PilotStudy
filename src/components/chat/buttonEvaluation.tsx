/**
 * @fileoverview Evaluation Button Component for Scenario Assessment
 *
 * This file contains the evaluation button component used in medical training scenarios
 * to trigger performance assessment. This only shows up in the scenario page (type="scenario").
 * It integrates with the Vercel AI SDK and provides visual feedback during the evaluation process.
 *
 * @author LeetCare Development Team
 */

"use client";

import { Message } from "ai/react";
import { Button, ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";

interface EvaluationButtonProps extends ButtonProps {
  /** Array of chat messages to be included in the evaluation */
  messages: Message[];

  /** Function to trigger scenario evaluation with AI assessment */
  onEvaluate?: () => void;

  /** Whether the scenario has already been evaluated */
  isEvaluated?: boolean;

  /** Whether evaluation is currently in progress */
  isEvaluating: boolean;

  /** Whether the buttom should be disabled */
  disabled?: boolean;

}

/**
 * Evaluation Button Component
 *
 * Triggers performance assessment for medical training scenarios by calling the AI evaluation
 * function with chat messages and patient case data. Provides visual feedback during evaluation
 * and prevents multiple evaluations of the same scenario.
 *
 * @example
 * ```tsx
 * <EvaluationButton
 *   messages={chatMessages}
 *   evaluate={evaluateScenario}
 *   isEvaluated={false}
 *   isEvaluating={false}
 *   patientCase={currentCase}
 * />
 * ```
 *
 * @see {@link https://ui.shadcn.com/docs/components/button} For button component documentation
 * @see {@link https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-completion} For AI SDK completion usage
 */
export default function EvaluationButton({
  onEvaluate,
  isEvaluated,
  isEvaluating,
  disabled,
  ...props
}: EvaluationButtonProps) {
  /*
   * Handles evaluation button click by calling the evaluate function with patient case data.
   */
  async function onClick() {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to evaluate? This action can only be done once."
      );

      if (!userConfirmed) {
        // If the user cancels, stop the evaluation process
        return;
      }

      onEvaluate?.();

      // await evaluate?.("prompt", {
      //   body: { messages },
      // });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      {...props}
      onClick={onClick}
      variant="outline"
      disabled={isEvaluated || isEvaluating || disabled}
      className="text-lg transition-color"
    >
      {isEvaluated ? (
        "Evaluated"
      ) : isEvaluating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        "Evaluate"
      )}
    </Button>
  );
}


                    
