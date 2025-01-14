import { Document, Schema, model } from "mongoose";
import z from 'zod';

export interface IUser extends Document {
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
}

// Allows only alphanumeric characters and underscores
const usernameRegex = /^[a-zA-Z0-9_]+$/;

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      match: usernameRegex
    },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const zUser = z.object({
  username: z.string().min(2).max(30).regex(
    usernameRegex,
    'Username can only contain alphanumeric characters and underscores'
  ),
  password: z.string().min(4).max(50),
});

export const zUsername = zUser.shape.username;

const User = model<IUser>('User', userSchema);

export default User;
