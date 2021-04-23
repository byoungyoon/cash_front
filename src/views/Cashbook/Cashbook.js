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
import { blackColor } from "assets/jss/material-dashboard-react";

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
    }
  };

const useStyles = makeStyles(styles);

export default function Cashbook() {
    const classes = useStyles();

    const [getMoment, setMoment] = useState(Moment());
    const today = getMoment;
    
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() == 1 ? 53: today.clone().endOf('month').week();

    const calendarArr = () => {
      let result = [];
      let week = firstWeek;
      for(week; week<=lastWeek; week++){
        result = result.concat(
          <tr key={week}>
            {
              Array(7).fill(0).map((data, index)=>{
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                
                if(Moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                  return(
                    <td key={index} style={{backgroundColor: '#D1B2FF'}}>
                      <span>{days.format('D')}</span>
                    </td>
                  );
                } else if(days.format('MM') !== today.format('MM')){
                  return(
                    <td key={index} style={{backgroundColor:'#D5D5D5', color: '#A6A6A6'}}>
                      <span>{days.format('D')}</span>
                    </td>
                  );
                } else{
                  return(
                    <td key={index} style={{backgroundColor: '#F6F6F6'}}>
                      <span className={index===0?classes.colorBlue: index===6?classes.colorRed: classes.colorBlack}>{days.format('D')}</span>
                    </td>
                  );
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
                            <table>
                              <tbody>
                                {calendarArr()}
                              </tbody>
                            </table>
                          </div>
                      </CardBody>
                  </Card>
              </GridItem>
          </GridContainer>
      </div>
  );
}
