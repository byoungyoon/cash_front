import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import axios from "axios";
import Button from '@material-ui/core/Button';
import PlusIcon from '@material-ui/icons/PlaylistAdd';

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

export default function Notice() {
    const [noticeList, setNoticeList] = useState([]);
    const classes = useStyles();
    const [noticeNo, setNoticeNo] = useState(0);

    useEffect(()=>{
      axios.get(`http://localhost:8080/getNotice?noticeNo=${noticeNo}`).then((data)=>{
          if(data.status === 200){
              setNoticeList(noticeList.concat(data.data));
          }
      });
    },[noticeNo]);
    const result = Object.keys(noticeList).reduce((array, key)=>{
      //console.log(noticeList);
      return [...array, [noticeList[key].noticeNo, 
                        noticeList[key].noticeTitle,
                        noticeList[key].createDate,
                        noticeList[key].lastUpdate,
                        noticeList[key].noticeCount
                        ]
              ]
    }, []);
      
    const handleClick = () => {
      setNoticeNo(noticeList[noticeList.length-1].noticeNo);
    }

    return (
      <div>
          <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                  <Card>
                      <CardHeader color="primary">
                          <h4 className={classes.cardTitleWhite}>공지사항</h4>
                          <p className={classes.cardCategoryWhite}>
                            공지사항은 관리자를 제외한 회원은 '읽기' 만 가능합니다.
                          </p>
                      </CardHeader>
                      <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["No", "Title", "CreateDate", "LastUpdate", "Count"]}
                            tableData={result}
                            />
                        <div className={classes.buttonStyle}>
                          <Button
                            variant="contained"
                            color="inherit"
                            className={classes.button}
                            endIcon={<PlusIcon />}
                            onClick={handleClick}
                          >
                            More
                          </Button>
                        </div>
                        </CardBody>
                  </Card>
              </GridItem>
          </GridContainer>
      </div>
  );
}
