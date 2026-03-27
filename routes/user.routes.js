import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { checkServiceToken } from '../middlewares/serviceSecure.middleware.js';

const router = Router();

router.post('/', checkServiceToken, userController.createUser);
router.get('/', checkServiceToken, userController.getUsers);
router.get('/:id', checkServiceToken, userController.getUserById);
router.put('/:id', checkServiceToken, userController.updateUser);
router.delete('/:id', checkServiceToken, userController.deleteUser);

export default router;