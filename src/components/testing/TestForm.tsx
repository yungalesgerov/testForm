import React, { FC, useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import Timer from "./timer/Timer";
import DataContext from "../../context/dataContext";

const TestFormRoot = styled("div")({
  width: "80%",
  margin: "0 auto",
  height: "40vh",
  border: "1px solid black",
});

const TimerRoot = styled("div")({
  width: "100px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid red",
});

const DivBorder = styled("div")({
  width: "100%",
  minHeight: "100px",
  border: "1px solid grey",
});

const TestElement = styled("div")<{ isActive: boolean; checked: boolean }>(
  ({ isActive, checked }) => ({
    width: "40px",
    height: "20px",
    backgroundColor: isActive ? "red" : checked ? "black" : "grey",
  })
);

const TestForm: FC = () => {
  const {
    showQuiz,
    question,
    quizs,
    checkAnswer,
    correctAnswer,
    selectedAnswer,
    questionIndex,
    nextQuestion,
    showTheResult,
  } = useContext(DataContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("quiz.json")
      .then((res) => res.json())
      .then((data) => console.log("2", data));
  }, []);

  return (
    <TestFormRoot>
      <DivBorder style={{ display: "flex" }}>
        /*div for time */
        <div>
          <h1>Тестирование</h1>
        </div>
        <TimerRoot>
          <Timer initialMinutes={20} />
        </TimerRoot>
      </DivBorder>
      <DivBorder></DivBorder>
      <DivBorder>/*div for question desc */</DivBorder>
      <DivBorder> /*div for button answer */</DivBorder>
    </TestFormRoot>
  );
};

export default TestForm;
