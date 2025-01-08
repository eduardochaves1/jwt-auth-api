import { Document, Schema, model } from "mongoose";
import z from 'zod';

export interface IUser extends Document {
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const zUser = z.object({
  username: z.string().min(2).max(30),
  password: z.string().min(4).max(50),
});

export const zUsername = zUser.shape.username;

const User = model<IUser>('User', userSchema);

export default User;
