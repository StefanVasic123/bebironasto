import React, { useState } from 'react';
import axios from 'axios';
import { 
    Button,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import '../../App.css';

const SleepingInfo = () => {
    const [passedSleepingTime, setPassedSleepingTime] = useState('');
    const [totalSleepingTime, setTotalSleepingTime] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [day, setDay] = useState(false);
    const [dayTotal, setDayTotal] = useState([]);

    const [sleepDurationReduced, setSleepDurationReduced] = useState([]);
    const [sleepMonthIntervalDuration ,setSleepMonthIntervalDuration] = useState(null);
    const [monthSleepingDurationReduced, setMonthSleepingDurationReduced] = useState([]);
    const [sleepingPercent, setSleepingPercent] = useState(null);
    const [awaikPercent, setAwaikPercent] = useState(null);
    const [sleepingMonth, setSleepingMonth] = useState([]);
    const [sleepingMonthRow, setSleepingMonthRow] = useState(false);

    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);

    const [sleepingPeriod, setSleepingPeriod] = useState(null)
    const [sleepingPeriodRow, setSleepingPeriodRow] = useState(false);
    const [sleepingPercentPeriod, setSleepingPercentPeriod] = useState(null);
    const [awaikPercentPeriod, setAwaikPercentPeriod] = useState(null);
    const [periodSleepingDurationReduced, setPeriodSleepingDurationReduced] = useState([]);
    const [sleepPeriodIntervalDuration, setSleepPeriodIntervalDuration]= useState([]);

    const [passingSleepingTimeRow, setPassingSleepingTimeRow] = useState(false);
    const [totalSleepingTimeRow, setTotalSleepingTimeRow] = useState(false);

    function millisecToTimeHours(arg) {
        let hours = arg / 3600000; // 1.16
        let hoursRound = hours.toFixed();
        let minutes = ((arg - (hoursRound * 3600000)) / 60000).toFixed(0);

       if(minutes < 0) {
            return `${hoursRound - 1}h : ${60 - Math.abs(minutes)}min`
        } 

        return `${hoursRound}h : ${minutes}min`
    }

    const millisecToTimeHoursBlank = (arg) => {
        let hours = new Date(arg).getHours();
        let minutes = new Date(arg).getMinutes();

        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`
    }

    const millisecToTimeHoursHour = (arg) => {
        let hours = arg / 3600000;

        return `${hours.toFixed(0)}h`
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
    const newDateMinusDay = (new Date().getDate() - 1) < 10 ? "0" + (new Date().getDate() - 1) : new Date().getDate() - 1;

    const millisecOfLastSleeping = async () => {
        await axios.post('/api/sleep/thisDay', {
            userId: localStorage.getItem('userId'),
            shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
        })
        .then(res => {
            let resArr = res.data.map(item => item.finishSleep)
            let toNmb = resArr.map(item => Number(item))
            let lastSleeping = Date.now() - Math.max(...toNmb);
            let minutes = (lastSleeping / (1000 * 60)) % 60;
            let hours = (lastSleeping / (1000 * 60 * 60)) % 24;
            let seconds = (lastSleeping / 1000) % 60;
            if(isNaN(seconds)) { // if it's before 00:00
                const check = async () => {
                    await axios.post('/api/sleep/thisDay', {
                    userId: localStorage.getItem('userId'),
                    shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDateMinusDay}`
                    })
                    .then(res => {
                    let resArr = res.data.map(item => item.sleepingDuration)
                    let toNmb = resArr.map(item => Number(item))
                    let lastSleeping = Date.now() - Math.max(...toNmb);
                    let minutes = (lastSleeping / (1000 * 60)) % 60;
                    let hours = (lastSleeping / (1000 * 60 * 60)) % 24;

                    setPassingSleepingTimeRow(!passingSleepingTimeRow);

                    return setPassedSleepingTime(hours.toFixed(0)  + "h : " + minutes.toFixed(0) + "min")
                    })
                    .catch(err => alert(err))
                }
                check();
            } else {
                setPassingSleepingTimeRow(!passingSleepingTimeRow);

                return setPassedSleepingTime(hours.toFixed(0)  + "h : " + minutes.toFixed(0) + "min")
            }
        })
        .catch(err => alert(err))
    }

    const totalSleeping = async () => {
        await axios.post('/api/sleep/thisDay', {
            userId: localStorage.getItem('userId'),
            shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
        })
        .then(res => {
            let total = res.data.map(item => item.sleepingDuration).reduce((a, b) => a + b);
            setTotalSleepingTime(millisecToTimeHours(total));
            setTotalSleepingTimeRow(!totalSleepingTimeRow);
        })
        .catch(err => alert(err))
    }

    // Get data for specific date
    const getDay = () => {
        axios.post('/api/sleep/thisDay', {
            userId: localStorage.getItem('userId'),
            shortDate: searchDate
        })
        .then(res => {
            console.log(res.data)
            setDayTotal(res.data)
            setSleepDurationReduced(res.data.map(item => item.sleepingDuration).reduce((a, b) => a + b))
            setDay(true)

        })
        .catch(err => alert(err))
    }

    // Get data for specific month
    async function getSpecificMonth() {
        let e = document.getElementById("inputGroupSelect01-sleep");
        let month = e.options[e.selectedIndex].value;

        await axios.post('/api/sleep/thisMonth', {
            userId: localStorage.getItem('userId'),
            month: month
        })
        .then(res => {
            console.log(res.data.map(item => item.sleepingDuration));
            setSleepingMonth(res.data);
            setSleepingMonthRow(true);
            let totalSleepingTime = res.data.map(item => item.sleepingDuration).reduce((a, b) => a + b);
            console.log(totalSleepingTime)
            // total sleeping time
            setMonthSleepingDurationReduced(totalSleepingTime);

            // a waik %, sleeping %

            let nmbOfDays = res.data.length;
            let totalHours = nmbOfDays * 24 * 3600000; // 100%
            let sleepingAverage = totalHours / totalSleepingTime;
            let sleepingPercent = 100 / sleepingAverage
            let awaikPercent = 100 - sleepingPercent;

            setSleepingPercent(sleepingPercent.toFixed(0))
            setAwaikPercent(awaikPercent.toFixed(0))

            // interval
            let sleepMonthDurationAll = res.data.map(item => item.sleepingDuration).filter(item => item !== undefined && item > 0)
            let first = sleepMonthDurationAll.shift();
            let last = sleepMonthDurationAll.pop();
            let SleepMonthDurationLength = res.data.map(item => item.sleepingDuration).length;
            setSleepMonthIntervalDuration((last - first) / SleepMonthDurationLength);
        })
        .catch(err => console.log(err))
     }

     async function handlePeriod() {
        // Value for selected mont
       let select = document.getElementById("inputGroupSelect02-sleep");
       let selectedValue = select.options[select.selectedIndex].value;

       // Creating array of days
       let init = [];
       const selectedDays = () => {
           for(let i = Number(startDay); i <= Number(endDay); i++) {
               init.push(i)
           }
           return init
       }

      await axios.post('/api/sleep/thisPeriod', {
           userId: localStorage.getItem('userId'),
           month: selectedValue,
           day: selectedDays()
       })
       .then(res => {
        console.log(res.data.map(item => item.sleepingDuration));
        setSleepingPeriod(res.data);
        setSleepingPeriodRow(true);
        let totalSleepingTime = res.data.map(item => item.sleepingDuration).reduce((a, b) => a + b);
        console.log(totalSleepingTime)
        // total sleeping time
        setPeriodSleepingDurationReduced(totalSleepingTime);

        // a waik %, sleeping %

        let nmbOfDays = res.data.length;
        let totalHours = nmbOfDays * 24 * 3600000; // 100%
        let sleepingAverage = totalHours / totalSleepingTime;
        let sleepingPercentPeriod = 100 / sleepingAverage
        let awaikPercentPeriod = 100 - sleepingPercentPeriod;

        setSleepingPercentPeriod(sleepingPercentPeriod.toFixed(0))
        setAwaikPercentPeriod(awaikPercentPeriod.toFixed(0))

        // interval
        let sleepPeriodDurationAll = res.data.map(item => item.sleepingDuration).filter(item => item !== undefined && item > 0)
        let first = sleepPeriodDurationAll.shift();
        let last = sleepPeriodDurationAll.pop();
        let SleepPeriodDurationLength = res.data.map(item => item.sleepingDuration).length;
        setSleepPeriodIntervalDuration((last - first) / SleepPeriodDurationLength);
    })
    .catch(err => console.log(err))
 }

    return (
        <div>
            {/* proteklo vreme od poslednjeg budjenja */}
            <div className="sleeping-info-btns">
                <div>
                    <Button variant="outline-info" onClick={millisecOfLastSleeping}>vreme od poslednjeg budjenja</Button>
                    {passingSleepingTimeRow && (
                    <div style={{ textAlign: "center" }}>
                        {passedSleepingTime}
                    </div>
                    )}
                </div>

                {/* spavkanje - danas */}
                <div>
                    <Button variant="outline-info" onClick={totalSleeping}>spavanje danas - ukupno</Button>
                    {totalSleepingTimeRow && (
                    <div style={{ textAlign: "center" }}>
                        {totalSleepingTime}
                    </div>
                    )}
                </div>
            </div>

            {/* spavkanje - izabrani dan */}
            <h4 style={{ textAlign: "center" }}>Dan:</h4>
            <InputGroup className="mb-3">
                    <FormControl
                        type="date"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onChange={(e) => setSearchDate(e.target.value)}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" style={{ cursor: "pointer" }} onClick={() => getDay()}>Izaberi</InputGroup.Text>
                    </InputGroup.Append>
            </InputGroup>
        {day && (
        <div>
            {dayTotal.map((item, index) => (
                <div>
                    <ul key={index} index={index} style={{ listStyleType: "none", textDecoration: "none" }}>
                        <li>
                            trajanje spavanja: {millisecToTimeHours(item.sleepingDuration)}
                        </li>
                        <li>
                            od-do: {millisecToTimeHoursBlank(item.startSleep) !== 'NaN:NaN' ? `${millisecToTimeHoursBlank(item.startSleep)} - ${millisecToTimeHoursBlank(item.finishSleep)}` : millisecToTimeHoursBlank(item.finishSleep)}
                        </li>      
                        <hr />                  
                    </ul>
                </div>
            ))}
            <div>
                Ukupno vreme spavanja danas je {millisecToTimeHours(sleepDurationReduced)} <br />
                Ukupno {dayTotal.length} puta <br />
                U proseku {millisecToTimeHours(sleepDurationReduced / dayTotal.length)}
            </div>
        </div>
        )}
            {/* spavkanje - izabrani mesec */}
            <h4 style={{ textAlign: "center" }}>Mesec:</h4>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01-sleep" onClick={() => getSpecificMonth()} style={{ cursor: "pointer" }}>Meseci</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01-sleep">
                <option defaultValue="0">Izaberi...</option>
                <option value="0">Januar</option>
                <option value="1">Februar</option>
                <option value="2">Mart</option>
                <option value="3">April</option>
                <option value="4">Maj</option>
                <option value="5">Jun</option>
                <option value="6">Jul</option>
                <option value="7">Avgust</option>
                <option value="8">Septembar</option>
                <option value="9">Oktobar</option>
                <option value="10">Novembar</option>
                <option value="11">Decembar</option>
            </select>
            </div>
            {sleepingMonthRow && (
            <div>
                Ukupno vreme spavanja za odabrani mesec je {millisecToTimeHoursHour(monthSleepingDurationReduced)} <br />
                Ukupno {sleepingMonth.length} puta <br />
                U proseku {millisecToTimeHours(sleepMonthIntervalDuration)} <br />
                Spavanje {sleepingPercent}% 
                Budno stanje {awaikPercent}%
            </div>
            )}
            {/* spavkanje - izabrani period */}
            <h4 style={{ textAlign: "center" }}>Period:</h4>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect02-sleep">Za mesec</label>
            </div>
            <select className="custom-select" id="inputGroupSelect02-sleep">
                <option defaultValue="0">Izaberi...</option>
                <option value="0">Januar</option>
                <option value="1">Februar</option>
                <option value="2">Mart</option>
                <option value="3">April</option>
                <option value="4">Maj</option>
                <option value="5">Jun</option>
                <option value="6">Jul</option>
                <option value="7">Avgust</option>
                <option value="8">Septembar</option>
                <option value="9">Oktobar</option>
                <option value="10">Novembar</option>
                <option value="11">Decembar</option>
            </select>
            </div>
            <InputGroup className="mb-3">
            <FormControl
            placeholder="Unesi dan u mesecu kao pocetnu vrednost"
            aria-label="Unesi dan"
            aria-describedby="basic-addon1"
            onChange={(e) => setStartDay(e.target.value)}
            />
            </InputGroup>

            <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <Button variant="outline-secondary" onClick={() => handlePeriod()}>Procesuiraj</Button>
            </InputGroup.Prepend>
            <FormControl
            placeholder="Unesi dan u mesecu kao zavrsnu vrednost"
            aria-label="Unesi dan"
            aria-describedby="basic-addon1"
            onChange={(e) => setEndDay(e.target.value)}
            />
            </InputGroup>
            {sleepingPeriodRow && (
            <div>
                Ukupno vreme spavanja za odabrani period je {millisecToTimeHoursHour(periodSleepingDurationReduced)} <br />
                Ukupno {sleepingPeriod.length} puta <br />
                U proseku {millisecToTimeHours(sleepPeriodIntervalDuration)} <br />
                Spavanje {sleepingPercentPeriod}% 
                Budno stanje {awaikPercentPeriod}%
            </div>
            )}
        </div>
    );
};

export default SleepingInfo;