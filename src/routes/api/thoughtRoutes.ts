import { Router } from 'express';
const router = Router();
import {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  postReaction,
  deleteReaction,
} from '../../controllers/thoughtController.js';

router.route('/')
  .get(getAllThought)
  .post(createThought);

router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .post(postReaction)


router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

export { router as thoughtRouter };
