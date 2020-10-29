import { makeStyles } from '@material-ui/core'
import React from 'react'
const stylees = makeStyles(() => ({
    error: {

        border: "0px",
        borderRadius: "10px",
        padding: "4px 8px",
        margin: "5px 0",
        color: "#ec0101",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    but :{
        backgroundColor:"#fff",
        borderRadius:"50px",
        border:"0px",
        color:"#ec0101"
    }
}))
export default function ErrorNotice(props) {
    const classes = stylees();
    return (
        <div className={classes.error}>
            <span>{props.message}</span>
            <button onClick={props.clearError} className={classes.but} >X</button>
        </div>
    )
}
