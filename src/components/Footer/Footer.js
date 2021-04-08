/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a 
                href="https://github.com/byoungyoon" 
                className={classes.block}
                target="_blank"
              >
                GitHub
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a 
                href="https://blog.naver.com/bur5698" 
                className={classes.block}
                target="_blank"
              >
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="#"
              className={classes.a}
            >
              Byoungyoon
            </a>
            , made By 25 young age
          </span>
        </p>
      </div>
    </footer>
  );
}
