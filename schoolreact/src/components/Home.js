import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'

const style = makeStyles(() => ({
    paper:{
        padding:'20px',
        marginTop:"20px"
    }
}))

export default function Home() {
    const classes = style()
    return (
        <div>
            <Paper className={classes.paper}>
                <strong> Home Page</strong>
            </Paper>
        </div>
    )
}
