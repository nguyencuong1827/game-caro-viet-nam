/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateGame = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('res')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/log-in', state: { from: props.location } }} />
    )} />
)
export default PrivateGame;