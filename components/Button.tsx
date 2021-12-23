import React from "react";
import styled from "styled-components";

interface IProps {
  onClick: React.HTMLProps<HTMLButtonElement>["onClick"];
}

export const Button: React.FunctionComponent<IProps> = (props) => {
  const { children, ...buttonProps } = props;

  return <StyledButton {...buttonProps}>{props.children}</StyledButton>;
};

const StyledButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 16px; 
  padding: 0px;

  :hover {
    background: #00000020;
  }
`;
