import React, { FC, useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import Timer from "../timer/Timer";
import DataContext from "../../../context/dataContext";
import TestElement from "../TestElement/TestElement";
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import ResultForm from "./ResultForm/ResultForm";
import StartForm from "./StartForm/StartForm";
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
  display: "flex",
  justifyContent: "space-between",
});

const TestForm: FC = () => {
  const {
    showResult,
    showStart,
    question,
    quizs,
    checkAnswer,
    correctAnswer,
    selectedAnswer,
    questionIndex,
    nextQuestion,
    showTheResult,
  } = useContext(DataContext);

  const [selectedOption, setSelectedOption] = useState<string[]>([]);

  useEffect(() => {
    setSelectedOption([]);
  }, [question]);

  if (!question || !quizs || questionIndex === undefined) {
    return null; // Лучше вернуть null или заглушку, если данные еще не загрузились
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
  };

  const handleNextQuestion = () => {
    if (checkAnswer) {
      checkAnswer(
        { currentTarget: document.createElement("button") } as any,
        selectedOption
      );
    }
    if (nextQuestion) {
      nextQuestion();
    }
  };

  const handleShowResult = () => {
    if (checkAnswer) {
      checkAnswer(
        { currentTarget: document.createElement("button") } as any,
        selectedOption
      );
    }
    if (showTheResult) {
      showTheResult();
    }
  };

  return (
    <TestFormRoot>
      {showStart && <StartForm />}
      {showResult && <ResultForm />}
      {!showStart && !showResult && (
        <>
          <DivBorder style={{ display: "flex" }}>
            <div>
              <h1>Тестирование</h1>
            </div>
            <TimerRoot>
              <Timer initialMinutes={20} />
            </TimerRoot>
          </DivBorder>
          <DivBorder>
            {quizs &&
              quizs.map((item, index) => (
                <TestElement
                  key={index}
                  isActive={questionIndex === index}
                  checked={questionIndex > index}
                />
              ))}
          </DivBorder>
          <DivBorder style={{ flexDirection: "column" }}>
            <h1>{question?.question}</h1>
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
              {question?.options?.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item}
                  control={
                    <Checkbox
                      checked={selectedOption.includes(item)}
                      onChange={handleOptionChange}
                    />
                  }
                  label={item}
                />
              ))}
            </RadioGroup>
          </DivBorder>
          <DivBorder>
            {questionIndex + 1 !== quizs.length ? (
              <button onClick={handleNextQuestion} disabled={!selectedOption}>
                Next Question
              </button>
            ) : (
              <button onClick={handleShowResult} disabled={!selectedOption}>
                Show Result
              </button>
            )}
          </DivBorder>
        </>
      )}
    </TestFormRoot>
  );
};

export default TestForm;
