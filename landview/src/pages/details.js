import React from 'react';
import axios from 'axios';
import styles from '../style/details.module.scss';
import axiosRetry from 'axios-retry';
import bs from '../style/bootstrap.min.module.css';
import cx from 'classnames';
var admin=false;
var pass="";
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
        admin:false,
        pass:'',
        count:1,
        }
        this.loginchk = this.loginchk.bind(this);
        axiosRetry(axios, { retries: 3 });
    }
     //check if logged in
    loginchk(){
        const loggedin = localStorage.getItem("admin");
        if (loggedin!=null) {
            console.log("admin clocked");
            pass=JSON.parse(loggedin)["pass"];
            admin=true;
        }
    }
    render(){
        return(
        <div className={cx(styles['page'],bs['container-fluid'])}>
        <div>
            
        </div>
        </div>)}
}