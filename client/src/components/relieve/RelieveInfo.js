import React, { useState } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';

    function millisecToTime(arg) {
        let seconds = (arg / 1000) % 60;
        let minutes = (arg / (1000 * 60)) % 60;
        let hours = (arg / (1000 * 60 * 60)) % 24;

        return `${minutes.toFixed(0)}min : ${seconds.toFixed(0)}sec`
    }

    function millisecToTimeHours(arg) {
        let seconds = (arg / 1000) % 60;
        let minutes = (arg / (1000 * 60)) % 60;
        let hours = (arg / (1000 * 60 * 60)) % 24;

        return `${hours.toFixed(0)}h : ${minutes.toFixed(0)}min`
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

function ShowDay({ day, index }) {
    return(
        <div className="days">
            Time: {day.hours}, description: {day.description}
        </div>
    )
}

const Day = () => {
    const [searchDate, setSearchDate] = useState('');
    const [relieves, setRelieves] = useState([]);
    const [relievesLength, setRelievesLength] = useState([]);
    const [relievesDayRow, setRelievesDayRow] = useState(false);
    const [relieveIntervalDuration, setRelieveIntervalDuration] = useState([]);
    // Get data for specific day - interval between two actions
    async function getDay() {
        await axios.post('/api/relieve/findDay', { 
            userId: localStorage.getItem('userId'),
            shortDate: searchDate,
            })
            .then(res => {
                console.log(res.data);
                setRelieves(res.data);
                setRelievesLength(res.data.map(item => item).length);
                setRelievesDayRow(true);
        
             // interval
                 let relieveDurationAll = res.data.map(item => item.act).filter(item => item !== undefined && item > 0);
                 let first = relieveDurationAll.shift();
                 let last = relieveDurationAll.pop();
                 let relieveLengthAll = res.data.map(item => item.act).length;
                 setRelieveIntervalDuration(relieveLengthAll > 2 ? (last - first) / relieveLengthAll : last - first);
             })
             .catch(err => console.log(err))
    }
    const handleRemoveDay = () => {
        setRelievesDayRow(false);
     }
     
     const relievesList = () => {
         let relievesAll = relieves.map(item => item.description);
         return (
            <div>
        {/* .filter((item, index, array) => array.indexOf(item.description) === item.description[index]) */}
            {relieves
                .map((item, index) => (
                relievesAll.indexOf(item.description) === index ?
                <li key={index} index={index}>
                    {relieves[index].description}: {relieves.map(item => item.description).filter(item => item === relieves[index].description).length}
                </li> 
                :
                null
                ))}
            </div>
         )
     }
    return (
    <div>
        <div style={{ textAlign: "center" }}>
            <h4>Dan:</h4>
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
        </div>
    {relievesDayRow && (
    <div>
        <div>
            Broj stolica: {relieves.length}
        </div>
    {relieves.map((relieve, index) => (
        <div>
            <div style={{ textDecoration: "none", listStyleType: "none" }}>
                <li key={index} index={index}>
                {index + 1}. {`${relieve.hours < 10 ? "0" + relieve.hours : relieve.hours}:${relieve.minutes < 10 ? "0" + relieve.minutes : relieve.minutes}h`}
                </li>
                <p>{relieve.description}</p>
            </div>
        </div>
    ))}
    <div>
        <p>
        Prosecni interval izmedju stolica: <br />
        {millisecToTimeHours(relieveIntervalDuration)}
        </p>
        <p> 
            {relievesList()}
        </p>
    </div>
        <div>
            <Button variant="secondary" onClick={() => handleRemoveDay()}>Nazad</Button>
        </div>
    </div>
    )}
</div> 
    )
}

const Month = () => {
    const [relievesMonth, setRelievesMonth] = useState([]);
    const [relievesMonthLength, setRelievesMonthLength] = useState([]);
    const [relievesMonthRow, setRelievesMonthRow] = useState(false);
    const [relieveMonthIntervalDuration, setRelieveMonthIntervalDuration] = useState([]);

    // Get data for specific month
     async function getSpecificMonth() {
        let e = document.getElementById("inputGroupSelect01-relieve-month");
        let b = e.options[e.selectedIndex].value;

        await axios.post('/api/relieve/findMonth', {
            userId: localStorage.getItem('userId'),
            month: b
        })
        .then(res => {
            setRelievesMonth(res.data);
            setRelievesMonthLength(res.data.map(item => item).length);
            setRelievesMonthRow(true);

            // interval
            let relieveMonthDurationAll = res.data.map(item => item.act).filter(item => item !== undefined && item > 0)
            let first = relieveMonthDurationAll.shift();
            let last = relieveMonthDurationAll.pop();
            let relieveMonthLengthAll = res.data.map(item => item.act).length;
            setRelieveMonthIntervalDuration((last - first) / relieveMonthLengthAll);
        })
        .catch(err => console.log(err))
    }

    const handleRemoveMonth = () => {
        setRelievesMonthRow(false);
    }

    const relievesMonthList = () => {
        let relievesAllMonth = relievesMonth.map(item => item.description)
        return (
           <div>
               {relievesMonth.map((item, index) => (
                relievesAllMonth.indexOf(item.description) === index ?
               <li key={index} index={index}>
                   {relievesMonth[index].description}: {relievesMonth.map(item => item.description).filter(item => item === relievesMonth[index].description).length}
               </li>
               :
               null
               ))}
           </div>
        )
    }


    return(
    <div>
        <h4 style={{ textAlign: "center" }}>Mesec:</h4>
        <div className="input-group mb-3">
        <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01-relieve-month" onClick={() => getSpecificMonth()} style={{ cursor: "pointer" }}>Meseci</label>
        </div>
        <select className="custom-select" id="inputGroupSelect01-relieve-month">
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
        {relievesMonthRow && (
        <div>
            <div>
                Broj stolica: {relievesMonth.length}
            </div>
            <div>
                <p>
                Prosecan interval izmedju stolica: <br />
                {millisecToTimeHours(relieveMonthIntervalDuration)}
                </p>
                <p>
                    {relievesMonthList()}
                </p>
            </div>
            <Button variant="secondary" onClick={() => handleRemoveMonth()}>Nazad</Button>
        </div> 
        )}
    </div>
    )
}

const Period = () => {
    const [relievesPeriod, setRelievesPeriod] = useState([]);
    const [relievesPeriodLength, setRelievesPeriodLength] = useState([]);
    const [relievesPeriodRow, setRelievesPeriodRow] = useState(false);
    const [relievePeriodIntervalDuration, setRelievePeriodIntervalDuration] = useState([]);
    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);

        // Get data for specific period
     async function handlePeriod() {
         // Value for selected mont
        let select = document.getElementById("inputGroupSelect02-relieve");
        let selectedValue = select.options[select.selectedIndex].value;

        // Creating array of days
        let init = [];
        const selectedDays = () => {
            for(let i = Number(startDay); i <= Number(endDay); i++) {
                init.push(i)
            }
            return init
        }

       await axios.post('/api/relieve/findPeriod', {
            userId: localStorage.getItem('userId'),
            month: selectedValue,
            day: selectedDays()
        })
        .then(res => {
            setRelievesPeriod(res.data);
            setRelievesPeriodLength(res.data.map(item => item).length);
            setRelievesPeriodRow(true);

            // interval
            let relievePeriodDurationAll = res.data.map(item => item.act).filter(item => item !== undefined && item > 0)
            let first = relievePeriodDurationAll.shift();
            let last = relievePeriodDurationAll.pop();
            let relievePeriodLengthAll = res.data.map(item => item.act).length;
            setRelievePeriodIntervalDuration((last - first) / relievePeriodLengthAll);
        })
        .catch(err => console.log(err)) 
     }

     const handleRemovePeriod = () => {
         setRelievesPeriodRow(false);
     }

     const relievesPeriodList = () => {
         let relievesAllPeriod = relievesPeriod.map(item => item.description);
         return (
            <div>
            {relievesPeriod.map((item, index) => (
                relievesAllPeriod.indexOf(item.description) === index ?
                <li key={index} index={index}>
                    {relievesPeriod[index].description}: {relievesPeriod.map(item => item.description).filter(item => item === relievesPeriod[index].description).length}
                </li> 
                :
                null
            ))}
        </div>
         )
     }

    return (
    <div>
        <h4 style={{ textAlign: "center" }}>Period:</h4>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect02-relieve">Za mesec</label>
            </div>
            <select className="custom-select" id="inputGroupSelect02-relieve">
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
            {relievesPeriodRow && (
            <div>
                <div>
                    Broj stolica: {relievesPeriod.length}
                </div>
                <div>
                    <p>
                    Prosecni interval izmedju stolica: <br />
                    {millisecToTimeHours(relievePeriodIntervalDuration)}
                    </p>
                    <p>
                       {relievesPeriodList()}
                    </p>
                </div>
                <Button variant="secondary" onClick={() => handleRemovePeriod()}>Nazad</Button>
            </div> 
            )}
        </div>
    )
}

