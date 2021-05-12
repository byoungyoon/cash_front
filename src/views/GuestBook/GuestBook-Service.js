import axios from 'axios';
import React from 'react';

const AddGuestBook = async (guestBook, token) => {
    await axios({
        method: 'POST',
        url: 'http://localhost:8080/user/addGuestBook',
        data: guestBook,
        headers: {'Authorization': 'Bearer ' + token}
    }).catch((error)=> console.log('error 발생'));
    return true;
}

const detailGuestBook = async (no, token) => {
    let result = "";
    await axios({
        method: 'GET',
        url: 'http://localhost:8080/user/getDetailGuestBook?guestbookNo=' + no,
        headers: {'Authorization': 'Bearer ' + token}
    }).then(response=>{
        result = response.data;
    });

    return result;
}

const deleteGuestBook = async (no, token) => {
    await axios({
        method: 'GET',
        url: 'http://localhost:8080/user/removeGuestBook?guestbookNo=' + no,
        headers: {'Authorization': 'Bearer ' + token}
    }).catch((error)=> console.log('error 발생'));
}

const updateGuestBook = async (guestBook, token) => {
    await axiox({
        method: 'POST',
        url: 'http://localhost:8080/user/modifyGuestBook',
        data: guestBook,
        headers: {'Authorization': 'Bearer ' + token}
    }).then((response)=>{
        console.log(response);
    });
}

export {AddGuestBook, detailGuestBook, deleteGuestBook, updateGuestBook};