export interface IQuestionResponse {
  quizId: {
    _id: string;
    title: string;
  };
  questionType: string;
  questionText: string;
  answers: {
    answerText: string;
    isCorrect: boolean;
  }[];
}
