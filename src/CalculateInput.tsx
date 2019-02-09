import { Link } from "@reach/router";
import * as React from "react";
import styled from "styled-components";

export const CalculateInput = ({
  label,
  onChange,
  value,
  svg
}: {
  label: string;
  onChange: (input: number) => void;
  value: number;
  svg: string;
}) => {
  const [pointType, pointsLabel] = label.split("-");

  return (
    <Container>
      <LeftSide>
        <IconContainer>
          <img src={svg} alt={`${pointType} ${pointsLabel} icon`} />
        </IconContainer>
        <Label htmlFor={label}>
          <p>{pointType}</p>
          <br />
          <span>{pointsLabel}</span>
        </Label>
      </LeftSide>
      <Angle />
      <RightSide>
        <InputWrapper>
          <div>
            <ScoreInput
              id={label}
              type="tel"
              onChange={e => onChange(Number(e.target.value))}
              value={value}
            />
            <ScoreLabel>Score</ScoreLabel>
          </div>
          <BottomBar>
            <button onClick={() => onChange(value + 1)}>+</button>
            <button onClick={() => onChange(value - 1)}>-</button>
            <Link to="/detail">?</Link>
          </BottomBar>
        </InputWrapper>
      </RightSide>
    </Container>
  );
};

const BottomBar = styled.div`
  align-content: center;
  background-color: #000052;
  display: flex;
  flex-direction: row;
  height: 29px;
  justify-content: flex-end;

  button,
  a {
    background-color: #060056;
    border: 0px;
    color: #eead0e;
    cursor: pointer;
    font-size: 21px;
    line-height: 28px;
    margin: 0;
    margin-right: 12px;
    padding-left: 7px;
    padding-right: 7px;
    text-align: center;
    text-decoration: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 70%;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  height: 105px;
  justify-content: space-between;
  padding: 10px;
  padding-bottom: 4px;
  width: 70%;
`;

const Angle = styled.div`
  background: #060056;
  width: 0%;
`;

const RightSide = styled.div`
  background: #060056;
  clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
  color: #eead0e;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 80%;
  min-width: 110px;
  input {
    width: 100%;
  }
`;

const Container = styled.div`
  background: #f2f2f2;
  box-shadow: 0px 6px 5px -3px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 35px;
  }
`;

const Label = styled.label`
  align-self: center;
  flex-grow: 3;
  padding-left: 13px;
  text-transform: capitalize;
  line-height: 8px;
  max-width: 221.375px;

  p {
    font-size: 20px;
    margin: 0;
  }

  span {
    font-size: 12px;
  }
`;

const ScoreLabel = styled.p`
  margin: 0;
  color: #f2f2f2;
  font-size: 12px;
  text-align: center;
`;

const ScoreInput = styled.input`
  background-color: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 47px;
  height: 47px;
  text-align: center;
  width: 50%;
`;
