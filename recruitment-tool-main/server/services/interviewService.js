const interviewsData = require('../data/interviewsData');

const getAllInterviews = (filter) => {
    const mappedFilter = Object.keys(filter).reduce((acc, key) => {
        acc[key] = key === 'slot' ? Number(filter[key]) : filter[key];
        return acc;
    }, {});

    return interviewsData.getAllInterviews(mappedFilter);
}
const createInterview = (interviewData) => interviewsData.createInterview(interviewData);
const getInterview = (interviewId) => interviewsData.getInterview(interviewId);
const updateInterview = (interviewId, interviewData) => interviewsData.updateInterview(interviewId, interviewData)
const getInterviewsByJobId = (jobId) => interviewsData.getInterviewsByJobId(jobId);
const getCandidateInterviews = (candidateId) => interviewsData.getCandidateInterviews(candidateId);
const deleteInterview = (interviewId) => interviewsData.deleteInterview(interviewId);

module.exports = {
    getAllInterviews,
    createInterview,
    getInterview,
    updateInterview,
    getInterviewsByJobId,
    getCandidateInterviews,
    deleteInterview,
};
