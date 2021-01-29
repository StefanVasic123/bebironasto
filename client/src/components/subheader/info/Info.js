import React from 'react';
import { Button } from 'react-bootstrap';
import EatingBreastDailyChart from './EatingBreastDailyChart';
import EatingAdaptedDailyChart from './EatingAdaptedDailyChart';

const Info = (props) => {
  return (
      <div>
          <div className="eating-charts-row">
            <div className="eating-chart-row-daily" style={{ display: "flex" }}>
              <EatingBreastDailyChart />
              <EatingAdaptedDailyChart />
            </div>
          </div>
          Info
          <Button className="secondary" onClick={() => props.history.goBack()}>Nazad</Button>
      </div>
  );
};

export default Info;
 

