import styled from "@emotion/styled";

const DividerRoot = styled("div")<{
  isActive: boolean;
  checked: boolean;
}>(({ isActive, checked }) => ({
  width: "5vw",
  height: "10px",
  backgroundColor: isActive ? "#f0230a" : checked ? "#000000" : "#ded6d5",
}));

interface DividerProps {
  isActive: boolean;
  checked: boolean;
}

export const Divider = ({ isActive, checked }: DividerProps) => {
  return <DividerRoot isActive={isActive} checked={checked} />;
};
