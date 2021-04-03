import React from 'react';
import axios from 'axios';
import styles from '../style/main.module.scss';
import axiosRetry from 'axios-retry';
import About from '../pages/about'
import Contact from '../pages/contact'
import bs from '../style/bootstrap.min.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import cx from 'classnames';
var admin=false;
var pass="";
var lands=[];
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
        admin:false,
        pass:'',
        count:1,
        page:'home'
        }
        this.loginchk = this.loginchk.bind(this);
        this.loginchk();
        this.newlnd=this.newlnd.bind(this);
        this.changepage = this.changepage.bind(this);
        this.loadlnd=this.loadlnd.bind(this);
        this.refresh=this.refresh.bind(this);
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
    changepage(e){
        this.setState({page:e});
    }
    newlnd(){
        this.props.history.push('/new');
    }
    loadlnd(){
        console.log("next");
        axios.post(`http://127.0.0.1/tst.php`,{ind:})
        .then(res => {
          console.log(res.data);
          /*  this.setState({lg_loading:false});
            console.log(res.data[0]["result"]);
            const i=this.state.count+1
            this.setState({count:i});
          if(res.data[0]["result"]==="success"){

              console.log("success")
          }
          else{
              this.setState({invalid:"end"});
          }*/
        }).catch(error => {
            console.log(error);
          });
    }
    refresh(){
        console.log("refresh");
    }
    render(){
        return(
        <div className={cx(styles['main'],bs['container-fluid'],styles.parallax)}>
            <div className={styles.header}> 
                {admin?"S.M promoters   (ADMIN MODE)":"S.M promoters"}
            </div>
            <div className={styles.topnav}>
                <a className={this.state.page==="home"?styles.active:null} onClick={() => this.changepage("home")}>Home</a>
                <a className={this.state.page==="about"?styles.active:null}  onClick={() => this.changepage("about")}>About</a>
                <a className={this.state.page==="contact"?styles.active:null}  onClick={() => this.changepage("contact")}>Contact</a>
                {this.state.page==="home"?<input type="text" placeholder="Search.."></input>:null}
            </div>
            {this.state.page==="home"?
            <div className={styles.home}>
                {admin?
                <button className={styles.newbtn} onClick={this.newlnd}>New land</button>:null}
                <InfiniteScroll
                    dataLength={lands.length} //This is important field to render the next data
                    next={this.loadlnd}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                        <b>end of page</b>
                        </p>
                    }
                    // below props only if you need pull down functionality
                    refreshFunction={this.refresh}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    }
                    >
                    {lands}
                </InfiniteScroll>
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