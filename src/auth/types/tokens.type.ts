import mongoose from "mongoose";


export type Tokens = {
  access_token: string;
  refresh_token: string;
  _id:mongoose.Schema.Types.ObjectId;
};
