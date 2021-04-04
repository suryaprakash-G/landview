import React from 'react';
import axios from 'axios';
import styles from '../style/main.module.scss';
import axiosRetry from 'axios-retry';
import About from '../pages/about'
import Contact from '../pages/contact'
import bs from '../style/bootstrap.min.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import cx from 'classnames';
import { withRouter } from 'react-router';
var admin=false;
var pass="";
var lands=[];
const lncrd = {
    "font-weight": "850",
    height: 400,
    width:500,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };
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
        axios.post(`http://127.0.0.1/landview/load.php`,{ind:this.state.count})
        .then(res => {
          console.log(res.data);
            console.log(res.data[0]["result"]);
          if(res.data[0]["result"]==="success"){
            lands[this.state.count]=res.data[0]["lnd"]["0"];
            const i=this.state.count+1
            this.setState({count:i});
            console.log("success count ++")
          }
          else{
              this.setState({invalid:"end"});
          }
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
                {admin?<button className={styles.newbtn} onClick={this.newlnd}>New land</button>:null}
                {this.state.page==="home"?<input type="text" placeholder="Search.."></input>:null}
            </div>
            {this.state.page==="home"?
            <div className={styles.home}>
                
                <InfiniteScroll
                    dataLength={lands.length} //This is important field to render the next data
                    next={this.loadlnd}
                    className={styles.infscroll}
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
                    ><div className={bs["row"]}>
                    {lands.map((i, index) => (
                        <div style={lncrd} key={index}>
                          {(i["n"])}
                          <img className={styles.cardimg} src={"127.0.0.1/landview/images/"+i["n"]+"/0.jpg"} alt="no image"/>
                        </div>
                      ))}
                      </div>
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