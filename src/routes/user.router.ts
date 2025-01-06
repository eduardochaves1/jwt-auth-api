import { Router } from "express";
import { zUser, zUsername } from "../models/user.model";
import validateRequest, { validateParam } from "../middlewares/validateRequest";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  promoteAdmin,
  demoteAdmin,
} from '../controllers/user.controller'

const validateUsernameParam = validateParam('username', zUsername);

const router = Router();

router.get('/', getUsers);
router.post('/', validateRequest(zUser), createUser);

router.get('/:username', validateUsernameParam, getUser);
router.put('/:username', validateUsernameParam, validateRequest(zUser), updateUser);
router.delete('/:username', validateUsernameParam, deleteUser);

router.post('/:username/login', validateUsernameParam, loginUser);
router.delete('/:username/logout', validateUsernameParam, logoutUser);

router.post('/:username/promote', validateUsernameParam, promoteAdmin);
router.delete('/:username/demote', validateUsernameParam, demoteAdmin);

export default router;
