import React from 'react';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme)=>({
    model:{
        display: 'none',
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        zIndex: '99',
        backgroundColor: 'rgba(0,0,0,0.6)',
        "& button": {
            outline: 'none',
            cursor: 'pointer',
            border: '0'
        },
        "& > section": {
            width: '90%',
            maxWidth: '450px',
            margin: '0 auto',
            borderRadius: '.3rem',
            backgroundColor: '#fff',
            animation: 'modal-show .3s',
            overflow: 'hidden'
        },
        "& > section > header": {
            positon: 'relative',
            padding: '16px 64px 16px 16px',
            backgroundColor: '#f1f1f1',
            fontWeight: '700'
        },
        "& > section > header button": {
            position: 'absolute',
            top: '15px',
            right: '15px',
            width: '30px',
            fontSize: '21px',
            fontWeight: '700',
            textAligin: 'center',
            color: '#999',
            backgroundColor: 'transparent'
        },
        "& > section > main": {
            padding: '16px',
            borderBottom: '1px solid #dee2e6',
            borderTop: '1px solid #dee2e6'
        }
    },

}));
const useStyles = makeStyles(styles);

const AddGuestBook = () =>{

}

export default AddGuestBook;