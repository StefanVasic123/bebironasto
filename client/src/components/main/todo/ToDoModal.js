import React, { useState } from 'react';
import {
    Button,
    Modal,
    FormControl,
    InputGroup
} from 'react-bootstrap';
import diary from '../../../icons/diary.svg';
import axios from 'axios';
import '../../../App.css';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import Toast from 'light-toast';

// State functionst

const monthToLetters = (arg) => {
  let month = new Array();
  month[0] = "Januar";
  month[1] = "Februar";
  month[2] = "Mart";
  month[3] = "April";
  month[4] = "Maj";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Avgust";
  month[8] = "Septembar";
  month[9] = "Octobar";
  month[10] = "Novembar";
  month[11] = "Decembar";

  return month[arg]
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

const MainModal = ({ 
  show, 
  text, 
  setText, 
  note, 
  setNote, 
  setNotesList,
  setNoteList, 
  setList, 
  setMainModal, 
  setShoppingList,
  handleClose
}) => {
  const { addToast } = useToasts();

  const handleText = () => {
    if(text === "") {
      return alert("Ne mozete memorisati belesku bez ijednog karaktera.")
    }
      axios.post('/api/todo/shopping', {
          "userId": localStorage.getItem('userId'),
          "shopping": text,
          "shortDate": `${new Date().getFullYear()}-${getMonth()}-${newDate}`,
          "year": new Date().getFullYear(),
          "month": new Date().getMonth(),
          "day": new Date().getDate(),
          "hours": new Date().getHours(),
          "minutes": new Date().getMinutes(),
      })
      .then(res => {
        setText("");
        Toast.success('Uspesno', 500)
        addToast('Uspesno zapamcen podsetnik za kupovinu', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 10000 })
      })
      .catch(err => alert(err))
  }

  // Post note
const handleNote = () => {
  if(note === "") {
    return alert("Ne mozete memorisati belesku bez ijednog karaktera.")
  }
    axios.post('/api/todo/notes', {
        "userId": localStorage.getItem('userId'),
        "notes": note,
        "shortDate": `${new Date().getFullYear()}-${getMonth()}-${newDate}`,
        "year": new Date().getFullYear(),
        "month": new Date().getMonth(),
        "day": new Date().getDate(),
        "hours": new Date().getHours(),
        "minutes": new Date().getMinutes()
    })
    .then(res => {
      setNote("");
      Toast.success('Uspesno', 500)
      addToast('Uspesno zapamcena beleska', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 10000 })
    })
    .catch(err => alert(err))
}

// Get all shopping items
const handleShoppingInfo = () => {
  axios.post('api/todo/shoppingList', {
      "userId": localStorage.getItem('userId'),
      "notes": String
  })
  .then(res => {
    console.log(res.data);
    setList(res.data);
    setMainModal(false);
    setShoppingList(true);
  })
  .catch(err => alert(err))
}

