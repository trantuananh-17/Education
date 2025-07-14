import mongoose, { Document, Schema } from "mongoose";

export interface IUsersQuizzes extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  quizId: mongoose.Schema.Types.ObjectId;
  answers: {
    questionId: mongoose.Schema.Types.ObjectId;
    answer: string;
  }[];
  score: number;
  feedback: string;
  createdAt: Date;
}

const usersQuizzesSchema: Schema = new Schema<IUsersQuizzes>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        answer: String,
      },
    ],
    score: { type: Number, required: true },
    feedback: { type: String },
  },
  { timestamps: true }
);

const UsersQuizzesModel = mongoose.model("UsersQuizzes", usersQuizzesSchema);
export default UsersQuizzesModel;
