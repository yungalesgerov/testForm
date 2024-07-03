import React, { FC, useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import {
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Timer } from "./Timer";
import { ResultPage, StartPage } from "./TestPages";
import { Divider } from "./Divider";
import { DataContext } from "../../context";

const TestContentRoot = styled("div")({
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

const FlexDiv = styled("div")({
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

export const TestForm: FC = () => {
  const {
    showResult,
    showStart,
    question,
    questionList,
    checkAnswer,
    questionIndex,
    nextQuestion,
    showResultPage,
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
      if (showResultPage) {
        showResultPage();
      }
      setResetTimer(true);
    });
  };

  if (!question || !questionList || questionIndex === undefined) {
    return null;
  }

  return (
    <TestContentRoot>
      {showStart && <StartPage />}
      {showResult && <ResultPage />}
      {!showStart && !showResult && (
        <>
          <FlexDiv>
            <Typography variant="h4">Тестирование</Typography>
            <TimerRoot>
              <Timer
                initialMinutes={4}
                resetTimer={resetTimer}
                setResetTimer={setResetTimer}
              />
            </TimerRoot>
          </FlexDiv>
          <TestElementContainer>
            {questionList.map((item, index) => (
              <Divider
                key={index}
                isActive={questionIndex === index}
                checked={questionIndex > index}
              />
            ))}
          </TestElementContainer>
          <FlexDiv style={{ flexDirection: "column" }}>
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
          </FlexDiv>
          <FlexDiv style={{ alignItems: "center" }}>
            <Button
              onClick={
                questionIndex + 1 !== questionList.length
                  ? handleNextQuestion
                  : handleShowResult
              }
              disabled={!selectedOption.length}
            >
              {questionIndex + 1 !== questionList.length
                ? "Ответить"
                : "Show Result"}
            </Button>
          </FlexDiv>
        </>
      )}
    </TestContentRoot>
  );
};
