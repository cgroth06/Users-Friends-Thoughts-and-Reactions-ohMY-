import { Router } from 'express';
const router = Router();
import { getAllUsers, createUser, getUserById, updateUser, deleteUser, newFriend, removeFriend, } from '../../controllers/userController.js';
// /api/user
router.route('/')
    .get(getAllUsers)
    .post(createUser);
// /api/users/:userId
router.route('/:userId')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser);
router.route('/:userId/friends/:friendId')
    .post(newFriend)
    .delete(removeFriend);
export { router as userRouter };
