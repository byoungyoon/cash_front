import { makeStyles } from '@material-ui/core';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme) => ({
    model: {
        display: 'flex',
        width: '100%',
        height: '100%',
        maxWidth: '950px',
        margin: '0 -1.8em 0 0',
        position: 'absolute',
        top: '0',
        right: '0',
        zIndex: 999999,
        "& button": {
            outline: 'none',
            cursor: 'pointer',
            border: '0'
        },
        "& > section": {
            width: '100%',
            borderRadius: '.3rem',
            backgroundColor: '#fff',
            boxShadow: '0 0 3px 0 gray inset',
            animation: `$myEffect 500ms ${theme.transitions.easing.easeInOut}`
        },
        "& > section > header": {
            padding: '16px 16px 16px 16px',
            backgroundColor: '#D5D5D5',
            fontWeight: '700'
        },
        "& > section > header button": {
            width: '45px',
            fontSize: '40px',
            fontWeight: '500',
            textAlign: 'center',
            backgroundColor: 'transparent'
        },
        "& > section > main": {
            padding: '16px',
            borderBottom: '1px solid #dee2e6',
            borderTop: '1px solid #dee2e6'
        },
        "& > section footer": {
            padding: '12px 16px'
        }
    },
    closeModel:{
        display: 'none'
    },
    "@keyframes myEffect": {
        "0%": {
            opacity: 0,
            transform: 'translateX(80%)'
        },
        "100%": {
            opacity: 1,
            transform: 'translateX(0)'
        }
    },
    buttonForm: {
        position: 'absolute', 
        right: '1em', 
        top: '3.3em'
    },
    buttonStyle: {
        backgroundColor: '#D4F4FA', 
        borderRadius: '2rem', 
        padding: '12px'
    }
});

const useStyles = makeStyles(styles);

const DetailGuestBook = (props) => {
    const classes = useStyles();
    const {open, close} = props;

    return(
        <div className={open? classes.model: classes.closeModel}>
            <section>
                <header>
                    <Grid container>
                        <Grid item xs={6} md={6}>
                            <Typography variant="h6" gutterBottom>
                                Title
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom style={{color: 'gray'}}>
                                방명록 상세 보기
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} style={{textAlign: 'right'}}>
                            <div style={{position: 'relative'}}>
                                <button onClick={close}>&times;</button>
                            </div>
                            <div className={classes.buttonForm}>
                                <IconButton aria-label="create" style={{marginRight: '0.3em'}}>
                                    <CreateIcon className={classes.buttonStyle} />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon className={classes.buttonStyle} />
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                </header>
                <main>
                    {props.children}
                </main>
                <footer>
                    
                </footer>
            </section>
        </div>
    );
}

export default DetailGuestBook;