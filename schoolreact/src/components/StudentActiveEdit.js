import React, { useContext, useEffect, useState } from 'react';

import { Button, Grid, TextField, DialogContent, DialogTitle, Dialog, makeStyles, Slide, FormControlLabel, Checkbox } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BaseUrl from './BaseUrl';
import Axios from 'axios';
import UserContext from '../UserContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const initialStudent = {
    stuName: '',
    stuId: '',
    stuEmail: '',
    stuPhone: '',
    stuCat: '',
    stuSubCat: '',
    stuParentName: '',
    stuRelation: '',
    stuParentNumber: '',
    stuParentEmail: '',
    active: false
}

const style = makeStyles(() => ({


    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    }, addPaper: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: '7px'
    },
    paperInput: {
        padding: '15px',
        margin: '20px',
    }, text: {
        padding: '4px',
        marginTop: "10px"
    }, side: {
        paddingLeft: "20px"
    }, btn: {
        marginBottom: "10px"
    }
}))

export default function SutdentEdit({ CurrentId, valuesInst, editOpen, setEditOpen }) {

    const [editStudent, setEditSudent] = useState(initialStudent);
    const { userDataf } = useContext(UserContext);
    const [errors,setErrors] = useState(initialStudent)

    const classes = style();

    useEffect(() => {
        toGetStudentDe(CurrentId.id, CurrentId.uid)
    }, [editOpen])


    const toGetStudentDe = async (id, uid) => {
        const url = BaseUrl + '/data/st/' + id + '/' + uid
        const val = await Axios.get(url, { headers: { "x-auth-token": userDataf.token } })
        console.log(val.data);
        setEditSudent(val.data)

    }

    const handleChangedd = (e) => {
        console.log(e.target.checked)
        setEditSudent(values => ({
            ...values,
            ['active']: e.target.checked
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditSudent(values => ({
            ...values,
            [name]: value
        })
        )
    }
    const validate = () => {
        var temp ={}
        temp.stuName = editStudent.stuName ? "" : "This feild is required."
        temp.stuEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(editStudent.stuEmail) ? "" : "Email is not vaild."
        temp.stuPhone = editStudent.stuPhone.length===13 ? "" : "Phone number is not valid.."
        temp.stuCat = editStudent.stuCat.length !== 0 ? "" : "This feild is required."
        temp.stuSubCat = editStudent.stuSubCat.length !== 0 ? "" : "This feild is required."
        temp.stuParentName = editStudent.stuParentName ? "" : "This feild is required."
        temp.stuRelation = editStudent.stuRelation ? "" : "This feild is required."
        temp.stuParentNumber = editStudent.stuParentNumber.length===13 ? "" : "Phone number is not valid."
        temp.stuParentEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(editStudent.stuParentEmail) ? "" : "Email is not vaild."
        
        setErrors({
            ...temp
        })
    
        return Object.values(temp).every(x => x==="")
    
    }




    const onSubmitChange1 = () => {

        const l = async () => {
            const url = BaseUrl + '/data/st/' + CurrentId.id + '/' + CurrentId.uid
            const val = await Axios.post(url, editStudent, { headers: { "x-auth-token": userDataf.token } })
            setEditSudent(initialStudent)
            setEditOpen(false)
        }
if(validate()){
    l()
}
       

    }

    return (
        <>
            <Dialog TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                open={editOpen}
                onClose={() => setEditOpen(false)}>
                <DialogTitle>
                   Edit Student Details
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField
                                name="stuName"
                                variant="outlined"
                                label="Student Name"
                                autoFocus
                                {...(errors.stuName && { error: true, helperText: errors.stuNam })}
                                value={editStudent.stuName}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />
                            <TextField
                                name="stuId"
                                variant="outlined"
                                label="Student Id"
                                {...(errors.stuId && { error: true, helperText: errors.stuId })}
                              
                                value={editStudent.stuId}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />
                            <TextField
                                name="stuEmail"
                                variant="outlined"
                                label="Student Email"
                                {...(errors.stuEmail && { error: true, helperText: errors.stuEmail })}
                                value={editStudent.stuEmail}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />
                            <TextField
                                name="stuPhone"
                                variant="outlined"
                                label="Student Phone Number"
                                {...(errors.stuPhone && { error: true, helperText: errors.stuPhone })}
                             
                                value={editStudent.stuPhone}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />

                            <FormControl variant="outlined" className={classes.text} fullWidth 
                            {...(errors.stuCat && { error: true })}
                            >
                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={editStudent.stuCat}
                                    name="stuCat"
                                    onChange={handleChange}
                                    label="Category"

                                >

                                    {valuesInst.instCat? (valuesInst.instCat.split(' ').map((item, index) =>
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        )):<MenuItem  value={0}>none</MenuItem>

                                       

                                    }
                                </Select>
                                {errors.stuCat && <FormHelperText>
                                {errors.stuCat}
                            </FormHelperText>}
                            </FormControl>


                        </Grid>

                        <Grid item xs={6} className={classes.side}>
                            <FormControl variant="outlined" 
                            {...(errors.stuCat && { error: true })}
                            className={classes.text} fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Sub-Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={editStudent.stuSubCat}
                                    onChange={handleChange}
                                    label="Sub-Category"
                                    name="stuSubCat"

                                >
                                    {valuesInst.instSubCat?( valuesInst.instSubCat.split(' ').map((item, index) =>
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        )):<MenuItem  value={0}>none</MenuItem>

                                    }


                                </Select>
                                {errors.stuCat && <FormHelperText>
                                {errors.stuSubCat}
                            </FormHelperText>}
                            </FormControl>

                            <TextField
                                name="stuParentName"
                                variant="outlined"
                                label="Parent Name"
                                {...(errors.stuParentName && { error: true, helperText: errors.stuParentName })}
                                value={editStudent.stuParentName}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />
                            <TextField
                                name="stuRelation"
                                variant="outlined"
                                label="RelationShip"
                                {...(errors.stuRelation && { error: true, helperText: errors.stuRelation })}
                                value={editStudent.stuRelation}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />
                            <TextField
                                name="stuParentNumber"
                                variant="outlined"
                                label="Parent Phone Number"
                                {...(errors.stuParentNumber && { error: true, helperText: errors.stuParentNumber })}
                                value={editStudent.stuParentNumber}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />
                            <TextField
                                name="stuParentEmail"
                                variant="outlined"
                                label="Parent Email"
                                {...(errors.stuParentEmail && { error: true, helperText: errors.stuParentEmail })}
                                value={editStudent.stuParentEmail}
                                onChange={handleChange}
                                className={classes.text}
                                fullWidth />
                        </Grid>

                    </Grid>
                    <FormControlLabel control={<Checkbox
                        checked={editStudent.active}
                        name="active"
                        inputProps={{ 'aria-label': 'primary checkbox' }}

                        onChange={handleChangedd} />} label="Activate" />
                    <div className={classes.modal}>
                        <Button className={classes.btn}
                            variant="contained" color="primary" type="submit"
                            onClick={onSubmitChange1} >
                            Edit
                            </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
