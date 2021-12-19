const express = require('express');
const router = express.Router({ mergeParams: true });

const jobInterviewsController = require('./jobInterviewsController');
const jobCandidatesController = require('./jobCandidatesController');

const jobService = require('../services/jobService');

/**
 * @swagger
 * /jobs:
 *  get:
 *   summary: Retrieve a list of all job opportunities
 *   description: Retrieve a list of all job opportunities
 *   tags:
 *     - jobs
 *   responses:
 *     200:
 *       description: A list of jobs.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/jobs'
*/
router.get('/', async (req, res, next) => {
    try {
        const jobs = await jobService.getAllJobs();
        res.send(jobs);
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
});

/**
 * @swagger
 * /jobs/{jobId}:
 *   get:
 *     summary: Retrieve a single job opportunity.
 *     description: Retrieve a single job opportunity with candidates populated.
 *     tags:
 *       - jobs
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: id of the job to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single detailed job with populated users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/detailedJob'
 * 
*/
router.get('/:jobId', async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const job = await jobService.getJob(jobId);
        res.send(job);
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
});

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a job opportunity.
 *     tags: 
 *       - jobs
 *     requestBody:
 *       description: Provide *title* and *description* of the job in order to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createJob'
 *     responses:
 *       200:
 *         description: Job was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The id of the created job opportunity
 *                   example: '612743f652744510f5072b11'
*/
router.post('/', async (req, res, next) => {
    try {
        const jobEntry = req.body;
        const { insertedId } = await jobService.createJob(jobEntry);
        res.send({ _id: insertedId });
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
});

/**
 * @swagger
 * /jobs/{jobId}:
 *   put:
 *     summary: Update a job opportunity.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: id of the job to update.
 *         schema:
 *           type: string
 *     tags: 
 *       - jobs
 *     requestBody:
 *       description: Provide new / changed properties to update the job opportunity
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateJob'
 *     responses:
 *       200:
 *         description: Job was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   descirption: The id of the updated job opportunity
 *                   example: '612743f652744510f5072b11'
 *                 title:
 *                   type: string
 *                   description: The title of the updated job opportunity
 *                   example: 'Senior JS Developer'
 *                 description:
 *                   type: string
 *                   description: The description of the updated job opportunity
 *                   example: 'We are looking for ...'
*/
const updateJob = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const jobEntry = req.body;
        const updatedJob = await jobService.updateJob(jobId, jobEntry);
        res.send(updatedJob);
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

/**
 * @swagger
 * /jobs/{jobId}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: Id of the job to be deleted.
 *         schema:
 *           type: string
 *     summary: Delete a job opportunity.
 *     tags: 
 *       - jobs
 *     responses:
 *       200:
 *         description: Job was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
*/
const deleteJob = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        await jobService.deleteJob(jobId);
        res.send({ ok: true });
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

router.put('/:jobId', updateJob);
router.delete('/:jobId', deleteJob);

router.use('/:jobId/interviews', jobInterviewsController);
router.use('/:jobId/candidates', jobCandidatesController);

module.exports = router;
