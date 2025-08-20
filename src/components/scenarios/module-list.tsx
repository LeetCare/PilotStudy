/**
 * @fileoverview Module List Component for Learning Modules
 *
 * This file contains the ModuleList component that displays learning modules
 * organized by category with progress tracking and individual module cards.
 *
 * @author LeetCare Development Team
 */

import { cn } from "@/lib/utils";
import ModuleCategory, { ModuleCategoryProps } from "./module-category";

// Interface for the main component props
export interface ModuleListProps {
  /** Array of module categories */
  categories: ModuleCategoryProps[];
  /** Additional CSS classes for custom styling */
  className?: string;
}

/**
 * Module List Component
 *
 * Main component that displays all module categories and their modules.
 * Each category shows progress and contains clickable module cards.
 *
 * @example
 * ```tsx
 * <ModuleList
 *   categories={[
 *     {
 *       title: "Fundamentals",
 *       progress: 25,
 *       modules: [
 *         { title: "Agenda Setting", onClick: () => {} },
 *         { title: "Empathy Statements", onClick: () => {} },
 *         { title: "Review", onClick: () => {} }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */
export default function ModuleList({ categories, className }: ModuleListProps) {
  return (
    <div className={cn("size-full space-y-8 overflow-y-auto p-6", className)}>
      <h1 className="mb-8 text-5xl font-bold text-black">Modules</h1>

      <div className="w-full max-w-6xl space-y-8">
        {categories.map((category, index) => (
          <ModuleCategory
            key={index}
            title={category.title}
            progress={category.progress}
            modules={category.modules}
          />
        ))}
      </div>
    </div>
  );
}
