import React, { useEffect, useState } from 'react';
import Header from './components/header'
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext'
import { Container } from '@material-ui/core';
import SuperAdmin from './components/SuperAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './components/Admin';
import ProtectedRoute2 from './components/ProtectedRoute2';
import Home from './components/Home';
import EditSuperAdmin from './components/EditSuperAdmin';
import ViewSuperAdmin from './components/ViewSuperAdmin';
import EditAdmin from './components/EditAdmin';
import EditAdminS from './components/EditAdminS';
import './App.css';
import baseURL from './components/BaseUrl'


function App() {



  const [userDataf, setUserDataf] = useState({
    token: undefined,
    user: undefined
  })
  const [loggged, setLogged] = useState("")


  useEffect(() => {
    const checkLogedIn = async () => {
      var token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = ""
      }

      const tokenRes = await axios.post(baseURL + "/user/tovalidate", null, { headers: { "x-auth-token": token } })

      if (tokenRes) {
        const found = await axios.get(baseURL + "/user", { headers: { "x-auth-token": token } })
        // console.log(found.data)
        setUserDataf({
          token: token,
          user: found.data
        })
        setLogged(found.data.role)
        // if(found.data.role ==="admin") history.push('/admin')
        // if(found.data.role ==="superadmin") history.push('/superadmin')
        
        // console.log(found.data.role,"ehat is role")
  
      }

    }
    checkLogedIn()
  }, []);





  return (
    <Router>
      <UserContext.Provider value={{ userDataf, setUserDataf, loggged, setLogged }}>

        <div >

          <Header />
          <Container>
     
              <ProtectedRoute exact path="/superadmin" component={SuperAdmin} />
              <ProtectedRoute2  path="/admin" component={Admin} />
              <Route exact path="/superadmin/edit/:id" component={EditSuperAdmin} />
              <Route exact path="/superadmin/view/:id" component={ViewSuperAdmin} />
              <Route exact path="/suadmin/edit/:id/:uid" component={EditAdmin} />
              <Route exact path="/a/edit/:id" component={EditAdminS} />
              <Route exact path="/" component={Home} />
     
          </Container>
 
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
