import { Button, Dialog, Grid, Icon, makeStyles, Paper, Typography, TextField, TableContainer, TableHead, TableBody, TableRow, TableCell, Table, IconButton } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext';
import axios from 'axios';
import BaseUrl from './BaseUrl';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';


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
    const [addAdminOpen, setAddAdminOpen] = useState(false);
    const [valuesAdmin, setValuesAdmin] = useState(intitalAdminValues)
    const [errors, setErrors] = useState(intitalAdminValues);
    const [errors2, setErrors2] = useState();
    const history = useHistory();
    const [adminConPassword, setAdminConPassword] = useState('')
    const [adminPassword, setAdminPassword] = useState('')
    const [con, setCon] = useState(false)



    useEffect(() => {
        togetdata(match.params.id)
    }, [addAdminOpen, valuesAdmin, con])


    const togetdata = async (id) => {
        const url = BaseUrl + "/data/Inst/" + id
        const foundDataTo = await axios.get(url, { headers: { "x-auth-token": userDataf.token } })
        console.log(foundDataTo.data)
        setValuesToView(foundDataTo.data)
        console.log((foundDataTo.data.instSubDate).slice(0, 10))

    }
    const handleChangeadmin = (e) => {
        const { name, value } = e.target
        setValuesAdmin(values => ({
            ...values,
            [name]: value
        })
        )
    }
    const handleChangeCon = (e) => {
        setAdminConPassword(e.target.value)
    }
    const handleChangePwd = (e) => {
        setAdminPassword(e.target.value)
    }

    const deleteHandler = (id) => {
        const result = window.confirm("Are You Sure Want To Delete?")
        if (result) {
            const url = BaseUrl + "/data/inst/" + id
            console.log(id)
            const l = async (id) => {
                try {
                    const h = await axios.delete(url, { headers: { "x-auth-token": userDataf.token } })
                    console.log(h)
                    history.push('/superadmin')
                }
                catch (err) {
                    err.response.data.msg && setErrors2(err.response.data.msg)
                }

            }
            l(id)
        }
    }

    const deleteHandlerAdmin = (id) => {
        const result = window.confirm("Are You Sure Want To Delete?");
        if (result) {
            const url = BaseUrl + '/data/admin/' + match.params.id + "/" + id;
            const l = async () => {
                try {
                    const h = await axios.delete(url, { headers: { "x-auth-token": userDataf.token } })
                    console.log(h)
                    history.push('/superadmin/view/' + match.params.id)
                    setCon(d => !d)
                }
                catch (err) {
                    err.response.data.msg && setErrors2(err.response.data.msg)
                }

            }
            l()
        }

    }
    const validate = () => {
        var temp = {}
        temp.adminName = valuesAdmin.adminName ? "" : "This feild is required."
        temp.adminEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(valuesAdmin.adminEmail) ? "" : "Email is not valid."
        temp.adminPhone = valuesAdmin.adminPhone.length === 10 ? "" : "Phone number is not valid."
        temp.adminUserName = valuesAdmin.adminUserName.length>3 ? "" : "Username must be 4 character long."
        temp.adminEmplyDes = valuesAdmin.adminEmplyDes ? "" : "This feild is required."
        temp.adminEmplyId = valuesAdmin.adminEmplyId ? "" : "This feild is required."
  
        temp.adminPassword = adminPassword.length>7 ? "" : "Password must be 8 character long."
        temp.adminConPassword =adminConPassword ? "" : "This feild is required."
        temp.adminConPassword = adminPassword === adminConPassword ? "" : "Password did not match."

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x==='')

    }
    


    const submitAdmin = (e) => {
        e.preventDefault()
        const RegId = async () => {
            console.log("came here")
            const refUrl = BaseUrl + '/user/register';
            const upUrl = BaseUrl + "/data/admin/add/" + match.params.id;
            const body = {
                userName: valuesAdmin.adminUserName,
                password: adminPassword
            }


            const resp = await axios.post(refUrl, body, { headers: { "x-auth-token": userDataf.token } })
            setValuesAdmin(values => ({
                ...values,
                ["adminId"]: resp.data._id
            }))
            var body2 = { ...valuesAdmin };
            body2.adminId = resp.data._id;
            body2.adminPhone = "+91" + body2.adminPhone
            // console.log(resp.data._id)
            // console.log(body2)
            const updaadmin = await axios.post(upUrl, body2, { headers: { "x-auth-token": userDataf.token } })
            setValuesAdmin(intitalAdminValues)
            setAddAdminOpen(false)
            setAdminPassword('')
            setAdminConPassword('')
            // console.log(updaadmin)
        }
        if (validate()) {
            console.log("paassed")
            RegId()
        }

    }




    // console.log(valuesToView.instLogo,"Logo")

    // console.log(match.params.id, "view")
    return (
        <div>
            <Paper className={classes.paper}>
                <Grid container >
                    <Grid item xs={2} className={classes.pic}>
                        <img src={valuesToView.instLogo}
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
                            {valuesToView.instActive ? "Activate" : "Deactivate"}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} className={classes.pic}>
                        <div className={classes.btnG}>

                            <Button variant="contained"
                                color="primary"
                                className={classes.editbtn}
                                onClick={() => history.push(`/superadmin/edit/${valuesToView._id}`)}
                            >Edit</Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => (deleteHandler(valuesToView._id))}
                            >Delete</Button>
                        </div>

                    </Grid>
                </Grid>

            </Paper>
            <Paper className={classes.paper} >
                <Dialog aria-labelledby="form-dialog-title"
                    aria-describedby="simple-dialog-description"
                    fullWidth={true}
                    maxWidth="md"
                    open={addAdminOpen}
                    onClose={() => { setAddAdminOpen(false); setValuesAdmin(intitalAdminValues); setErrors('') }}
                    className={classes.pic}
                >
                    <Paper className={classes.paperInput}>
                        <form>
                            <Typography variant="h5">
                                Add New Admin
                        </Typography>
                            <Grid container >
                                <Grid item xs={6}>
                                    <TextField
                                        name="adminName"
                                        variant="outlined"
                                        label="Full Name"
                                        value={valuesAdmin.adminName}
                                        onChange={handleChangeadmin}
                                        className={classes.text}
                                        required
                                        {...(errors.adminName && {error:true,helperText:errors.adminName})}

                                        fullWidth />
                                    <TextField
                                        name="adminPhone"
                                        variant="outlined"
                                        label="Phone"
                                        value={valuesAdmin.adminPhone}
                                        onChange={handleChangeadmin}
                                        className={classes.text}
                                        required
                                        {...(errors.adminPhone && {error:true,helperText:errors.adminPhone})}
                                        fullWidth />
                                    <TextField
                                        name="adminEmail"
                                        variant="outlined"
                                        label="Email"
                                        value={valuesAdmin.adminEmail}
                                        onChange={handleChangeadmin}
                                        className={classes.text}
                                        required
                                        {...(errors.adminEmail && {error:true,helperText:errors.adminEmail})}
                                        fullWidth />
                                    <TextField
                                        name="adminEmplyId"
                                        variant="outlined"
                                        label="Employee ID"
                                        value={valuesAdmin.adminEmplyId}
                                        onChange={handleChangeadmin}
                                        className={classes.text}
                                        required
                                        {...(errors.adminEmplyId && {error:true,helperText:errors.adminEmplyId})}
                                        fullWidth />



                                </Grid>
                                <Grid item xs={6} className={classes.side}>
                                    <TextField
                                        name="adminEmplyDes"
                                        variant="outlined"
                                        label="Employee Designation"
                                        value={valuesAdmin.adminEmplyDes}
                                        onChange={handleChangeadmin}
                                        className={classes.text}
                                        required
                                        {...(errors.adminEmplyDes && {error:true,helperText:errors.adminEmplyDes})}
                                        fullWidth />
                                    <TextField
                                        name="adminUserName"
                                        variant="outlined"
                                        label="Username"
                                        value={valuesAdmin.adminUserName}
                                        onChange={handleChangeadmin}
                                        className={classes.text}
                                        required
                                        {...(errors.adminUserName && {error:true,helperText:errors.adminUserName})}
                                        fullWidth />
                                    <TextField
                                        name="adminPassword"
                                        variant="outlined"
                                        label="Password"
                                        type="password"
                                        value={adminPassword}
                                        onChange={handleChangePwd}
                                        className={classes.text}
                                        required
                                        {...(errors.adminPassword && {error:true,helperText:errors.adminPassword})}
                                        fullWidth />
                                    <TextField
                                        name="adminConPassword"
                                        variant="outlined"
                                        label="Confirm Password"
                                        type="password"
                                        value={adminConPassword}
                                        onChange={handleChangeCon}
                                        className={classes.text}
                                        required
                                        {...(errors.adminConPassword && {error:true,helperText:errors.adminConPassword})}
                                        fullWidth />


                                </Grid>
                                <Grid item xs={12} className={classes.pic}>
                                    <Button className={classes.text}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={submitAdmin}
                                    >
                                        Save
                                        </Button>
                                </Grid>

                            </Grid>

                        </form>
                    </Paper>
                </Dialog>


                <div className={classes.addPaper}  >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setAddAdminOpen(true)}
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}
                    >Add New Admin</Button>
                </div>
                <TableContainer component={Paper} xs={12}>
                    <Table arial-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Name
    </TableCell>
                                <TableCell align="right">
                                    Username
    </TableCell>
                                <TableCell align="right">
                                    Email
    </TableCell>
                                <TableCell align="right">
                                    Phone
    </TableCell>
                                <TableCell align="right">
                                    Employee Id
    </TableCell>
                                <TableCell align="right">
                                    Employee Designation
    </TableCell>
                                <TableCell align="right">
                                    Action
    </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {valuesToView.instAdmin.map((item, index) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        {item.adminName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.adminUserName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.adminEmail}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.adminPhone}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.adminEmplyId}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.adminEmplyDes}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color='primary' onClick={() => history.push(`/suadmin/edit/${match.params.id}/${item._id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color='secondary' onClick={() => (deleteHandlerAdmin(item._id))}>
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                            }


                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>

        </div>
    )
}
