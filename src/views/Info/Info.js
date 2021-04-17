import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from '@material-ui/core/Button';
import React, { Fragment, lazy, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";  
import {useCookies} from 'react-cookie';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { FormControl, InputLabel, Select, TextareaAutosize, TextField } from "@material-ui/core";

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

    const [cookie, setCookie, removeCookie] = useCookies(['rememberJwt']);
    const [values, setValues] = useState({
        userName : '',
        userGender : '',
        userPhone : '',
        userInfo : '',
        userImg: ''
    });
    
    useEffect(()=>{
        //console.log()
        axios({
            url: 'http://localhost:8080/user/getInfo',
            method: 'GET',
            headers: {'Authorization' : "Bearer " + cookie.rememberJwt}
        }).then((response)=>{
            //console.log(response.data);
            setValues({
                userName: response.data.name,
                userGender: response.data.userGender,
                userPhone: response.data.userPhone,
                userInfo: response.data.userInfo,
                userImg: '/images/' + response.data.userImg
            });

        });
    },[]);

    const [imgBase64, setImgBase64] = useState(""); // 파일 base64

    const handleChange = (event) => {
        let reader = new FileReader();

        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          if (base64) {
            setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
          }
        }
        if (event.target.files[0]) {
          reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
        }
    }

    const [modifyForm, setModifyForm] = useState(false);

    const handleModifyForm = () => {
        setModifyForm(modifyForm => !modifyForm);
    }

    return(
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardBody>
                            123
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <CardAvatar profile>
                             <img src={imgBase64} /> 
                        </CardAvatar>
                        {modifyForm &&(
                        <Fragment>
                            <input
                                type="file"
                                id="icon-button-file"
                                style={{ display: 'none', }}
                                onChange={handleChange}
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
                        )}
                        {!modifyForm &&(
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
                        )}   
                        {modifyForm &&(
                        <CardBody profile>
                            <div className={classes.buttonMargin}>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="age-native-simple">Gender</InputLabel>
                                    <Select
                                        native
                                        value={values.userGender}
                                    >
                                        <option value={"Man"}>Man</option>
                                        <option value={"Woman"}>Woman</option>
                                    </Select>   
                                </FormControl>
                                 
                                 <TextField 
                                    type="number"
                                    label="Phone" 
                                    variant="outlined" 
                                    value={values.userPhone}
                                />

                                <TextField 
                                    type="text"
                                    label="name" 
                                    variant="outlined" 
                                    value={values.userName}
                                />

                                <TextField 
                                    type="text"
                                    label="Info" 
                                    variant="outlined" 
                                    multiline
                                    rows={3}
                                    value={values.userInfo}
                                />
                            </div>
                            <div className={classes.buttonMargin}>
                                <Button variant="outlined" color="primary" onClick={handleModifyForm}>
                                    수정
                                </Button>
                                <Button variant="outlined" color="primary" onClick={handleModifyForm}>
                                    돌아가기
                                </Button>
                            </div>
                        </CardBody>
                        )}  
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}