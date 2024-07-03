import { useContext } from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { DataContext } from "../../../../context";

const ResultPageRoot = styled("div")({
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

export const ResultPage = () => {
  const { marks, startOver, questionList } = useContext(DataContext);

  if (!questionList) return null;

  return (
    <ResultPageRoot>
      <Typography variant="h4">
        Your score is {marks} out of {questionList.length * 10}
      </Typography>
      <Button onClick={startOver}>Рестарт</Button>
    </ResultPageRoot>
  );
};
