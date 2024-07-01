import React from "react";
import styled from "@emotion/styled";

const TestElementContainer = styled("div")<{
  isActive: boolean;
  checked: boolean;
}>(({ isActive, checked }) => ({
  width: "40px",
  height: "20px",
  backgroundColor: isActive ? "red" : checked ? "black" : "grey",
}));

interface TestElementProps {
  isActive: boolean;
  checked: boolean;
}

const TestElement = ({ isActive, checked }: TestElementProps) => {
  return <TestElementContainer isActive={isActive} checked={checked} />;
};

export default TestElement;
