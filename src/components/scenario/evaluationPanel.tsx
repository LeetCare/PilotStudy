/**
 * @fileoverview Evaluation Panel Component for Scenario Assessment
 *
 * This file contains the EvaluationTab component that displays AI-generated
 * evaluation results for medical training scenarios on the scenario page.
 * Shows rubric scores, feedback, and overall performance summary on right side.
 *
 * @author LeetCare Development Team
 */

import { DeepPartial } from "ai";
import { EvaluationSchema } from "@/lib/validation/evaluation";
import { Loader2 } from "lucide-react";

interface EvaluationTabProps {
  /** AI-generated evaluation data containing scores and feedback */
  evaluation: DeepPartial<EvaluationSchema> | undefined;
}

/**
 * Evaluation Panel Component
 *
 * Displays structured evaluation results with section-wise scoring and feedback.
 * Shows loading state during evaluation and renders detailed performance
 * breakdown with overall summary.
 *
 * @example
 * ```tsx
 * <EvaluationTab evaluation={evaluationData} />
 * ```
 *
 * @see {@link https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data} For structured AI data generation
 */
export default function EvaluationTab({ evaluation }: EvaluationTabProps) {
  if (!evaluation || !evaluation.sections) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <Loader2 className="text-cobalt-700 size-12 animate-spin lg:size-32" />
        <p className="text-lg text-neutral-500">Evaluating...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-12 overflow-y-auto p-8">
      {evaluation.sections &&
        evaluation.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">{section?.title}</h2>
              <p className="text-sm text-neutral-600">{section?.description}</p>
            </div>

            <div>
              {section?.tasks &&
                section.tasks.map((task, taskIndex) => (
                  <div key={taskIndex}>
                    <div className="grid h-full grid-cols-4 items-center justify-center">
                      <div className="col-span-4 flex size-full flex-col items-center justify-center border border-b-0 border-neutral-200 p-4 xl:col-span-1 xl:border-b">
                        <span className="text-8xl font-bold">
                          {task?.score}
                        </span>
                        <span className="text-xs text-neutral-500">
                          out of {task?.totalPoints}
                        </span>
                      </div>

                      <div className="col-span-4 h-full space-y-2 border border-t-0 border-neutral-200 p-6 pt-2 xl:col-span-3 xl:border-t xl:border-l-0 xl:pt-6">
                        <h3 className="text-lg font-medium">{task?.title}</h3>
                        <ul className="space-y-1">
                          {task?.feedbackItems &&
                            task.feedbackItems.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Summary</h2>
        </div>
        {evaluation.overallScore && (
          <div className="grid h-full grid-cols-4 items-center justify-center">
            <div className="col-span-4 flex size-full flex-col items-center justify-center border border-b-0 border-neutral-200 p-4 xl:col-span-1 xl:border-b">
              <span className="text-8xl font-bold">
                {evaluation.overallScore}
              </span>
              <span className="text-xs text-neutral-500">
                out of {evaluation.totalPossibleScore}
              </span>
            </div>

            <div className="col-span-4 h-full space-y-2 border border-t-0 border-neutral-200 p-6 pt-2 xl:col-span-3 xl:border-t xl:border-l-0 xl:pt-6">
              <h3 className="text-lg font-medium">Takeaways</h3>
              <ul className="space-y-1">
                {evaluation.summary &&
                  evaluation.summary.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
