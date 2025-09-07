import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  urls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
    },
  ],
});

export type UserAttrs = InferSchemaType<typeof UserSchema>;
export type UserDoc = HydratedDocument<UserAttrs>;

const User = mongoose.model("User", UserSchema);

export default User;
