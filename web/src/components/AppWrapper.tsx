import * as React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { PointsContext } from '../PointsReducer/PointsContext';
import pyramid from '../icons/pyramid.svg';

const TopBar = styled.div`
  align-items: center;
  justify-content: space-between;
  background-color: #d1d1d1;
  display: flex;
  text-align: center;
  width: 100%;

  img {
    padding: 10px;
    height: 43px;
    width: 43px;
  }

  p {
    margin: 0px;
    padding: 0px;
  }
`;

// eslint-disable-next-line react/prop-types
export const AppWrapper: React.FunctionComponent = ({ children }) => {
  const { dispatch } = useContext(PointsContext);
  const handleResetPress = () => dispatch({ type: 'RESET' });
  return (
    <>
      <TopBar>
        <div />
        <img
          src={pyramid}
          alt="Yellow Pyramid Icon"
          style={{ width: '40px' }}
        />
        <button
          type="button"
          onClick={handleResetPress}
          onKeyDown={handleResetPress}
        >
          reset
        </button>
      </TopBar>
      <Wrapper>
        {/* eslint-disable-next-line react/prop-types */}
        <main>{children}</main>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`;

export default AppWrapper;
