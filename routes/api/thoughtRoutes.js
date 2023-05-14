const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// GET all thoughts
router.route('/')
  .get(getAllThoughts);

// GET a single thought by its _id
router.route('/:thoughtId')
  .get(getThoughtById);

// POST a new thought
router.route('/:userId')
  .post(addThought);

// PUT to update a thought by its _id
router.route('/:thoughtId')
  .put(updateThought);

// DELETE to remove a thought by its _id
router.route('/:userId/:thoughtId')
  .delete(removeThought);

// POST to add a reaction to a thought
router.route('/:thoughtId/reactions')
  .post(addReaction);

// DELETE to remove a reaction from a thought
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;