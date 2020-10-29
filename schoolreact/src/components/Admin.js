import { Grid,  makeStyles,  Paper, Typography,   } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import {  Route, useHistory } from 'react-router-dom';
import UserContext from '../UserContext';
import axios from 'axios';
import BaseUrl from './BaseUrl';
import AdminDashbord from './AdminDashbord';
import Institution from './Institution';
import User from './User';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SchoolIcon from '@material-ui/icons/School';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = makeStyles(() => ({
    paper: {
        marginTop: "20px",
        padding: "20px",
    },
    item: {
        margin: "20px"
    },
    pic: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }, addPaper: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: '7px'
    }, editbtn: {
        marginBottom: "10px"
    },
    paperInput: {
        padding: '25px',

    },
    side: {
        paddingLeft: "20px"
    },
    text: {
        padding: '4px',
        marginTop: "10px"
    },
    root: {
        width: 600,
        margin: "7px 0"
    },
}))

const intitalFeildValues = {
    instName: "",
    instEmail: "",
    instPhone: "",
    instAddress: "",
    instWebsite: "",
    instLogo: "",
    instSubDate: "",
    instMaxNumber: "",
    instActive: false,
    instAdmin: []
}
const intitalAdminValues = {
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    adminUserName: '',
    adminEmplyDes: '',
    adminEmplyId: '',
    adminId: '',


}


export default function ViewSuperAdmin({ match }) {
    const classes = styles();
    const { userDataf } = useContext(UserContext);
    const [valuesToView, setValuesToView] = useState(intitalFeildValues);
    const [valuesAdmin, setValuesAdmin] = useState(intitalAdminValues)
    const [error, setError] = useState();
    const history = useHistory();
    const [value, setValue] = React.useState(-1);
    const [isActive,setIsActive] = useState(false)



    useEffect(() => {
        togetdata(match.params.id)
    }, [valuesAdmin,value,match.params])


    const togetdata = async (id) => {
        const url = BaseUrl + "/data/get/admin"
        const foundDataTo = await axios.get(url, { headers: { "x-auth-token": userDataf.token } })
        setValuesToView(foundDataTo.data)
        console.log(foundDataTo.data)
        setIsActive(foundDataTo.data.instActive)
    }



    // console.log(valuesToView.instLogo,"Logo")

    // console.log(match.params.id, "view")
    return (
        <div>
            {
            isActive?<><Paper className={classes.paper}>
                <Grid container >
                    <Grid item xs={2} className={classes.pic}>
                        <img src={valuesToView.instLogo} style={{'object-fit':'cover'}}
                            width="150" height="150" style={{ borderRadius: "80px" }} alt={valuesToView.instName} />
                    </Grid>
                    <Grid item className={classes.item} xs={8} >
                        <Typography variant="h2" >
                            {valuesToView.instName}
                        </Typography>
                        <Typography variant="body1" >
                            {"Website :  " + valuesToView.instWebsite}
                        </Typography>
                        <Typography variant="body1" >
                            {"Phone Number :  " + valuesToView.instPhone}
                        </Typography>
                        <Typography variant="body1" >
                            {"Email :  " + valuesToView.instEmail}
                        </Typography>
                        <Typography variant="body1" >
                            {"Address :  " + valuesToView.instAddress}
                        </Typography>
                        <Typography variant="body1" >
                            {"Subscription End Date :  " + (valuesToView.instSubDate).slice(0, 10)}
                        </Typography>
                        <Typography variant="body1" >
                            {valuesToView.instActive ? "Activated" : "Deactivated"}
                        </Typography>
                    </Grid>
                   
                </Grid>

            </Paper>
            <div className={classes.pic}>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction label="Dashboard"
                        icon={<DashboardIcon />} 
                        onClick={() => history.push(`/admin/dashboard/${valuesToView._id}`)}
                        />
                    <BottomNavigationAction label="Institution"
                        onClick={() => history.push(`/admin/institution/${valuesToView._id}`)}
                        icon={<SchoolIcon />} />
                    <BottomNavigationAction label="User" icon={<AccountCircleIcon />}
                    onClick={() => history.push(`/admin/user/${valuesToView._id}`)} />
                </BottomNavigation>
            </div>

            <Route exact path='/admin/dashboard/:id' component={AdminDashbord} />
            <Route exact path='/admin/institution/:id' component={Institution} />
            <Route exact path='/admin/user/:id' component={User} />
        </>:<>
        
        <Paper className={classes.paper}>
            <h2>
                Your Account is Inactive. Please Contact Super Admin 
            </h2>
            <h4>
                Mobile Number : +91999999999
            </h4>

        </Paper>
        
        </>

        }
        
        
        
        
        </div>
    )
}
