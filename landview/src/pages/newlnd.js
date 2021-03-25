import React from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import styles from '../style/newlnd.module.scss';
import bs from '../style/bootstrap.min.module.css';
import cx from 'classnames';
var dob=new Date();//date of birth
const date=new Date();//current date
var timings=["9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];//server 24 hr format
const time=["09:00 am","10:00 am","11:00 am","12:00 pm","01:00 pm","02:00 pm","03:00 pm","04:00 pm","05:00 pm","06:00 pm"];//12 hr format for displaying
class Newlnd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            address:"",
            price:"",
            area:"",
            about:"",
            city:"",
            type:"",        
            load:false
        };
        axiosRetry(axios, { retries: 2 });
      }
      
    //value changing function
    c_name(e){this.setState({ name: e.currentTarget.value});
      this.setState({namefl:""})}
    c_address(e){this.setState({ address: e.currentTarget.value});
      this.setState({addressfl:""})}
    c_price(e){this.setState({ price: e.currentTarget.value});
      this.setState({pricefl:""})}
    c_area(e){this.setState({ area: e.currentTarget.value});
    this.setState({areafl:""})}
    c_about(e){this.setState({ about: e.currentTarget.value});
    this.setState({aboutfl:""})}
    c_city(e){this.setState({ city: e.currentTarget.value});
    this.setState({cityfl:""})}
    c_type(e){this.setState({ type: e.currentTarget.value});
    this.setState({typefl:""})}
    //from verification
    verify(){
        var valid=true;
        if(this.state.name===""){valid=false;
          this.setState({fnamefl:"please enter name"})}
        if(this.state.location===""){valid=false;
          this.setState({location:"please provide a location"})}
        if(this.state.desc===""){valid=false;
          this.setState({descfl:"description required"})}
        if(this.state.dob==="dd-mm-yy"){valid=false;
          this.setState({dobfl:"please select date of birth"})}
        if(valid===true){this.send_form()}
    }

    //send form
    send_form(){
      this.setState({load:true});
      const loggedin = localStorage.getItem("user");
      const info = {
        name:this.state.name,
        location:this.state.location,
        address:this.state.address,
        price:this.state.price,
        area:this.state.area,
        about:this.state.about,
        city:this.state.city,
        type:this.state.type,
        upass: JSON.parse(loggedin)["pass"],
      };
        axios.post(`https://bqhdj6kx2j.execute-api.ap-south-1.amazonaws.com/test/book`,info).then(res => {
           if(res.data["message"]!=="Internal server error"){
                    if(res.data==="booked"){
                      alert("appointment booked");
                      this.props.history.push("/book");
                    }
                  }
              else{
                alert("something went wrong retry please");
              }
        }).catch(error => {
          this.stopld();
        });
    }
    //stop loading and alert
    stopld(){
      alert("please try again");
      this.setState({load:false});
  }
    render(){
        return(
        <div>
            <div className={cx(styles.header,bs.row)}>
              New Land
            </div>
            <div className={styles.form}>
                <input value={this.state.fname} onChange={this.name} className={styles.name} placeholder="name" />
                <div className={styles.invalidtxt}>{this.state.namefl}</div>
                <input type="number"  data-decimals="2" min="0.1" max="999" step="0.1"/><br/>
                <input value={this.state.lname} onChange={this.c_address} className={styles.address} placeholder="address" />
                <div className={styles.invalidtxt}>{this.state.addressfl}</div>
                <input value={this.state.desc} onChange={this.c_about} className={styles.about} placeholder="about" />
                <div className={styles.invalidtxt}>{this.state.aboutfl}</div>
                {this.state.load?
                <button className={cx(styles.submit,styles.patsub)} onClick={this.verify}>
                  <span className={cx(bs["spinner-border"],bs["spin-white"])}></span></button>:
                  <button className={cx(styles.submit,styles.patsub)} onClick={this.verify}>submit</button>
                }
            </div>
        </div>)
    }
}

export default Newlnd;