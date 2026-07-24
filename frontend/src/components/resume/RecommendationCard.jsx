import { Lightbulb } from "lucide-react";
import { Panel } from "@/components/recruitment/EnterpriseUi";

export default function RecommendationCard({ recommendations = [] }) {
  return (
    <Panel className="p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-amber-400/10 p-3 text-amber-300">
          <Lightbulb size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            AI Recommendations
          </h2>

          <p className="text-sm text-slate-400">
            Suggestions generated to improve the resume.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {recommendations.length > 0 ? (
          recommendations.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-700 bg-slate-900/50 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-amber-400" />

                <p className="text-sm leading-6 text-slate-300">
                  {item}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No recommendations available.
          </p>
        )}
      </div>
    </Panel>
  );
}