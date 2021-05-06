import Card from "components/Card/Card.js";
import ChartistGraph from "react-chartist";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from 'components/Grid/GridContainer';
import AccessTime from "@material-ui/icons/AccessTime";
import GridItem from 'components/Grid/GridItem';
import Button from '@material-ui/core/Button';
import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";  
import {useCookies} from 'react-cookie';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { FormControl, InputLabel, Select, TextField } from "@material-ui/core";

import {
    incomeChart,
  } from "variables/charts.js";

const styles = (theme) =>({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
      },
      fileFont: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: "20px",
      },
      buttonMargin: {
        '& > *':{
          margin: theme.spacing(1)
        }
      }
})

const useStyles = makeStyles(styles);

export default function Info(){
    const classes = useStyles();

    const [cookie] = useCookies(['rememberJwt']);
    const [imgBase64, setImgBase64] = useState(""); 
    const [modifyForm, setModifyForm] = useState(false);

    const [values, setValues] = useState({
        userName : '',
        userGender : '',
        userPhone : '',
        userInfo : '',
        userImg: ''
    });

    const [modifyValues, setModifyValues] = useState({
        userName : '',
        userGender : '',
        userPhone : '',
        userInfo : '',
        userImg: ''
    });

    const [incomeData, setIncomeData] = useState([]);
    const [outcomeData, setOutcomeData] = useState([]);

    const [maxIncomeData, setMaxIncomeData] = useState(0);
    const [maxOutcomeData, setMaxOutcomeData] = useState(0);

    const [sumIncomeData, setSumIncomeData] = useState(0);
    const [sumOutcomeData, setSumOutcomeData] = useState(0);

    const income = {
        labels:
        [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec" 
        ],
        series:[incomeData]
    };

    const outcome = {
        labels:
        [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec" 
        ],
        series:[outcomeData]
    };
    
    useEffect(()=>{
        //console.log()
        axios({
            url: 'http://localhost:8080/user/getInfo',
            method: 'GET',
            headers: {'Authorization' : "Bearer " + cookie.rememberJwt}
        }).then((response)=>{
            //console.log(response.data);
            setValues({
                userName: response.data.user.name,
                userGender: response.data.user.userGender,
                userPhone: response.data.user.userPhone,
                userInfo: response.data.user.userInfo,
                userImg: response.data.user.userImg
            });

            setIncomeData(response.data.incomeChart);
            setMaxIncomeData(response.data.incomeChart.reduce((a,b)=>a>b?a:b));
            setSumIncomeData(response.data.incomeChart.reduce((a,b)=>a+b));
            setOutcomeData(response.data.outcomeChart);
            setMaxOutcomeData(response.data.outcomeChart.reduce((a,b)=>a>b?a:b));
            setSumOutcomeData(response.data.incomeChart.reduce((a,b)=>a+b));
        });
    },[modifyForm]);


    const handleImageChange = (event) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) {
            setImgBase64(base64.toString()); 
          }
        }
        if (event.target.files[0]) {
          reader.readAsDataURL(event.target.files[0]); 
        }
    }

    const handleModifyForm = () => {
        setModifyForm(modifyForm => !modifyForm);

        setModifyValues({
            userName: values.userName,
            userGender: values.userGender,
            userPhone: values.userPhone,
            userInfo: values.userInfo
        });
        setImgBase64(values.userImg); 
    }

    const handleChange = (prop) => (event) => {
        setModifyValues({...modifyValues, [prop] : event.target.value});
    }

    const handleModify = () => {
        var user = new FormData();
        user.append("name", modifyValues.userName);
        user.append("userGender", modifyValues.userGender);
        user.append("userPhone", modifyValues.userPhone);
        user.append("userInfo", modifyValues.userInfo);
        user.append("userImg", imgBase64);

        axios({
            url: 'http://localhost:8080/user/modifyUser',
            method: 'POST',
            data: user,
            headers: {'Authorization' : "Bearer " + cookie.rememberJwt}
        }).then((response)=>{
            setModifyForm(modifyForm => !modifyForm);
        });
    }

    return(
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={9}>
                <GridContainer>
                    <GridItem xs={6} sm={6} md={6}>
                        <Card chart>
                            <CardHeader color="success">
                            <ChartistGraph
                                className="ct-chart"
                                data={income}
                                type="Bar"
                                options={incomeChart.options}
                                responsiveOptions={incomeChart.responsiveOptions}
                                listener={incomeChart.animation}
                            />
                            </CardHeader>
                            <CardBody>
                            <h4 className={classes.cardTitle}>연간 수입 차트</h4>
                            <div>
                                <p className={classes.cardCategory}>최고 수입 : {maxIncomeData}원</p>
                                <p className={classes.cardCategory}>총 수입 : {sumIncomeData}원</p>
                            </div>
                            </CardBody>
                            <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> campaign sent 2 days ago
                            </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                        <Card chart>
                            <CardHeader color="danger">
                            <ChartistGraph
                                className="ct-chart"
                                data={outcome}
                                type="Bar"
                                options={incomeChart.options}
                                responsiveOptions={incomeChart.responsiveOptions}
                                listener={incomeChart.animation}
                            />
                            </CardHeader>
                            <CardBody>
                            <h4 className={classes.cardTitle}>연간 지출 차트</h4>
                            <div>
                                <p className={classes.cardCategory}>최고 지출 : {maxOutcomeData}원</p>
                                <p className={classes.cardCategory}>총 지출 : {sumOutcomeData}원</p>
                            </div>
                            </CardBody>
                            <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> campaign sent 2 days ago
                            </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card profile>
                        {modifyForm &&(
                        <>
                            <CardAvatar profile>
                                <img src={imgBase64} alt="userImg" /> 
                            </CardAvatar>
                            <Fragment>
                                <input
                                    type="file"
                                    id="icon-button-file"
                                    style={{ display: 'none', }}
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="icon-button-file">
                                    <IconButton
                                        variant="contained"
                                        component="span"
                                    >
                                        <span className={classes.fileFont}>변경</span>
                                        <AttachFileIcon />
                                        <input type="file" hidden />
                                    </IconButton>
                                </label>
                            </Fragment>
                            <CardBody profile>
                            <div className={classes.buttonMargin}>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="age-native-simple">Gender</InputLabel>
                                    <Select
                                        native
                                        value={modifyValues.userGender}
                                        onChange={handleChange('userGender')}
                                    >
                                        <option value={"Man"}>Man</option>
                                        <option value={"Woman"}>Woman</option>
                                    </Select>   
                                </FormControl>
                                 
                                 <TextField 
                                    type="text"
                                    label="Phone" 
                                    variant="outlined" 
                                    onChange={handleChange('userPhone')}
                                    value={modifyValues.userPhone}
                                />

                                <TextField 
                                    type="text"
                                    label="name" 
                                    variant="outlined" 
                                    onChange={handleChange('userName')}
                                    value={modifyValues.userName}
                                />

                                <TextField 
                                    type="text"
                                    label="Info" 
                                    variant="outlined" 
                                    multiline
                                    rows={3}
                                    onChange={handleChange('userInfo')}
                                    value={modifyValues.userInfo}
                                />
                            </div>
                            <div className={classes.buttonMargin}>
                                <Button variant="outlined" color="primary" onClick={handleModify}>
                                    수정
                                </Button>
                                <Button variant="outlined" color="primary" onClick={handleModifyForm}>
                                    돌아가기
                                </Button>
                            </div>
                            </CardBody>
                        </>
                        )}
                        {!modifyForm &&(
                        <>
                            <CardAvatar profile>
                                <img src={values.userImg} alt="userImg" /> 
                            </CardAvatar>
                            <CardBody profile>
                                <h6 className={classes.cardCategory}>{values.userGender} / {values.userPhone}</h6>
                                <h4 className={classes.cardTitle}>{values.userName}</h4>
                                <p className={classes.description}>
                                    {values.userInfo!==null? values.userInfo:'내용 없음'}
                                </p>
                                <div className={classes.buttonMargin}>
                                    <Button variant="outlined" color="primary" onClick={handleModifyForm}>
                                        수정
                                    </Button>
                                    <Button variant="outlined" color="secondary">
                                        탈퇴
                                    </Button>
                                </div>
                            </CardBody>
                        </>
                        )}   
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}