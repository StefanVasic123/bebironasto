import React, { useState } from 'react';
import { 
    Button,
    Modal
} from 'react-bootstrap';
import { FormControl, InputGroup, Nav } from 'react-bootstrap';
import axios from 'axios';
import Auth from '../../pages/Auth';
import { withRouter } from 'react-router-dom';


function Registration(props) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(email.match(mailFormat)) {
        axios.post('/api/users', {
            "name": name,
            "email": email,
            "password": password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user.id);
            alert(`Welcome ${name}`);
            Auth.login(() => {
              props.history.push('/home')
            })
        })
        .catch(err => alert('Bad request!'))
        } else {
          alert('You have entered invalid user name or email')
        }
    }
  
    return (
        <div>
          <Nav.Link onClick={handleShow}>
            Registruj se
          </Nav.Link>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Enter your name"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onChange={(e) => setName(e.target.value)}
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Enter your email"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onChange={(e) => setEmail(e.target.value)}
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Enter your password"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onChange={(e) => setPassword(e.target.value)}
                    />
            </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Register
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
  }
  
 export default withRouter(Registration);
 