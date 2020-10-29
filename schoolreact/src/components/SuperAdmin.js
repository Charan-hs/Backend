import { Button, Dialog, Icon, makeStyles, TableBody, IconButton, Paper, Table, TableCell, TableContainer, TableRow, } from '@material-ui/core'
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from "../UserContext";
import InstaCreate from './InstaCreate';
import baseURL from './BaseUrl';
import TableHeadOf from './TableHeadOf';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import { Link, useHistory } from 'react-router-dom';


const style = makeStyles(() => ({
    text: {
        padding: '4px',
        marginTop: "10px"
    },
    paperInput: {
        padding: '25px',
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
    },
    link: {
        textDecoration: "none",
        color: "#000",


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

export default function SuperAdmin(props) {
    const history = useHistory();
    const [values, setValues] = useState(intitalFeildValues);
    const [errors, setError] = useState(intitalFeildValues);
    const [error2, setError2] = useState();
    const { userDataf } = useContext(UserContext);
    const [addOpen, setAddOpen] = useState(false);
    const [retValues, setRetValues] = useState([]);
    // const [checkActive,setCheckActive] = useState()





    const deleteHandler = (id) => {
        window.alert("Are You Sure Want To Delete?")
        const url = baseURL + "/data/inst/" + id
        console.log(id)
        const l = async (id) => {
            try {
                const h = await axios.delete(url, { headers: { "x-auth-token": userDataf.token } })
                console.log(h)
                getDetails()
                history.push('/superadmin')
            }
            catch (err) {
                err.response.data.msg && setError2(err.response.data.msg)
            }

        }
        l(id)
    }
    useEffect(() => {
        getDetails()
    }, [values, userDataf])

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues(values => ({
            ...values,
            [name]: value
        })
        )
    }

    const getDetails = async () => {
        try {
            const URL = baseURL + '/data/all'
            const found = await axios.get(URL, { headers: { "x-auth-token": userDataf.token } })
            // console.log(found.data)
            setRetValues(() => found.data)

        } catch (err) {
            err.response.data.msg && setError2(err.response.data.msg)
        }
    }

    const validate = () => {
        var temp = {}
        temp.instEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(values.instEmail) ? "" : "Email is not valid";
        temp.instName = values.instName ? "" : "This feild is required."
        temp.instPhone = values.instPhone.length === 10 ? "" : "Phone number is not vaild."
        temp.instAddress = values.instAddress ? "" : "This feild is required."
        temp.instWebsite = values.instWebsite ? "" : "This feild is required."
        temp.instLogo = values.instLogo ? "" : "This feild is required."
        temp.instMaxNumber = values.instMaxNumber ? "" : "This feild is required."

        setError({
            ...temp
        })

        return Object.values(temp).every(x => x==="")
    }
    //    instName: "",
    //     instEmail: "",
    //     instPhone: "",
    //     instAddress: "",
    //     instWebsite: "",
    //     instLogo: "",
    //     instSubDate: new Date(),
    //     instMaxNumber: "",
    //     instActive: false

    const onSubmitChange = (e) => {
        e.preventDefault()
        var body = values
       
        // console.log(values)
        const create = async (body) => {
            try {
                const URL = baseURL + '/data/inst'
                body.instPhone = "+91"+ body.instPhone
                const newdata = await axios.post(URL, body, { headers: { "x-auth-token": userDataf.token } })
                // console.log(newdata)
                setValues(intitalFeildValues);
                history.push('/superadmin');
                setError('')
                setAddOpen(false)
            } catch (err) {
                err.response.data.msg && setError2(err.response.data.msg)
            }
        }
        if(validate()){
            create(body)
        }
       

    }
    const classes = style();
    return (
        <div>
            <div className={classes.addPaper}  >
                <Button onClick={() => setAddOpen(true)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                >Add New Institute</Button>
            </div>

            <Dialog aria-labelledby="form-dialog-title"
                aria-describedby="simple-dialog-description"
                fullWidth={true}
                maxWidth="md"
                open={addOpen}
                onClose={() => { setAddOpen(false); setValues(intitalFeildValues); setError(intitalFeildValues) }}
                className={classes.modal}
            >
                <InstaCreate {...{ values, setValues,setValues,  errors,error2, setError2, handleChange, onSubmitChange, classes }} />
            </Dialog>
            <Paper>
                <TableContainer component={Paper} className={classes.table}>
                    <Table arial-label='simple table' >
                        <TableHeadOf />
                        <TableBody>

                            {
                                retValues.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Link to={`/superadmin/view/${item._id}`} className={classes.link}>  <Avatar alt={item.instName} src={item.instLogo} /></Link>
                                        </TableCell>
                                        <TableCell >
                                            <Link to={`/superadmin/view/${item._id}`} className={classes.link}>  {item.instName}</Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Link to={`/superadmin/view/${item._id}`} className={classes.link}>  {item.instPhone}</Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Link to={`/superadmin/view/${item._id}`} className={classes.link}> {item.instEmail}</Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Link to={`/superadmin/view/${item._id}`} className={classes.link}>  {item.instActive ? "Active" : "Deactive"}</Link>

                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton color='primary' onClick={() => history.push(`/superadmin/edit/${item._id}`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color='secondary' onClick={() => (deleteHandler(item._id))}>
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
