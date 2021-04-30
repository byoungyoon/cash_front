import React from 'react';
import {getCashbookDetail} from "./Cashbook-Service";

export default function CashbookDetail({month, day, token}){
    const getValue = getCashbookDetail(month, day, token);

    return(
        {

        }
    );
}