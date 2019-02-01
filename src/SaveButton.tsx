import * as React from "react";
import styled from "styled-components";

import { save } from "./icons/";

interface IButtonProps {
  onClick: () => void;
}

export const SaveButton: React.SFC<IButtonProps> = ({ onClick }) => {
  return (
    <Button>
      <img onClick={() => onClick()} src={save} alt="Save Score" />
    </Button>
  );
};

const Button = styled.button`
  background-color: #060056;
  border-radius: 1000px;
  padding: 12px;
  position: fixed;
  right: 16px;
  bottom: 27px;
  border: 0px;
  box-shadow: 0 6px 10px 0 #666;
  transition: all 0.1s ease-in-out;

  img {
    width: 31px;
  }
`;
