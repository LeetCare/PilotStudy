/**
 * @fileoverview Patient Information Panel for Scenarios
 *
 * This file contains the PatientPanel component that displays detailed patient
 * information for medical training scenarios on right side of the scenario page.
 * Renders markdown content with patient summary and case details.
 *
 * @author LeetCare Development Team
 */

import {
    dataComponents,
    MemoizedReactMarkdown,
  } from "@/components/markdown/markdown";
  
  interface PatientPanelProps {
    /** Patient medical information containing a markdown string for display */
    patientInfo: string;
  }
  
  /**
   * Patient Information Panel Component
   *
   * Displays patient summary and case information using markdown rendering.
   * Provides structured display of patient data for medical training scenarios.
   *
   * @example
   * ```tsx
   * <PatientPanel patientCase={caseData} />
   * ```
   *
   * @see {@link https://github.com/remarkjs/remark-gfm} For GitHub Flavored Markdown support
   */
  export default function PatientPanel({ patientInfo }: PatientPanelProps) {
    return (
      <div className="flex size-full flex-col gap-12 overflow-auto border border-neutral-200 bg-white p-6">
        {/* Patient Summary */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Patient Summary</h1>
          <MemoizedReactMarkdown
            className="prose dark:prose-invert prose-headings:mb-6 prose-headings:mt-12 prose-h1:mb-8 prose-h1:mt-16 first:prose-h1:mt-0 prose-p:leading-relaxed prose-table:w-full prose-table:table-fixed prose-table:border prose-th:border prose-th:p-4 prose-th:text-center prose-th:font-semibold prose-td:border prose-td:p-4 max-w-none break-words"
            components={dataComponents}
          >
            {patientInfo}
          </MemoizedReactMarkdown>
        </div>
      </div>
    );
  }
  