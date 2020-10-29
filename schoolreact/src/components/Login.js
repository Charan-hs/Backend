import { Input, Modal, Paper, Typography } from '@material-ui/core'
import React,{useEffect} from 'react';
import useForm from'./useform';

export default function Login() {
    var {
        loginOpen,
        setLoginOpen
    } = useForm();

    useEffect(() => {
        console.log("heloo")
    },[loginOpen])

    return (
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={loginOpen}
        onClose={ () => setLoginOpen(false)}

        >
        <Paper>
            
            <form>
                <Typography variant="body2">
                    Login
                </Typography>
            <Input />
            <Input />
            </form>
         
        </Paper>
           </Modal>
        
    )
}
