import React, { useState } from 'react';
import { 
    Button,
    Modal,
    FormControl, 
    InputGroup, 
} from 'react-bootstrap';
import RelieveInfo from './RelieveInfo';
import axios from 'axios';
import poop from '../../icons/diaper.svg';
import '../../App.css';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import Toast from 'light-toast';

function RelieveModal() {
    const [show, setShow] = useState(false);
    const { addToast } = useToasts();

    const [regularBody, setRegularBody] = useState(true);
    const [relieveInfoRow, setRelieveInfoRow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [info, setInfo] = useState(true);
    const [back, setBack] = useState(false);

    const relieveSubmit = () => {
      let selected = document.getElementById("inputGroupSelect01-relieve");
      let val = selected.options[selected.selectedIndex].text;

      function getMonth() {
        let month = new Date().getMonth() + 1;
        if(month < 10) {
          return `0${new Date().getMonth() + 1}`
        } else {
          return `${new Date().getMonth() + 1}`
        }
      }

      const newDate = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();

      axios.post('/api/relieve', {
        "userId": localStorage.getItem('userId'), // hide better!
        "description": val,
        "shortDate": `${new Date().getFullYear()}-${getMonth()}-${newDate}`,
        "year": new Date().getFullYear(),
        "month": new Date().getMonth(),
        "day": new Date().getDate(),
        "hours": new Date().getHours(),
        "minutes": new Date().getMinutes(),
        "act": Date.now()
      })
      .then(res => { 
        Toast.success('Uspesno', 500)
        addToast('Uspesno memorisano vreme stolice', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 10000 })
        handleClose();
      })
      .catch(err => {
        Toast.fail('Neuspesno', 500)
        addToast('Neuspesno: 500 - nema internet konekcije; 400 - greska u zahtevu', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 10000 })
        alert(err);
      })
    }

    const handleInfo = () => {
      setRegularBody(false);
      setRelieveInfoRow(true);
      setInfo(false);
      setBack(true);
    }

    const handleBack = () => {
      setRegularBody(true);
      setRelieveInfoRow(false);
      setInfo(true);
      setBack(false);
    }
    return (
      <>
        <Button variant="link" onClick={handleShow}>
        <img src={poop} alt="babypoop" height="100em" width="100em" />
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Ukakanko?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <div>
          {regularBody && (
          <div>
            Kliknite na dugme 'Ukakanko' i Bebiron ce zabeleziti vreme kada se Vasa beba ukakila, kako biste mogli da pratite statistiku i opste stanje bebine stolice.
            Kliknite na dugme Zatvoriti kako biste zatvorili ovaj prozor.
            Dodajte i napomenu u polju ispod, ukoliko zelite.
            <select className="custom-select" id="inputGroupSelect01-relieve">
                <option defaultValue="0">Napomena...</option>
                <option value="0">Zuta</option>
                <option value="1">Zelena</option>
                <option value="2">Braon</option>
                <option value="3">Proliv</option>
                <option value="4">Crvena</option>
            </select>
          </div>
            )}
            {relieveInfoRow && (
            <RelieveInfo />
            )}
          </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer-relieve">
          <div>
          {info && (
            <Button variant="outline-info" onClick={handleInfo}>
              Info
            </Button>
          )}
          {(back && 
              <Button variant="secondary" onClick={handleBack}>
                Nazad
              </Button>
          )}
          </div>
          <div>
            <Button variant="secondary" onClick={handleClose}>
              Zatvoriti
            </Button>
            <Button onClick={relieveSubmit} variant="primary">
              Ukakanko
            </Button>
          </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
 export default RelieveModal;