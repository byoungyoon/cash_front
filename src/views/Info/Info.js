import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from "components/CustomButtons/Button.js";
import React, { lazy, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";  
import avatar from "assets/img/faces/marc.jpg";
import {useCookies} from 'react-cookie';
import axios from "axios";

const styles = {
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
      }
}

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
        console.log()
        axios({
            url: 'http://localhost:8080/user/getInfo',
            method: 'GET',
            headers: {'Authorization' : "Bearer " + cookie.rememberJwt}
        }).then((response)=>{
            console.log(response.data);
            setValues({
                userName: response.data.name,
                userGender: response.data.userGender,
                userPhone: response.data.userPhone,
                userInfo: response.data.userInfo,
                userImg: 'assets/img/faces/' + response.data.userImg
            });

        });
    },[]);
    //const userImg = require(values.userImg)

    console.log(values.userImg);
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
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img src={values.userImg} alt="..." />
                        </a>
                        </CardAvatar>
                        <CardBody profile>
                        <h6 className={classes.cardCategory}>{values.userGender} / {values.userPhone}</h6>
                        <h4 className={classes.cardTitle}>{values.userName}</h4>
                        <p className={classes.description}>
                            {values.userInfo!==null? values.userInfo:'내용 없음'}
                        </p>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}