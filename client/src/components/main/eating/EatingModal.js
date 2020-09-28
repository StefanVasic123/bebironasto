import React, { useState, useEffect, useCallback } from 'react';
import { 
    Button,
    Modal,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import axios from 'axios';
import bottle from '../../../icons/milk-bottle.svg'
import '../../../App.css';
import EatingInfo from './EatingInfo';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import Toast from 'light-toast';

function EatingModal() {
    const [show, setShow] = useState(false);

    const { addToast } = useToasts();

    const [regularBodyEating, setRegularBodyEating] = useState(true);
    const [infoBodyEating, setInfoBodyEating] = useState(false);

    const [startBtn, setStartBtn] = useState(false);
    const [endBtn, setEndBtn] = useState(false);

    const [backEating, setBackEating] = useState(false);
    const [back, setBack] = useState(false);

    const [rightBreastBtnStart, setRightBreastBtnStart] = useState(false);
    const [rightBreastBtnOver, setRightBreastBtnOver] = useState(false);
    const [leftBreastBtnStart, setLeftBreastBtnStart] = useState(false);
    const [leftBreastBtnOver, setLeftBreastBtnOver] = useState(false);

    const [breastFeeding, setBreastFeeding] = useState(true);
    const [adaptedFeeding, setAdaptedFeeding] = useState(true);
    const [adaptedFeedingForm, setAdaptedFeedingForm] = useState(false);
    const [adaptedFeedingFormStart, setAdaptedFeedingFormStart] = useState(true);
    const [adaptedFeedingFormEnd, setAdaptedFeedingFormEnd] = useState(false);

    const [adaptedQuantity, setAdaptedQuantity] = useState("")
    const [info, setInfo] = useState(true);

    const [disabledEnd, setDisabledEnd] = useState(false);
    const [disabledEndLeft, setDisabledEndLeft] = useState(false);
    const [disabledEndRight, setDisabledEndRight] = useState(false);

    const milliseconds = 2700000;
    function getMonth() {
        let month = new Date().getMonth() + 1;
        if(month < 10) {
          return `0${new Date().getMonth() + 1}`
        } else {
          return `${new Date().getMonth() + 1}`
        }
      }
    const newDate = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();

    let initialStateRemoved = () => {
      setBreastFeeding(false);
      setAdaptedFeeding(false);
    }
    useEffect(() => {
      localStorage.removeItem('adaptedBoolean');
      if(localStorage.getItem('startEatingBlank')) {
        setStartBtn(false);
        setEndBtn(true);
        setBackEating(true);
      }
      if(isFirstRight) {
        if(localStorage.getItem('rightStart')) {
          initialStateRemoved();
          setRightBreastBtnOver(true);
          setBackEating(true);
        }
        if(localStorage.getItem('rightEnd')) {
          initialStateRemoved();
          setLeftBreastBtnStart(true);
          setBackEating(true);
        }
        if(localStorage.getItem('leftStart')) {
          initialStateRemoved();
          setEndBtn(true)
        }
      }
      if(isFirstLeft) {
        if(localStorage.getItem('leftStart')) {
          initialStateRemoved();
          setLeftBreastBtnOver(true);
          setBackEating(true);
        }
        if(localStorage.getItem('leftEnd')) {
          initialStateRemoved();
          setRightBreastBtnStart(true);
          setBackEating(true);
        }
        if(localStorage.getItem('rightStart')) {
          initialStateRemoved();
          setEndBtn(true);
          setBackEating(true);
        }
      }
      if(localStorage.getItem('startedAdapted')) {
        initialStateRemoved();
        setAdaptedFeedingForm(true);
        setAdaptedFeedingFormStart(false);
        setAdaptedFeedingFormEnd(true);
        setBackEating(true);
      }
      if(regularBodyEating === false) {
        setRegularBodyEating(true);
        setInfoBodyEating(false);
      }
    }, [])
    
    const handleClose = () => {
      setBreastFeeding(true);
      setAdaptedFeeding(true);
      setDisabledEnd(false);
      setDisabledEndRight(false);
      setDisabledEndLeft(false);
      setAdaptedFeedingForm(false);
      setShow(false);
      setStartBtn(false);
      setEndBtn(false);
      setRightBreastBtnStart(false);
      setRightBreastBtnOver(false);
      setLeftBreastBtnStart(false);
      setLeftBreastBtnOver(false);
      setBackEating(false);
      setInfoBodyEating(false);
      setInfo(true);
      setBack(false);
      setRegularBodyEating(true);

      localStorage.removeItem('stateId');
      localStorage.removeItem('rightIsFirst');
      localStorage.removeItem('leftIsFirst');
      localStorage.removeItem('startEating');
      localStorage.removeItem('startRightBreast');
      localStorage.removeItem('startLeftBreast');
      localStorage.removeItem('endRightBreast');
      localStorage.removeItem('endLeftBreast');
      localStorage.removeItem('startEatingBlank');
      localStorage.removeItem('rightStart');
      localStorage.removeItem('rightEnd');
      localStorage.removeItem('leftStart');
      localStorage.removeItem('leftEnd');
      localStorage.removeItem('startedAdapted');
    }

    const fetchData = useCallback(() => {
      axios.post('/api/eat/getState', {
        "userId": localStorage.getItem('userId'),
        "stateEating": true
      })
      .then(res => {
        console.log(res.data.map(item => item).map(data => data.startLeftBreast));
        console.log(res.data.map(item => item).map(data => data.setBreastFeeding));
        console.log(res.data.map(item => item).map(data => data.setEndBtn));
        console.log(res.data);
      // local storage
      if(res.data.length !== 0) {
        localStorage.setItem('startLeftBreast', res.data.map(item => item).map(data => data.startLeftBreast));
        localStorage.setItem('leftStart', res.data.map(item => item).map(data => data.leftStart));
        localStorage.setItem('leftIsFirst', res.data.map(item => item).map(data => data.leftIsFirst));
        localStorage.setItem('startEating', res.data.map(item => item).map(data => data.startEating));
        localStorage.setItem('stateId', res.data.map(item => item).map(data => data.stateId));
        localStorage.setItem('endLeftBreast', res.data.map(item => item).map(data => data.endLeftBreast));
        localStorage.setItem('leftEnd', res.data.map(item => item).map(data => data.leftEnd));
        localStorage.setItem('startRightBreast', res.data.map(item => item).map(data => data.startRightBreast));
        localStorage.setItem('rightStart', res.data.map(item => item).map(data => data.rightStart));
        localStorage.setItem('rightIsFirst', res.data.map(item => item).map(data => data.rightIsFirst));
        localStorage.setItem('endRightBreast', res.data.map(item => item).map(data => data.endRightBreast));
        localStorage.setItem('rightEnd', res.data.map(item => item).map(data => data.rightEnd));
  
      // states
      //  breastFeedingString = res.data.map(item => item).filter(data => data.setBreastFeeding).toString();
        setBreastFeeding(res.data.map(item => item).filter(data => data.setBreastFeeding).toString());
        setAdaptedFeeding(res.data.map(item => item).filter(data => data.setAdaptedFeeding).toString());
        setRightBreastBtnStart(res.data.map(item => item).filter(data => data.setRightBreastBtnStart).toString());
        setLeftBreastBtnStart(res.data.map(item => item).filter(data => data.setLeftBreastBtnStart).toString());
        setLeftBreastBtnOver(res.data.map(item => item).filter(data => data.setLeftBreastBtnOver).toString());
        setEndBtn(res.data.map(item => item).filter(data => data.setEndBtn).toString());
        setStartBtn(res.data.map(item => item).filter(data => data.setStartBtn).toString());
        setBackEating(res.data.map(item => item).filter(data => data.setBackEating).toString());
        setRightBreastBtnOver(res.data.map(item => item).filter(data => data.setRightBreastBtnOver).toString()); 
      }
    })
      .catch(err => console.log(err));
    }, [])

    const handleShow = () => {
      setShow(true);
}

 useEffect(() => {
  if(show === true) {
    fetchData()
  } else {
    console.log(show)
  }
}, [fetchData]) // entry point of changing state 

    let isFirstRight = localStorage.getItem('rightIsFirst');
    let isFirstLeft = localStorage.getItem('leftIsFirst');

    const handleStartAdaptedFeeding = () => {
      setAdaptedFeeding(false);
      setBreastFeeding(false);
      setAdaptedFeedingForm(true);
      setAdaptedFeedingFormStart(true);
    }

    const handleAdaptedFeedingFormStart = () => {
      localStorage.setItem('startEating', Date.now());
      localStorage.setItem('startedAdapted', true);
      setAdaptedFeedingFormStart(false);
      setAdaptedFeedingFormEnd(true);
      setBackEating(true);
    }

    const insideMeal = () => {
      // kada je prvi obrok adaptirani onda salje error jer ne moze da uzme sve obroke
      axios.post('/api/eat/thisDay', {
      "userId": localStorage.getItem('userId'),
      "shortDate": `${new Date().getFullYear()}-${getMonth()}-${newDate}`
    })
    .then(res => {
      console.log(res.data);
      let endEatingLast = res.data[res.data.length - 1];  
      console.log(endEatingLast);
 
    if(endEatingLast !== undefined) {
      if(Date.now() - milliseconds <= endEatingLast.endEating) {
        console.log("true")
        handleAdaptedFeedingFormEnd(true)
      } else {
        console.log('false')
        handleAdaptedFeedingFormEnd(false)
      }
    } else {
        handleAdaptedFeedingFormEnd(false)
    }
})
    .catch(err => console.log(err))
}

    const handleAdaptedFeedingFormEnd = (adapted) => {
    if(adaptedQuantity === "") return alert('Upisite kolicinu obroka.')
     axios.post('/api/eat/adapted', {
        "userId": localStorage.getItem('userId'),
        "startEating": localStorage.getItem('startEating'),
        "endEatingAdapted": Date.now(),
        "shortDate": `${new Date().getFullYear()}-${getMonth()}-${newDate}`,
        "year": new Date().getFullYear(),
        "month": new Date().getMonth(),
        "day": new Date().getDate(),
        "hours": new Date().getHours(),
        "minutes": new Date().getMinutes(),
        "mealDuration": Date.now() - localStorage.getItem('startEating'),
        "adaptedQuantity": adaptedQuantity,
        "adapted": adapted
      })
      .then(res => {
        console.log(res.data)
        Toast.success('Uspesno', 500)
        addToast('Uspesno memorisan adaptiran obrok', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 10000 })
        setAdaptedFeedingFormEnd(false);
        setBreastFeeding(true);
        setAdaptedFeeding(true);
        setAdaptedFeedingForm(false);
        setShow(false);
        setBackEating(false);
        setAdaptedQuantity("");

        localStorage.removeItem('startEating');
        localStorage.removeItem('startedAdapted');
      })
      .catch(err => console.log(err));
    }

    const handleStartBreastFeeding = () => {
      setBreastFeeding(false);
      setAdaptedFeeding(false);
      setStartBtn(true);
      setRightBreastBtnStart(true);
      setLeftBreastBtnStart(true);
    }

    const handleStart = () => {
        localStorage.setItem('startEating', Date.now());
        localStorage.setItem('startEatingBlank', true);
        setStartBtn(false);
        setEndBtn(true);
        setRightBreastBtnStart(false);
        setLeftBreastBtnStart(false);
        setBackEating(true);
    }
    const handleRightBreastStart = () => {
      if(isFirstLeft === null) {
        axios.post('/api/eat/stateRight', {
          "stateEating": true, // LS
          "userId": localStorage.getItem('userId'), // LS
          "setBreastFeeding": false,
          "setAdaptedFeeding": false,
          "startRightBreast": Date.now(), // LS
          "rightStart": true, // LS
          "rightIsFirst": true, // LS
          "startEating": Date.now(), // LS
          "setLeftBreastBtnStart": false,
          "setRightBreastBtnStart": false,
          "setRightBreastBtnOver": true,
          "setEndBtn": false,
          "setStartBtn": false,
          "setBackEating": true
        })
        .then(res => {
          console.log(res.data);
          localStorage.setItem('stateId', res.data._id);
        })
        .catch(err => console.log(err)) 
      } else {

        axios.post('/api/eat/updateRight', {
          // query
            "stateId": localStorage.getItem('stateId'),
          // default
            "userId": localStorage.getItem('userId'),
            "stateEating": true,
          // new items
            "startRightBreast": Date.now(), // LS w
            "rightIsFirst": null, // LS w
            "setEndBtn": true, // w
            // changed items
            "setStartBtn": false, // w
            "setBackEating": true, // w
            "setRightBreastBtnStart": false,
            "rightEnd": false
          })
          .then(res => {
            console.log(res.data);
            localStorage.setItem('stateId', res.data._id);
          })
          .catch(err => console.log(err)) 
      } 

      localStorage.setItem('startRightBreast', Date.now());
      localStorage.setItem('rightStart', true); // for useEffect - keep module state
      if(isFirstLeft === null) { 
        localStorage.setItem('rightIsFirst', true);
        setLeftBreastBtnStart(false);
      } 
      setRightBreastBtnStart(false);
      if(isFirstLeft) { 
        setEndBtn(true);
      } else {
      setRightBreastBtnOver(true);
      setStartBtn(false);
      setEndBtn(false);
      setBackEating(true);
      localStorage.setItem('startEating', Date.now());
      }
    }
    const handleRightBreastOver = () => {
      axios.post('/api/eat/updateRightEnd', {
      // query
        "stateId": localStorage.getItem('stateId'),
      // default
        "userId": localStorage.getItem('userId'),
        "stateEating": true,
        "stateId": localStorage.getItem('stateId'),
      // new items
        "endRightBreast": Date.now(), // LS
        "rightEnd": true, // LS
      // changed items
        "rightStart": false,
        "setRightBreastBtnOver": false,
        "setLeftBreastBtnStart": true
      })
      .then(res => {
        console.log(res);
        localStorage.setItem('stateId', res.data._id)
        })
      .catch(err => console.log(err))

      localStorage.setItem('endRightBreast', Date.now());
      localStorage.removeItem('rightStart');
      localStorage.setItem('rightEnd', true);
      setRightBreastBtnOver(false);
      setLeftBreastBtnStart(true);
    }
    const handleLeftBreastStart = () => {
      if (isFirstRight === null) {
        axios.post('/api/eat/state', {
          "stateEating": true, // LS
          "userId": localStorage.getItem('userId'), // LS
          "setBreastFeeding": false,
          "setAdaptedFeeding": false,
          "startLeftBreast": Date.now(), // LS
          "leftStart": true, // LS
          "leftIsFirst": true, // LS
          "startEating": Date.now(), // LS
          "setRightBreastBtnStart": false,
          "setLeftBreastBtnStart": false,
          "setLeftBreastBtnOver": true,
          "setEndBtn": false,
          "setStartBtn": false,
          "setBackEating": true,
          "stateId": ""
        })
        .then(res => {
          console.log(res);
          localStorage.setItem('stateId', res.data._id);
        })
        .catch(err => console.log(err)) 
      } else {
        axios.post('/api/eat/updateLeft', {
          // query
            "stateId": localStorage.getItem('stateId'),
          // default
            "userId": localStorage.getItem('userId'),
            "stateEating": true,
          // new items
            "startLeftBreast": Date.now(), // LS
            "leftIsFirst": null, // LS
            "setEndBtn": true,
            // changed items
            "setStartBtn": false,
            "setBackEating": true,
            "setRightBreastBtnStart": false,
            "setLeftBreastBtnStart": false,
            "leftEnd": false
          })
          .then(res => {
            console.log(res);
            localStorage.setItem('stateId', res.data._id);
          })
          .catch(err => console.log(err)) 
      }

      localStorage.setItem('startLeftBreast', Date.now());
      localStorage.removeItem('rightEnd');
      localStorage.setItem('leftStart', true);
      if(isFirstRight === null) {
        localStorage.setItem('leftIsFirst', true);
        setRightBreastBtnStart(false);
      }
      setLeftBreastBtnStart(false);
      if(isFirstRight) {
        setEndBtn(true);
      } else {
      setLeftBreastBtnOver(true);
      setEndBtn(false);
      setStartBtn(false);
      setBackEating(true);
      localStorage.setItem('startEating', Date.now());
      }
    }
    const handleLeftBreastOver = () => {
  /*    axios.post('/api/users/change_name', {
        'id': localStorage.getItem('userId'), 
        'name': this.state.newUserName
})
        .then(res => console.log(res))   
        .catch(err => alert("Wrong User Name!"))    
} */
       axios.post('/api/eat/updateLeftEnd', {
        // query
          "stateId": localStorage.getItem('stateId'),  
        // default
          "userId": localStorage.getItem('userId'),
          "stateEating": true,
          "stateId": localStorage.getItem('stateId'),
        // new items
          "endLeftBreast": Date.now(), // LS
          "leftEnd": true, // LS
        // changed items
          "leftStart": false, // LS
          "setLeftBreastBtnOver": false, // state
          "setRightBreastBtnStart": true, // state
          
       })
        .then(res => {
          console.log(res.data);
          localStorage.setItem('stateId', res.data._id)
        })
        .catch(err => console.log(err))

      localStorage.setItem('endLeftBreast', Date.now());
      localStorage.removeItem('leftStart');
      localStorage.setItem('leftEnd', true);
      setLeftBreastBtnOver(false);
      setRightBreastBtnStart(true);
    }
    const handleEnd = async (arg) => {
      const id = localStorage.getItem('stateId');
      axios.delete(`/api/eat/${id}`).then(res => console.log(res)).catch(err => console.log(err));

      localStorage.removeItem('rightEnd');
      localStorage.removeItem('leftEnd');
      if(arg) {
        if(isFirstRight) {
          localStorage.setItem('endLeftBreast', Date.now())
        }
        if(isFirstLeft) {
          localStorage.setItem('endRightBreast', Date.now())
        }
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

     await axios.post('/api/eat', {
        "userId": localStorage.getItem('userId'),
        "startEating": localStorage.getItem('startEating'),
        "endEating": Date.now(),
        "startRightBreast": localStorage.getItem('startRightBreast'),
        "endRightBreast": localStorage.getItem('endRightBreast'),
        "startLeftBreast": localStorage.getItem('startLeftBreast'),
        "endLeftBreast": localStorage.getItem('endLeftBreast'),
        "shortDate": `${new Date().getFullYear()}-${getMonth()}-${newDate}`,
        "year": new Date().getFullYear(),
        "month": new Date().getMonth(),
        "day": new Date().getDate(),
        "hours": new Date().getHours(),
        "minutes": new Date().getMinutes(),
        "mealDuration": Date.now() - localStorage.getItem('startEating'),
        "rightBreastDuration": localStorage.getItem('endRightBreast') - localStorage.getItem('startRightBreast'),
        "leftBreastDuration": localStorage.getItem('endLeftBreast') - localStorage.getItem('startLeftBreast')
      })
      .then(res => {
        localStorage.removeItem('stateId');
        localStorage.removeItem('rightIsFirst');
        localStorage.removeItem('leftIsFirst');
        localStorage.removeItem('startEating');
        localStorage.removeItem('startRightBreast');
        localStorage.removeItem('startLeftBreast');
        localStorage.removeItem('endRightBreast');
        localStorage.removeItem('endLeftBreast');
        localStorage.removeItem('startEatingBlank');
        localStorage.removeItem('rightStart');
        localStorage.removeItem('rightEnd');
        localStorage.removeItem('leftStart');
        localStorage.removeItem('leftEnd');
        localStorage.removeItem('startedAdapted');
        
        setDisabledEnd(false);
        setDisabledEndRight(false);
        setDisabledEndLeft(false);
        setShow(false);
        setStartBtn(false);
        setEndBtn(false);
        setRightBreastBtnStart(false);
        setRightBreastBtnOver(false);
        setLeftBreastBtnStart(false);
        setLeftBreastBtnOver(false);
        setBreastFeeding(true);
        setAdaptedFeeding(true);
        setBackEating(false);
        setAdaptedQuantity("");
        Toast.success('Uspesno', 500)
        addToast('Uspesno memorisan obrok', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 10000 })
        console.log(res.data)
      })
      .catch(err => console.log(err))  
    }  
    
    const handleBackEating = () => {
      setShow(false);
    } 
    const handleInfoEating = () => {
      setRegularBodyEating(false);
      setInfoBodyEating(true);
      setInfo(false);
      setBack(true);
    }

    const handleBack = () => {
      setRegularBodyEating(true);
      setInfoBodyEating(false);
      setInfo(true);
      setBack(false);
    }
  
    return (
      <>
        <Button variant="link" onClick={() => {
          handleShow();
          fetchData();
        }}>
          <img src={bottle} alt="babypoop" height="100em" width="100em" />
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Ruckic</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {regularBodyEating && (
          <div>
            {breastFeeding && (
              <p>Odaberite tip prehrane.</p>
            )}
            {startBtn && (
              <p>
              Kliknite na Pocetak kada bebin obrok zapocne. 
              Kliknite na Kraj kada zavrsite sa bebinim obrokom. <br />
              Ukoliko zelite da izmerite vreme dojenja po dojkama, zapocnite merenje klikom na 'Zapocni levu dojku' u slucaju da zapocinjete na levoj dojci ili 'Zapocni desnu dojku' ukoliko zapocinjete na desnoj.
              </p>
            )}
            {(localStorage.getItem('leftStart') || localStorage.getItem('leftEnd') || localStorage.getItem('rightStart') || localStorage.getItem('rightEnd')) && (
              <p>
                Kliknite na 'Zavrsi' ili 'Zapocni' odabranu dojku kada beba zavrsi ili zapocne sa sisanjem na odabranoj dojci. <br />
                U slucaju da zelite koristiti Bebiron aplikaciju u toku dojenja, radi upisivanja beleski, gledanja infograma, citanja bloga i ostalog, kliknite dugme 'U pozadini' i kada zavrsite ili opet zapocinjete dojenje vratite se klikom na ikonicu 'Ruckanje' kao sto biste i inace postupili kada zelite da zapocnete obrok.
              </p>
            )}
            {adaptedFeedingForm && (
              <p>
                U polje za unos upisite kolicinu mleka u mililitrima (npr: 30, 60, 90, 120...) i klikom na 'Zapocni' Bebiron otpocinje sa merenjem vremena prehrane Vase bebe. <br />
                Kada beba zavrsi obrok, kliknite na 'Zavrsi'. <br />
                U svakom trenutku trajanja obroka mozete promeniti kolicinu mleka, ukoliko beba u toku dojenja, na primer, popije vecu ili manju kolicinu od planirane.
              </p>
            )}
            <div className="breast-adapted-main">
            {breastFeeding && (
              <Button variant="primary" onClick={handleStartBreastFeeding}>
                Dojenje
              </Button>
              )}
            {adaptedFeeding && (
              <Button variant="primary" onClick={handleStartAdaptedFeeding}>
                Adaptirana ishrana
              </Button>
            )}
            </div>
            {adaptedFeedingForm && (
              <InputGroup className="mb-3">
                <FormControl
                  type="number"
                  placeholder="kolicina u ml."
                  aria-label="kolicina"
                  aria-describedby="basic-addon2"
                  value={adaptedQuantity}
                  onChange={(e) => setAdaptedQuantity(e.target.value)}
                />
                {adaptedFeedingFormStart && (
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2" onClick={handleAdaptedFeedingFormStart} style={{ cursor: "pointer" }}>Zapocni</InputGroup.Text>
                </InputGroup.Append>
                )}
                {(adaptedFeedingFormEnd || (localStorage.getItem('startedAdapted') === true)) && (
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2" onClick={insideMeal} style={{ cursor: "pointer" }}>Zavrsi</InputGroup.Text>
                </InputGroup.Append>
                )}
              </InputGroup>
            )}
            <div className="buttons-eating">
            {startBtn && ( 
            <Button variant="info" onClick={handleStart} className="start-btn-eating">
              Pocetak
            </Button>
            )}
            {endBtn && (
            <Button variant="info" className="end-btn-eating" disabled={disabledEnd} onClick={() => {
              handleEnd(true);
              setDisabledEnd(true);
            }}
            >
              Kraj
            </Button>
            )}
            </div>
            <br />
          <div className="eating-breast-inside">
            <div className="right-left-breast">
            {leftBreastBtnStart && (
                <Button variant="outline-info" onClick={handleLeftBreastStart}>
                  Zapocni levu dojku
                </Button>
            )}
            {leftBreastBtnOver && (
            <div className="end-eating-breast">
              <div>
              <Button variant="outline-info" onClick={handleLeftBreastOver}>
                  Zavrsi levu dojku
              </Button>
              </div>
              <div>
                {localStorage.getItem('leftIsFirst') && (
                    <Button variant="info" disabled={disabledEndLeft} onClick={() => {
                      localStorage.setItem('endLeftBreast', Date.now());
                      handleEnd(false);
                      setDisabledEndLeft(true);
                    }}>
                      Zavrsi dojenje
                    </Button>
                )}
              </div>
            </div>
            )}
            {rightBreastBtnStart && ( 
              <Button variant="outline-info" onClick={handleRightBreastStart}>
                Zapocni desnu dojku
              </Button>
            
            )}
            {rightBreastBtnOver && (
            <div className="end-eating-breast">
              <div>
                <Button variant="outline-info" onClick={handleRightBreastOver}>
                  Zavrsi desnu dojku
                </Button>
              </div>
              <div>
                {localStorage.getItem('rightIsFirst') && (
                  <Button variant="info" disabled={disabledEndRight} onClick={() => {
                    localStorage.setItem('endRightBreast', Date.now());
                    handleEnd(false);
                    setDisabledEndRight(true);
                    }}>
                      Zavrsi dojenje
                  </Button>
                )}
              </div>
            </div>
            )}
            </div>
            {backEating && (
            <Button variant="outline-info" onClick={handleBackEating}>
              U pozadini
            </Button>
            )}
          </div>
        </div>
        )}
        {infoBodyEating && (
          <EatingInfo />
        )}
          </Modal.Body>
          <Modal.Footer className="modal-footer-eating">
          <div>
          {info && (
            <Button variant="outline-info" onClick={handleInfoEating}>
              Info
            </Button>
          )}
          {back && (
            <Button variant="secondary" onClick={handleBack}>
              Nazad
            </Button>
          )}
          </div>
          <div>
            <Button variant="secondary" onClick={handleClose}>
              Zatvoriti
            </Button>
          </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
 export default EatingModal;