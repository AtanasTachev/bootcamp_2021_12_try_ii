const express = require('express');
const router = express.Router({ mergeParams: true });

const interviewService = require('../services/interviewService');

/**
 * @swagger
 * /candidates/{candidateId}/interviews:
 *   get:
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         description: id of the candidate wich interview you want to get.
 *         schema:
 *           type: string
 *     summary: Get the interview of a particular candidate (each candidate can only have one interview).
 *     tags: 
 *       - candidates
 *     responses:
 *       200:
 *         description: A the interview of a particular candidate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/jobInterviewsList'
*/
const getCandidateInterviews = async (req, res, next) => {
    try {
        const candidateId = req.params.candidateId;
        const candidateInterviews = await interviewService.getCandidateInterviews(candidateId);
        res.send(candidateInterviews);
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

router.get('/', getCandidateInterviews);

module.exports = router;
