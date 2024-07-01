import React, { useContext } from "react";
import styled from "@emotion/styled";
import DataContext from "../../../../context/dataContext";
const ResultForm = () => {
  const { marks, startOver, quizs } = useContext(DataContext);
  if (!quizs) return null;
  return (
    <div>
      <h3>
        Your score is {marks} out of {quizs.length * 5}
      </h3>

      <button onClick={startOver}>Start Over</button>
    </div>
  );
};

export default ResultForm;
