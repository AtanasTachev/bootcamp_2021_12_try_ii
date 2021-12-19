const express = require('express');
const router = express.Router({ mergeParams: true });

const interviewService = require('../services/interviewService');

/**
 * @swagger
 * /jobs/{jobId}/interviews:
 *   get:
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: id of the job of wich you want to get all interviews.
 *         schema:
 *           type: string
 *     summary: Get all interviews of a particular job.
 *     tags: 
 *       - jobs
 *     responses:
 *       200:
 *         description: A list of all interviews of a particular job
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/jobInterviewsList'
*/

const getJobInterviews = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const interviews = await interviewService.getInterviewsByJobId(jobId);
        res.send(interviews);
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

router.get('/', getJobInterviews);

module.exports = router;
