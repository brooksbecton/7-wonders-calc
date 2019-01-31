import * as React from "react";
import styled from "styled-components";

const SwordIcon = () => (
  <svg
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    height="41"
  >
    <g>
      <polygon points="235.898,297.315 281.563,342.979 473.259,186.138 368.104,165.109  " />
      <polygon points="486.103,158.107 512,0 357.758,22.035 375.928,136.072  " />
      <path d="M76.799,435.201c-17.246-17.246-46.394-17.246-63.64,0c-17.546,17.546-17.546,46.093,0,63.64   c17.546,17.546,46.093,17.546,63.64,0C94.046,481.594,94.046,452.447,76.799,435.201z" />
      <polygon points="214.685,276.102 346.892,143.894 325.866,38.735 169.021,230.437  " />
      <path d="M54.996,393.365c15.852,2.063,31.14,8.746,43.017,20.623s18.56,27.165,20.623,43.017l53.623-53.623l-63.64-63.64   L54.996,393.365z" />
      <path d="M272,375.953c-45.292-45.292-90.486-91.483-135.953-136.95H88V269h35.618c5.368,5.368,4.029,4.916,10.265,11.151   l-10.607,31.82l76.753,76.753l31.82-10.607c6.236,6.236,4.765,4.875,10.155,10.265V425H272V375.953z" />
    </g>
  </svg>
);

export const CalculateInput = ({
  label,
  onChange,
  value
}: {
  label: string;
  onChange: (input: number) => void;
  value: number;
}) => {
  const [pointType, pointsLabel] = label.split("-");

  return (
    <Container>
      <Content>
        <IconContainer>
          <SwordIcon />
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
    margin-right: 8px;
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
`;

const Label = styled.label`
  align-self: center;
  flex-grow: 3;
  padding-left: 13px;
  text-transform: capitalize;
  line-height: 8px;
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
