import { TableHead, TableRow ,TableCell} from '@material-ui/core'
import React from 'react'

export default function TableHeadOf() {
    return (
        <TableHead>
                    <TableRow>
                        <TableCell>
                            Logo
                        </TableCell>
                        <TableCell>
                            Institute Name
                        </TableCell>
                        <TableCell align='right'>
                            Phone Number
                        </TableCell>
                        <TableCell align='right'>
                            Email
                        </TableCell>
                        <TableCell align='right'>
                            Active Status
                        </TableCell>
                        <TableCell align='right'>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
    )
}
