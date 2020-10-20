import { Link } from "@reach/router";
import * as React from "react";
import styled from "styled-components";

interface IProps {
  label: string;
  onChange: (input: number) => void;
  value: number;
  svg: string;
  color: string;
}

export const CalculateInput = ({
  label,
  onChange,
  value,
  svg,
  color,
}: IProps) => {
  const [pointType, pointsLabel] = label.split("-");

  return (
    <Container data-test-id={pointType}>
      <LeftSide>
        <IconContainer>
          <img
            style={{
              backgroundColor: color,
              padding: 10,
              width: 35,
              height: 35,
            }}
            src={svg}
            alt={`${pointType} ${pointsLabel} icon`}
          />
        </IconContainer>
        <Label htmlFor={label}>
          <h2 className="text-md">{pointType}</h2>
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
              className="text-xl"
              type="tel"
              onChange={(e) => onChange(Number(e.target.value))}
              value={value}
            />
            <ScoreLabel>Score</ScoreLabel>
          </div>
          <BottomBar>
            <button
              type="button"
              className="text-sm"
              aria-label={`Increment ${pointType} points to ${value + 1}`}
              data-test-id="increment"
              onClick={() => onChange(value + 1)}
            >
              +
            </button>
            <button
              type="button"
              className="text-sm"
              aria-label={`Decrement ${pointType} points to ${value - 1}`}
              data-test-id="decrement"
              onClick={() => onChange(value - 1)}
            >
              -
            </button>
            {pointType === "science" && (
              <Link
                className="text-sm"
                aria-label="Open Science Calculator"
                data-test-id="science-calculator"
                to="science-calculator"
              >
                fx
              </Link>
            )}
            <Link
              aria-label={`Go to ${pointType} description`}
              data-test-id="detail"
              to={`detail/${pointType}`}
            >
              ?
            </Link>
          </BottomBar>
        </InputWrapper>
      </RightSide>
    </Container>
  );
};

const BottomBar = styled.div`
  align-content: center;
  background-color: var(--royal-purple);
  display: flex;
  flex-direction: row;
  height: 29px;
  justify-content: flex-end;

  button,
  a {
    background-color: var(--royal-purple);
    border: 0px;
    color: var(--pyramid-yellow);
    cursor: pointer;
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
  background-color: var(--royal-purple);
  width: 0%;
`;

const RightSide = styled.div`
  background-color: var(--royal-purple);
  clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
  color: var(--pyramid-yellow);
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
  background: #e5e5e5;
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

  h2 {
    margin-bottom: 5px;
  }

  p {
    margin: 0;
  }

  span {
  }
`;

const ScoreLabel = styled.p`
  margin: 0;
  color: #e5e5e5;
  text-align: center;
`;

const ScoreInput = styled.input`
  background-color: transparent;
  border: 0;
  color: #e5e5e5;
  height: 47px;
  text-align: center;
  width: 50%;
`;
