/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const IsLogin = ({ component: Component, ...rest }) => {
    if(localStorage.getItem('res')){
        return(
            <Route {...rest} render={props => (
                <Component {...props} />
            )} />
        )
    }
    if(!localStorage.getItem('res')){
        return(
            <Route {...rest} render={props => (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )} />
        )
    }
}

const IsNotLogin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !localStorage.getItem('res')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/room', state: { from: props.location } }} />
    )} />
)

const PlayWithHumman = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        global.socket
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/room', state: { from: props.location } }} />
    )} />
)

const Private = {
    IsLogin,
    IsNotLogin,
    PlayWithHumman
}
export default Private
