import { Router } from "express";
import { zUser } from "../models/user.model";
import validateRequest from "../middlewares/validateRequest";
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

const router = Router();

router.get('/', getUsers);
router.post('/', validateRequest(zUser), createUser);

router.get('/:username', getUser);
router.put('/:username', validateRequest(zUser), updateUser);
router.delete('/:username', deleteUser);

router.post('/:username/login', loginUser);
router.delete('/:username/logout', logoutUser);

router.post('/:username/promote', promoteAdmin);
router.delete('/:username/demote', demoteAdmin);

export default router;
