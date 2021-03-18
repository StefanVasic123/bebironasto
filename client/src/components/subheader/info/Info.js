import React from 'react';
import { Button } from 'react-bootstrap';
import EatingBreastDailyChart from './EatingBreastDailyChart';
import EatingAdaptedDailyChart from './EatingAdaptedDailyChart';
import SleepingDailyChart from './SleepingDailyChart';
import RelieveDailyChart from './RelieveDailyChart';
import '../../../App.css';

const Info = (props) => {
  return (
    <>
      <div className="charts">
        <div className="title-chart-row-daily chart-row-daily" style={{ textAlign: "center" }}>
          <h2>INFO</h2>
        </div>
        <div className="eating-chart-row-daily chart-row-daily" style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          <EatingBreastDailyChart />
          <EatingAdaptedDailyChart />
        </div>
        <div className="sleeping-chart-row-daily chart-row-daily" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SleepingDailyChart />
        </div>
        <div className="relieve-chart-row-daily chart-row-daily" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <RelieveDailyChart />
        </div>
        <div style={{ textAlign: "right" }}>
            <Button className="secondary" onClick={() => props.history.goBack()}>Nazad</Button>
        </div>
      </div>
    </>
  );
};

export default Info;
 

