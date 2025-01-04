import { Request, Response } from "express";
import User from '../models/user.model';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(404).json({ message: "Endpoint to be developed" })
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
    res.status(404).json({ message: "Endpoint to be developed" })
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
