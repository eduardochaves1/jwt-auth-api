import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user.model';
import errorResponse, { userNotFoundError } from "../utils/errorResponses";

const userWithoutPassword = (user: IUser) => {
  const userResponse = user.toObject();
  delete (userResponse as any).password;

  return userResponse;
}

const bcryptSeed: number = 12;
const dbUnknowledgeMsg: string = "The operation was not acknowledged by the database";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      errorResponse(res, 400, 'User Already Exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, bcryptSeed);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json(userWithoutPassword(newUser));
  } catch (error) { errorResponse(res, 500, 'Internal Server Error', error) }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userToUpdate = req.params.username;
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username: userToUpdate });

    if (!existingUser) {
      userNotFoundError(res, username);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, bcryptSeed);

    const updatedUser = await User.updateOne(
      { username: userToUpdate },
      { username, password: hashedPassword }
    );

    if (!updatedUser.acknowledged) {
      errorResponse(res, 500, dbUnknowledgeMsg);
    } else if (updatedUser.matchedCount < 1) {
      userNotFoundError(res, userToUpdate);
    } else if (updatedUser.modifiedCount < 1) {
      errorResponse(res, 500, "Some error happened and the user was not updated");
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) { errorResponse(res, 500, 'Internal Server Error', error) }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params;

    const deletedUser = await User.deleteOne({ username });

    if (!deletedUser.acknowledged) {
      errorResponse(res, 500, dbUnknowledgeMsg);
    } else if (deletedUser.deletedCount < 1) {
      userNotFoundError(res, username)
    } else {
      res.status(200).json(deletedUser);
    }
  } catch (error) { errorResponse(res, 500, 'Internal Server Error', error) }
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
  } catch (error) { errorResponse(res, 500, 'Internal Server Error', error) }
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
  } catch (error) { errorResponse(res, 500, 'Internal Server Error', error) }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) { errorResponse(res, 500, 'Internal Server Error', error) }
}

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) { errorResponse(res, 500, 'Internal Server Error', error) }
}

export const promoteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) { errorResponse(res, 500, 'Internal Server Error', error) }
}

export const demoteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) { errorResponse(res, 500, 'Internal Server Error', error) }
}
