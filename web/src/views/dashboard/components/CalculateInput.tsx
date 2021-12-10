import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
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

  const AnimatedLink = motion.custom(Link);

  return (
    <Container data-test-id={pointType}>
      <LeftSide>
        <IconContainer>
          <img
            style={{
              padding: 10,
              width: 50,
              height: 50,
            }}
            src={svg}
            alt={`${pointType} ${pointsLabel} icon`}
          />
        </IconContainer>

        <Label htmlFor={label}></Label>
      </LeftSide>
      <Angle />
      <RightSide>
        <InputWrapper>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
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
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.3 }}
              type="button"
              className="text-sm"
              aria-label={`Increment ${pointType} points to ${value + 1}`}
              data-test-id="increment"
              onClick={() => onChange(value + 1)}
            >
              +
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              type="button"
              className="text-sm"
              aria-label={`Decrement ${pointType} points to ${value - 1}`}
              data-test-id="decrement"
              onClick={() => onChange(value - 1)}
            >
              -
            </motion.button>
            {pointType === "science" && (
              <AnimatedLink
                whileHover={{ scale: 1.2 }}
                className="text-sm"
                aria-label="Open Science Calculator"
                data-test-id="science-calculator"
                to="/science-calculator"
              >
                fx
              </AnimatedLink>
            )}
            <AnimatedLink
              whileHover={{ scale: 1.2, rotate: 20 }}
              aria-label={`Go to ${pointType} description`}
              data-test-id="detail"
              to={`/detail/${pointType}`}
            >
              ?
            </AnimatedLink>
          </BottomBar>
        </InputWrapper>
      </RightSide>
      <div
        style={{
          height: "103px",
          justifyContent: "center",
          backgroundColor: color,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          textTransform: "capitalize",
          padding: "5px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1.2em" }}>{pointType}</h2>
      </div>
    </Container>
  );
};

const BottomBar = styled.div`
  align-content: center;
  background-color: var(--royal-purple);
  display: flex;
  flex-direction: row;
  justify-content: space-around;

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
  justify-content: center;
  flex-direction: column;
  width: 70%;
`;

const Angle = styled.div`
  background-color: var(--royal-purple);
  width: 0%;
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: "100%";
`;

const RightSide = styled.div`
  background-color: var(--royal-purple);
  clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
  color: var(--pyramid-yellow);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 2;
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
`;

const IconContainer = styled.div`
  img {
    width: 50px;
  }
`;

const Label = styled.label`
  align-self: center;
  padding-left: 13px;
  text-transform: capitalize;

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
  text-transform: capitalize;
`;

const ScoreInput = styled.input`
  background-color: transparent;
  border: 0;
  color: #e5e5e5;
  height: 47px;
  text-align: center;
  width: 50%;
`;
