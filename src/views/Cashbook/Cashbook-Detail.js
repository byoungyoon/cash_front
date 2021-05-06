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
                    return data;
                });
                getValueArr = getValueArr.concat(value);
            });
            setReturnValue(getValueArr);
            return getValueArr;
        };
        first();
    },[]);

    if(returnValue !== undefined){
        const columns = [
            {field: 'id', headerName: 'no', type: 'number', width: 70},
            {field: 'cashbookInfo', headerName: '총계'},
            {field: 'cashbookTitle', headerName: '내용'},
            {field: 'cashbookPrice', headerName: '가격', type: 'number'},
            {field: 'cashbookContent', headerName: '내용'},
        ];
    
        const rows = returnValue.map(data=>data);

        return(
          <div style={{height: 400, width: '50%'}}>
              <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
          </div>  
        );
    } else{
        return(
            <></>
        )
    }
}