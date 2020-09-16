import React, { useState, useEffect } from 'react';
import { 
    Button,
    Modal,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import axios from 'axios';
import bottle from '../../icons/milk-bottle.svg'
import '../../App.css';
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
      if(localStorage.getItem('adaptedFeedingRow')) {
        setBreastFeeding(false);
        setAdaptedFeeding(false);
      } else {
        setBreastFeeding(true);
        setAdaptedFeeding(true);
      }
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
      localStorage.removeItem('adaptedFeedingRow');
    }
    const handleShow = () => setShow(true);

    let isFirstRight = localStorage.getItem('rightIsFirst');
    let isFirstLeft = localStorage.getItem('leftIsFirst');

    const handleStartAdaptedFeeding = () => {
      localStorage.setItem('adaptedFeedingRow', true);
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
      axios.post('/api/eat/thisDay', {
      "userId": localStorage.getItem('userId'),
      "shortDate": `${new Date().getFullYear()}-${getMonth()}-${newDate}`
    })
    .then(res => {
      console.log(res.data);
      let endEatingLast = res.data[res.data.length - 1];  
      console.log(endEatingLast);
 
    if(endEatingLast.endEating) {
      if(Date.now() - milliseconds <= endEatingLast.endEating) {
    //    localStorage.setItem('adaptedBoolean', true);
        console.log("true")
        handleAdaptedFeedingFormEnd(true)
      } else {
    //    localStorage.setItem('adaptedBoolean', false)
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
        "adapted": adapted//localStorage.getItem('adaptedBoolean')
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
        localStorage.removeItem('adaptedFeedingRow');
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
      localStorage.setItem('endRightBreast', Date.now());
      localStorage.removeItem('rightStart');
      localStorage.setItem('rightEnd', true);
      setRightBreastBtnOver(false);
      setLeftBreastBtnStart(true);
    }
    const handleLeftBreastStart = () => {
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
      localStorage.setItem('endLeftBreast', Date.now());
      localStorage.removeItem('leftStart');
      localStorage.setItem('leftEnd', true);
      setLeftBreastBtnOver(false);
      setRightBreastBtnStart(true);
    }
    const handleEnd = () => {
      localStorage.removeItem('rightEnd');
      localStorage.removeItem('leftEnd');
      if(isFirstRight) {
        localStorage.setItem('endLeftBreast', Date.now())
      }
      if(isFirstLeft) {
        localStorage.setItem('endRightBreast', Date.now())
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

     axios.post('/api/eat', {
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
      })
      .catch(err => console.log(err))  


 /*     axios.get('/api/eat/find', {
        "userId": localStorage.getItem('userId')
      })
      .then(res => res.data.filter(item => item.userId === localStorage.getItem('userId')).map(date => date.end).forEach(now => console.log(new Date(JSON.parse(now)))))
      .catch(err => console.log(err)) */
      
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
        <Button variant="link" onClick={handleShow}>
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
            {(adaptedFeedingForm || (localStorage.getItem('startedAdapted') === true)) && (
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
            <Button variant="info" onClick={handleEnd} className="end-btn-eating">
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
            <Button variant="outline-info" onClick={handleLeftBreastOver}>
              Zavrsi levu dojku
            </Button>
            )}
            {rightBreastBtnStart && ( 
            <Button variant="outline-info" onClick={handleRightBreastStart}>
              Zapocni desnu dojku
            </Button>
            )}
            {rightBreastBtnOver && (
            <Button variant="outline-info" onClick={handleRightBreastOver}>
              Zavrsi desnu dojku
            </Button>
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