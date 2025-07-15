import { questionType } from "../../question/model/question.model";

export interface IQuizResponseDTO {
  _id: string;
  courseId: {
    _id: string;
    title: string;
  };
  title: string;
  description: string;
  questions: {
    _id: string;
    questionType: string;
    questionText: string;
    answers: {
      answerText: string;
      isCorrect: boolean;
    }[];
  };
  duration: number;
  level: number;
  category: string;
}
