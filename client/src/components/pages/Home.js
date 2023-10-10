import React from 'react';
import Auth from './Auth';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import SubHeader from './SubHeader';
import Main from './Main';

const Home = (props) => {
  return (
    <div className='home'>
      <div className='header'>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand href='#home'>Babyon</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto d-flex justify-content-end'>
              <Nav.Link
                onClick={() => {
                  Auth.logout(() => {
                    props.history.push('/');
                  });
                  localStorage.removeItem('userId');
                  localStorage.removeItem('token');
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className='sub-header'>
        <SubHeader />
      </div>
      <div className='main'>
        <Main />
      </div>
    </div>
  );
};

export default withRouter(Home);
