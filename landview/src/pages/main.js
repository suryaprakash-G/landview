import React from 'react';
import axios from 'axios';
import styles from '../style/main.module.scss';
import axiosRetry from 'axios-retry';
import About from '../pages/about'
import Contact from '../pages/contact'
import bs from '../style/bootstrap.min.module.css';
import cx from 'classnames';
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
        admin:'',
        pass:'',
        page:'home'
        }
        this.loginchk = this.loginchk.bind(this)
        this.loginchk();
        this.changepage = this.changepage.bind(this)
        axiosRetry(axios, { retries: 3 });
      }
          //check if logged in
    loginchk(){
            const loggedin = localStorage.getItem("admin");
            if (loggedin!=null) {
                this.setState({admin:loggedin});
            }
    } 
    changepage(e){
        this.setState({page:e});
    }
    render(){
        return(
        <div className={cx(styles['main'],bs['container-fluid'],styles.parallax)}>
            <div className={styles.header}> 
                S.M promoters
            </div>
            <div class={styles.topnav}>
                <a className={this.state.page==="home"?styles.active:null} onClick={() => this.changepage("home")}>Home</a>
                <a className={this.state.page==="about"?styles.active:null}  onClick={() => this.changepage("about")}>About</a>
                <a className={this.state.page==="contact"?styles.active:null}  onClick={() => this.changepage("contact")}>Contact</a>
                {this.state.page==="home"?<input type="text" placeholder="Search.."></input>:null}
            </div>
            {this.state.page==="home"?
            <div className={styles.home}>

            </div>:null}
            {this.state.page==="about"?
            <div className={styles.about}>
                <About/>
            </div>:null}
            {this.state.page==="contact"?
            <div className={styles.contact}>
                <Contact/>
            </div>:null}
        </div>)}
}
export default Main;