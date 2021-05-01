import React, { useEffect, useState } from 'react';
import * as Service from "./Cashbook-Service";

export default function CashbookDetail({month, day, token}){    
    let getValue = Service.getCashbookDetail(month, day, token);
    
    const frist = () => {
        let getValueArr = [];
        getValue.then((response)=>{
            let value = [];
            response.map((data, key)=>{
                value.push(data);
            });
            getValueArr = getValueArr.concat(value);
            let returnValue = second(getValueArr);
            console.log(returnValue);
            return returnValue;
        });
        return getValueArr;
    }

    const second = (getValueArr) => {
        let result = getValueArr.map((data, key) => {
            return (<div key={key}>{data}</div>)
        }); 

        return(<div>{result}</div>);
    };

    return(
        <div>
            {frist()}
        </div>
    );
}