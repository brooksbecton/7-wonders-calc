import React from "react";
import styled from "styled-components";

interface IProps  extends React.HTMLProps<HTMLButtonElement>{
}

export const Button: React.FunctionComponent<IProps> = (props) => {
  const { children, ...buttonProps } = props;

  // @ts-ignore
  return <StyledButton {...buttonProps}>{props.children}</StyledButton>;
};

const StyledButton = styled.button<IProps>`
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 16px; 
  padding: 0px;

  :hover {
    background: #00000020;
  }
`;
