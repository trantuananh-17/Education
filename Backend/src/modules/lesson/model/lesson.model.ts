import mongoose, { Document, Schema } from "mongoose";

export interface ILesson extends Document {
  courseId: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  resources?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const lessonSchema: Schema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    content: { type: String },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    resources: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const LessonModel = mongoose.model("Lesson", lessonSchema);
export default LessonModel;
