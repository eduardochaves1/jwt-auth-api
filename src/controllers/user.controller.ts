import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from '../models/user.model';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(400).json({ error: 'User Already Exists' })
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error
    })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error
    })
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params;

    const deletedUser = await User.deleteOne({ username });

    if (!deletedUser.acknowledged) {
      res.status(500).json({ error: "The delete operation was not acknowledged by the database"})
    } else if (deletedUser.deletedCount < 1) {
      res.status(404).json({ error: `No user found with the username ${username}`})
    } else {
      res.status(200).json(deletedUser);
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error
    })
  }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error
    })
  }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error
    })
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error
    })
  }
}

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error
    })
  }
}

export const promoteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error
    })
  }
}

export const demoteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error
    })
  }
}
