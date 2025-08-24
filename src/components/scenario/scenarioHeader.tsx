/**
 * @fileoverview Scenario Header Component
 *
 * This file contains the Scenario Header component that displays the patient
 * name and scenario timer for medical training scenarios on the scenario page.
 *
 * @author LeetCare Development Team
 */

import ScenarioTimer from "@/components/scenario/scenarioTimer";

interface ScenarioHeaderProps {
  /** Patient name to display in the header */
  title: string;

  /** Whether the scenario has begun */
  begun: boolean;
}

/**
 * Scenario Header Component
 *
 * Header display for medical training scenarios showing patient name and
 * interactive timer.
 *
 * @example
 * ```tsx
 * <ChatHeader patientName="John Doe" />
 * ```
 */
export default function ScenarioHeader({
  begun,
  title: patientName,
}: ScenarioHeaderProps) {
  return (
    <div className="flex w-full max-w-4xl items-center justify-between gap-5 p-6 pr-16 md:px-12 md:pr-16 lg:pr-12">
      <p className="truncate text-2xl font-bold leading-loose md:text-4xl">
        {patientName}
      </p>
      <ScenarioTimer begun={begun} />
    </div>
  );
}
