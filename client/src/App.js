import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
  } from 'react-router-dom';
  import Start from './components/pages/Start';
  import AppLayout from './components/pages/AppLayout';
  import ProtectedRoute from './components/pages/ProtectedRoute';
 

  import createHistory from 'history/createBrowserHistory';
  const history = createHistory();

const App = () => {
  return ( 
    <Router history={history} basename={process.env.PUBLIC_URL}>
    <div>
      <Switch>
        <Route path='/' exact component={withRouter(Start)} /> 
        <ProtectedRoute exact path='/home' component={withRouter(AppLayout)} /> 
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div> 
    </Router>
  );
};

export default App;