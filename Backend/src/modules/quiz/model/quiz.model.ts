import mongoose, { Document, Schema } from "mongoose";

enum QuestionLevel {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
}

export interface IQuiz extends Document {
  courseId?: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  duration: number;
  questions: mongoose.Types.ObjectId[];
  level: number;
  category: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const quizSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    duration: { type: Number, require: true },
    level: {
      type: Number,
      // enum: Object.values(QuestionLevel),
      require: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const QuizModel = mongoose.model<IQuiz>("Quiz", quizSchema);
export default QuizModel;
