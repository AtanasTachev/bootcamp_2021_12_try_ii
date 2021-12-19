const express = require('express');
const router = express.Router({ mergeParams: true });

const jobService = require('../services/jobService');

/**
 * @swagger
 * /jobs/{jobId}/candidates:
 *   get:
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: id of the job of wich you want to get all candidates.
 *         schema:
 *           type: string
 *     summary: Get all candidates of a particular job.
 *     tags: 
 *       - jobs
 *     responses:
 *       200:
 *         description: A list of all candidates of a particular job
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/jobCandidatesList'
*/
const getJobCandidates = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const candidates = await jobService.getJobCandidates(jobId);
        res.send(candidates);
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

/**
 * @swagger
 * /jobs/{jobId}/candidates:
 *   post:
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: id of the job in wich you want to add a candidate.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Provide the id of the candidate you want to add to the job
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               candidateId:
 *                 type: string
 *                 example: '6125e4d6540035643aae2fa2'
 *             description: id of the candidate
 *             
 *     summary: Add an existing candidate to a job.
 *     tags: 
 *       - jobs
 *     responses:
 *       200:
 *         description: The candidate was added to the job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
*/

const addCandidateToJob = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const candidateId = req.body.candidateId;
        await jobService.addCandidateToJob(jobId, candidateId);
        res.send({ ok: true });
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

/**
 * @swagger
 * /jobs/{jobId}/candidates/{candidateId}:
 *   delete:
 *     summary: Remove an existing candidate from a job.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: id of the job from which you want to remove the candidate.
 *         schema:
 *           type: string
 *       - in: path
 *         name: candidateId
 *         required: true
 *         description: id of the candidate to be removed from this job.
 *         schema:
 *           type: string
 *     tags: 
 *       - jobs
 *     responses:
 *       200:
 *         description: The candidate was removed from the job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
*/
const removeCandidateFromJob = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const candidateId = req.params.candidateId;
        await jobService.removeCandidateFromJob(jobId, candidateId);
        res.send({ ok: true });
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

router.get('/', getJobCandidates);
router.post('/', addCandidateToJob);
router.delete('/:candidateId', removeCandidateFromJob);

module.exports = router;
