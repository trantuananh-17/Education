import mongoose, { Document, Schema } from "mongoose";

export enum questionType {
  SINGLE_CHOICE = "single_choice",
  MULTIPLE_CHOICE = "multiple_choice",
}

export interface IQuestion extends Document {
  quizzesId: mongoose.Schema.Types.ObjectId[];
  questionType: questionType;
  questionText: string;
  answers: {
    answerText: string;
    isCorrect: boolean;
  }[];
}

const questionSchema: Schema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  answers: [
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  quizzesId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
  questionType: {
    type: String,
    enum: Object.values(questionType),
    require: true,
  },
});

const QuestionModel = mongoose.model<IQuestion>("Question", questionSchema);
export default QuestionModel;
