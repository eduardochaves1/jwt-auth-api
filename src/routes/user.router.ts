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

router
  .get('/', getUsers)
  .post('/', validateRequest(zUser), createUser)
  .get('/:username', validateUsernameParam, getUser)
  .put('/:username', validateUsernameParam, validateRequest(zUser), updateUser)
  .delete('/:username', validateUsernameParam, deleteUser)
  .post('/:username/login', validateUsernameParam, loginUser)
  .delete('/:username/logout', validateUsernameParam, logoutUser)
  .post('/:username/promote', validateUsernameParam, promoteAdmin)
  .delete('/:username/demote', validateUsernameParam, demoteAdmin);

export default router;
