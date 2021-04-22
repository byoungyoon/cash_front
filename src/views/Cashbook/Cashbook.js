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
    buttonStyle: {
      textAlign: "center",
      marginTop: "1em"
    }
  };

const useStyles = makeStyles(styles);

export default function Cashbook() {
    const classes = useStyles();

    const [getMoment, setMoment] = useState(Moment());
    const today = getMoment;

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
                          <button onClick={handleSubstractClick}>이전 달</button>
                          <span>{today.format('YYYY년 MM월')}</span>
                          <button onClick={handleAddClick}>다음 달</button>
                      </CardBody>
                  </Card>
              </GridItem>
          </GridContainer>
      </div>
  );
}
