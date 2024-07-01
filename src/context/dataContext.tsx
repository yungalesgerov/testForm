import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  MouseEvent,
} from "react";

// Интерфейс для вопроса
interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

// Интерфейс для контекста
interface DataContextType {
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
}

// Создание контекста с начальным значением
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
    fetch("quiz.json")
      .then((res) => res.json())
      .then((data) => {
        setQuizs(data);
        setQuestion(data[0]);
        // Устанавливаем первый вопрос при загрузке данных
      });
  }, []);

  useEffect(() => {
    if (quizs.length > 0) {
      setQuestion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  };

  const checkAnswer = (
    event: React.MouseEvent<HTMLButtonElement>,
    selectedOptions: string[]
  ) => {
    const correctAnswers = question.answer
      .split(", ")
      .map((answer) => answer.trim());

    if (correctAnswers.length === 1) {
      // If there's only one correct answer
      if (
        selectedOptions.length === 1 &&
        selectedOptions[0] === correctAnswers[0]
      ) {
        setMarks(marks + 5);
      }
    } else {
      // If there are multiple correct answers
      const selectedCorrectAnswers = selectedOptions.filter((option) =>
        correctAnswers.includes(option)
      );
      if (
        selectedCorrectAnswers.length === correctAnswers.length &&
        selectedCorrectAnswers.length === selectedOptions.length
      ) {
        setMarks(marks + 5);
      }
    }

    setCorrectAnswer(question.answer);
    setSelectedAnswer(selectedOptions.join(", "));
  };

  const nextQuestion = () => {
    setCorrectAnswer("");
    setSelectedAnswer("");
    setQuestionIndex(questionIndex + 1);
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

  if (quizs.length === 0) {
    return null; // Если данные еще не загружены, ничего не отрисовываем
  }

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
