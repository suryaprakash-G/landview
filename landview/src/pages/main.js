import React from 'react';
import axios from 'axios';
import styles from '../style/main.module.scss';
import axiosRetry from 'axios-retry';
import bs from '../style/bootstrap.min.module.css';
import cx from 'classnames';
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
        uanme:'',
        pass:'',
        page:'home'
        }
        axiosRetry(axios, { retries: 3 });
      }
    render(){
        return(
        <div className={cx(styles['main'],bs['container-fluid'],styles.parallax)}>
            <div className={styles.header}> 
                S.M promoters
            </div>
            <div class={styles.topnav}>
                <a class={styles.active} href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
                <input type="text" placeholder="Search.."></input>
            </div>
            {this.state.page=="home"?
            <div className={styles.home}>
            </div>:null}
            {this.state.page=="about"?
            <div>
            </div>:null}
            {this.state.page=="contact"?
            <div>
            </div>:null}
        </div>)}
}
export default Main;