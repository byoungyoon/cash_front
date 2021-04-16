import React, { useState } from "react";
import {useCookies} from 'react-cookie';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';

import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { InputLabel} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import axios from "axios";

const styles={
    bodyStyle: {
        textAlign: "center"
    },
    formGroup: {
        width: "100%",
        marginBottom: "1em",
    },
    titleStyle: {
        marginTop: "0px",
        marginBottom: "1em",
        fontWeight: "500",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: "2em"
    },
    inputStyle: {
        width: "60%",
    },
    rememberStyle: {
        marginLeft: "14em"
    },
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 120,
      },
    selectEmpty: {
        //marginTop: theme.spacing(2),
    },
};

const useStyles = makeStyles(styles);

export default function Login(){
    const classes = useStyles();

    const [values, setValues] = React.useState({
        userId: '',
        userPw: '',
        name: '',
        userGender: '',
        userPhone: '', 
    });

    const [loginValues, setLoginValues] = useState({
        userId: '',
        userPw: '',
    });

    const [signup, setSingup] = useState(false);
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleLoginChange = (prop) => (event) => {
        setLoginValues({...loginValues, [prop]: event.target.value});
    };

    const handleClickToSignup = () => {
        setSingup(signup => !signup);
    };

    let history = useHistory();

    const handleSignup = () => {
        var user = new FormData();
        user.append('userId', values.userId);
        user.append('userPw', values.userPw);
        user.append('name', values.name);
        user.append('userGender', values.userGender);
        user.append('userPhone', values.userPhone);

        axios.post('http://localhost:8080/signup', user)
            .then(response => {
                setSingup(signup => !signup);
                setValues({
                    userId: '',
                    userPw: '',
                    name: '',
                    userGender: '',
                    userPhone: '', 
                });
            }).catch(error => {
                console.log('failed', error);
            })
    }

    const [cookie, setCookie, removeCookie] = useCookies(['rememberJwt']);
        
    const handleSignin = () => {
        var user = new FormData();
        user.append('userId', loginValues.userId);
        user.append('userPw', loginValues.userPw);

        axios.post('http://localhost:8080/login', user)
            .then(response => {
                setCookie('rememberJwt', response.data.token);
                history.push('/Dashboard');
            }).catch(error => {
                console.log('login failed', error);
            })
    }


    return(
        <div>
          <GridContainer>
              <GridItem xs={3} sm={3} md={3} />
              <GridItem xs={6} sm={6} md={6}>
                  <Card>
                      {!signup && (
                      <CardBody className={classes.bodyStyle}>
                      <h3 className={classes.titleStyle}>Log in</h3>
                        <div className={classes.formGroup}>
                            <TextField 
                                className={classes.inputStyle} 
                                value={loginValues.userId}
                                onChange={handleLoginChange('userId')} 
                                id="standard-basic" 
                                label="UserId" 
                                variant="outlined" 
                            />
                        </div>

                        <div className={classes.formGroup}>
                            <FormControl className={clsx(classes.margin, classes.textField), classes.inputStyle} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type="password"
                                value={loginValues.userPw}
                                onChange={handleLoginChange('userPw')}
                            /> 
                            </FormControl>
                        </div>
                        <div className={classes.formGroup, classes.rememberStyle}>
                            <Checkbox
                                color="default"
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                            />
                            <label>Remember me</label>
                        </div>
                        <div className={classes.formGroup}>
                            <Button 
                                variant="contained"
                                endIcon={<Icon>send</Icon>}
                                className={classes.inputStyle}
                                size="large"
                                onClick={handleSignin}
                            >
                                Sign in
                            </Button>
                            <p className="forgot-password text-right">
                                Forgot <a href="#">password</a> | <a href="#" onClick={handleClickToSignup}>sign up</a>
                            </p>
                        </div>
                      </CardBody>
                      )}
                      {signup && (
                          <CardBody className={classes.bodyStyle}>
                              <div>
                                <h3 className={classes.titleStyle}>Sign up</h3>
                                <div className={classes.formGroup}>
                                    <TextField 
                                        className={classes.inputStyle} 
                                        label="UserId" 
                                        variant="outlined" 
                                        value={values.userId}
                                        onChange={handleChange('userId')}
                                    />
                                </div>
                                <div className={classes.formGroup}>
                                    <TextField 
                                        className={classes.inputStyle} 
                                        type="password"
                                        label="Password" 
                                        variant="outlined" 
                                        value={values.userPw}
                                        onChange={handleChange('userPw')}
                                    />
                                </div>
                                <div className={classes.formGroup}>
                                    <TextField 
                                        className={classes.inputStyle} 
                                        label="Name" 
                                        variant="outlined" 
                                        value={values.name}
                                        onChange={handleChange('name')}
                                    />
                                </div>
                                <div className={classes.formGroup}>
                                    <FormControl variant="outlined" className={classes.formControl ,classes.inputStyle}>
                                        <InputLabel htmlFor="age-native-simple">Gender</InputLabel>
                                        <Select
                                        native
                                        value={values.gender}
                                        onChange={handleChange('userGender')}
                                        >
                                        <option aria-label="None" value="" />
                                        <option value={"Man"}>Man</option>
                                        <option value={"Woman"}>Woman</option>
                                        </Select>   
                                    </FormControl>
                                </div>
                                <div className={classes.formGroup}>
                                    <TextField 
                                        className={classes.inputStyle} 
                                        label="Phone" 
                                        variant="outlined"
                                        value={values.userPhone}
                                        onChange={handleChange('userPhone')} 
                                    />
                                </div>
                                <div className={classes.formGroup}>
                                    <Button 
                                        variant="contained"
                                        endIcon={<Icon>send</Icon>}
                                        className={classes.inputStyle}
                                        size="large"
                                        onClick={handleSignup}
                                    >
                                        Sign in
                                    </Button>
                                    <p className="forgot-password text-right">
                                        <a href="#" onClick={handleClickToSignup}>Back</a>
                                    </p>
                                </div>
                              </div>
                          </CardBody>
                      )}
                  </Card>
              </GridItem>
          </GridContainer>
        </div>
    );
}