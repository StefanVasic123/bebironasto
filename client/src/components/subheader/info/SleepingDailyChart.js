import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

function millisecToHours(duration) {
  const minutes = parseInt((duration / (1000 * 60)) % 60);
  const hours = parseInt((duration / (1000 * 60 * 60)) % 24);  
//  const minutesTotal = hours * 60 + minutes;
  
  let parsed = parseFloat(`${hours}.${minutes}`);
  return parsed;
}

function getMonth() {
  let month = new Date().getMonth() + 1;
  if(month < 10) {
    return `0${new Date().getMonth() + 1}`
  } else {
    return `${new Date().getMonth() + 1}`
  }
}
const newDate = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();


const SleepingDailyChart = () => {
    const [sleepingDurationTotal, setSleepingDurationTotal] = useState(null);
    const [sleepingDurationMilliseconds, setSleepingDurationMilliseconds] = useState(null);
//    const [awaikDurationTotal, setAwaikDurationTotal] = useState(null);
//    let now = Date.now();
    let date = new Date();
//    let hours = date.getHours();
    // staviti instancu taj dan ali 000 
    let settedHoursInstance = date.setHours(0);
    // ukupno vreme proslo do sada u satima
//    let passedTimeTodayMillisec = millisecToHours(Number(new Date()) - Number(settedHoursInstance));
    // ukupno vreme spavanja axios
    function sleepingTime() {
      axios.post('/api/sleep/thisDay', {
      userId: localStorage.getItem('userId'),
      shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
    })
    .then(res => {
      setSleepingDurationMilliseconds(res.data.map(item => item.sleepingDuration).reduce((a, b) => a + b))
      setSleepingDurationTotal(millisecToHours(res.data.map(item => item.sleepingDuration).reduce((a, b) => a + b)))
    })
    .catch(err => console.log(err))
    }
    function awakeTotal() {
      // koliko je sati proslo od pocetka dana tj koliko je sati. minuta
      let hoursAwake = new Date().getHours();
      let minutesAwake = new Date().getMinutes();
      // milisekunde 
      let hoursAwakeMillisec = hoursAwake * 3600000;
      let minutesAwakeMillisec = minutesAwake * 60000;
      let awakeMillisec = hoursAwakeMillisec + minutesAwakeMillisec;
      // millisekunde sadasnjeg trenutka - millisekunde spavanja
      return millisecToHours(awakeMillisec - sleepingDurationMilliseconds);
    }

  useEffect(() => {
  sleepingTime();
  awakeTotal();
}, [])

  const data = {
  labels: ['Spavkalo', 'Budno'],
  datasets: [
    {
      label: '% spavanja u toku dana',
      data: [sleepingDurationTotal, awakeTotal()],
      backgroundColor: [
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}
  return (
  <>
    <div className='info-chart-row'>
      <h3 className='title'>Spavanje</h3>
      <Pie data={data} />
    </div>
  </>
)}

export default SleepingDailyChart