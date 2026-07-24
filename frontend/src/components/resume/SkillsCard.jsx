import { BrainCircuit } from "lucide-react";
import { Panel } from "@/components/recruitment/EnterpriseUi";

export default function SkillsCard({ skills = [] }) {
  return (
    <Panel className="p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
          <BrainCircuit size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            AI Detected Skills
          </h2>

          <p className="text-sm text-slate-400">
            Skills extracted from the uploaded resume.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No skills detected yet.
          </p>
        )}
      </div>
    </Panel>
  );
}