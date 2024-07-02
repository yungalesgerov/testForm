import React, { useContext } from "react";
import styled from "@emotion/styled";
import DataContext from "../../../../context/dataContext";
import { Typography } from "@mui/material";

const ResultFormRoot = styled("div")({
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

const ResultForm = () => {
  const { marks, startOver, quizs } = useContext(DataContext);
  if (!quizs) return null;
  return (
    <ResultFormRoot>
      <Typography variant="h4">
        Your score is {marks} out of {quizs.length * 10}
      </Typography>

      <Button onClick={startOver}>Рестарт</Button>
    </ResultFormRoot>
  );
};

export default ResultForm;
