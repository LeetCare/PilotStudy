/**
 * @fileoverview Module Category Component for Grouping Learning Modules
 *
 * This file contains the ModuleCategory component that displays a group of modules
 * organized under a category with progress tracking.
 *
 * @author LeetCare Development Team
 */

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import ScenarioCard, { ScenarioCardProps } from "./scenario-card";

// Interface for module category props
export interface ModuleCategoryProps {
  /** Category title (e.g., "Fundamentals") */
  title: string;
  /** Progress percentage (0-100) */
  progress: number;
  /** Array of modules in this category */
  modules: ScenarioCardProps[];
  /** Additional CSS classes for custom styling */
  className?: string;
}

/**
 * Module Category Component
 *
 * Displays a category of modules with progress tracking. Each category contains
 * a title, progress bar, and a grid of module cards.
 *
 * @example
 * ```tsx
 * <ModuleCategory
 *   title="Fundamentals"
 *   progress={25}
 *   modules={[
 *     { title: "Agenda Setting", onClick: () => {} },
 *     { title: "Empathy Statements", onClick: () => {} }
 *   ]}
 * />
 * ```
 *
 * @see {@link https://ui.shadcn.com/docs/utilities/cn} For className utility documentation
 */
export default function ModuleCategory({
  title,
  progress,
  modules,
  className,
}: ModuleCategoryProps) {
  return (
    <div
      className={cn("w-full rounded-2xl bg-neutral-200 p-4 md:p-8", className)}
    >
      <div className="mb-6 flex w-full flex-col items-center gap-4 md:flex-row md:gap-12">
        <h2 className="text-4xl font-bold text-black">{title}</h2>
        <div className="flex w-full flex-1 items-center gap-6">
          <Progress value={progress} className="flex-1" />
          <span className="whitespace-nowrap text-lg font-medium text-neutral-600">
            {progress}%
          </span>
        </div>
      </div>

      <div className="flex w-full gap-6 overflow-x-scroll rounded-lg pb-2">
        {modules.map((module, index) => (
          <ScenarioCard
            key={index}
            image={null}
            title={module.title}
            onClick={module.onClick}
            className={module.className}
          />
        ))}
      </div>
    </div>
  );
}
