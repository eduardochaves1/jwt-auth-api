import { Document, Schema, model } from "mongoose";

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

const User = model<IUser>('User', userSchema);

export default User;
