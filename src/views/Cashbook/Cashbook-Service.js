import axios from 'axios';
import React from 'react';

function getCashbookDetail(month, day, token){
    let currentDay = month + '-' + day;
    let value;
    axios({
        url: 'http://localhost:8080/user/getCashbookDetail?currentDay=' + currentDay,
        method: 'GET',
        headers: {'Authorization' : "Bearer " + token}
    }).then((response)=>{
        value = response.data;
    });
    return value;
}

function Test2(){
    return(
        <div>
            test2
        </div>
    );
}

export {getCashbookDetail, Test2};