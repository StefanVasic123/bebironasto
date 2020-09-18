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
  import Info from './components/subheader/info/Info';
  import Notes from './components/subheader/notes/Notes';
  import Forum from './components/subheader/forum/Forum';
  import Advice from './components/subheader/advice/Advice';
  import QA from './components/subheader/qa/QA';
 

  import createHistory from 'history/createBrowserHistory';
  const history = createHistory();

const App = () => {
  return ( 
    <Router history={history} basename={process.env.PUBLIC_URL}>
    <div>
      <Switch>
        <Route path='/' exact component={withRouter(Start)} /> 
        <ProtectedRoute exact path='/home' component={withRouter(AppLayout)} /> 
        <Route path='/info' component={withRouter(Info)} />
        <Route path='/beleske' component={withRouter(Notes)} />
        <Route path='/saveti' component={withRouter(Advice)} />
        <Route path='/forum' component={withRouter(Forum)} />
        <Route path='/q-a' component={withRouter(QA)} />

        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div> 
    </Router>
  );
};

export default App;