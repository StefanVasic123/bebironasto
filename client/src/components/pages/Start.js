import React, { useEffect } from 'react';
import { Navbar,
         Nav,
         Form,
         FormControl,
         Button,
         NavDropdown,
         Container,
         Row
} from 'react-bootstrap';
import Registration from '../landing/registration/Registration';
import Login from '../landing/login/Login';
import Auth from './Auth';

import '../../App.css';

const Start = (props) => {
  useEffect(() => {
    if(localStorage.getItem('userId') && localStorage.getItem('token')) {
      Auth.login(() => {
        props.history.push('/home');
      })
    }
  }, [])
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Bebiron</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-flex justify-content-end">
            <Nav.Link><Login /></Nav.Link>
            <Nav.Link><Registration /></Nav.Link>
          </Nav>        
        </Navbar.Collapse>
      </Navbar>
        
        
      <section className="hero">
        <div className="hero-inner">
                <h1><b>Bebiron</b></h1>
                <h2><b>Aplikacija za tek postale roditelje</b></h2>
            <div className="btn"><Registration /></div>
            <div className="btn"><Login /></div> 
        </div>
    </section>
    </div>
  );
};

export default Start;