import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search'; 
import ReplayIcon from '@material-ui/icons/Replay';

const useStyles = makeStyles((theme)=> ({
    icones:{
        textAlign: 'right',
        margin: '0 2.3em 0em 0',
    },
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginBottom: '1.5em',
        maxWidth: 500
    },
    image: {
        width: 128,
        height: 128
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%'
    }
}));

export default function GuestBook(){
    const classes = useStyles();
    return(
        <>
        <div className={classes.icones}>
            <IconButton aria-lebel="Add">
                <AddIcon fontSize="large" />
            </IconButton>
            <IconButton aria-lebel="Replay" >
                <ReplayIcon fontSize="large" />
            </IconButton>
            <IconButton aria-lebel="Search">
                <SearchIcon fontSize="large" />
            </IconButton>
        </div>
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={process.env.PUBLIC_URL + '/images/default.jpg'} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            Standard license
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920*1080 . JPEG
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" style={{custor: 'pointer'}}>
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">$19.00</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={process.env.PUBLIC_URL + '/images/default.jpg'} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            Standard license
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920*1080 . JPEG
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" style={{custor: 'pointer'}}>
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">$19.00</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={process.env.PUBLIC_URL + '/images/default.jpg'} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            Standard license
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920*1080 . JPEG
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" style={{custor: 'pointer'}}>
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">$19.00</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={process.env.PUBLIC_URL + '/images/default.jpg'} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            Standard license
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920*1080 . JPEG
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" style={{custor: 'pointer'}}>
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">$19.00</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={process.env.PUBLIC_URL + '/images/default.jpg'} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            Standard license
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920*1080 . JPEG
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" style={{custor: 'pointer'}}>
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">$19.00</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={process.env.PUBLIC_URL + '/images/default.jpg'} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            Standard license
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920*1080 . JPEG
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" style={{custor: 'pointer'}}>
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">$19.00</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>     
        </div>
        </>
    );
}