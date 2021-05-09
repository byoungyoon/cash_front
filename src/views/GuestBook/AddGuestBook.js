import React from 'react';
import { makeStyles } from '@material-ui/core';

const styles = (theme) => ({
    model:{
        display: 'flex',
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
            maxWidth: '520px',
            maxHeight: '500px',
            margin: '5em auto',
            borderRadius: '.3rem',
            backgroundColor: '#fff',
            overflow: 'hidden'
        },
        "& > section > header": {
            padding: '16px 64px 16px 16px',
            backgroundColor: '#f1f1f1',
            fontWeight: '700'
        },
        "& > section > header button": {
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
        },
        "& > section > footer": {
            padding: '12px 16px',
        },
        "& > section > footer button": {
            padding: '6px 12px',
            color: '#fff',
            backgroundColor: '#6c757d',
            borderRadius: '5px',
            fontSize: '13px'
        },
    }
});
const useStyles = makeStyles(styles);

const AddGuestBook = (props) =>{
    const classes = useStyles();
    const {open, close} = props;

    return(
        <div className={open ? classes.model : null}>
            {open && (
                <section>
                    <header>
                        <button onClick={close}>&times;</button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button onClick={close}>close</button>
                    </footer>
                </section>
            )}
        </div>
    );
}

export default AddGuestBook;