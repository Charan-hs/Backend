import React, { Fragment,  useState, useContext, } from 'react'
import { AppBar, Grid,  Toolbar, makeStyles, Button, TextField,  } from '@material-ui/core';
import useform from './useform';
import {  Modal, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import UserContext from '../UserContext';
import ErrorNotice from './ErrorNotice';
import baseURL from './BaseUrl'





const styles = makeStyles(theme => ({
    toolbar: {
        backgroundColor: "#f6f5f5",
    },
    imgTool: {
        paddingTop: "10px",
        paddingRight: "5px"
    },
    Btm: {
        marginLeft: theme.spacing(2)
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }, paperInput: {
        padding: '25px',
        margin: '20px',
        width: "400px"
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    text: {
        margin: "10px 0px"
    }

}))


const u = {
    userName: "",
    password :"",
    oldPassword : "",
    newPassword : "",
    newConPassword : "",
}

function Header(props) {

    const classes = styles();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [newConPassword, setNewConPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [passwordOpen, setPasswordOpen] = useState(false)
    const { userDataf, setUserDataf, loggged, setLogged } = useContext(UserContext);
    const [errors, setErrors] = useState(u)
    const history = useHistory();
    const [error, setError] = useState('');
    // const [errors,setErrors]= useState('');
    // console.log(userDataf)
    const handleSignOut = () => {
        setUserDataf({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
        history.push('/');

    }

    const handleChangePass = () => {
        setPasswordOpen(true)
    }

    var {
        setLoginOpen,
        isLogin,
        loginOpen,
        setIsLogin,

    } = useform();

    const validate = () => {
        var temp = {}

        temp.userName = userName ? "" : "This Feild is required."
        temp.password = password ? "" : "This Feild is required."
    
// console.log(temp)
        setErrors({
            ...temp
        })
            return Object.values(temp).every(x => x === "")
    }


    const validate2 = () => {
        var temp = {}


        temp.oldPassword = oldPassword ? "" : "This Feild is required."
        temp.newPassword = newPassword ? "" : "This Feild is required."
        temp.newConPassword = newConPassword === newPassword ? "" : "Password did not match."
// console.log(temp)
        setErrors({
            ...temp
        })
            return Object.values(temp).every(x => x === "")
    }

    const handleLogin = (e) => {
        setLoginOpen(true)
    }

    const handlesubmitChange = (e) => {
        e.preventDefault();
       if(validate2()){ try {
            const body = {
                oldPassword: oldPassword,
                password: newPassword,
                id: userDataf.user.id
            }
            // console.log(body)
            const change = async (body) => {
                URL = baseURL + "/user/changepassword";
                try {
                    const resp = await axios.post(URL, body, { headers: { "x-auth-token": userDataf.token } })
                    setPasswordOpen(false)
                    setError('')
                    setErrors(u)
                    setNewConPassword('')
                    setNewPassword('')
                }
                catch (err) {
                    err.response.data.msg && setError(err.response.data.msg)
                }
            }
            change(body);
        } catch (err) {
            console.log(err.response.data.msg)
            err.response.data.msg && setError(err.response.data.msg)

        }}

    }

    const handleDashboard = () => {
        console.log(userDataf.user.role, "dashBoard")
        if (userDataf.user.role) {
            console.log(userDataf.user.role)
            history.push(`/${userDataf.user.role}`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
       if(validate()) {
           console.log("hey login")
        try {
            const body = {
                userName: userName,
                password: password
            }
            const newLogin = async (body) => {
                URL = baseURL + "/user/login"
                try {
                    const resp = await axios.post(URL, body)
                    console.log("ohh noo it's here")
                    setUserDataf({
                        token: resp.data.token,
                        user: resp.data.user,
                    })
                    setLoginOpen(false)
                    localStorage.setItem("auth-token", resp.data.token);
                    setLogged(resp.data.user.role)
                    setUserName('')
                    setPassword('')
                    setError('')
                    setErrors(u)

                } catch (err) {
                    err.response.data.msg && setError(err.response.data.msg)
                }
            }
            newLogin(body)

        }
        catch (err) {
            err.response.data.msg && setError(err.response.data.msg)

        }}
    }



    return (
        <Fragment>
            <AppBar position="sticky" className={classes.toolbar} >
                <Toolbar>
                    <Grid container>
                        <Grid item >
                            <Grid container>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/American_Broadcasting_Company_Logo.svg" alt="logo" width="40" height="40" className={classes.imgTool} />
                                <h3 style={{ color: '#14274e' }}>
                                    ABC Corporation
                            </h3>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                        <Grid item style={{ paddingTop: '12px' }}>
                            {userDataf.user ?
                                <><Button variant="outlined" color="primary" size="small" style={{ marginRight: '12px' }}
                                    onClick={handleDashboard}
                                >
                                    Dashboard
                    </Button>
                                    <Button variant="outlined" color="primary" size="small" style={{ marginRight: '12px' }}
                                        onClick={handleChangePass}
                                    >
                                        Change Password
                            </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        className={classes.btm}
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                            </Button>
                                </> : <Button
                                    variant="outlined" color="primary"
                                    className={classes.btm} onClick={handleLogin}
                                >
                                    Login
                            </Button>}
                        </Grid>

                    </Grid>

                </Toolbar>
            </AppBar>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={loginOpen}
                onClose={() => { setLoginOpen(false); setUserName(''); setPassword(''); setError('');setErrors(u); }}
                className={classes.modal}
            >
                <Paper className={classes.paperInput}>

                    <form className={classes.form}>
                        <Typography
                            variant="h5" >
                            Login
            </Typography>
                        {error && <ErrorNotice message={error} clearError={() => setError('')} />}
                        <TextField
                            name="userName"
                            variant="outlined"
                            label="Username"
                            autoFocus
                            className={classes.text}
                            {...(errors.userName && {error:true,helperText:errors.userName})}

                            value={userName}
                            onChange={(e) => { setUserName(e.target.value) }}

                        />
                        <TextField
                            name="password"
                            variant="outlined"
                            label="Password"
                            type="password"
                            className={classes.text}
                            value={password}
                            {...(errors.password && {error:true,helperText:errors.password})}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                        <Button variant="contained" color="primary" onClick={handleSubmit}
                            type="submit">
                            Login
            </Button>
                    </form>

                </Paper>
            </Modal>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={passwordOpen}
                onClose={() => { setPasswordOpen(false); setNewPassword(''); setOldPassword(''); setNewConPassword(""); setError(''); setErrors(u);}}
                className={classes.modal}
            >
                <Paper className={classes.paperInput}>

                    <form className={classes.form}>
                        <Typography
                            variant="h5" >
                            Change Password
            </Typography>
                        {error && <ErrorNotice message={error} clearError={() => setError('')} />}
                        <TextField
                            name="oldPassword"
                            variant="outlined"
                            label="Current password"
                            autoFocus
                            className={classes.text}
                            {...(errors.oldPassword && {error:true,helperText:errors.oldPassword})}
                            value={oldPassword}
                            onChange={(e) => { setOldPassword(e.target.value) }}

                        />
                        <TextField
                            name="Newpassword"
                            variant="outlined"
                            label="New Password"
                            type="password"
                            className={classes.text}
                            {...(errors.newPassword && {error:true,helperText:errors.newPassword})}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}

                        />
                        <TextField
                            name="NewConpassword"
                            variant="outlined"
                            label="Confirm New Password"
                            type="password"
                            className={classes.text}
                            {...(errors.newConPassword && {error:true,helperText:errors.newConPassword})}
                            value={newConPassword}
                            onChange={(e) => setNewConPassword(e.target.value)}

                        />
                        <Button variant="contained" color="primary" onClick={handlesubmitChange}
                            type="submit">
                            change password
            </Button>
                    </form>

                </Paper>
            </Modal>

        </Fragment>
    )
}


export default Header