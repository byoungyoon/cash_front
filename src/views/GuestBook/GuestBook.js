import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search'; 
import ReplayIcon from '@material-ui/icons/Replay';
import AddGuestBook from './AddGuestBook';

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
        width: 140,
        height: 175
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    inputWidth: {
        width: '100%',
        margin: 'auto auto 8px auto'
    }
}));

export default function GuestBook(){
    const classes = useStyles();

    const [modalOpen, setModalOpen] = useState(false);
    const [state, setState] = useState({
        title: '',
        content: '',
        file: '',
        previewURL: process.env.PUBLIC_URL + '/images/selectImage.png'
    });

    const openModel = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        setState({
            title: '',
            content: '',
            file: '',
            previewURL: process.env.PUBLIC_URL + '/images/selectImage.png'
        })
    }

    const handleFileOnChange = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            setState({
                ...state,
                file: file,
                previewURL: reader.result
            });
        };
        reader.readAsDataURL(file);
    }

    const handleContentOnChange = (prop) => (event) => {
        setState({
            ...state,
            [prop]: event.target.value
        });
    }

    const handleAddGuestbook = () => {
        console.log(state);
    }

    return(
        <>
        <div className={classes.icones}>
            <IconButton aria-label="add" onClick={openModel}>
                <AddIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="replay" onClick={()=>window.location.href='/admin/guestbook'}>
                <ReplayIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="search">
                <SearchIcon fontSize="large" />
            </IconButton>
        </div>
        <AddGuestBook open={modalOpen} close={closeModal} handleAddGuestbook={handleAddGuestbook}>
            <Grid container>
                <Grid item xs={4}>
                    <ButtonBase className={classes.image} >
                        <input 
                            id="input-file" 
                            type="file" 
                            accept=".gif, .jpg, .png"
                            onChange={handleFileOnChange}
                            style={{display: 'none'}} 
                        />
                        <label htmlFor="input-file">
                            <img 
                                className={classes.img} 
                                alt="image" 
                                src={state.previewURL} 
                                style={{cursor: 'pointer'}}
                            />
                            <span>gif, jpg, png만 <br />선택 가능합니다</span>
                        </label>
                    </ButtonBase>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        className={classes.inputWidth} 
                        label="Title"
                        id="input-title"
                        error={state.title===""? true: false}
                        margin="normal"
                        variant="outlined"
                        defaultValue={state.title}
                        onChange={handleContentOnChange('title')}
                    />
                    <TextField 
                        className={classes.inputWidth}
                        label="Content"
                        id="input-content"
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={5}
                        error={state.content===""? true: false}
                        defaultValue={state.content}
                        onChange={handleContentOnChange('content')}
                    />
                </Grid>
            </Grid>
        </AddGuestBook> 
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
                                            Title
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Content
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2">
                                            date
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography color="textSecondary">userId</Typography>
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