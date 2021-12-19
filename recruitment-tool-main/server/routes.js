const express = require('express');
const router = express.Router();
const { resetDb } = require('./db');

const bodyParser = require('body-parser');

const jobsController = require('./controllers/jobsController');
const candidatesController = require('./controllers/candidatesController');
const interviewsController = require('./controllers/interviewsController');

router.get('/', (req, res) => {
    res.json({ message: 'It\'s working...' });
});

router.get('/reset-database', async (req, res) => {
    await resetDb();
    res.send({ message: 'DB has been reseted!' })
});

router.use(bodyParser.json());

router.use('/jobs', jobsController);
router.use('/interviews', interviewsController);
router.use('/candidates', candidatesController);

/**
 * @swagger
 * components:
 *   schemas:
 *     createJob:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: the name of the job
 *           example: Junior JS Developer
 *         description:
 *           type: string
 *           description: job description
 *           example: We are looking for ...
 *     updateJob:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: the name of the job
 *           example: Senior JS Developer
 *         description:
 *           type: string
 *           description: job description
 *           example: We are looking for ...
 *     job:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: id of the job
 *           example: 6103d82bc0d3252c5ca39b39
 *         title:
 *           type: string
 *           description: the name of the job
 *           example: Junior JS Developer
 *         description:
 *           type: string
 *           description: job description
 *           example: We are looking for ...
 *     detailedJob:
 *       allOf: 
 *         - $ref: '#/components/schemas/job'
 *         - type: object
 *           properties:
 *             candidates:
 *               type: array
 *               description: Array of candidates populated
 *               items:
 *                 $ref: '#/components/schemas/candidate'
 *     jobs:
 *       type: array
 *       items: 
 *         $ref: '#/components/schemas/job'
 *     jobCandidatesList:
 *       type: array
 *       items: 
 *         $ref: '#/components/schemas/candidate'
 *     candidatesList:
 *       type: array
 *       items: 
 *         $ref: '#/components/schemas/candidate'
 *     candidate:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The id of the candidate
 *           example: '6125e4d6540035643aae2fa2'
 *         firstName:
 *           type: string
 *           description: The first name of the candidate
 *           example: 'Ingaborg'
 *         lastName:
 *           type: string
 *           description: The last name of the candidate
 *           example: 'Sothern'
 *         email:
 *           type: string
 *           description: The email of the candidate
 *           example: 'isothern0@usatoday.com'
 *     candidateCreate:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the candidate
 *           example: 'Ingaborg'
 *         lastName:
 *           type: string
 *           description: The last name of the candidate
 *           example: 'Sothern'
 *         email:
 *           type: string
 *           description: The email of the candidate
 *           example: 'isothern0@usatoday.com'
 *     candidateUpdate:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the candidate
 *           example: 'Ingaborg'
 *         lastName:
 *           type: string
 *           description: The last name of the candidate
 *           example: 'Sothern'
 *         email:
 *           type: string
 *           description: The email of the candidate
 *           example: 'isothern0@usatoday.com'
 *     interview:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The id of the candidate
 *           example: 61276de0dc5e177e695d0839
 *         jobId:
 *           type: string
 *           description: The id of the job to wich the interview belongs
 *           example: 6103d82bc0d3252c5ca39b39
 *         candidateId:
 *           type: string
 *           description: The id of the candidate to be interviewed
 *           example: 6125e4d6540035643aae2fa2
 *         slot:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: The slot of the interview
 *           example: 2
 *     interviewUpdate:
 *       type: object
 *       properties:
 *         jobId:
 *           type: string
 *           description: The id of the job to wich the interview belongs
 *           example: 6103d82bc0d3252c5ca39b39
 *         candidateId:
 *           type: string
 *           description: The id of the candidate to be interviewed
 *           example: 6125e4d6540035643aae2fa2
 *         slot:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: The slot of the interview
 *           example: 2
 *     jobInterviewsList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/interview'
 */

module.exports = router;
