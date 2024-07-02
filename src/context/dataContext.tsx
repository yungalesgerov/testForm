import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  MouseEvent,
} from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface DataContextType {
  startQuiz: () => void;
  showStart: boolean;
  showQuiz: boolean;
  question: Question;
  quizs: Question[];
  checkAnswer: (
    event: MouseEvent<HTMLButtonElement>,
    selected: string[]
  ) => void;
  correctAnswer: string;
  selectedAnswer: string;
  questionIndex: number;
  nextQuestion: () => void;
  showTheResult: () => void;
  showResult: boolean;
  marks: number;
  startOver: () => void;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<Partial<DataContextType>>({});

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [quizs, setQuizs] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question>({} as Question);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [marks, setMarks] = useState(0);

  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      const state = JSON.parse(savedState);
      setQuizs(state.quizs);
      setQuestionIndex(state.questionIndex);
      setCorrectAnswer(state.correctAnswer);
      setSelectedAnswer(state.selectedAnswer);
      setMarks(state.marks);
      setShowStart(state.showStart);
      setShowQuiz(state.showQuiz);
      setShowResult(state.showResult);
    } else {
      fetch("quiz.json")
        .then((res) => res.json())
        .then((data) => setQuizs(data));
    }
  }, []);

  useEffect(() => {
    if (quizs.length > 0) {
      setQuestion(quizs[questionIndex]);
      const state = {
        quizs,
        questionIndex,
        correctAnswer,
        selectedAnswer,
        marks,
        showStart,
        showQuiz,
        showResult,
      };
      localStorage.setItem("quizState", JSON.stringify(state));
    }
  }, [
    quizs,
    questionIndex,
    correctAnswer,
    selectedAnswer,
    marks,
    showStart,
    showQuiz,
    showResult,
  ]);

  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  };
  const checkAnswer = (
    event: MouseEvent<HTMLButtonElement>,
    selectedOptions: string[]
  ) => {
    const correctAnswers = question.answer.split(", ");
    const isCorrect =
      correctAnswers.length === 1
        ? selectedOptions[0] === correctAnswers[0]
        : selectedOptions.every((option) => correctAnswers.includes(option));

    if (isCorrect) {
      setMarks((prevMarks) => prevMarks + 5);
    }

    setCorrectAnswer(question.answer);
    setSelectedAnswer(selectedOptions.join(", "));
  };

  const nextQuestion = () => {
    setCorrectAnswer("");
    setSelectedAnswer("");
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  };

  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer("");
    setSelectedAnswer("");
    setQuestionIndex(0);
    setMarks(0);
  };

  return (
    <DataContext.Provider
      value={{
        startQuiz,
        showStart,
        showQuiz,
        question,
        quizs,
        checkAnswer,
        correctAnswer,
        selectedAnswer,
        questionIndex,
        nextQuestion,
        showTheResult,
        showResult,
        marks,
        startOver,
        setShowResult,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
