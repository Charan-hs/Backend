
import React, { useContext, useEffect, useState } from 'react';
import BaseUrl from './BaseUrl';
import axios from 'axios'
import UserContext from '../UserContext'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, } from '@material-ui/core'
import ErrorNotice from './ErrorNotice';
import { useHistory } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import StudentEdit from './SutdentEdit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import StudentActiveEdit from './StudentActiveEdit';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

const initialValues = {
    instName: "",
    instEmail: "",
    instPhone: "",
    instAddress: "",
    instWebsite: "",
    instLogo: "",
    instSubCat: "",
    instCat: "",
    instActive: false,
    instAdmin: [],
    instSutdentDetails: [],

}

export default function User({ match }) {
    const classes = style();

    const { userDataf } = useContext(UserContext);
    const [open, setOpen] = useState(false)
    const [valuesInst, setValuesInst] = useState(initialValues);
    const [error, setError] = useState();
    const [errors , setErrors] = useState(initialStudent)
    const history = useHistory();
    const [student, setStudent] = useState(initialStudent);
    const [editOpen, setEditOpen] = useState(false);
    const [CurrentId, setCurrentid] = useState({
        id: 0,
        uid: 0
    });


    useEffect(() => {
        togetdata(match.params.id)
    }, [editOpen])

    const handleChange = (e) => {
        const { name, value } = e.target
        setStudent(values => ({
            ...values,
            [name]: value
        })
        )
    }
const editHandale = (idd) => {
    setCurrentid({
        id: valuesInst._id,
        uid: idd
    })       
    setEditOpen(true);

}


const validate = () => {
    var temp ={}
    console.log(student)
    temp.stuName = student.stuName ? "" : "This feild is required."
    temp.stuId = student.stuId ? "" : "This feild is required."
    temp.stuEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(student.stuEmail) ? "" : "Email is not vaild."
    temp.stuPhone = student.stuPhone.length === 10 ? "" : "Phone number is not valid.."
    temp.stuCat = student.stuCat.length !== 0 ? "" : "This feild is required."
    temp.stuSubCat = student.stuSubCat.length > 0 ? "" : "This feild is required."
    temp.stuParentName = student.stuParentName ? "" : "This feild is required."
    temp.stuRelation = student.stuRelation ? "" : "This feild is required."
    temp.stuParentNumber = student.stuParentNumber.length===10 ? "" : "Phone number is not valid."
    temp.stuParentEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(student.stuParentEmail) ? "" : "Email is not vaild."
    console.log(temp)
    setErrors({
        ...temp
    })

    return Object.values(temp).every(x => x==="")

}

    const onSubmitChange = () => {
        // console.log(student)
        // console.log(valuesInst._id)

        const l = async (id, body) => {
            body.stuPhone = "+91"+body.stuPhone
            body.stuParentNumber = "+91"+body.stuParentNumber
            const url = BaseUrl + "/data/af/" + id
            const j = await axios.post(url, body, { headers: { "x-auth-token": userDataf.token } })
            console.log(j)
            setOpen(false)
            setStudent(initialStudent)


        }
        if(validate()){
            l(valuesInst._id, student)
        }
      
    }

    const deleteuser = async(uid) => {
        const result = window.confirm("Are You Sure, You Want To Delete")
        if(result){
        const url = BaseUrl + '/data/st/' + valuesInst._id + '/' + uid
        const val = await axios.delete(url, { headers: { "x-auth-token": userDataf.token } })
        togetdata(match.params.id)
    
    }





    }

    const togetdata = async (id) => {
        if (id){
        const url = BaseUrl + "/data/Inst/" + id
        const foundDataTo = await axios.get(url, { headers: { "x-auth-token": userDataf.token } })
        console.log(foundDataTo.data)
        setValuesInst(l => foundDataTo.data)}
    }
    return (
        <div>
            <Paper className={classes.paperInput}>
                <div className={classes.addPaper}  >
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={() => setOpen(true)}
                    >Add New Student</Button>
                </div>

                <Dialog
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    open={open}
                    onClose={() => setOpen(false)}>
                    <StudentEdit {...{ student, classes, handleChange, onSubmitChange, valuesInst ,errors,setErrors}} />
                </Dialog>
                <Paper>

                    <TableContainer>
                        <Table>
                            <TableHead> <TableRow>
                                <TableCell>
                                    Student Name
                        </TableCell>
                                <TableCell align='right'>
                                    Student ID
                        </TableCell>
                                <TableCell align='right'>
                                    Phone Number
                        </TableCell>
                                <TableCell align='right'>
                                    Email
                        </TableCell>
                                <TableCell align='right'>
                                    Category
                        </TableCell>
                                <TableCell align='right'>
                                    Sub-Category
                        </TableCell>
                                <TableCell align='right'>
                                    Active Status
                        </TableCell>
                                <TableCell align='right'>
                                    Actions
                        </TableCell>
                            </TableRow>

                            </TableHead>
                            <TableBody>
                                {
                                    valuesInst.instSutdentDetails.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {item.stuName}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {item.stuId}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {item.stuPhone}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {item.stuEmail}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {item.stuCat}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {item.stuSubCat}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {item.active ? 'Active' : 'Deactive'}
                                            </TableCell>
                                            <TableCell align='right'>
                                                <IconButton color='primary' onClick={() => editHandale(item._id)} >
                                                    <EditIcon />
                                                </IconButton>
                                            <IconButton color='secondary' onClick={() => deleteuser(item._id)}>
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                <StudentActiveEdit {...{ CurrentId, valuesInst, editOpen, setEditOpen }} />
            </Paper>
            </Paper>
        </div >
    )
}
