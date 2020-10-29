import { Button, Grid, Paper, TextField, Typography, } from '@material-ui/core'
import React from 'react';
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import ErrorNotice from './ErrorNotice';



export default function InstaCreate({values,error2, setValues,setError2,handleChange,onSubmitChange,classes,errors,}) {
    return (
        <div>
            <Paper className={classes.paperInput}>
                <form>
                    <Typography variant="h5">
                        Add Institute Details
                        </Typography>
                        {error2 && <ErrorNotice message={error2} clearError={() => setError2('')} />}
                    <Grid container>

                        <Grid item xs={6}>

                            <TextField
                                name="instName"
                                variant="outlined"
                                label="Institute Name"
                                autoFocus
                                value={values.instName}
                                onChange={handleChange}
                                className={classes.text}
                                {...(errors.instName && {error:true,helperText:errors.instName} )}
                                required 
                                fullWidth />
                            <TextField
                                name="instEmail"
                                variant="outlined"
                                label="Email"
                                value={values.instEmail}
                                onChange={handleChange}
                                className={classes.text}
                                {...(errors.instEmail && {error:true,helperText:errors.instEmail} )}
                                required 
                                fullWidth />
                            <TextField
                                name="instPhone"
                                variant="outlined"
                                label="Phone"
                                value={values.instPhone}
                                onChange={handleChange}
                                className={classes.text}
                                {...(errors.instPhone && {error:true,helperText:errors.instPhone} )}
                                required 
                                fullWidth />
                            <TextField
                                name="instAddress"
                                variant="outlined"
                                label="Address"
                                value={values.instAddress}
                                {...(errors.instAddress && {error:true,helperText:errors.instAddress} )}
                                required 
                                multiline
                                rows={3}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />
                        </Grid>
                        <Grid item xs={6} className={classes.side}>

                            <TextField
                                name="instWebsite"
                                variant="outlined"
                                label="Website"
                                value={values.instWebsite}
                                {...(errors.instWebsite && {error:true,helperText:errors.instWebsite} )}
                                onChange={handleChange}
                                className={classes.text}
                                required 
                                fullWidth />
                            <TextField
                                name="instLogo"
                                variant="outlined"
                                label="Logo URL"
                                value={values.instLogo}
                                onChange={handleChange}
                                {...(errors.instLogo && {error:true,helperText:errors.instLogo} )}
                                className={classes.text}
                                required 
                                fullWidth />
                            <TextField
                                name="instMaxNumber"
                                variant="outlined"
                                label="Max Number"
                                value={values.instMaxNumber}
                                {...(errors.instMaxNumber && {error:true,helperText:errors.instMaxNumber} )}
                                onChange={handleChange}
                                required 
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
                                    value={values.instSubDate}
                                    label="Subscription End Date"
                                    fullWidth
                                    size="small"
                                    onChange={(date) => setValues(values => ({
                                        ...values,
                                        ['instSubDate'] : date

                                    }))}
                                    // value={selectedDate}
                                    // onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <Button variant="contained" color="primary" className={classes.button}
                                onClick={onSubmitChange} >
                                Save
                            </Button>


                        </Grid>

                    </Grid>
                </form>
            </Paper>
            
        </div>
    )
}
