import { useState } from "react";
import { Sparkles } from "lucide-react";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  PageHeader,
  Panel,
} from "@/components/recruitment/EnterpriseUi";

import UploadZone from "@/components/resume/UploadZone";
import ATSCard from "@/components/resume/ATSCard";
import SkillsCard from "@/components/resume/SkillsCard";
import RecommendationCard from "@/components/resume/RecommendationCard";

import { getResumeAnalysis } from "@/services/resumeService";

export default function ResumeAi() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUploadSuccess = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getResumeAnalysis();
      setAnalysis(result);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to analyze uploaded resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="AI-assisted hiring"
        title="Resume AI"
        subtitle="Upload a resume and review AI-generated insights."
      />

      <div className="mt-7 grid gap-6 xl:grid-cols-[0.9fr_1.4fr]">
        <UploadZone onUploadSuccess={handleUploadSuccess} />

        <div className="space-y-6">
          {loading && (
            <Panel className="p-6" role="status" aria-live="polite">
              <div className="flex items-center gap-3"><Sparkles className="animate-pulse text-cyan-300" size={20} /><div><p className="font-medium text-slate-200">Analyzing resume</p><p className="mt-1 text-sm text-slate-400">Extracting skills and calculating ATS compatibility.</p></div></div>
            </Panel>
          )}

          {error && (
            <Panel className="border border-red-500/20 p-6" role="alert">
              <p className="font-medium text-red-300">Analysis unavailable</p><p className="mt-1 text-sm text-slate-400">{error}</p>
            </Panel>
          )}

          {!loading && analysis && (
            <>
              <ATSCard score={analysis.ats_score ?? analysis.score ?? 0} />

            <SkillsCard
                skills={analysis?.detected_skills ?? []}
            />

              <RecommendationCard
                recommendations={analysis.recommendations ?? []}
              />
            </>
          )}

          {!loading && !analysis && !error && (
            <Panel className="p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="text-violet-300" size={18} />
                <h2 className="font-semibold text-white">
                  Resume Analysis
                </h2>
              </div>

              <p className="mt-3 text-sm text-slate-400">
                Upload a resume to generate ATS score, detected skills
                and AI recommendations.
              </p>
            </Panel>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
