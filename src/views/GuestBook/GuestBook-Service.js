import axios from 'axios';
import React from 'react';

const AddGuestBook = async (guestBook, token) => {
    await axios({
        method: 'POST',
        url: 'http://localhost:8080/user/addGuestBook',
        data: guestBook,
        headers: {'Authorization': 'Bearer ' + token}
    });

    console.log(guestBook);

    return true;
}

export {AddGuestBook};