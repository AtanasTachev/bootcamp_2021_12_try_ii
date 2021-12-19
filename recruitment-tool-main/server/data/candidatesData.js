const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

const getAllCandidates = () => getDb().collection('candidates').find().toArray();
const createCandidate = (candidateData) => getDb().collection('candidates').insertOne(candidateData);
const getCandidateById = (candidateId) => getDb().collection('candidates').findOne({ _id: ObjectId(candidateId) });
const updateCandidate = (candidateId, candidateData) => getDb().collection('candidates').updateOne({ _id: ObjectId(candidateId) }, { $set: candidateData });
const deleteCandidate = (candidateId) => getDb().collection('candidates').deleteOne({ _id: ObjectId(candidateId) });

module.exports = {
    getAllCandidates,
    createCandidate,
    getCandidateById,
    updateCandidate,
    deleteCandidate,
};
