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
            load:false
        };
        axiosRetry(axios, { retries: 2 });
      }
      
    //value changing function
    c_fname(e){this.setState({ fname: e.currentTarget.value});
      this.setState({fnamefl:""})}
    c_lname(e){this.setState({ lname: e.currentTarget.value});
      this.setState({lnamefl:""})}
    c_desc(e){this.setState({ desc: e.currentTarget.value});
      this.setState({descfl:""})}
    c_gen(e){this.setState({gen:e.currentTarget.value});}
    //from verification
    verify(){
        var valid=true;
        if(this.state.fname===""){valid=false;
          this.setState({fnamefl:"please enter first name"})}
        if(this.state.lname===""){valid=false;
          this.setState({lnamefl:"please enter last name"})}
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
        btime:timings[this.props.location.state.booktime],
        day:this.state.bookdate.getDate(),
        month:this.state.bookdate.getMonth()+1,
        year:this.state.bookdate.getFullYear(),
        doc:this.props.location.state.doc,
        first_name:this.state.fname,
        last_name:this.state.lname,
        dob:this.state.dob,
        gen:this.state.gen,
        desc:this.state.desc,
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
              Patient form
            </div>
            <div className={styles.bookfor}>{"booking for "+this.state.bookdate.getDate()+'-'+(this.state.bookdate.getMonth()+1)+'-'+this.state.bookdate.getFullYear()
              +"   ("+time[parseInt(this.state.booktime)]+") for doctor "+this.props.location.state.docname}</div>
            <div className={styles.form}>
                <input value={this.state.fname} onChange={this.c_fname} className={styles.fname} placeholder="first name" />
                <div className={styles.invalidtxt}>{this.state.fnamefl}</div>
                <input value={this.state.lname} onChange={this.c_lname} className={styles.lname} placeholder="last name" />
                <div className={styles.invalidtxt}>{this.state.lnamefl}</div>
                <div className={styles.invalidtxt}>{this.state.dobfl}</div>
                <select className={styles.gen} value={this.state.gen} onChange={this.c_gen}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select>
                <input value={this.state.desc} onChange={this.c_desc} className={styles.desc} placeholder="description" />
                <div className={styles.invalidtxt}>{this.state.descfl}</div>
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