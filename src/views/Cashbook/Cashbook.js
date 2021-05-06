import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'; 
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {useCookies} from 'react-cookie';
import axios from "axios";
import CashbookDetail from "./Cashbook-Detail";
import Button from '@material-ui/core/Button';

const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    },
    tableStyle: {
      "& table, & tbody": {
        width: "100%",
      },
      "& td": {
        height: "80px",
        padding: "10px",
        verticalAlign: "top",
        "& span":{
          fontSize: "1.2em",
          fontWeight: "500",
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        }
      },
    },
    center: {
      textAlign: "center",
      fontSize: "1.7em",
      fontWeight: "400",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    colorRed: {
      color: "red"
    },
    colorBlack: {
      color: "black"
    },
    colorBlue: {
      color: "blue"
    },
    tableFixed: {
      tableLayout: "fixed"
    }
  };

const useStyles = makeStyles(styles);

export default function Cashbook() {
    const classes = useStyles();

    const [cookie] = useCookies(['rememberJwt']);

    const [getMoment, setMoment] = useState(Moment());
    const today = getMoment;
    
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53: today.clone().endOf('month').week();
    let week = firstWeek;

    let currentMonth = today.clone().startOf('year').week(week).startOf('week').add(7, 'day').format('YYYY-M');

    const [comeValue, setComeValue] = useState({
      incomeValue : [],
      incomePrice: [],
      outcomeValue : [],
      outcomePrice: []
    });

    const [getOne, setGetOne] = useState(false);

    const [getOneData, setGetOneData] = useState({
      month: '',
      day: '',
    });

    const handleCashbookDetail = (day) => () => {
      setGetOneData({month: currentMonth, day: day}); 
      setGetOne(getOne=>!getOne);
    };

    useEffect(()=>{
      axios({
        url: 'http://localhost:8080/user/getCashbook?currentMonth=' + currentMonth,
        method: 'GET',
        headers: {'Authorization' : "Bearer " + cookie.rememberJwt}
      }).then((res)=>{
        const value = [];
        setComeValue({
          'incomeValue': value.concat(res.data.map(data=>{
          if(data.cashbookInfo === '수입'){
            return data.cashbookDay;
          } else return null;
          })),
          'outcomeValue': value.concat(res.data.map(data=>{
            if(data.cashbookInfo === '지출'){
              return data.cashbookDay;
          } else return null;
          })),
          'incomePrice': value.concat(res.data.map(data=>{
            if(data.cashbookInfo === '수입'){
              return data.cashbookPrice;
          } else return null;
          })),
          'outcomePrice': value.concat(res.data.map(data=>{
            if(data.cashbookInfo === '지출'){
              return data.cashbookPrice;
          } else return null;
          })),
        });
      });
    },[getMoment])
    
    const calendarArr = () => {
      let result = [];

      for(week; week<=lastWeek; week++){  
        result = result.concat(
          <tr key={week}>
            {
              Array(7).fill(0).map((data, index)=>{
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                
                if(Moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                  return(
                    <td key={index} style={{border: "3px solid #D1B2FF", backgroundColor: '#F6F6F6'}}>
                      <span>
                        <Button variant="contained" size="small" onClick={handleCashbookDetail(days.format('D'))}>{days.format('D')}</Button>
                      </span>
                    </td>
                  );
                } else if(days.format('MM') !== today.format('MM')){
                  return(
                    <td key={index} style={{backgroundColor:'#D5D5D5', color: '#A6A6A6'}}>
                      <span>
                        {days.format('D')}
                      </span>
                    </td>
                  );
                } else{
                  if(comeValue.incomeValue.findIndex(data=> data===days.format('D') * 1) !== -1 &&
                      comeValue.outcomeValue.findIndex(data=> data===days.format('D') * 1) !== -1){
                    return(
                      <td key={index} style={{backgroundColor: '#F6F6F6'}}>
                        <span className={index===0?classes.colorBlue: index===6?classes.colorRed: classes.colorBlack}>
                          <Button variant="contained" size="small" onClick={handleCashbookDetail(days.format('D'))}>{days.format('D')}</Button>
                          </span>
                        <div>
                          수입 : {comeValue.incomePrice[comeValue.incomeValue.findIndex(data=> data===days.format('D') * 1)]}
                        </div>
                        <div>
                          지출 : {comeValue.outcomePrice[comeValue.outcomeValue.findIndex(data=> data===days.format('D') * 1)]}
                        </div>
                      </td>
                    )
                  } else if(comeValue.incomeValue.findIndex(data=> data===days.format('D') * 1) !== -1){
                    return(
                      <td key={index} style={{backgroundColor: '#F6F6F6'}}>
                        <span className={index===0?classes.colorBlue: index===6?classes.colorRed: classes.colorBlack}>
                          <Button variant="contained" size="small" onClick={handleCashbookDetail(days.format('D'))}>{days.format('D')}</Button>
                        </span>
                        <div>
                          수입 : {comeValue.incomePrice[comeValue.incomeValue.findIndex(data=> data===days.format('D') * 1)]}
                        </div>
                      </td>
                    )
                  } else if(comeValue.outcomeValue.findIndex(data=> data===days.format('D') * 1) !== -1){
                    return(
                      <td key={index} style={{backgroundColor: '#F6F6F6'}}>
                        <span className={index===0?classes.colorBlue: index===6?classes.colorRed: classes.colorBlack}>
                          <Button variant="contained" size="small" onClick={handleCashbookDetail(days.format('D'))}>{days.format('D')}</Button>
                        </span>
                        <div>
                          지출 : {comeValue.outcomePrice[comeValue.outcomeValue.findIndex(data=> data===days.format('D') * 1)]}
                        </div>
                      </td>
                    )
                  } else{
                    return(
                      <td key={index} style={{backgroundColor: '#F6F6F6'}}>
                        <span className={index===0?classes.colorBlue: index===6?classes.colorRed: classes.colorBlack}>
                          <Button variant="contained" size="small" onClick={handleCashbookDetail(days.format('D'))}>{days.format('D')}</Button>
                        </span>
                      </td>
                    );
                  }
                }
              })
            }
          </tr>
        );
      }
      return result;
    }

    const handleSubstractClick = () => {
      setMoment(getMoment.clone().subtract(1, 'month'));
    }
    const handleAddClick = () => {
      setMoment(getMoment.clone().add(1, 'month'));
    }

    return (
      <div>
          <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                  <Card>
                      <CardHeader color="primary">
                          <h4 className={classes.cardTitleWhite}>가계부</h4>
                          <p className={classes.cardCategoryWhite}>
                            해당 달의 지출, 수입 내역입니다.
                          </p>
                      </CardHeader>
                      <CardBody>
                        <GridContainer>
                          <GridItem xs={getOne?6:12} sm={getOne?6:12} md={getOne?6:12}>
                            <div className={classes.center}>
                              <IconButton onClick={handleSubstractClick}>
                                <ChevronLeftIcon />
                              </IconButton>
                              <span>{today.format('YYYY년 MM월')}</span>
                              <IconButton onClick={handleAddClick}>
                                <ChevronRightIcon />
                              </IconButton>
                            </div>
                            <div className={classes.tableStyle}>
                              <table className={classes.tableFixed}>
                                <tbody>
                                  {calendarArr()}
                                </tbody>
                              </table>
                            </div>
                          </GridItem>
                          {getOne &&(
                              <CashbookDetail month={getOneData.month} day={getOneData.day} token={cookie.rememberJwt} />

                          )}
                        </GridContainer>
                      </CardBody>
                  </Card>
              </GridItem>
          </GridContainer>
      </div>
  );
}
