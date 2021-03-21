import React from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import bs from '../style/bootstrap.min.module.css';
import cx from 'classnames';
import styles from '../style/adminlogin.module.scss';

class AdminLogin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pass:"",
            unamefl:"",
            passfl:"",
            load:false
        };
        axiosRetry(axios, { retries: 2 });
        this.stoplg=this.stoplg.bind(this);
        this.login=this.login.bind(this);
        this.c_pass=this.c_pass.bind(this);
      }

    //check if logged in
    loginchk(e){ 
        console.log("check");
        if(this.state.show==='false')
        {
            const loggedin = localStorage.getItem("admin");
            if (loggedin!=null) {
                this.setState({user:loggedin});
                this.props.history.push('/adminmain');
            }else{
                this.showlg();}
        }
        else{this.hidebox();}
        e.preventDefault();
    }
    stoplg(){this.setState({lg_loading:false});}
    login(e){
        var valid=true;
        if(this.state.pass===""){valid=false;
            this.setState({invalid:"please enter password"})}
        if(valid===true){
        this.setState({lg_loading:true});
        const admin = {
            pass: this.state.pass
          };
        axios.post(`127.0.0.1/landview/login.php`,admin)
        .then(res => {
            this.setState({lg_loading:false});
            console.log("--------"+res.data);
          if(res.data==="success"){
            localStorage.setItem('admin',JSON.stringify(admin));
            this.props.history.push('/');
          }
          else{
              this.setState({invalid:"invalid password"});
          }
        }).catch(error => {
            this.stoplg();
          });
        }
        e.preventDefault();
    }
    c_pass(e){this.setState({ pass: e.currentTarget.value});
        this.setState({invalid:""});
        e.preventDefault();}
    render(){
        return(
        <div>
        <div className={styles.header}>Admin Password</div>
        <form className={styles.form}>
        <div className={bs.flex}>
            <input value={this.state.pass} onChange={this.c_pass} type="password" className={cx(styles.inputbox,styles.admininp)} placeholder="Password" />
            <div className="invalidtxt">{this.state.invalid}</div>
        
            {this.state.lg_loading?<button className={cx(styles.submit,styles.admsub)} onClick={this.login} disabled>
                                    <span className={bs['spinner-border']}></span></button>
                                :<button className={cx(styles.submit,styles.admsub)} >Login</button>
            }
        </div>
        </form>
        </div>)
    }
}

export default AdminLogin;