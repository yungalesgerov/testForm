import React, { useContext, FC } from "react";
import DataContext from "../../../../context/dataContext";
import styled from "@emotion/styled";
const StartFormRoot = styled("div")({
  width: "80%",
  margin: "0 auto",
  height: "40vh",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifyContent: "center",
  alignItems: "center",
});

const Button = styled("button")({
  width: "100px",
  height: "40px",
  borderRadius: "8px",
  cursor: "pointer",
});
const StartForm: FC = () => {
  const { startQuiz } = useContext(DataContext);
  return (
    <StartFormRoot>
      <h1>Начать тестирование</h1>
      <Button onClick={startQuiz}>Start Quiz</Button>
    </StartFormRoot>
  );
};

export default StartForm;
