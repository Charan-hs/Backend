import React, { useContext, useEffect, useState } from 'react';
import BaseUrl from './BaseUrl';
import axios from 'axios'
import UserContext from '../UserContext'
import { Button, Checkbox, FormControlLabel, Grid, makeStyles, Paper, TextField, Typography, } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import ErrorNotice from './ErrorNotice';
import { useHistory } from 'react-router-dom'

const style = makeStyles(() => ({
    text: {
        padding: '4px',
        marginTop: "10px"
    },
    paperInput: {
        padding: '25px',
        margin: '20px',
        width: "90%"
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
    instSubDate: new Date(),
    instMaxNumber: "",
    instActive: false
}

export default function EditSuperAdmin({ match }) {
    const classes = style();
    // console.log(match.params.id)
    const { userDataf } = useContext(UserContext);
    const [valuesToEdit, setValuesToEdit] = useState(intitalFeildValues);
    const [error, setError] = useState();
    const history = useHistory();
    const [errors, setErrors] = useState(intitalFeildValues)


    useEffect(() => {
        togetdata(match.params.id)
    }, [])


    const togetdata = async (id) => {
        const url = BaseUrl + "/data/Inst/" + id
        const foundDataTo = await axios.get(url, { headers: { "x-auth-token": userDataf.token } })
        console.log(foundDataTo)
        setValuesToEdit(foundDataTo.data)
    }
    const validate = () => {
        var temp = {}
        temp.instEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(valuesToEdit.instEmail) ? "" : "Email is not valid";
        temp.instName = valuesToEdit.instName ? "" : "This feild is required."
        temp.instPhone = valuesToEdit.instPhone.length === 13 ? "" : "Phone number is not vaild."
        temp.instAddress = valuesToEdit.instAddress ? "" : "This feild is required."
        temp.instWebsite = valuesToEdit.instWebsite ? "" : "This feild is required."
        temp.instLogo = valuesToEdit.instLogo ? "" : "This feild is required."
        temp.instMaxNumber = valuesToEdit.instMaxNumber ? "" : "This feild is required."

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setValuesToEdit(values => ({
            ...values,
            [name]: value
        })
        )
    }

    const handleChangeActivate = (e) => {
        // console.log(e.target.checked)
        setValuesToEdit(values => ({
            ...values,
            ["instActive"]: e.target.checked
        }))
    }



    const onSubmitChange = (e) => {
        e.preventDefault()
        console.log(valuesToEdit._id)

        const toUpdateInst = async (id, body) => {
            try {
                const url = BaseUrl + "/data/inst/" + id;
                const reply = await axios.put(url, body, { headers: { 'x-auth-token': userDataf.token } })
                if (reply) {
                    console.log(reply)
                    history.push('/superadmin')

                }
            } catch (err) {
                err.response.data.msg && setError(err.response.data.msg)
            }
        }
        if (validate()) {
            toUpdateInst(valuesToEdit._id, valuesToEdit)
        }




    }


    return (
        <div>
            <Paper className={classes.paperInput}>
                <form>
                    <Typography variant="h5">
                        Edit Institute Details
                        </Typography>
                    {error && <ErrorNotice message={error} clearError={() => setError('')} />}
                    <Grid container>

                        <Grid item xs={6}>

                            <TextField
                                name="instName"
                                variant="outlined"
                                label="Institute Name"
                                autoFocus
                                value={valuesToEdit.instName}
                                {...(errors.instName && { error: true, helperText: errors.instName })}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />
                            <TextField
                                name="instEmail"
                                variant="outlined"
                                label="Email"
                                value={valuesToEdit.instEmail}
                                onChange={handleChange}
                                className={classes.text}
                                {...(errors.instEmail && { error: true, helperText: errors.instEmail })}
                                fullWidth />
                            <TextField
                                name="instPhone"
                                variant="outlined"
                                label="Phone"
                                value={valuesToEdit.instPhone}
                                onChange={handleChange}
                                className={classes.text}
                                {...(errors.instPhone && { error: true, helperText: errors.instPhone })}
                                fullWidth />
                            <TextField
                                name="instAddress"
                                variant="outlined"
                                label="Address"
                                value={valuesToEdit.instAddress}
                                multiline
                                rows={3}
                                {...(errors.instAddress && { error: true, helperText: errors.instAddress })}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />
                        </Grid>
                        <Grid item xs={6} className={classes.side}>

                            <TextField
                                name="instWebsite"
                                variant="outlined"
                                label="Website"
                                value={valuesToEdit.instWebsite}
                                {...(errors.instWebsite && { error: true, helperText: errors.instWebsite })}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />
                            <TextField
                                name="instLogo"
                                variant="outlined"
                                label="Logo URL"
                                value={valuesToEdit.instLogo}
                                onChange={handleChange}
                                {...(errors.instLogo && { error: true, helperText: errors.instLogo })}
                                className={classes.text}
                                fullWidth />
                            <TextField
                                name="instMaxNumber"
                                variant="outlined"
                                label="Max Number"
                                value={valuesToEdit.instMaxNumber}
                                onChange={handleChange}
                                {...(errors.instMaxNumber && { error: true, helperText: errors.instMaxNumber })}
                                className={classes.text}
                                fullWidth />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <KeyboardDatePicker
                                    disableToolbar
                                    className={classes.text}
                                    variant="inline"
                                    name="instSubDate"
                                    format="MM/dd/yyyy"
                                    inputVariant="outlined"
                                    margin="normal"
                                    value={valuesToEdit.instSubDate}
                                    label="Subscription End Date"
                                    fullWidth
                                    size="small"
                                    onChange={handleChange}
                                    // value={selectedDate}
                                    // onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <FormControlLabel control={<Checkbox
                                    checked={valuesToEdit.instActive}
                                    name="instActive"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    onChange={handleChangeActivate} />} label="Activate" />

                            </MuiPickersUtilsProvider>
                            <Button variant="contained" color="primary" className={classes.button} type="submit"
                                onClick={onSubmitChange} >
                                Update
                            </Button>


                        </Grid>

                    </Grid>
                </form>
            </Paper>

        </div>
    )
}
