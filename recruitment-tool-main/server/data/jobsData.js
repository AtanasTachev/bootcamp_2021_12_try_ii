const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

const getAllJobs = () => getDb().collection('jobs').find().project({candidates: 0}).toArray();

const getJob = (jobId) => getDb().collection('jobs')
    .aggregate([
        {
            $match: {
                _id: ObjectId(jobId)
            }
        },
        {
            $lookup: {      
                'from': 'candidates', 
                'localField': 'candidates', 
                'foreignField': '_id', 
                'as': 'candidates'
            }
        }
    ])
    .toArray();

const createJob = (jobData) => getDb().collection('jobs').insertOne({ ...jobData, candidates: [] });

const updateJob = async (jobId, {candidates, ...jobData}) => {
    const result = await getDb()
        .collection('jobs')
        .findOneAndUpdate(
            { _id: ObjectId(jobId) },
            { $set: jobData },
            { 
                returnDocument: 'after',
                projection: {
                    candidates: 0,
                }
            }
    );

    return result.value;
};
const deleteJob = (jobId) => getDb().collection('jobs').deleteOne({ _id: ObjectId(jobId) });

const getJobCandidates = async (jobId) => {
    const result = await getDb().collection('jobs').aggregate([
        { $match: { _id: ObjectId(jobId) } },
        {
            $lookup: {
                from: 'candidates',
                localField: 'candidates',
                foreignField: '_id',
                as: 'candidates'
            }
        },
        { $unwind: '$candidates' },
        {
            $group: {
                _id: '$_id',
                candidates: { '$push': '$candidates' },
            }
        }
    ]).toArray();

    return result.length ? result[0].candidates : [];
};
const addCandidateToJob = (jobId, candidateId) => getDb().collection('jobs').updateOne({ _id: ObjectId(jobId) }, { $push: { 'candidates': ObjectId(candidateId) } });
const removeCandidateFromJob = (jobId, candidateId) => getDb().collection('jobs').updateOne({ _id: ObjectId(jobId) }, { $pull: { 'candidates': ObjectId(candidateId) } });

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
