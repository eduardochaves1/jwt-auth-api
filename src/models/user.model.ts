import { Document, Schema, model } from "mongoose";
import z from 'zod';

export interface IUser extends Document {
  createdAt: Date;
  updatedAi: Date;
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

export const zUser: z.ZodSchema<Pick<IUser, 'username' | 'password'>> = z.object({
  username: z.string().min(2).max(30),
  password: z.string().min(4).max(50),
})

const User = model<IUser>('User', userSchema);

export default User;
