const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

const getAllInterviews = (filter) => getDb().collection('interviews').find(filter).toArray();
const createInterview = (interviewData) => getDb().collection('interviews').insertOne({ ...interviewData, jobId: ObjectId(interviewData.jobId), candidateId: ObjectId(interviewData.candidateId) });
const getInterview = (interviewId) => getDb().collection('interviews').findOne({ _id: ObjectId(interviewId) });
const updateInterview = async (interviewId, interviewData) => {
    const result = await getDb()
        .collection('interviews')
        .findOneAndUpdate(
            { _id: ObjectId(interviewId) },
            { $set: {
                ...interviewData,
                jobId: ObjectId(interviewData.jobId),
                candidateId: ObjectId(interviewData.candidateId),
            }},
            { returnDocument: 'after' }
        );
    return result.value;
};
const getInterviewsByJobId = (jobId) => getDb().collection('interviews').find({ jobId: ObjectId(jobId) }).toArray();
const getCandidateInterviews = (candidateId) => getDb().collection('interviews').find({ candidateId: ObjectId(candidateId) }).toArray();
const deleteInterview = (interviewId) => getDb().collection('interviews').deleteOne({ _id: ObjectId(interviewId) });

module.exports = {
    getAllInterviews,
    createInterview,
    getInterview,
    updateInterview,
    getInterviewsByJobId,
    getCandidateInterviews,
    deleteInterview,
};
