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

interface DataContextType {
  startQuiz: () => void;
  showStart: boolean;
  showQuiz: boolean;
  question: Question;
  questionList: Question[];
  checkAnswer: (
    event: MouseEvent<HTMLButtonElement>,
    selected: string[]
  ) => void;
  correctAnswer: string;
  selectedAnswer: string;
  questionIndex: number;
  nextQuestion: () => void;
  showResultPage: () => void;
  showResult: boolean;
  marks: number;
  startOver: () => void;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext<Partial<DataContextType>>({});

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question>({} as Question);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [marks, setMarks] = useState(0);

  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("questionListState");

    if (savedState) {
      const state = JSON.parse(savedState);
      setQuestionList(state.questionList);
      setQuestion(state.questionList[state.questionIndex]);
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
        .then((data) => {
          setQuestionList(data);
          setQuestion(data[0]);
        });
    }
  }, []);

  useEffect(() => {
    if (questionList.length > 0) {
      setQuestion(questionList[questionIndex]);
      const state = {
        questionList,
        questionIndex,
        correctAnswer,
        selectedAnswer,
        marks,
        showStart,
        showQuiz,
        showResult,
      };
      localStorage.setItem("questionListState", JSON.stringify(state));
    }
  }, [
    questionList,
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
      setMarks((prevMarks) => prevMarks + 10);
    }

    setCorrectAnswer(question.answer);
    setSelectedAnswer(selectedOptions.join(", "));
  };

  const nextQuestion = () => {
    setCorrectAnswer("");
    setSelectedAnswer("");
    setQuestionIndex(questionIndex + 1);
  };

  const showResultPage = () => {
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

  if (questionList.length === 0) {
    return null;
  }

  return (
    <DataContext.Provider
      value={{
        startQuiz,
        showStart,
        showQuiz,
        question,
        questionList,
        checkAnswer,
        correctAnswer,
        selectedAnswer,
        questionIndex,
        nextQuestion,
        showResultPage,
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
