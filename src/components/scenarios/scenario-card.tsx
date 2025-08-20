/**
 * @fileoverview Scenario Card Component for Patient Modules
 *
 * This file contains the ScenarioCard component that displays individual patient
 * scenarios as clickable cards with title and background image on the scenarios
 * (list) page.
 *
 * @author LeetCare Development Team
 */

import { cn } from "@/lib/utils";
import Image from "next/image";
// Enum matching the Prisma schema
enum SkillLevel {
  PY1 = "PY1",
  PY2 = "PY2",
  PY3 = "PY3",
  PY4 = "PY4",
}

// Interface for scenario card props
export interface ScenarioCardProps {
  /** Display title for the patient scenario */
  title: string;

  /** Background image URL for the scenario card */
  image: string | null;

  /** Educational skill level for the scenario */
  skillLevel?: SkillLevel;

  /** Additional CSS classes for custom styling */
  className?: string;

  /** Click handler for scenario selection */
  onClick: () => void;
}

/**
 * Scenario Card Component
 *
 * Displays a patient scenario as a clickable card with title and background image.
 *
 * @example
 * ```tsx
 * <ScenarioCard
 *   title="Type 1 Diabetes"
 *   image="/modules/diabetes.png"
 *   onClick={() => router.push('/scenario/123')}
 * />
 * ```
 *
 * @see {@link https://ui.shadcn.com/docs/utilities/cn} For className utility documentation
 */
export default function ScenarioCard({
  title,
  image,
  onClick,
  className,
}: ScenarioCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative h-32 w-50 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-neutral-400 p-4 transition-colors hover:bg-neutral-500 md:h-44 md:w-80",
        className,
      )}
    >
      <h3 className="w-44 text-xl font-bold text-wrap">{title}</h3>
      <Image
        src={image ?? "/modules/cancer.png"}
        alt={`${title} scenario`}
        width={256}
        height={256}
        className="absolute top-4 -right-8 hidden w-56 object-contain md:block"
      />
    </div>
  );
}
