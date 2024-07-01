import React, { useContext, FC } from "react";
import DataContext from "../../../../context/dataContext";
const StartForm: FC = () => {
  const { startQuiz } = useContext(DataContext);
  return (
    <div>
      <h1>Basic React JS Quiz</h1>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
};

export default StartForm;
