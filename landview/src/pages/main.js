import React from 'react';
import axios from 'axios';
import styles from '../style/main.module.scss';
import axiosRetry from 'axios-retry';
import About from '../pages/about'
import Contact from '../pages/contact'
import bs from '../style/bootstrap.min.module.css';
import cx from 'classnames';
var admin=false;
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
        admin:false,
        pass:'',
        page:'home'
        }
        this.loginchk = this.loginchk.bind(this);
        this.loginchk();
        this.changepage = this.changepage.bind(this);
        axiosRetry(axios, { retries: 3 });
    }
      
          //check if logged in
    loginchk(){
        console.log("entered");
            const loggedin = localStorage.getItem("admin");
            if (loggedin!=null) {
                console.log("admin clocked");
                //this.setState({admin:true});
            }
        console.log(this.state.admin);
    }
    changepage(e){
        this.setState({page:e});
    }
    
    render(){
        return(
        <div className={cx(styles['main'],bs['container-fluid'],styles.parallax)}>
            <div className={styles.header}> 
                {this.state.admin?"S.M promoters   (ADMIN MODE)":"S.M promoters"}
            </div>
            <div className={styles.topnav}>
                <a className={this.state.page==="home"?styles.active:null} onClick={() => this.changepage("home")}>Home</a>
                <a className={this.state.page==="about"?styles.active:null}  onClick={() => this.changepage("about")}>About</a>
                <a className={this.state.page==="contact"?styles.active:null}  onClick={() => this.changepage("contact")}>Contact</a>
                {this.state.page==="home"?<input type="text" placeholder="Search.."></input>:null}
            </div>
            {this.state.page==="home"?
            <div className={styles.home}>
                {this.state.admin?
                <button className={styles.newbtn} onClick={
                    this.props.history.push('/')}>New land</button>:null}
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