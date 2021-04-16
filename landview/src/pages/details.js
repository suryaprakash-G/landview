import React from 'react';
import axios from 'axios';
import styles from '../style/details.module.scss';
import axiosRetry from 'axios-retry';
import bs from '../style/bootstrap.min.module.css';
import cx from 'classnames';
import Gallery from 'react-grid-gallery';
var admin=false;
var pass="";
var land;
var images=[];
class Details extends React.Component{
    constructor(props){
        super(props);
        this.state={
        admin:false,
        pass:'',
        count:1,
        name:"null",
        address:"",
        price:"",
        area:"",
        city:"",
        type:"",
        about:""
        }
        this.loginchk = this.loginchk.bind(this);
        this.dtload = this.dtload.bind(this);
        this.upload= this.upload.bind(this);
        this.loginchk();
        axiosRetry(axios, { retries: 3 });
    }
    componentDidMount(){
        try{
            this.setState({name:this.props.location.state.n});
        }catch(e){
            this.props.history.push('/');
        }
        this.dtload();
    }
    upload(){
    }
    dtload(){
        axios.post(`http://127.0.0.1/landview/details.php`,{name:this.props.location.state.n})
        .then(res => {
          console.log(res.data);
            console.log(res.data[0]["result"]);
          if(res.data[0]["result"]==="success"){
            land=res.data[0]["lnd"]["0"];
            this.setState({
                area:land["ar"],
                address:land["ad"],
                price:land["p"],
                area:land["ar"],
                city:land["c"],
                type:land["t"],
                about:land["a"]
            });
            if(land["i"]==="0"){
              this.setState({noimg:true});
            }
            else{
            for(var i=1;i<=2;i++){
              images.push({
                src: "http://127.0.0.1/landview/images/"+this.props.location.state.n+"/"+i+".jpg",
                thumbnail: "http://127.0.0.1/landview/images/"+this.props.location.state.n+"/"+i+".jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 174,
                caption: i
              });
            }
            this.setState({updateui:"yes"});
          }
          }
          else{

          }
        }).catch(error => {
            console.log(error);
          });
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
        <div className={cx(styles['page'])}>
        {this.state.noimg?<div>no images</div>:
        <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}>
                <Gallery
            images={images}
            enableImageSelection={false}/>
                </div>
        }
        {
          admin?<button className={styles.uploadbtn} onClick={this.upload}>upload image</button>:null}
        <div className={styles.title}>name</div>
          <div className={styles.content}>{this.state.name}</div>
        <div className={styles.title}>area</div>
            <div className={styles.content}>{this.state.area}</div>
        <div className={styles.title}>about</div>
          <div className={styles.content}>{this.state.about}</div>
        <div className={styles.title}>price</div>
            <div className={styles.content}>{this.state.price}</div>
        <div className={styles.title}>address</div>
          <div className={styles.content}>{this.state.address}</div>
        <div className={styles.title}>city</div>
            <div className={styles.content}>{this.state.city}</div>
        </div>)}
}
export default Details;