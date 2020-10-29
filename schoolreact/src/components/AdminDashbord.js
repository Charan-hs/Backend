import React, { useContext, useEffect, useState } from 'react';
import BaseUrl from './BaseUrl';
import axios from 'axios'
import UserContext from '../UserContext'
import {  Grid, makeStyles, Paper,  } from '@material-ui/core'
// import ErrorNotice from './ErrorNotice';
import { useHistory } from 'react-router-dom'

const style = makeStyles(() => ({
    text: {
        padding: '4px',
        marginTop: "10px"
    },
    paperInput: {
        padding: '25px',
        margin: '20px',
        width: "50%"
    },
    side: {
        paddingLeft: "20px"
    },
    button: {
        marginLeft: "30px",
        margin: "10px 0"
    }, modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }, addPaper: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: '7px'
    }
}))

const intitalFeildValues = {
    instName: "",
    instEmail: "",
    instPhone: "",
    instAddress: "",
    instWebsite: "",
    instLogo: "",
    instSubCat: "",
    instCat: "",
    instActive: false,
    instSutdentDetails:[]
}
export default function AdminDashbord({ match }) {
    const classes = style();

    const { userDataf } = useContext(UserContext);
    const [valuesToEdit, setValuesToEdit] = useState(intitalFeildValues);
    const [error, setError] = useState();
    const history = useHistory();
    const [activeUser,setActiveUser] = useState(0)


    useEffect(() => {
        togetdata(match.params.id)
    }, [])


    const togetdata = async (id) => {
        const url = BaseUrl + "/data/Inst/" + id
        const foundDataTo = await axios.get(url, { headers: { "x-auth-token": userDataf.token } })
        console.log(foundDataTo)
        setValuesToEdit(foundDataTo.data)
        foundDataTo.data.instSutdentDetails.map(item => {
            if(item.active){
                setActiveUser(val => val+1)
            }
        })
        
    }
    return (
        <div className={classes.modal}>
            <Paper className={classes.paperInput}>
                <Grid container >
                    <Grid item xs={6}>
                        Total Number of Students
                    </Grid>
                    <Grid item xs={6}>
                        {valuesToEdit.instSutdentDetails.length}

                    </Grid>
                    <Grid item xs={6}>
                        Total Number of  Active Students
                    </Grid>
                    <Grid item xs={6}>
                        {activeUser}

                    </Grid>
                    <Grid item xs={6}>
                        Total Number Inactive Students
                    </Grid>
                    <Grid item xs={6}>
                        {valuesToEdit.instSutdentDetails.length-activeUser}

                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}