// Get all notes
const handleNotesInfo = () => {
  axios.post('/api/todo/notesList', {
      "userId": localStorage.getItem('userId'),
      "shopping": String
  })
  .then(res => {
    setNotesList(res.data);
    setNoteList(true);
    setMainModal(false);
  })
  .catch(err => alert(err))
} 
  return(
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Podsetnik</Modal.Title>
    </Modal.Header>
    <Modal.Body>
<h3 style={{ textAlign: "center" }}>Kupovina</h3>
<InputGroup className="mb-3">
  <FormControl
    placeholder=""
    aria-label="Recipient's username"
    aria-describedby="basic-addon2"
    value={text}
    onChange={(e) => setText(e.target.value)}
  />
  <InputGroup.Append>
    <InputGroup.Text id="basic-addon2" onClick={handleText}>Dodaj</InputGroup.Text>
  </InputGroup.Append>
</InputGroup>
<h3 style={{ textAlign: "center" }}>Beleska</h3>
<InputGroup>
  <InputGroup.Prepend>
    <InputGroup.Text onClick={handleNote}>Zabelezi</InputGroup.Text>
  </InputGroup.Prepend>
  <FormControl as="textarea" aria-label="With textarea" value={note} onChange={(e) => setNote(e.target.value)}/>
</InputGroup>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="info" onClick={handleShoppingInfo}>
        Za Kupovinu
      </Button>
      <Button variant="info" onClick={handleNotesInfo}>
        Beleske
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Zatvoriti
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

const ShoppingList = ({ 
  show, 
  list,
  setList,
  handleClose, 
  setMainModal,
  setShoppingList,
 }) => {
  // delete shopping item from todo
const removeShoppingItem = ({ index }) => {
  let removeItem = list[index]._id
    axios.delete(`/api/todo/${removeItem}`)
    .then(res => {
      setList(list.filter(item => item !== list[index]));
      Toast.success('Obrisano', 500)
    })
    .catch(err => alert(err))
}
  // back button shopping list
  const handleShoppingBack = () => {
    setShoppingList(false);
    setMainModal(true);
  }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lista za kupovinu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {list.map((item, index) => (
            <div>
              <ul>
                <li key={index} index={index} className="shopping-list-li">
                  <p>{item.shopping}</p>
                    <Button variant="outline-danger" onClick={() => removeShoppingItem({index})}>
                      Izbrisi
                    </Button> 
                </li>
              </ul>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleShoppingBack}>
            Nazad
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Zatvoriti
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

const NoteList = ({ 
  show, 
  handleClose, 
  setMainModal,
  setNoteList,
  notesList,
  setNotesList
  }) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  // delete clicked note
  const removeNotesText = ({ index }) => {
    let removeItemNotes = notesList[index]._id
    axios.delete(`/api/todo/${removeItemNotes}`)
      .then(res => {
        setNotesList(notesList.filter(item => item !== notesList[index]));
        Toast.success('Obrisano', 500)
      })
      .catch(err => alert(err))
  }
  // show/hide notes on demand
  const handleNotesText = ({ index }) => {
    // list of indexes for many open windows
    if(clickedIndex !== null) {
      setClickedIndex(null);
    }
    setClickedIndex(index);
  }
  // back button notes list
  const handleNotesBack = () => {
    setNoteList(false);
    setMainModal(true);
  }
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Beleske</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {notesList.map((item, index) => (
        <ul>
          <li key={index} index={index} >
          <div className="shopping-list-li">
          <Button variant="outline-info" onClick={() => handleNotesText({ index })}>
            <p>{item.day}.{monthToLetters(item.month)}</p>
            <p>{item.hours}:{item.minutes}</p>
          </Button>
          <Button variant="outline-danger" onClick={() => removeNotesText({ index })}>
              Izbrisi
          </Button> 
          </div>
        {(index === clickedIndex) && (
          <div className="white-space">
            {item.notes}
          </div>
        )}
          </li>
        </ul>
      ))}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="info" onClick={handleNotesBack}>
        Nazad
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Zatvoriti
      </Button>
    </Modal.Footer>
  </Modal>
  )
}


const ToDoModal = () => {
const [show, setShow] = useState(false);

const [text, setText] = useState("");
const [note, setNote] = useState("");

const [mainModal, setMainModal] = useState(true);
const [shoppingList, setShoppingList] = useState(false);
const [noteList, setNoteList] = useState(false);

const [list, setList] = useState([]);
const [notesList, setNotesList] = useState([]);

const [removingItem, setRemovingItem] = useState([]);

const [shoppingInput, setShoppingInput] = useState(true);
const [notesInput, setNotesInput] = useState(true);

const handleClose = () => {
  setShow(false);
  setShoppingList(false);
  setNoteList(false);
  setMainModal(true);
}
const handleShow = () => setShow(true);

return (
  <>
    <Button variant="link" onClick={handleShow}>
    <img src={diary} alt="babypoop" height="100em" width="100em" />
    </Button>

{mainModal && (
<ToastProvider>
  <MainModal 
    show={show}
    text={text}
    setText={setText}
    note={note}
    setNote={setNote}
    setNoteList={setNoteList}
    setMainModal={setMainModal}
    setShoppingList={setShoppingList}
    list={list}
    setList={setList}
    notesList={notesList}
    setNotesList={setNotesList}
    handleClose={handleClose}
  />
</ToastProvider>
)}

  {shoppingList && (
    <ShoppingList 
      show={show}
      list={list}
      setList={setList}
      handleClose={handleClose}
      setMainModal={setMainModal}
      setShoppingList={setShoppingList}
    />
  )}

{noteList && (
  <NoteList 
  show={show}
  handleClose={handleClose} 
  setMainModal={setMainModal}
  setNoteList={setNoteList}
  notesList={notesList}
  setNotesList={setNotesList}
  />
  )}
  </>
);
};

export default ToDoModal;