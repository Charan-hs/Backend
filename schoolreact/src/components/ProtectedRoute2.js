import React, { useContext, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../UserContext';
import Home from './Home'


export default function ProtectedRoute2({ component: Component, ...rest }) {
    const { userDataf, setUserDataf, loggged, setLogged } = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={props => {
                console.log(loggged)
                if (loggged === "admin") {
                    return <Component {...props} />
                }

                return <Redirect to={{
                    pathname: '/'
                }} />

            }}
        />
    )
}

