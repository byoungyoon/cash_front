import { makeStyles } from '@material-ui/core';
import React, { Children } from 'react';

const styles = (theme) => ({
    model: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 99,
        backgraoundColor: 'rgba(0,0,0,0.6)'
    },
    closeModel:{
        display: 'none'
    }
});

const useStyles = makeStyles(styles);

const DetailGuestBook = (props) => {
    const classes = useStyles();
    const {open, close} = props;

    return(
        <div className={open? classes.model: classes.closeModel}>
            123
        </div>
    );
}

export default DetailGuestBook;