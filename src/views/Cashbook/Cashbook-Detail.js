import React, { useEffect, useState } from 'react';
import * as Service from "./Cashbook-Service";
import {DataGrid} from '@material-ui/data-grid';

export default function CashbookDetail({month, day, token}){    
    const [returnValue, setReturnValue] = useState();
    useEffect(()=>{
        let getValue = Service.getCashbookDetail(month, day, token);
        const first = async () => {
            let getValueArr = [];
            await getValue.then((response)=>{
                let value = [];
                response.map((data, key)=>{
                    value.push(data);
                });
                getValueArr = getValueArr.concat(value);
            });
            setReturnValue(getValueArr);
            return getValueArr;
        };
        first();
    },[])

    const columns = [
        {field: 'cashbookNo', headerName: '번호', width: 70},
        {field: 'cashbookInfo', headerName: '총계', width: 130},
        {field: 'cashbookTitle', headerName: '내용', width: 130},
        {field: 'cashbookPrice', headerName: '가격', width: 130},
        {field: 'cashbookContent', headerName: '내용', width: 130}
    ];

    const handleValue = () => {
        let value = returnValue.map((data, key)=>{
            return data;
        });
        
        return {value};
    };

    if(returnValue != undefined){
        return(
          <div style={{height: 400, width: '100%'}}>
              <DataGrid rows={handleValue()} columns={columns} pageSize={5} checkboxSelection />
          </div>  
        );
    } else{
        return(
            <></>
        )
    }
}