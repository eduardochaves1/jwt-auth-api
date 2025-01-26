import { Document, Schema, model } from "mongoose";

export interface IBlacklist extends Document {
  createdAt: Date;
  token: string;
  username: string;
}

const blacklistSchema: Schema<IBlacklist> = new Schema(
  {
    token: { type: String, required: true, unique: true },
    username: { type: String }
  },
  {
    timestamps: true
  }
);

const Blacklist = model<IBlacklist>('Blacklist', blacklistSchema);

export default Blacklist;
