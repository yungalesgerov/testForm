import React, { FC, useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import Timer from "../timer/Timer";
import DataContext from "../../../context/dataContext";
import TestElement from "../TestElement/TestElement";
import {
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import ResultForm from "./ResultForm/ResultForm";
import StartForm from "./StartForm/StartForm";

const TestFormRoot = styled("div")({
  width: "80%",
  margin: "0 auto",
  height: "40vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  border: "1px solid black",
  padding: "20px",
});

const TimerRoot = styled("div")({
  width: "100px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid grey",
});

const DivBorder = styled("div")({
  width: "100%",
  minHeight: "60px",
  display: "flex",
  gap: "20px",
});

const TestElementContainer = styled("div")({
  width: "100%",
  height: "20px",
  display: "flex",
  gap: "6px",
});

const Button = styled("button")(({ disabled }) => ({
  width: "100px",
  height: "40px",
  backgroundColor: disabled ? "#ded6d5" : "#f0230a",
  borderRadius: "4px",
  border: "none",
  color: "white",
  textAlign: "center",
  cursor: "pointer",
}));

const TestForm: FC = () => {
  const {
    showResult,
    showStart,
    question,
    quizs,
    checkAnswer,
    questionIndex,
    nextQuestion,
    showTheResult,
  } = useContext(DataContext);

  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    setSelectedOption([]);
  }, [question]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
  };

  const handleAnswerAction = (action: () => void) => {
    const event = { currentTarget: document.createElement("button") } as any;
    if (checkAnswer) {
      checkAnswer(event, selectedOption);
    }
    action();
  };

  const handleNextQuestion = () => {
    handleAnswerAction(() => {
      if (nextQuestion) {
        nextQuestion();
      }
    });
  };

  const handleShowResult = () => {
    handleAnswerAction(() => {
      if (showTheResult) {
        showTheResult();
      }
      setResetTimer(true);
    });
  };

  if (!question || !quizs || questionIndex === undefined) {
    return null;
  }

  return (
    <TestFormRoot>
      {showStart && <StartForm />}
      {showResult && <ResultForm />}
      {!showStart && !showResult && (
        <>
          <DivBorder>
            <Typography variant="h4">Тестирование</Typography>
            <TimerRoot>
              <Timer
                initialMinutes={4}
                resetTimer={resetTimer}
                setResetTimer={setResetTimer}
              />
            </TimerRoot>
          </DivBorder>
          <TestElementContainer>
            {quizs.map((item, index) => (
              <TestElement
                key={index}
                isActive={questionIndex === index}
                checked={questionIndex > index}
              />
            ))}
          </TestElementContainer>
          <DivBorder style={{ flexDirection: "column" }}>
            <Typography variant="h6">{question.question}</Typography>
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
              {question.options.map((item, index) => (
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
          <DivBorder style={{ alignItems: "center" }}>
            <Button
              onClick={
                questionIndex + 1 !== quizs.length
                  ? handleNextQuestion
                  : handleShowResult
              }
              disabled={!selectedOption.length}
            >
              {questionIndex + 1 !== quizs.length ? "Ответить" : "Show Result"}
            </Button>
          </DivBorder>
        </>
      )}
    </TestFormRoot>
  );
};

export default TestForm;
