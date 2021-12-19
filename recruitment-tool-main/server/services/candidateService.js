const candidatesData = require('../data/candidatesData');
const jobsData = require('../data/jobsData');

const getAllCandidates = () => candidatesData.getAllCandidates();
const createCandidate = (candidateData) => candidatesData.createCandidate(candidateData);
const getCandidateById = (candidateId) => candidatesData.getCandidateById(candidateId);
const updateCandidate = (candidateId, candidateData) => candidatesData.updateCandidate(candidateId, candidateData);
const deleteCandidate = async (candidateId) => {
    await candidatesData.deleteCandidate(candidateId);
    await jobsData.removeCandidateFromJob(candidateId);
};

module.exports = {
    getAllCandidates,
    createCandidate,
    getCandidateById,
    updateCandidate,
    deleteCandidate,
};
