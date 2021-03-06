import React, { useState, useEffect, useCallback } from 'react';
import { 
    Button,
    Modal,
    FormControl, 
    InputGroup, 
} from 'react-bootstrap';
import axios from 'axios';
import poop from '../../../icons/sleeping.svg';
import SleepingInfo from './SleepingInfo';
import { useToasts } from 'react-toast-notifications';
import Toast from 'light-toast';

const SleepingModal = () => {
    const [show, setShow] = useState(false);

    const { addToast } = useToasts();

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const [mainSleep, setMainSleep] = useState(true);

    const [mainText, setMainText] = useState(true);
    const [secondText, setSecondText] = useState(false);

    const [startSleeping, setStartSleeping] = useState(true);
//    const [endSleeping, setEndSleeping] = useState(false);
    const [startEnd, setStartEnd] = useState(true);
    const [inputGroup, setInputGroup] = useState(true);
    const [dataGrid, setDataGrid] = useState(false);
    
    const [infoSleeping, setInfoSleeping] = useState(false);
    const [info, setInfo] = useState(true);
    const [backInfo, setBackInfo] = useState(false);
    const [backBtn, setBackBtn] = useState(true);

    const [disabledSleeping, setDisabledSleeping] = useState(false);

    const id = localStorage.getItem('stateSleepingId');

    useEffect(() => {
        if(localStorage.getItem('startSleeping') !== null) {
            setStartEnd(true);
            setInputGroup(false);
            setStartSleeping(false);
          //  setEndSleeping(true);
        } 
    }, [])

    const handleShow = () => {
      setShow(true);
      setInfo(true);
      if(localStorage.getItem('startSleeping')) {
      //  setEndSleeping(true)
        setMainText(false);
        setSecondText(true);
      } else {
      //  setEndSleeping(false);
        setMainText(true);
        setSecondText(false);
      }
    }

      const handleClose = () => {
        axios.delete(`/api/sleep/${id}`).then(res => console.log(res)).catch(err => console.log(err));
        if(localStorage.getItem('infoSleep')) {
          localStorage.removeItem('infoSleep');
          setInfoSleeping(false); 
          setBackInfo(false);
          if(localStorage.getItem('startSleeping')) {
            setInfoSleeping(true);
            setMainSleep(false);
          } else {
          setInfoSleeping(false);
          setMainSleep(true);
          }
        } else {
          setStartEnd(true);
          setInputGroup(true);
        //  setEndSleeping(false);
          setStartSleeping(true);
          setShow(false);
          localStorage.removeItem('stateSleeping');
          localStorage.removeItem('stateSleepingId');
          localStorage.removeItem('startSleeping');
        }
    }

    const fetchData = useCallback(() => {
      axios.post('/api/sleep/getState', {
        "userId": localStorage.getItem('userId'),
        "stateSleeping": true
      })
      .then(res => {
        console.log(res.data);
        console.log(res.data.map(item => item).filter(data => data.setInputGroup).toString());
        console.log(res.data.map(item => item).map(data => data.setInputGroup));
        if(res.data.length > 0) {
        localStorage.setItem('stateSleepingId', res.data.map(item => item).map(data => data._id));
        // state
        setInputGroup(res.data.map(item => item).filter(data => data.setInputGroup).toString());
      //  setEndSleeping(res.data.map(item => item).filter(data => data.setEndSleeping).toString());
        setStartSleeping(res.data.map(item => item).filter(data => data.setStartSleeping).toString());
        setMainText(res.data.map(item => item).filter(data => data.setMainText).toString());
        setSecondText(res.data.map(item => item).filter(data => data.setSecondText).toString());
       // setDataGrid(res.data.map(item => item).filter(data => data.setDataGrid).toString());
        res.data.map(item => item).filter(data => setDataGrid(data.setDataGrid));
        console.log(setDataGrid(res.data.map(item => item).filter(data => data.setDataGrid).toString()));
        res.data.map(item => item).filter(data => console.log(data.setDataGrid))

        // local storage
        localStorage.setItem('stateSleeping', res.data.map(item => item).map(data => data.stateSleeping));
        localStorage.setItem('startSleeping', res.data.map(item => item).map(data => data.startSleeping));
        }
      })
      .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      if(show === true) {
        fetch()
      } else {
        console.log(show)
      }
    }, [fetchData])

    function millisecToTimeHours(arg) {
    //    let seconds = (arg / 1000) % 60;
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

    const sleepingSubmit = () => {
      axios.post('/api/sleep/startSleeping', {
        "userId": localStorage.getItem('userId'),
        "stateSleeping": true,
        "startSleeping": Date.now(),
        "setInputGroup": false,
        "setEndSleeping": true,
        "setStartSleeping": false,
        "setShow": false,
        "setSecondText": true,
        "setMainText": false,
        "setDataGrid": true,
        // trebam tu da stavim state sleeping id ma ne bre, uzmem samo res.data._id
      })
      .then(res => {
        console.log(res.data);
        localStorage.setItem('stateSleepingId', res.data._id);
      })
      .catch(err => console.log(err));

        localStorage.setItem('startSleeping', Date.now());
        setInputGroup(false);
      //  setEndSleeping(true);
        setStartSleeping(false);
        setShow(false);
        Toast.success('Uspesno', 500)
        addToast('Uspesno memorisan pocetak spavanja', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 10000 })
    }

    const wakingSubmit = () => {
        axios.delete(`/api/sleep/${id}`).then(res => console.log(res)).catch(err => console.log(err));
        axios.post('/api/sleep', {
            "userId": localStorage.getItem('userId'),
            "startSleep": localStorage.getItem('startSleeping'),
            "finishSleep": Date.now(),
            "sleepingDuration": Date.now() - JSON.parse(localStorage.getItem('startSleeping')),
            "shortDate": `${new Date().getFullYear()}-${getMonth()}-${newDate}`,
            "year": new Date().getFullYear(),
            "month": new Date().getMonth(),
            "day": new Date().getDate(),
            "hours": new Date().getHours(),
            "minutes": new Date().getMinutes(),
        })
        .then(res => {
            setStartEnd(true);
            setInputGroup(true);
            setStartSleeping(true);
            setShow(false);
            localStorage.removeItem('startSleeping');
            Toast.success('Uspesno', 500);
            addToast('Uspesno memorisano budjenje', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 10000 });
            localStorage.removeItem('stateSleeping');
            localStorage.removeItem('stateSleepingId');
            })
        .catch(err => alert(err))
    }

    const sleepingLastingSubmit = () => {
      setShow(false);
    }

    const handleSleeping = () => {
      if(hours !== 0 || minutes !== 0) {
        function clockToMillisec(hoursArg, minutesArg) {
                let h = hoursArg * 3600000;
                let m = minutesArg * 60000;
                return h + m;
        }
          axios.post('/api/sleep', {
              "userId": localStorage.getItem('userId'),
              "sleepingDuration": clockToMillisec(hours, minutes),
              "shortDate": `${new Date().getFullYear()}-${getMonth()}-${newDate}`,
              "year": new Date().getFullYear(),
              "finishSleep": Date.now(),
              "month": new Date().getMonth(),
              "day": new Date().getDate(),
              "hours": new Date().getHours(),
              "minutes": new Date().getMinutes(),
          })
          .then(res => {
              setShow(false);
              setStartEnd(true);
              setInputGroup(true);
              setHours(0);
              setMinutes(0);
              Toast.success('Uspesno', 500)
              addToast('Uspesno memorisano vreme spavanja', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 10000 })
          })
          .catch(err => alert(err))
      } else {
        alert('Upisite vreme spavanja.')
      }
    }

    const back = () => {
        axios.delete(`/api/sleep/${id}`).then(res => console.log(res)).catch(err => console.log(err));
        setStartSleeping(true);
      //  setEndSleeping(false);
        setStartEnd(true);
        setInputGroup(true);
        localStorage.removeItem('startSleeping');
        localStorage.removeItem('stateSleeping');
        localStorage.removeItem('stateSleepingId');
    }

    const handleInfoSleep = () => {
      localStorage.setItem('infoSleep', true);
      setInfo(false);
      setInfoSleeping(true);
      setMainSleep(false);
      setBackInfo(true);
    }

    const handleBackSleep = () => {
      localStorage.removeItem('infoSleep');
      setBackInfo(false);
      setInfoSleeping(false);
      setMainSleep(true);
      setInfo(true);
    }

    return (
      <>
        <Button variant="link" onClick={() => {
          handleShow();
          fetchData();
        }}>
        <img src={poop} alt="babypoop" height="100em" width="100em" />
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Spavkanje</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {mainSleep && (
          <div>
            {mainText && (
              <div>
                Kliknite na dugme 'Spavkanje' i Bebiron ce zabeleziti vreme kada se Vasa beba uspavala, kako biste mogli da pratite statistiku i opste stanje bebinog rezima spavanja.
                <br />
                Kliknite na dugme 'Budjenje' kako bi Bebiron zabelezio vreme kada se beba probudila.
                <br />
                Ukoliko ne zelite da unosite podatke na klik, mozete upisati vreme spavanja u prozore ispod dugmeta za pocetak spavanja i klikom na dugme 'Zabelezi'.
                <br />
                Klikom na dugme Spavkanje ovaj prozor ce se zatvoriti a Bebiron ce u pozadini meriti vreme spavanja Vase bebe.
              </div>
            )}
            {secondText && (
              <div>
                Pazljivo odaberite opcije od ponudjenih:
                <br />
                Budjenje - memorisacete vreme budjenja Vase bebe.
                <br />
                Nastavak spavanja - kliknite ukoliko ne zelite da prekidate merenje trajanja sna bebe.
                <br />
                Nazad - ovo dugme ce obrisati pocetak spavanja i vratiti Vas na pocetni prozor modula za upisivanje vremena spavanja. Uneti podaci nece biti memorisani (proteklo vreme spavanja).
                <br />
                Info - pruzice Vam informacije o rezimu spavanja Vase bebe.
                <br />
                Zatvoriti - ovo dugme ce obrisati pocetak spavanja i zatoriti prozor 'Spavkanje'.
              </div>
            )}
            {startEnd && (
            <div>
            {startSleeping && (
            <Button onClick={sleepingSubmit} variant="primary">
                Spavkanje
            </Button>
            )}
            {(localStorage.getItem('startSleeping') || dataGrid) && (
            <div>
              <div>
              <b>spavanje od: {`${new Date(JSON.parse(Number(localStorage.getItem('startSleeping')))).getHours()}h : ${new Date(JSON.parse(localStorage.getItem('startSleeping'))).getMinutes()}min, trajanje sna: ${millisecToTimeHours(Date.now() - JSON.parse(localStorage.getItem('startSleeping')))}`}</b>
              </div>
                <div>
                <Button disabled={disabledSleeping} onClick={() => {
                  wakingSubmit();
                  setDisabledSleeping(true);
                }} variant="primary">
                    Budjenje
                </Button>
                </div>
                <div>
                  <Button onClick={sleepingLastingSubmit} variant="primary">
                    Nastavak spavanja
                </Button>
                </div>
                <br />
                {backBtn && (
                <div>
                <Button onClick={back} variant="secondary">
                    Nazad
                </Button>
                </div>
                )}
            </div>
            )}
            </div>
            )}
             <br />
             {inputGroup && (
            <InputGroup className="mb-3">
                <FormControl
                type="number"
                placeholder="sati..."
                aria-label="sati"
                aria-describedby="basic-addon2"
                onChange={(e) => setHours(e.target.value)}
                />
                :
                <FormControl
                type="number"
                placeholder="minuti..."
                aria-label="minuti"
                aria-describedby="basic-addon2"
                onChange={(e) => setMinutes(e.target.value)}
                />
                <InputGroup.Append>
                <InputGroup.Text id="basic-addon2" onClick={handleSleeping} style={{ cursor: "pointer" }}>Zabelezi</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
            )}
          </div>
          )}
          {infoSleeping && (
            <SleepingInfo />
          )}
          </Modal.Body>
          <Modal.Footer className="modal-footer-sleeping">
          <div>
          {info && (
            <Button variant="outline-info" onClick={handleInfoSleep}>
              Info
            </Button>
          )}
          {backInfo && (
              <Button variant="secondary" onClick={handleBackSleep}>
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
};

export default SleepingModal;