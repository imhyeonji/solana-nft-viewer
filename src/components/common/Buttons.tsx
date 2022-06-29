import styled from "styled-components";

export const Button = styled.button<{ selected?: boolean }>`
  padding: 0 20px;
  height: 42px;
  border: none;
  border-radius: 10px;
  overflow: visible;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#808080" : "#c4c4c4")};
`;

export const RedButton = styled(Button)`
  background-color: #d13f3f;
  color: #ffffff;
`;

export const IconButton = styled.button`
  border: none;
  padding: 0;
  overflow: visible;
  cursor: pointer;
`;
