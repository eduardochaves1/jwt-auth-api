import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user.model';
import Blacklist from "../models/blacklist.model";
import jwt from 'jsonwebtoken';
import errorResponse, {
  usernameAlreadyInUse,
  userNotFoundError,
  dbUnknowledgeError,
  internalError
} from "../utils/errorResponses";

const userWithoutPassword = (user: IUser) => {
  const userResponse = user.toObject();
  delete (userResponse as any).password;

  return userResponse;
}

const bcryptSeed = process.env.BCRYPT_SEED as string;
const jwtSecret = process.env.JWT_SECRET as string;

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      usernameAlreadyInUse(res);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, bcryptSeed);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json(userWithoutPassword(newUser));
  } catch (error) { internalError(res, error) }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const usernameParam = req.params.username;
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username: usernameParam });
    const userWithUsernameInUse = await User.findOne({ username });

    if (!existingUser) {
      userNotFoundError(res, username);
      return;
    }
    if (userWithUsernameInUse && userWithUsernameInUse.username !== existingUser.username) {
      usernameAlreadyInUse(res);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, bcryptSeed);

    const updatedUser = await User.updateOne(
      { username: usernameParam },
      { username, password: hashedPassword }
    );

    if (!updatedUser.acknowledged) {
      dbUnknowledgeError(res);
    } else if (updatedUser.matchedCount < 1) {
      userNotFoundError(res, usernameParam);
    } else if (updatedUser.modifiedCount < 1) {
      errorResponse(res, 500, "Some error happened and the user was not updated");
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) { internalError(res, error) }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params;

    const deletedUser = await User.deleteOne({ username });

    if (!deletedUser.acknowledged) {
      dbUnknowledgeError(res);
    } else if (deletedUser.deletedCount < 1) {
      userNotFoundError(res, username)
    } else {
      res.status(200).json(deletedUser);
    }
  } catch (error) { internalError(res, error) }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.params.username;

    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      userNotFoundError(res, username);
    } else {
      res.status(200).json(userWithoutPassword(existingUser));
    }
  } catch (error) { internalError(res, error) }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { where, limit, sort} = req.body;

    const users = await User.find(where).limit(limit).sort(sort);

    if (!users.length && where) {
      errorResponse(res, 404, 'No user found with this query')
    } else if (!users.length) {
      errorResponse(res, 404, 'No users found in database')
    } else {
      const usersWithoutPassword = users.map(user => userWithoutPassword(user));
      
      res.status(200).json(usersWithoutPassword);
    }
  } catch (error) { internalError(res, error) }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      userNotFoundError(res, username);
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({
          id: user._id,
          username: user.username,
        }, jwtSecret);

        res.status(200).json({ token })
      } else {
        errorResponse(res, 401, 'Incorrect Password');
      }
    }
  } catch (error) { internalError(res, error) }
}

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.params.username;
    const token = req.headers.authorization?.split(' ')[1];

    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      userNotFoundError(res, username);
    } else {
      const tokenBlacklisted = new Blacklist({ token, username });
      await tokenBlacklisted.save();

      res.status(200).json(tokenBlacklisted);
    }
  } catch (error) { internalError(res, error) }
}

export const promoteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) { internalError(res, error) }
}

export const demoteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) { internalError(res, error) }
}
