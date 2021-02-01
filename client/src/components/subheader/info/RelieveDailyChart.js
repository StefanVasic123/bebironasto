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
    const [hoursMinutes, setHoursMinutes] = useState([]);
    const [colorData, setColorData] = useState([]);

    useEffect(() => {
      bgColorData()
    }, [])

    // treba mi vreme ukakanka
    // treba mi boja ukakankastog
    function getRelieves() {
        axios.post('/api/relieve/findDay', {
            userId: localStorage.getItem("userId"),
            shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
        })
        .then(res => {
            setDescription(res.data.map(item => item.description));
            setHoursMinutes(res.data.map(item => {
                return { "x": parseFloat(`${item.hours}.${item.minutes}`), "y": parseFloat(`${item.hours}.${item.minutes}`) }
            }))
        })
        .catch(err => console.log(err))
    }

    function bgColor(color) {
        switch(color) {
            case("Zuta"):
                return 'rgba(238, 238, 0, 1)';
            case("Zelena"):
                return 'rgba(0, 230, 64, 1)';
            case("Braon"):
                return 'rgba(130,90,44,1 )';
            case("Proliv"): 
                return 'rgba(189, 195, 199, 1)';
            case("Crvena"):
                return 'rgba(242, 38, 19, 1)';
        }
    }
  
    function bgColorData() {
      let colorArr = [];
      console.log(description)
      for(let desc of description) {
        console.log(desc, typeof desc)
        colorArr.push(bgColor(desc))
      }
      return colorArr.map(item => item)
    }

    const data = { 
        datasets: [
          {
      //      label: description.map(item => item), // prvi label je prva boja => "zuta", bgC: swich/case => zuta === rgba(zuta)
            data: hoursMinutes === {} ? [] : hoursMinutes.map(item => item),
            backgroundColor: bgColorData(),
          },
        ],
      }
    
    useEffect(() => {
        getRelieves()
    }, [])
    
return (
  <>
    <div className='info-chart-row'>
      <h3 className='title'>Stolica</h3>
      <Scatter data={data} options={options} />
    </div>
  </>
)}

export default RelieveDailyChart