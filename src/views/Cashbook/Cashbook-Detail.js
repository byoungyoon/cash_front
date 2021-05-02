import { FirstPageRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import * as Service from "./Cashbook-Service";

export default function CashbookDetail({month, day, token}){    
    let getValue = Service.getCashbookDetail(month, day, token);
    let returnValue = '';
    
    const first = async () => {
        let getValueArr = [];
        await getValue.then((response)=>{
            let value = [];
            response.map((data, key)=>{
                value.push(data);
            });
            getValueArr = getValueArr.concat(value);
            returnValue = second(getValueArr);
        });
        return returnValue;
    };

    const second = (getValueArr) => {
        let result = getValueArr.map((data, key) => {
            return (<div key={key}>{data}</div>)
        }); 

        return(<div>{result}</div>);
    };

    console.log(setTimeout(()=>first()));

    return(
        <div>
            {setTimeout(()=>first())}
        </div>
    );
}