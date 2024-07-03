import { useContext, FC } from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { DataContext } from "../../../../context";

const StartPageRoot = styled("div")({
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

export const StartPage: FC = () => {
  const { startQuiz } = useContext(DataContext);
  return (
    <StartPageRoot>
      <Typography variant="h4">Начать тестирование</Typography>
      <Button onClick={startQuiz}>Start Quiz</Button>
    </StartPageRoot>
  );
};
