const jobsData = require('../data/jobsData');

const getAllJobs = () => jobsData.getAllJobs();
const createJob = (jobData) => jobsData.createJob(jobData);
const getJob = (jobId) => jobsData.getJob(jobId).then(x => x[0] || []);
const updateJob = (jobId, jobData) => jobsData.updateJob(jobId, jobData);
const deleteJob = (jobId) => jobsData.deleteJob(jobId);

const getJobCandidates = (jobId) => jobsData.getJobCandidates(jobId);
const addCandidateToJob = (jobId, candidateId) => jobsData.addCandidateToJob(jobId, candidateId);
const removeCandidateFromJob = (jobId, candidateId) => jobsData.removeCandidateFromJob(jobId, candidateId);

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,
    getJobCandidates,
    addCandidateToJob,
    removeCandidateFromJob,
};