const ButtonLastRelieve = () => {
        const [passedTime, setPassedTime] = useState("");
        const [relieveTimelapseRow, setRelieveTimelapseRow] = useState(false);

        // Get data for last relieve (action)
        async function millisecOfLastRelieve() {
            await axios.post('/api/relieve/findDay', {
                userId: localStorage.getItem('userId'),
                shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
            })
            .then(res => {
                if(relieveTimelapseRow === false) {
                    setRelieveTimelapseRow(true)
                } else {
                    setRelieveTimelapseRow(false)
                }
                let resArr = res.data.map(item => item.act)
                let toNmb = resArr.map(item => Number(item))
                let lastRelieve = Date.now() - Math.max(...toNmb);
                let minutes = (lastRelieve / (1000 * 60)) % 60;
                let hours = (lastRelieve / (1000 * 60 * 60)) % 24;
                if(isNaN(minutes)) {
                    const check = async () => {
                        await axios.post('/api/relieve/findDay', {
                        userId: localStorage.getItem('userId'),
                        shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDateMinusDay}`
                        })
                        .then(res => {
                        if(relieveTimelapseRow === false) {
                            setRelieveTimelapseRow(true)
                        } else {
                            setRelieveTimelapseRow(false)
                        }
                        let resArr = res.data.map(item => item.act)
                        let toNmb = resArr.map(item => Number(item))
                        let lastRelieve = Date.now() - Math.max(...toNmb);
                        let minutes = (lastRelieve / (1000 * 60)) % 60;
                        let hours = (lastRelieve / (1000 * 60 * 60)) % 24;
    
                        return setPassedTime(hours.toFixed(0)  + "h : " + minutes.toFixed(0) + "min")
                        })
                        .catch(err => alert(err))
                    }
                    check();
                } else {
                    return setPassedTime(hours.toFixed(0)  + "h : " + minutes.toFixed(0) + "min")
                }
            })
            .catch(err => alert(err))
        }
    
    return (
    <div>
        <Button variant="outline-info" onClick={millisecOfLastRelieve}>pre koliko</Button>
        {relieveTimelapseRow && (
        <div>
            <p>
                Vreme od poslednje stolice: <br />
                {passedTime}
            </p>
        </div>
        )}
    </div>
    )
}

const RelieveNumber = () => {
    const [relieveNmb, setRelieveNmb] = useState([]);
    const [relieveNmbRow, setRelieveNmbRow] = useState(false);
     // Get data for number of relieve (actions)
     const relieveNumber = async () => {
        await axios.post('/api/relieve/findDay', {
            userId: localStorage.getItem('userId'),
            shortDate: `${new Date().getFullYear()}-${getMonth()}-${newDate}`
        })
        .then(res => {
            setRelieveNmb(res.data.length);
            if(relieveNmbRow === false) {
                setRelieveNmbRow(true)
            } else {
                setRelieveNmbRow(false)
            }
        })
        .catch(err => alert(err))
    }
    return (
    <div>
        <Button variant="outline-info" onClick={relieveNumber}>koliko puta</Button>
        {relieveNmbRow && (
        <div>
            <p>Broj stolica (od 00:00): {relieveNmb}</p>
        </div>
        )}
    </div>
    )
}

const RelieveInfo = () => {
    const [searchYear, setSearchYear] = useState('');

    // Get data from db for specific user
    //.then(res => console.log(res.data.map(item => new Date(item.date).getHours()))) ...vraca sate za chart npr

    async function getData() {        
    await axios.post('api/relieve/find', {
            userId: localStorage.getItem('userId')
    })
    .then(res => console.log(res))                       
    .catch(err => console.log(err))
     }

     // Get data for specific year
     async function getSpecificYear() {
        await axios.post('/api/relieve/findYear', {
            userId: localStorage.getItem('userId'),
            year: searchYear
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
     }

    return (
        <div>
            <div className="two-btns-relieve-info">
                <div>
                    <ButtonLastRelieve />
                </div>
                <div>
                    <RelieveNumber />
                </div>
            </div>

            <Day />
            
            <Month />

            <Period />
        </div>
    );
};

export default RelieveInfo;