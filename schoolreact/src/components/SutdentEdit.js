import React from 'react';

import { Button, Grid, TextField, DialogContent, DialogTitle } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SutdentEdit({ student, classes, handleChange, onSubmitChange, valuesInst, errors, setErrors }) {



    return (
        <>
            <DialogTitle>
                Student Details
                </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            
                            name="stuName"
                            variant="outlined"
                            label="Student Name"
                            autoFocus
                            value={student.stuName}
                            onChange={handleChange}
                            {...(errors.stuName && { error: true, helperText: errors.stuName })}
                            className={classes.text}
                            fullWidth />
                        <TextField
                            name="stuId"
                            variant="outlined"
                            label="Student Id"
                            {...(errors.stuId && { error: true, helperText: errors.stuId })}

                            value={student.stuId}
                            onChange={handleChange}
                            className={classes.text}
                            fullWidth />
                        <TextField
                            name="stuEmail"
                            variant="outlined"
                            label="Student Email"
                            {...(errors.stuEmail && { error: true, helperText: errors.stuEmail })}

                            value={student.stuEmail}
                            onChange={handleChange}
                            className={classes.text}
                            fullWidth />
                        <TextField
                            name="stuPhone"
                            variant="outlined"
                            label="Student Phone Number"
                            {...(errors.stuPhone && { error: true, helperText: errors.stuPhone })}

                            value={student.stuPhone}
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
                                value={student.stuCat}
                                name="stuCat"
                                onChange={handleChange}
                                label="Category"

                            >
                                {valuesInst.instCat ? (valuesInst.instCat.split(' ').map((item, index) =>
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                )) : <MenuItem value={0}>none</MenuItem>

                                }

                            </Select>
                            {errors.stuCat && <FormHelperText>
                                {errors.stuCat}
                            </FormHelperText>}

                        </FormControl>


                    </Grid>

                    <Grid item xs={6} className={classes.side}>
                        <FormControl variant="outlined" className={classes.text} fullWidth
                            {...(errors.stuSubCat && { error: true })}
                        >
                            <InputLabel id="demo-simple-select-outlined-label">Sub-Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                
                                id="demo-simple-select-outlined"
                                value={student.stuSubCat}
                                onChange={handleChange}
                                label="Sub-Category"
                                name="stuSubCat"

                            >

                                {valuesInst.instSubCat ? (valuesInst.instSubCat.split(' ').map((item, index) =>
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                )) : <MenuItem value={0}>none</MenuItem>

                                }


                            </Select>
                            {errors.stuSubCat && <FormHelperText>
                                {errors.stuSubCat}
                            </FormHelperText>}
                        </FormControl>

                        <TextField
                            name="stuParentName"
                            variant="outlined"
                            label="Parent Name"
                            {...(errors.stuParentName && { error: true, helperText: errors.stuParentName })}

                            value={student.stuParentName}
                            onChange={handleChange}
                            className={classes.text}
                            fullWidth />
                        <TextField
                            name="stuRelation"
                            variant="outlined"
                            {...(errors.stuRelation && { error: true, helperText: errors.stuRelation })}
                            label="RelationShip"

                            value={student.stuRelation}
                            onChange={handleChange}
                            className={classes.text}
                            fullWidth />
                        <TextField
                            name="stuParentNumber"
                            variant="outlined"
                            label="Parent Phone Number"
                            {...(errors.stuParentNumber && { error: true, helperText: errors.stuParentNumber })}

                            value={student.stuParentNumber}
                            onChange={handleChange}
                            className={classes.text}
                            fullWidth />
                        <TextField
                            name="stuParentEmail"
                            variant="outlined"
                            label="Parent Email"
                            {...(errors.stuParentEmail && { error: true, helperText: errors.stuParentEmail })}

                            value={student.stuParentEmail}
                            onChange={handleChange}
                            className={classes.text}
                            fullWidth />
                    </Grid>

                </Grid>
                <div className={classes.modal}>
                    <Button className={classes.btn}
                        variant="contained" color="primary" className={classes.button} type="submit"
                        onClick={onSubmitChange} >
                        ADD
                            </Button>
                </div>




            </DialogContent>
        </>
    )
}
