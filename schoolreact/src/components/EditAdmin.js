import { Button, Grid, makeStyles, Paper, TextField, Typography} from '@material-ui/core'
import Axios from 'axios';
import React,{useContext,useEffect,useState} from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext';
import BaseUrl from './BaseUrl';


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
    },modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },addPaper:{
        display:'flex',
        flexDirection:'row-reverse',
        marginTop:'7px'
    }
}))


const intitalAdminValues = {
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    adminUserName: '',
    adminEmplyDes: '',
    adminEmplyId: '',
    adminId: '',
}


export default function EditAdmin({match}) {
    console.log(match)
    const history = useHistory();
    const { userDataf} = useContext(UserContext);
    const [valuesToEdit,setValuesToEdit] = useState(intitalAdminValues);
    const [error, setError] = useState();
    const [errors,setErrors] = useState(intitalAdminValues)

useEffect(() => {
    getAdminDetails(match.params.id,match.params.uid)
},[])

const getAdminDetails = async (id,uid) => {
    const url = BaseUrl + '/data/admin/'+id+"/"+uid
    const foundAdmin = await Axios.get(url,{headers:{'x-auth-token':userDataf.token}})
    console.log(foundAdmin,"found Admin")
    setValuesToEdit(foundAdmin.data)
}


const EditAdmin = (e) => {
    e.preventDefault()
    console.log(valuesToEdit)
    const submitEdit = async (id,uid) => {
        const url = BaseUrl + '/data/admin/'+id+"/"+uid
        const foundEdited = await Axios.post(url,valuesToEdit,{headers:{'x-auth-token':userDataf.token}})
    console.log(foundEdited)
    history.push('/superadmin/view/'+id)

    }
    if(validate()){
        submitEdit(match.params.id,match.params.uid)
    }
    

}

const validate = () => {
    var temp ={}
    temp.adminName = valuesToEdit.adminName ? "" : "This feild is required."
        temp.adminEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(valuesToEdit.adminEmail) ? "" : "Email is not valid."
        temp.adminPhone = valuesToEdit.adminPhone.length === 13 ? "" : "Phone number is not valid."
        temp.adminEmplyDes = valuesToEdit.adminEmplyDes ? "" : "This feild is required."
        temp.adminEmplyId = valuesToEdit.adminEmplyId ? "" : "This feild is required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x==='')

}

const handleChangeadmin = (e) => {
    console.log(e)
    const {name,value} = e.target
    setValuesToEdit(values => ({
        ...values,
        [name]:value}
    ))
}

    const classes = style()
    return (
        <div><Paper className={classes.paperInput} >
            <form>
            <Typography variant="h5">
                        Edit Admin Details
                        </Typography>
                        <Grid container >
                                <Grid item xs={6}>
                                <TextField
                                        name="adminUserName"
                                        variant="outlined"
                                        label="Username"
                                        value={valuesToEdit.adminUserName}
                                        disabled
                                        className={classes.text}
                                        required
                                        fullWidth />
                                    <TextField
                                        name="adminName"
                                        variant="outlined"
                                        label="Full Name"
                                        {...(errors.adminName && {error:true,helperText:errors.adminName})}
                                        value={valuesToEdit.adminName}
                                        onChange={handleChangeadmin}
                                        className={classes.text}
                                        required
                                        fullWidth />
                                    <TextField
                                        name="adminPhone"
                                        variant="outlined"
                                        label="Phone"
                                        {...(errors.adminPhone && {error:true,helperText:errors.adminPhone})}
                                        value={valuesToEdit.adminPhone}
                                        onChange={handleChangeadmin}
                                        className={classes.text}
                                        required
                                        fullWidth />
     
                                </Grid>
                                <Grid item xs={6} className={classes.side}>
                                <TextField
                                        name="adminEmail"
                                        variant="outlined"
                                        label="Email"
                                        value={valuesToEdit.adminEmail}
                                        onChange={handleChangeadmin}
                                        {...(errors.adminEmail && {error:true,helperText:errors.adminEmail})}
                                        className={classes.text}
                                        required
                                        fullWidth />
                                <TextField
                                        name="adminEmplyId"
                                        variant="outlined"
                                        label="Employee ID"
                                        value={valuesToEdit.adminEmplyId}
                                        {...(errors.adminEmplyId && {error:true,helperText:errors.adminEmplyId})}
                                        onChange={handleChangeadmin}
                                        className={classes.text}
                                        required
                                        fullWidth />
                                    <TextField
                                        name="adminEmplyDes"
                                        variant="outlined"
                                        label="Employee Designation"
                                        value={valuesToEdit.adminEmplyDes}
                                        {...(errors.adminEmplyDes && {error:true,helperText:errors.adminEmplyDes})}
                                        onChange={handleChangeadmin}
                                        className={classes.text}
                                        required
                                        fullWidth />

                                </Grid>
                                <Grid item xs={12} className={classes.pic}>
                                    <Button className={classes.text}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={EditAdmin}
                                    >
                                        Save
                                        </Button>
                                </Grid>

                            </Grid>
            </form>
        </Paper>
            
        </div>
    )
}
