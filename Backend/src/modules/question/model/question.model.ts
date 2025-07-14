import mongoose, { Document, Schema } from "mongoose";

enum questionType {
  SINGLE_CHOICE = "single_choice",
  MULTIPLE_CHOICE = "multiple_choice",
}

export interface IQuestion extends Document {
  quizId: mongoose.Schema.Types.ObjectId[];
  questionType: questionType;
  questionText: string;
  answers: mongoose.Schema.Types.ObjectId[];
}

const questionSchema: Schema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  answers: [{ answerText: String, isCorrect: Boolean }],
  quizId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
  questionType: [
    {
      type: String,
      enum: Object.values(questionType),
      require: true,
    },
  ],
});

const QuestionModel = mongoose.model<IQuestion>("Question", questionSchema);
export default QuestionModel;
