import { getApplications } from "./applicationService";
import { getJobs } from "./jobService";

export const getRecruitmentData = async () => {
  const [jobs, applications] = await Promise.all([getJobs(), getApplications()]);
  return {
    jobs: Array.isArray(jobs) ? jobs : [],
    applications: Array.isArray(applications) ? applications : [],
  };
};
