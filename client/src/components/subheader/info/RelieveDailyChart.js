import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Scatter } from 'react-chartjs-2';

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
        ticks: {
            beginAtZero: true,
            min: 0,
            max: 24,
            stepSize: 1,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
            beginAtZero: true,
            min: 0,
            max: 24,
            stepSize: 1,
        },
      },
    ],
  },
}

const RelieveDailyChart = () => {
    const [description, setDescription] = useState([]);
    const [hours, setHours] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [hoursMinutes, setHoursMinutes] = useState([]);

    // treba mi vreme ukakanka
    // treba mi boja ukakankastog
    function getRelieves() {
        axios.post('/api/relieve/findDay', {
            userId: localStorage.getItem("userId"),
            shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
        })
        .then(res => {
            console.log(res.data);
            setDescription(res.data.map(item => item.description));
            setHours(res.data.map(item => item.hours));
            setMinutes(res.data.map(item => item.minutes));
            setHoursMinutes(res.data.map(item => {
                return { "x": parseFloat(`${item.hours}.${item.minutes}`), "y": parseFloat(`${item.hours}.${item.minutes}`) }
            }))
            console.log(res.data.map(item => item.description), res.data.map(item => item.hours), res.data.map(item => item.minutes), res.data.map(item => { return { "x": parseFloat(`${item.hours}.${item.minutes}`), "y": parseFloat(`${item.hours}.${item.minutes}`) }}))
        })
        .catch(err => console.log(err))
    }

    function bgColor(color) {
        switch(color) {
            case("zuta"):
                return 'rgba(238, 238, 0, 1)';
            case("zelena"):
                return 'rgba(0, 230, 64, 1)';
            case("braon"):
                return 'rgba(130,90,44,1 )';
            case("proliv"): 
                return 'rgba(189, 195, 199, 1)';
            case("crvena"):
                return 'rgba(242, 38, 19, 1)';
        }
    }

    

    const data = { 
        datasets: [
          {
            label: '# stolica u toku dana', // prvi label je prva boja => "zuta", bgC: swich/case => zuta === rgba(zuta)
            data: hoursMinutes === {} ? [] : hoursMinutes.map(item => item),
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      }
    
    useEffect(() => {
        getRelieves()
    }, [])
    
return (
  <>
    <div className='header' style={{ width: "35%", height: "35%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 className='title'>Stolica</h3>
      <Scatter data={data} options={options} />
    </div>
  </>
)}

export default RelieveDailyChart