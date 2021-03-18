import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => { 
    return (
        <Route 
            {...rest} 
            render={props => { // returning Route with the Component thats passed in as the render props
                if(Auth.isAuthenticated()) { // if user is loggined
                return <Component {...props} />
                } else {
                    return <Redirect to={
                        {
                        pathname: "/",
                            state: {
                                from: props.location // location is passed through ...rest, then props
                            }
                        }
                    }/>
                }
            }
        }/>
    );
};

export default ProtectedRoute;