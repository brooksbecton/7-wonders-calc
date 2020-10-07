import { Router } from '@reach/router';
import { render } from 'react-dom';
import React, { useEffect, useReducer } from 'react';
import { registerObserver } from 'react-perf-devtool';
import * as store from 'store';
import { AppWrapper } from './components/AppWrapper';
import { PointsContext } from './PointsReducer/PointsContext';
import serviceWorker from './registerServiceWorker';
import { Calculate } from './views/dashboard';
import { PointDetail } from './views/pointDetail/components/PointDetails';
import { ScienceCalculator } from './views/ScienceCalculator';
import { updatePoint } from './PointsReducer/actions';
import { defaultState, reducer } from './PointsReducer/reducer';
import { IPointType } from './PointsReducer/types';

registerObserver();

function App() {
  const pointData = store.get('points', defaultState);
  const [pointTypes, dispatch] = useReducer(reducer, pointData);
  const setPoints = (newPointType: IPointType) => dispatch(updatePoint(newPointType));

  useEffect(() => {
    store.set('points', pointTypes);
  });
  return (
    <PointsContext.Provider value={{ dispatch, pointTypes, setPoints }}>
      <AppWrapper>
        <Router basepath={process.env.PUBLIC_URL}>
          <Calculate path="/" />
          <PointDetail path="detail/:pointType" />
          <ScienceCalculator path="science-calculator" />
        </Router>
      </AppWrapper>
    </PointsContext.Provider>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
serviceWorker();
