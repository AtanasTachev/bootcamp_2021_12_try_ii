const express = require('express');
const router = express.Router({ mergeParams: true });

const interviewService = require('../services/interviewService');

/**
 * @swagger
 * /interviews:
 *   get:
 *     summary: Get all interviews.
 *     tags: 
 *       - interviews
 *     parameters:
 *       - in: query
 *         type: string
 *         name: jobId
 *         required: false
 *         description: You can filter interviews by jobId or any/many other properties
 *     responses:
 *       200:
 *         description: A list of all interviews
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/jobInterviewsList'
*/
const getAllInterviews = async (req, res, next) => {
    try {
        const filter = req.query;
        const interviews = await interviewService.getAllInterviews(filter);
        res.send(interviews);
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

/**
 * @swagger
 * /interviews/{interviewId}:
 *   get:
 *     summary: Get an interview by id.
 *     description: Get a detailed interview by id.
 *     tags: 
 *       - interviews
 *     parameters:
 *       - in: path
 *         name: interviewId
 *         required: true
 *         description: id of the interview you want to get.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An interview object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/interview'
*/
const getInterview = async (req, res, next) => {
    try {
        const interviewId = req.params.interviewId;
        const interview = await interviewService.getInterview(interviewId);
        res.send(interview);
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

/**
 * @swagger
 * /interviews:
 *   post:
 *     summary: Create a new interview.
 *     tags: 
 *       - interviews
 *     requestBody:
 *       description: Provide at least jobId, candidateId and slot (integer in range 1 - 5)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               jobId:
 *                 type: string
 *                 description: The id of the job to wich the interview belongs
 *                 example: 6103d82bc0d3252c5ca39b39
 *               candidateId:
 *                 type: string
 *                 description: The id of the candidate to be interviewed
 *                 example: 6125e4d6540035643aae2fa2
 *               slot:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: The slot of the interview, integer in range 1 - 5
 *                 example: 2
 *     responses:
 *       200:
 *         description: The id of the created interview
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The id of the created interview
 *                   example: '612769b1b458f55096280b3c'
*/
const createInterview = async (req, res, next) => {
    try {
        const interviewData = req.body;
        const { insertedId } = await interviewService.createInterview(interviewData);
        res.send({ _id: insertedId });
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

/**
 * @swagger
 * /interviews/{interviewId}:
 *   put:
 *     summary: Update an existing interview.
 *     tags: 
 *       - interviews
 *     parameters:
 *       - in: path
 *         name: interviewId
 *         required: true
 *         description: id of the interview you want to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Provide the properties of the updated interview
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/interviewUpdate'
 *     responses:
 *       200:
 *         description: The updated interview object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/interview'
*/
const updateInterview = async (req, res, next) => {
    try {
        const interviewId = req.params.interviewId;
        const interviewData = req.body;
        const updatedData = await interviewService.updateInterview(interviewId, interviewData);
        res.send(updatedData);
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

/**
 * @swagger
 * /interviews/{interviewId}:
 *   delete:
 *     summary: Delete an existing interview.
 *     tags: 
 *       - interviews
 *     parameters:
 *       - in: path
 *         name: interviewId
 *         required: true
 *         description: id of the interview you want to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The interview was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
*/

const deleteInterview = async (req, res, next) => {
    try {
        const interviewId = req.params.interviewId;
        await interviewService.deleteInterview(interviewId);
        res.send({ ok: true });
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

router.get('/', getAllInterviews);
router.post('/', createInterview);

router.get('/:interviewId', getInterview);
router.put('/:interviewId', updateInterview);
router.delete('/:interviewId', deleteInterview);

module.exports = router;
