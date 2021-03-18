import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function getMonth() {
  let month = new Date().getMonth() + 1;
  if(month < 10) {
    return `0${new Date().getMonth() + 1}`
  } else {
    return `${new Date().getMonth() + 1}`
  }
}
const newDate = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();

const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 60,
          stepSize: 5
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
}

const EatingBreastDailyChart = () => {
  const [mealsTime, setMealsTime] = useState([]);
  const [leftBreast, setLeftBreast] = useState([]);
  const [rightBreast, setRightBreast] = useState([]);

  function backgroundColorFunc(cb) {
    let bgColorArr = [];
    for(let x = 0; x < cb.length; x++) {
      bgColorArr.push(cb === leftBreast ? 'rgb(54, 162, 235)' : 'rgb(75, 192, 192)')
    }
    return bgColorArr;
  }

  useEffect(() => {
        axios.post('/api/eat/thisDay', { 
            userId: localStorage.getItem('userId'),
            shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
            })
        .then(res => { 
            const breasting = res.data.filter(item => item.endEatingAdapted === undefined);
            setLeftBreast(breasting.map(data => Math.round(data.leftBreastDuration / 1000 / 60)))
            setRightBreast(breasting.map(data => Math.round(data.rightBreastDuration / 1000 / 60)))
            setMealsTime(breasting.map(item => `${item.hours}:${item.minutes}`))
          })
        .catch(err => console.log(err))
    }, []) 

  const data = {
  labels: mealsTime, 
  datasets: [
    { 
      label: 'Leva Dojka',
      data: leftBreast, 
      backgroundColor: backgroundColorFunc(leftBreast) 
    },
    {
      label: 'Desna dojka',
      data: rightBreast, // kolicina na desnoj
      backgroundColor: backgroundColorFunc(rightBreast)
    },
  ],
}
  return (
  <>
    <div className='info-chart-row'>
      <h3 className='eating-breast-day-title'>Dojenje</h3>
      <Bar data={data} options={options} />
    </div>
  </>
)}

export default EatingBreastDailyChart;