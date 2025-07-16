import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  instructorId: mongoose.Schema.Types.ObjectId;
  lessons?: mongoose.Schema.Types.ObjectId[];
  resources?: string[];
  reviews?: mongoose.Schema.Types.ObjectId[];
  quizzes?: mongoose.Schema.Types.ObjectId[];
  category: string;
  users?: mongoose.Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const courseSchema: Schema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    resources: [{ type: String }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quizzes" }],
    category: { type: String, require: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const CoursesModel = mongoose.model<ICourse>("Course", courseSchema);
export default CoursesModel;
