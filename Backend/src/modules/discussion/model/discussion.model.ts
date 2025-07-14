import mongoose, { Document, Schema } from "mongoose";

export interface IDiscussion extends Document {
  courseId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  question: string;
  answers: mongoose.Schema.Types.ObjectId[];
  isClose: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const discussionSchema: Schema = new Schema<IDiscussion>(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    question: { type: String, required: true },
    answers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        answer: String,
      },
    ],
    isClose: { type: Boolean, require: true },
  },
  { timestamps: true }
);

const DiscussionModel = mongoose.model<IDiscussion>(
  "Discussion",
  discussionSchema
);
export default DiscussionModel;
