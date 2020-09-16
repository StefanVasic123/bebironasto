import React, { useState } from 'react';
import { 
    Button,
    Modal,
    FormControl, 
    InputGroup, 
    Nav
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  withRouter
} from "react-router-dom";
import axios from 'axios';
import Auth from '../pages/Auth';


const Login = (props) => {
  let history = useHistory();
  let location = useLocation();
  
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        await axios.post('/api/auth', {
            "email": email,
            "password": password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user.id); // iz nekog ko zna kog razloga je user
        })
        .catch(err => alert("Wrong email or password"))

        const token = localStorage.getItem('token');
        console.log(token);
        config.headers['x-auth-token'] = token;
        
        axios.get('api/auth/user', config) 
            .then(res => {
                console.log(res)
                alert("Successful login!");
                Auth.login(() => {
                  props.history.push('/home');
                })
            })
            .catch(err => alert(err));
    }
  
    return (
        <div>
          <Nav.Link onClick={handleShow}>
            Uloguj se
          </Nav.Link>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
              <Button variant="primary" onClick={() => {
                handleSubmit();
              }}>
                Login
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
  }
  
 export default withRouter(Login);
 