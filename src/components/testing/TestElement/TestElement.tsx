import React from "react";
import styled from "@emotion/styled";

const TestElementContainer = styled("div")<{
  isActive: boolean;
  checked: boolean;
}>(({ isActive, checked }) => ({
  width: "5vw",
  height: "10px",
  backgroundColor: isActive ? "#f0230a" : checked ? "#000000" : "#ded6d5",
}));

interface TestElementProps {
  isActive: boolean;
  checked: boolean;
}

const TestElement = ({ isActive, checked }: TestElementProps) => {
  return <TestElementContainer isActive={isActive} checked={checked} />;
};

export default TestElement;
