import ScenarioTimer from "@/components/scenario/scenarioTimer";

interface ScenarioHeaderProps {
  title: string;
  begun: boolean;
}

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
