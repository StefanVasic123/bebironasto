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
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 210,
          stepSize: 30
        },
      },
    ],
  },
}

const EatingAdaptedDailyChart = () => {
    const [mealsTime, setMealsTime] = useState([]);
    const [mealsHeight, setMealsHeight] = useState([]);

    useEffect(() => {
        axios.post('/api/eat/thisDay', { 
            userId: localStorage.getItem('userId'),
            shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
            })
        .then(res => { 
          console.log(res)
            console.log(res.data.filter(item => item.endEatingAdapted))
            setMealsTime(res.data.filter(item => item.endEatingAdapted).map(item => `${item.hours}:${item.minutes}`))
            console.log(res.data.filter(item => item.endEatingAdapted).map(item => `${item.hours}:${item.minutes}`))
            setMealsHeight(res.data.filter(item => item.endEatingAdapted).map(item => item.adaptedQuantity))
            console.log(res.data.filter(item => item.endEatingAdapted).map(item => item.adaptedQuantity))
            })
        .catch(err => console.log(err))
    }, [])

    function backgroundColorFunc() {
        let rgbaArr = [];
        let x = mealsTime.length;
        for(let y = 0; y < x; y++) {
            rgbaArr.push('rgba(54, 162, 235, 0.2')
        }
        return rgbaArr;
    }
    function borderColorFunc() {
        let borderArr = [];
        let x = mealsTime.length;
        for(let y = 0; y < x; y++) {
            borderArr.push('rgba(255, 206, 86, 1')
        }
        return borderArr;
    }

    const data = {
        labels: mealsTime, 
        datasets: [
            {
                label: 'adaptirana ishrana',
                data: mealsHeight, // kolicina adaptiranog obroka pojedinacno
                backgroundColor: backgroundColorFunc(),
                  borderColor: borderColorFunc(),
                  borderWidth: 1,
            }
        ]
    }

return (
  <>
    <div className='header' style={{ width: "35%", height: "35%" }}>
      <h3 className='title'>Adaptirana - dnevni grafik</h3>
      <Bar data={data} options={options} />
    </div>
  </>
)
}

export default EatingAdaptedDailyChart