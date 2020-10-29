import React,{useContext} from 'react'
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../UserContext';
import Home from './Home'

export default function ProtectedRoute({ component: Component, ...rest }) {
    const { userDataf, setUserDataf, loggged, setLogged } = useContext(UserContext);
    return (
         <Route {...rest} render={
            (props) => {
                if (loggged === "superadmin") {
                    return <Component {...props} />
                }

                console.log(loggged)
                return <Redirect to={{
                    pathname: '/'
                }} />
            }
        }

        />
    )
}
