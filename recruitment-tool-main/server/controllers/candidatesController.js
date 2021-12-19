const express = require('express');
const router = express.Router({ mergeParams: true });

const candidatesService = require('../services/candidateService');
const candidateInterviewsController = require('./candidateInterviewsController');

/**
 * @swagger
 * /candidates:
 *   get:
 *     summary: Get all candidates.
 *     tags: 
 *       - candidates
 *     responses:
 *       200:
 *         description: A list of all candidates
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/candidatesList'
*/

const getAllCandidates = async (req, res, next) => {
    try {
        const candidates = await candidatesService.getAllCandidates();
        res.send(candidates);
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

/**
 * @swagger
 * /candidates:
 *   post:
 *     summary: Create a candidate.
 *     tags: 
 *       - candidates
 *     requestBody:
 *       description: Provide at least firstName, lastName and an email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/candidateCreate'
 *     responses:
 *       200:
 *         description: The id of the created candidate
 *         content:
 *           application/json:
 *             schema:
 *               type: 'object'
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6125e4d6540035643aae2fa2
*/

const createCandidate = async (req, res, next) => {
    try {
        const candidateData = req.body;
        const { insertedId } = await candidatesService.createCandidate(candidateData);
        res.send({ _id: insertedId });
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};


/**
 * @swagger
 * /candidates/{candidateId}:
 *   get:
 *     summary: Retrieve a single candidate.
 *     description: Retrieve a single candidate.
 *     tags:
 *       - candidates
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         description: id of the candidate to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single candidate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/candidate'
 * 
*/

const getCandidate = async (req, res, next) => {
    try {
        const candidateId = req.params.candidateId;
        const candidate = await candidatesService.getCandidateById(candidateId);
        res.send(candidate);
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

/**
 * @swagger
 * /candidates/{candidateId}:
 *   put:
 *     summary: Update a single candidate.
 *     description: Update a single candidate by id.
 *     tags:
 *       - candidates
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         description: id of the candidate to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Provide the properties to change/add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/candidateUpdate' 
 *     responses:
 *       200:
 *         description: The updated candidate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/candidate'
 * 
*/
const updateCandidate = async (req, res, next) => {
    try {
        const candidateId = req.params.candidateId;
        const candidateData = req.body;

        await candidatesService.updateCandidate(candidateId, candidateData);
        res.send({ ok: true });
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

/**
 * @swagger
 * /candidates/{candidateId}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         description: Id of the candidate to be deleted.
 *         schema:
 *           type: string
 *     summary: Delete a candidate.
 *     tags: 
 *       - candidates
 *     responses:
 *       200:
 *         description: Candidate was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
*/

const deleteCandidate = async (req, res, next) => {
    try {
        const candidateId = req.params.candidateId;

        await candidatesService.deleteCandidate(candidateId);
        res.send({ ok: true });
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
};

router.get('/', getAllCandidates);
router.post('/', createCandidate);
router.get('/:candidateId', getCandidate);
router.put('/:candidateId', updateCandidate);
router.delete('/:candidateId', deleteCandidate);

router.use('/:candidateId/interviews', candidateInterviewsController)

module.exports = router;
