import mongoose, { Document, Schema } from "mongoose";

enum Role {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
}

export interface IUser extends Document {
  email: string;
  password: string;
  fullname: string;
  role: Role;
  courses: mongoose.Schema.Types.ObjectId[];
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), default: Role.STUDENT },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  avatar: { type: String },
});

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
