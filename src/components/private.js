/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateGame = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('res')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

const PrivateInfo = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('res')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

const PrivateRoom = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('res')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
const IsLogin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !localStorage.getItem('res')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/room', state: { from: props.location } }} />
    )} />
)

const PrivateChangePassword = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('res')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

const Private = {
    PrivateGame,
    PrivateInfo,
    PrivateRoom,
    IsLogin, 
    PrivateChangePassword
};
export default Private;