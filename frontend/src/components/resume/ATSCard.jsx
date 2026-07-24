import { Award, TrendingUp } from "lucide-react";
import { Panel } from "@/components/recruitment/EnterpriseUi";

export default function ATSCard({ score = 0 }) {
  const getStatus = () => {
    if (score >= 85)
      return {
        label: "Excellent",
        color: "text-emerald-400",
      };

    if (score >= 70)
      return {
        label: "Good",
        color: "text-cyan-400",
      };

    if (score >= 50)
      return {
        label: "Average",
        color: "text-yellow-400",
      };

    return {
      label: "Needs Improvement",
      color: "text-red-400",
    };
  };

  const status = getStatus();

  return (
    <Panel className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">ATS Score</p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {score}%
          </h2>

          <p className={`mt-2 text-sm font-medium ${status.color}`}>
            {status.label}
          </p>
        </div>

        <div className="rounded-xl bg-cyan-400/10 p-4 text-cyan-300">
          <Award size={28} />
        </div>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all duration-700"
          style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
        />
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
        <TrendingUp size={16} />
        ATS compatibility based on AI resume analysis.
      </div>
    </Panel>
  );
}