import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
let Message=require('./getItems.js');

const headers=['编号','名称','规格','价格','优惠信息','操作'];  
let data=Message();
ReactDOM.render(<App  headers={headers} data={data}/>,
     document.getElementById('root'));
    
    