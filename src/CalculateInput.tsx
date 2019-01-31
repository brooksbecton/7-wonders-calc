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
      <Content>
        <IconContainer>
          <img src={svg} alt={`${pointType} ${pointsLabel} icon`} />
        </IconContainer>
        <Label htmlFor={label}>
          <p>{pointType}</p>
          <br />
          <span>{pointsLabel}</span>
        </Label>
        <ScoreContainer>
          <ScoreInput
            id={label}
            type="tel"
            onChange={e => onChange(Number(e.target.value))}
            value={value}
          />
          <ScoreLabel>Score</ScoreLabel>
        </ScoreContainer>
      </Content>
      <BottomBar>
        <p>?</p>
      </BottomBar>
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

  p {
    color: #fff;
    font-size: 21px;
    line-height: 28px;
    margin: 0;
    margin-right: 12px;
    text-align: center;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  padding-bottom: 4px;
  justify-content: space-between;
`;

const Container = styled.div`
  background: #f2f2f2;
  box-shadow: 0px 6px 5px -3px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  width: (100%);
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

const ScoreContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const ScoreLabel = styled.p`
  margin: 0;
  font-size: 12px;
`;

const ScoreInput = styled.input`
  background-color: #f2f2f2;
  border: 0;
  font-size: 39px;
  height: 35px;
  min-width: 0;
  text-align: center;
  width: 100%;
`;
