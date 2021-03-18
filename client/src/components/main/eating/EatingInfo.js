import React, { useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../../App.css';
// import { useToasts } from 'react-toast-notifications';
import Toast from 'light-toast';

const EatingInfo = () => {
//    const { addToast } = useToasts();
    const [passedTime, setPassedTime] = useState("");
    const [eatingNmb, setEatingNmb] = useState([]);
    const [lastEat, setLastEat] = useState(false);
    const [eatingNmbRow, setEatingNmbRow] = useState(false);
    const [durationEating, setDurationEating] = useState(false);

    const [mealDuration, setMealDuration] = useState([]);

    const [daysRight, setDaysRight] = useState([]);
    const [daysLeft, setDaysLeft] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [breastDaysRow, setBreastDaysRow] = useState(false);

    const [monthRight, setMonthRight] = useState([]);
    const [monthLeft, setMonthLeft] = useState([]);
    const [breastMonthsRow, setBreastMonthsRow] = useState(false);

    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);
    const [periodRight, setPeriodRight] = useState([]);
    const [periodLeft, setPeriodLeft] = useState([]);
    const [breastPeriodRow, setBreastPeriodRow] = useState(false);

    const [searchDateAverage, setSearchDateAverage] = useState('');
    const [mealsAverageDuration, setMealsAverageDuration] = useState(null);
    const [averageEating, setAverageEating] = useState(false);

    const [searchDateInterval, setSearchDateInterval] = useState('');
    const [mealsIntervalDuration, setMealsIntervalDuration] = useState(null);
    const [intervalEating, setIntervalEating] = useState(false);

    const [mealToday, setMealToday] = useState(null);
    const [adaptedToday, setAdaptedToday] = useState(null);

    const [monthAll, setMonthAll] = useState(null);
    const [adaptedMonthAll, setAdaptedMonthAll] = useState(null);

    const [periodAll, setPeriodAll] = useState(null);
    const [periodAdaptedAll, setPeriodAdaptedAll] = useState(null);

    // 45 minutes to milliseconds
//    const milliseconds = 2700000;

    function millisecToTime(arg) {
        let seconds = (arg / 1000) % 60;
        let minutes = (arg / (1000 * 60)) % 60;
//        let hours = (arg / (1000 * 60 * 60)) % 24;

        return `${minutes.toFixed(0)}min : ${seconds.toFixed(0)}sec`
    }

    function millisecToTimeHours(arg) {
//        let seconds = (arg / 1000) % 60;
        let minutes = (arg / (1000 * 60)) % 60;
        let hours = (arg / (1000 * 60 * 60)) % 24;

        return `${hours.toFixed(0)}h : ${minutes.toFixed(0)}min`
    }

    function millisecToTimeFull(arg) {
        let seconds = (arg / 1000) % 60;
        let minutes = (arg / (1000 * 60)) % 60;
        let hours = (arg / (1000 * 60 * 60)) % 24;

        return `${hours.toFixed(0)}h : ${minutes.toFixed(0)}min : ${seconds.toFixed(0)}sec`
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


    const millisecOfLastEat = async () => {
        await axios.post('/api/eat/thisDay', {
            userId: localStorage.getItem('userId'),
            shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
        })
        .then(res => {
            let resArr = res.data.map(item => item.endEating || item.endEatingAdapted).filter(item => item !== undefined && item !== null)
            let toNmb = resArr.map(item => Number(item))
            let lastEating = Date.now() - Math.max(...toNmb);
            let minutes = (lastEating / (1000 * 60)) % 60;
            let hours = (lastEating / (1000 * 60 * 60)) % 24;
            if(isNaN(minutes)) {
                const check = async () => {
                    await axios.post('/api/eat/thisDay', {
                    userId: localStorage.getItem('userId'),
                    shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDateMinusDay}`
                    })
                    .then(res => {
                    setLastEat(!lastEat);
                    let resArr = res.data.map(item => item.endEating && item.endEatingAdapted).filter(item => item !== undefined)
                    let toNmb = resArr.map(item => Number(item))
                    let lastEating = Date.now() - Math.max(...toNmb);
                    let minutes = (lastEating / (1000 * 60)) % 60;
                    let hours = (lastEating / (1000 * 60 * 60)) % 24;

                    return setPassedTime(hours.toFixed(0)  + "h : " + minutes.toFixed(0) + "min")
                    })
                    .catch(err => alert(err))
                }
                check();
            } else {
                setLastEat(!lastEat);
                return setPassedTime(hours.toFixed(0)  + "h : " + minutes.toFixed(0) + "min")
            }
        })
        .catch(err => alert(err))
    }

    const eatingNumber = async () => {
        await axios.post('/api/eat/thisDay', {
            userId: localStorage.getItem('userId'),
            shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
        })
        .then(res => {
            setEatingNmb(res.data.length);
            setEatingNmbRow(!eatingNmbRow);
        })
        .catch(err => alert(err))
    }

    const eatingDuration = async () => {
        await axios.post('/api/eat/thisDay', {
            userId: localStorage.getItem('userId'),
            shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
        })
        .then(res => {   
            setMealDuration(res.data);
            setDurationEating(!durationEating)
        })
        .catch(err => alert(err))
    }

    async function getDay() {
    await axios.post('/api/eat/thisDay', { 
             userId: localStorage.getItem('userId'),
             shortDate: searchDate,
         })
         .then(res => { 
             setMealToday(res.data.map(item => item.mealDuration).filter(item => item !== undefined).reduce((a, b) => a + b));
             setDaysRight(res.data.map(item => item.rightBreastDuration).filter(item => item !== undefined).reduce((a, b) => a + b));
             setDaysLeft(res.data.map(item => item.leftBreastDuration).filter(item => item !== undefined).reduce((a, b) => a + b));
             setAdaptedToday(res.data.map(item => item.adaptedQuantity).filter(item => item !== undefined).reduce((a, b) => a + b));
             setBreastDaysRow(true);
             })
         .catch(err => alert(err))
     }

     // Get data for specific month
     async function getSpecificMonth() {
        let e = document.getElementById("inputGroupSelect01-eat");
        let b = e.options[e.selectedIndex].value;

        await axios.post('/api/eat/thisMonth', {
            userId: localStorage.getItem('userId'),
            month: b
        })
        .then(res => {
            setMonthRight(res.data.map(item => item.rightBreastDuration).filter(item => item !== undefined).reduce((a, b) => a + b));
            setMonthLeft(res.data.map(item => item.leftBreastDuration).filter(item => item !== undefined).reduce((a, b) => a + b));
            setMonthAll(res.data.map(item => item.mealDuration).filter(item => item !== undefined).reduce((a, b) => a + b));
            setAdaptedMonthAll(res.data.map(item => item.adaptedQuantity).filter(item => item !== undefined).reduce((a, b) => a + b));
            setBreastMonthsRow(true);
        })
        .catch(err => console.log(err))
     }

     // Get data for specific period
     async function handlePeriod() {
        // Value for selected month
       let select = document.getElementById("inputGroupSelect02-eat");
       let selectedValue = select.options[select.selectedIndex].value;

       // Creating array of selected days
       let init = [];
       const selectedDays = () => {
           for(let i = Number(startDay); i <= Number(endDay); i++) {
               init.push(i)
           }
           return init
       }

      await axios.post('/api/eat/thisPeriod', {
           userId: localStorage.getItem('userId'),
           month: selectedValue,
           day: selectedDays()
       })
       .then(res => {
        setPeriodRight(res.data.map(item => item.rightBreastDuration).filter(item => item !== undefined).reduce((a, b) => a + b));
        setPeriodLeft(res.data.map(item => item.leftBreastDuration).filter(item => item !== undefined).reduce((a, b) => a + b));
        setPeriodAll(res.data.map(item => item.mealDuration).filter(item => item !== undefined).reduce((a, b) => a + b));
        setPeriodAdaptedAll(res.data.map(item => item.adaptedQuantity).reduce((a, b) => a + b));
        setBreastPeriodRow(true)
    })
       .catch(err => alert(err)) 
    }

    // Get average data for speific day
    const getDayAverage = async () => {
        await axios.post('/api/eat/thisDay', {
            userId: localStorage.getItem('userId'),
            shortDate: searchDateAverage
        })
        .then(res => { 
            let mealsDuration = res.data.map(item => item.mealDuration).filter(item => item !== undefined).reduce((a, b) => a + b)
            let mealsLength = res.data.map(item => item.mealDuration).length;
            setMealsAverageDuration(mealsDuration / mealsLength);
            setAverageEating(true);
        })
        .catch(err => alert(err))
    }

    // Get interval data for specific day
    const getDayInterval = async () => {
        await axios.post('/api/eat/thisDay', {
            userId: localStorage.getItem('userId'),
            shortDate: searchDateInterval
        })
        .then(res => { 
            let mealsDurationAll = res.data.map(item => item.endEating).filter(item => item !== undefined)
            let first = mealsDurationAll.shift();
            let last = mealsDurationAll.pop();
            let mealsLengthAll = res.data.map(item => item.mealDuration).length;
            setMealsIntervalDuration((last - first) / mealsLengthAll);
            setIntervalEating(true);
        })
        .catch(err => alert(err))
    }

    const removeMeal = ({ index }) => {
        let removeItem = mealDuration[index]._id
        axios.delete(`/api/eat/${removeItem}`)
        .then(res => {
          setMealDuration(mealDuration.filter(item => item !== mealDuration[index]));
          Toast.success('Obrisano', 500)
        })
        .catch(err => alert(err))
    }


    return (
        <div>
            {/* DAILY BASE */}

            {/* proteklo vreme od poslednjeg obroka */}
            <div className="eating-info-btns">
            
            <div className="last-eating-button">
                <div>
                    <Button variant="outline-info" onClick={millisecOfLastEat}>Vreme od poslednjeg obroka</Button>
                </div>
                <div>
                    {lastEat && (
                    passedTime
                    )}
                </div>
            </div>
            {/* koliko puta je jeo danas */}
            <div className="eating-number-today">
                <div>
                    <Button variant="outline-info" onClick={eatingNumber}>Broj obroka danas</Button>
                </div>
                <div>
                    {eatingNmbRow && (
                        <p>Danas (od 00:00 h) je ruckao {eatingNmb} puta.</p>
                    )}
                </div>
            </div>
            </div>
            {/* koliko je svaki obrok trajao */}
            <div className="eating-duration-today">
            <Button variant="outline-info" onClick={eatingDuration}>Trajanje obroka danas pojedinacno</Button>
            {mealDuration.map((item, index) => (
            <div style={{ listStyleType: "none", textDecoration: "none" }} className="meals-duration">
            {durationEating && (
                <div>
            {item.endEating && (
                <div>
                <li key={index} index={index}>
                <div className="eating-days-row">
                    <div>
                        Regularan obrok
                    </div>
                    <div>
                        <Button variant="outline-danger" onClick={() => removeMeal({index})}>Izbrisi</Button>
                    </div>
                </div>
                    <div>
                        {`vreme: ${item.hours < 10 ? "0" + item.hours : item.hours}:${item.minutes < 10 ? "0" + item.minutes : item.minutes}h`}
                    </div>
                    <div>
                        {`trajanje: ${millisecToTime(item.mealDuration)}`}             
                    </div>
                </li>
                {item.endEating && (
                <div>
                <ul>
                    <li key={index} index={index}>
                        {`Desna dojka: ${millisecToTime(item.rightBreastDuration)}`}
                    </li>
                </ul>
                <ul>
                    <li key={index} index={index}>
                        {`Leva dojka: ${millisecToTime(item.leftBreastDuration)}`}
                    </li>
                </ul> 
                <div key={index} index={index}>
                    {/* case: after breast less than 45 min adapted */}
                    {mealDuration[index + 1] === undefined 
                    ? 
                    null : ((mealDuration[index].endEating && mealDuration[index + 1].adapted) 
                    ? 
                    `Adaptiran obrok - dodatak => 
                    kolicina: ${mealDuration[index + 1].adaptedQuantity}ml
                    vreme: ${mealDuration[index + 1].hours < 10 ? "0" + mealDuration[index + 1].hours : mealDuration[index + 1].hours}:${mealDuration[index + 1].minutes < 10 ? "0" + mealDuration[index + 1].minutes : mealDuration[index + 1].minutes}h` : null)
                }
                </div>
                </div>
                )}
                </div>
                )}
                {item.adapted === false && (
                    <div>
                <div className="eating-days-row">
                    <div>
                        Adaptiran obrok
                    </div>
                    <div>
                        <Button variant="outline-danger" onClick={() => removeMeal({index})}>Izbrisi</Button>
                    </div>
                </div>
                    <p>kolicina: {item.adaptedQuantity}ml</p>
                    <p>vreme: {item.hours < 10 ? "0" + item.hours : item.hours}:{item.minutes < 10 ? "0" + item.minutes : item.minutes}h</p>
                    <p>trajanje: {millisecToTime(item.mealDuration)}</p>
                    </div>
                )}
            {item.adapted !== true && ( <hr /> )}
            </div>
            )}                
            </div>
            )
            )}
            </div>
            {/* vreme na desnoj i na levoj dojci */}
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
            {breastDaysRow && (
            <div>
                <div>
                    Ukupno trajanje ruckanja: {millisecToTimeHours(mealToday)}
                </div>
                <div>
                    Desna dojka: {millisecToTimeHours(daysRight)}
                </div> 
                <div>
                    Leva dojka: {millisecToTimeHours(daysLeft)}
                </div>
                <div>
                    Adaptiran obrok - kolicina: {adaptedToday}ml
                </div>
            </div>
            )}
            <h4 style={{ textAlign: "center" }}>Mesec:</h4>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01-eat" onClick={() => getSpecificMonth()} style={{ cursor: "pointer" }}>Meseci</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01-eat">
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
            {breastMonthsRow && (
            <div>
                <div>
                    Ukupno trajanje ruckanja: {millisecToTimeHours(monthAll)}
                </div>
                <div>
                    Desna dojka: {millisecToTimeHours(monthRight)}
                </div> 
                <div>
                    Leva dojka: {millisecToTimeHours(monthLeft)}
                </div>
                <div>
                    Adaptirana ishrana - ukupno: {adaptedMonthAll}ml
                </div>
            </div>
            )}

            <h4 style={{ textAlign: "center" }}>Period:</h4>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect02-eat">Za mesec</label>
            </div>
            <select className="custom-select" id="inputGroupSelect02-eat">
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

            {breastPeriodRow && (
            <div>
                <div>
                    Ukupno trajanje ruckanja: {millisecToTimeHours(periodAll)}
                </div>
                <div>
                    U odabranom periodu na desnoj dojci: {millisecToTimeHours(periodRight)}
                </div> 
                <div>
                    U odabranom periodu na levoj dojci: {millisecToTimeHours(periodLeft)}
                </div>
                <div>
                    Adaptirana ishrana - kolicina: {periodAdaptedAll}ml
                </div>
            </div>        
            )}
            {/* prosecno vreme obroka za danasnji dan */}
            <h5 style={{ textAlign: "center" }}>Prosecno vreme obroka za danasnji dan</h5>
            <InputGroup className="mb-3">
                    <FormControl
                        type="date"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onChange={(e) => setSearchDateAverage(e.target.value)}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" style={{ cursor: "pointer" }} onClick={() => getDayAverage()}>Izaberi</InputGroup.Text>
                    </InputGroup.Append>
            </InputGroup>
            {averageEating && (
            <div>
                {millisecToTimeHours(mealsAverageDuration)}
            </div>
            )}

            {/* vremenski interval hranjenja */}
            <h5 style={{ textAlign: "center" }}>Prosecan vremenski interval izmedju hranjenja</h5>
            <InputGroup className="mb-3">
                    <FormControl
                        type="date"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onChange={(e) => setSearchDateInterval(e.target.value)}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" style={{ cursor: "pointer" }} onClick={() => getDayInterval()}>Izaberi</InputGroup.Text>
                    </InputGroup.Append>
            </InputGroup>
            {intervalEating && (
            <div>
                {millisecToTimeFull(mealsIntervalDuration)}
            </div>
            )}
        </div>
    );
};

export default EatingInfo;