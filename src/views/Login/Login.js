import React from "react";
import clsx from 'clsx';

import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import { InputLabel} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';

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
        fontSize: "3em"
    },
    inputStyle: {
        width: "60%",
    },
    rememberStyle: {
        marginLeft: "14em"
    }

};

const useStyles = makeStyles(styles);

export default function Login(){
    const classes = useStyles();

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    

    return(
        <div>
          <GridContainer>
              <GridItem xs={3} sm={3} md={3} />
              <GridItem xs={6} sm={6} md={6}>
                  <Card>
                      <CardBody className={classes.bodyStyle}>
                      <h3 className={classes.titleStyle}>Log in</h3>
                        <div className={classes.formGroup}>
                            <TextField className={classes.inputStyle} id="standard-basic" label="Email" variant="outlined" />
                        </div>

                        <div className={classes.formGroup}>
                            <FormControl className={clsx(classes.margin, classes.textField), classes.inputStyle} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
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
                            >
                                Sign in
                            </Button>
                            <p className="forgot-password text-right">
                                Forgot <a href="#">password?</a>
                            </p>
                        </div>
                      </CardBody>
                  </Card>
              </GridItem>
          </GridContainer>
        </div>
    );
}