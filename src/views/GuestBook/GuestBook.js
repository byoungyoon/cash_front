import React, { useEffect, useState } from 'react';

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
import DetailGuestBook from './DetailGuestBook';

import * as Service from "./GuestBook-Service";
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme)=> ({
    main: {
        width: '100%', 
        heigth: '100%', 
        position: 'relative'
    },
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
    detailImage: {
        width: 280,
        height: 350
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    inputWidth: {
        width: '100%',
        margin: 'auto auto 1em auto'
    }
}));

export default function GuestBook(){
    const classes = useStyles();

    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [modifyModalOpen, setModifyModalOpen] = useState(false);

    const [state, setState] = useState({
        title: '',
        content: '',
        file: '',
        previewURL: process.env.PUBLIC_URL + '/images/selectImage.png'
    });

    const [detailValue, setDetailValue] = useState({
        no: 0,
        title: '',
        userId: '',
        content: '',
        count: 0,
        date: '',
        // img: ''
    });

    const [listValue, setListValue] = useState();

    const [cookie] = useCookies(['rememberJwt']);

    useEffect(()=>{
        let getGuestBook = Service.getGuestBook(cookie.rememberJwt)
        getGuestBook.then(response=>{
            setListValue(response);
        });
    },[]);


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
        let guestBook = new FormData();
        guestBook.append('guestbookTitle', state.title);
        guestBook.append('guestbookContent', state.content);
        guestBook.append('guestbookImgFile', state.file);
        
        const addGuestBook = Service.AddGuestBook(guestBook, cookie.rememberJwt);
        closeModal();
    }

    const handleOneOnCilck = (key) => () => {
        const detailGuestBook = Service.detailGuestBook(listValue[key].guestbookNo,cookie.rememberJwt);
        detailGuestBook.then((response)=>{
            setDetailValue({
                no: response.guestbookNo,
                userId: response.userId,
                title: response.guestbookTitle,
                content: response.guestbookContent,
                count: response.guestbookCount,
                date: response.createDate
            });
        });
        setDetailModalOpen(detailModalOpen => detailModalOpen = true);
    }

    const handleOneCloseOnClick = () => {
        setDetailModalOpen(false);
    }

    const handleRemoveOnClick = () => {
        const removeGuestBook = Service.removeGuestBook(detailValue.no, cookie.rememberJwt);
        handleOneCloseOnClick();
    }

    const handleModifyOnClick = () => {
        setModifyModalOpen(modifyModalOpen => !modifyModalOpen);
    }

    const handleModify = () => {
        let guestBook = new FormData();
        guestBook.append('guestbookNo', detailValue.no);
        guestBook.append('guestbookTitle', 'modifyTest');
        guestBook.append('guestbookContent', 'modifyContent');

        const modifyGuestBook = Service.modifyGuestBook(guestBook, cookie.rememberJwt);

        window.location.href='/admin/guestbook';
    }

    return(
        <div className={classes.main}>
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
                            value={state.title}
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
            <DetailGuestBook 
                open={detailModalOpen} close={handleOneCloseOnClick} 
                header={detailValue.title} remove={handleRemoveOnClick} 
                modify={handleModifyOnClick} modifyForm={modifyModalOpen}
                modifyAction={handleModify}
            >
                <Grid container>
                    <Grid item xs={5}>
                        <img 
                            className={classes.img} 
                            alt="image" 
                            src={process.env.PUBLIC_URL + '/images/default.jpg'} 
                        />
                    </Grid>
                    <Grid item xs={7} style={{padding: '0 0 0 12px'}}>
                        <TextField 
                            className={classes.inputWidth}
                            label="Title"
                            id="detail-title"
                            margin="normal"
                            variant="outlined"
                            value={detailValue.title}
                            disabled={modifyModalOpen?false:true}
                        />
                        <TextField 
                            className={classes.inputWidth}
                            label="Content"
                            id="detail-content"
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={5}
                            value={detailValue.content}
                            disabled={modifyModalOpen?false:true}
                        />
                        <TextField 
                            className={classes.inputWidth}
                            label="작성자"
                            id="detail-userId"
                            margin="normal"
                            variant="outlined"
                            value={detailValue.userId}
                            disabled
                        />
                        <TextField 
                            className={classes.inputWidth}
                            label="작성 날짜"
                            id="detail-date"
                            margin="normal"
                            variant="outlined"
                            value={detailValue.date}
                            disabled
                        />
                        <TextField 
                            className={classes.inputWidth}
                            label="방문 횟수"
                            id="detail-count"
                            margin="normal"
                            variant="outlined"
                            value={detailValue.count}
                            disabled
                        />
                    </Grid>
                </Grid>
            </DetailGuestBook>
            <div className={classes.root}>
                <Grid container>
                    {listValue !== undefined ? listValue.map((data,key)=>{
                        return(
                            <Grid item xs={12} md={6} key={key}>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <ButtonBase className={classes.image} onClick={handleOneOnCilck(key)}>
                                                <img className={classes.img} alt="complex" src={process.env.PUBLIC_URL + '/images/default.jpg'} />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1">
                                                        {data.guestbookTitle}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {data.guestbookContent}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2">
                                                        {data.createDate}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography color="textSecondary">{data.userId}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        );
                    }): null}
                </Grid>     
            </div>
        </div>
    );
}