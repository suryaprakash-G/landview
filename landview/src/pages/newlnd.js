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
            priceunit:"Lakh",
            area:"",
            areaunit:"Sq ft",
            about:"",
            city:"",
            type:"",        
            load:false
        };
        this.c_name=this.c_name.bind(this);
        this.c_address=this.c_address.bind(this);
        this.c_price=this.c_price.bind(this);
        this.c_priceunit=this.c_priceunit.bind(this);
        this.c_area=this.c_area.bind(this);
        this.c_areaunit=this.c_areaunit.bind(this);
        this.c_about=this.c_about.bind(this);
        this.c_city=this.c_city.bind(this);
        this.c_type=this.c_type.bind(this);
        this.verify=this.verify.bind(this);
        axiosRetry(axios, { retries: 2 });
      }
      
    //value changing function
    c_name(e){this.setState({ name: e.currentTarget.value});
      this.setState({namefl:""})}
    c_address(e){this.setState({ address: e.currentTarget.value});
      this.setState({addressfl:""})}
    c_price(e){this.setState({ price: e.target.value});
      this.setState({pricefl:""})}
    c_priceunit(e){this.setState({priceunit:e.currentTarget.value});}
    c_area(e){this.setState({ area: e.currentTarget.value});
    this.setState({areafl:""})}
    c_areaunit(e){this.setState({areaunit:e.currentTarget.value});}
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
        this.setState({namefl:"please enter name"})}
      if(this.state.address===""){valid=false;
        this.setState({addressfl:"please provide an address"})}
      if(this.state.price===""){valid=false;
        this.setState({pricefl:"price required"})}
      if(this.state.area===""){valid=false;
        this.setState({areafl:"please specify area of property"})}
      if(this.state.about===""){valid=false;
        this.setState({aboutfl:"please describe something about the property"})}
      if(this.state.city===""){valid=false;
        this.setState({cityfl:"please mention city"})}
      if(this.state.type===""){valid=false;
        this.setState({typefl:"please mention type of property"})}
      if(valid===true){this.send_form()}
    }

    //send form
    send_form(){
      const loggedin = localStorage.getItem("admin");
      const info = {
        name:this.state.name,
        address:this.state.address,
        price:this.state.price+" "+this.state.priceunit,
        area:this.state.area+" "+this.state.areaunit,
        about:this.state.about,
        city:this.state.city,
        type:this.state.type,
        upass: JSON.parse(loggedin)["pass"],
      };
      console.log(info);
        axios.post(`http://127.0.0.1/landview/new.php`,info).then(res => {
          console.log(res.data[0]["result"]);
              if(res.data[0]["result"]==="success"){
                alert("new land added");
                this.props.history.push("/");
              }else if(res.data[0]["result"]==="name exists"){
                alert("land name  already exists try new name");
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
                <input value={this.state.name} onChange={this.c_name} className={styles.name} placeholder="name" />
                <div className={styles.invalidtxt}>{this.state.namefl}</div>
                <div className={styles.vals}>
                price:  <input className={styles.valbx} type="number" value={this.state.price} onInput={this.c_price} data-decimals="2" min="0.1" max="999" step="0.1"/>
                <select className={styles.valbx} className={styles.priceunit} value={this.state.priceunit} onChange={this.c_priceunit}>
                    <option value="Lakh">Lakh</option>
                    <option value="Crore">Core</option>
                </select>
                <div className={styles.invalidtxt}>{this.state.pricefl}</div>
                <br/></div>
                <div className={styles.vals}>
                area: <input className={styles.valbx} type="number" value={this.state.area} onInput={this.c_area} data-decimals="2" min="0.1" max="999" step="0.1"/>
                <select className={styles.valbx} className={styles.areaunit} value={this.state.areaunit} onChange={this.c_areaunit}>
                    <option value="Sq ft">Sq ft</option>
                    <option value="Acres">Acres</option>
                </select>
                <div className={styles.invalidtxt}>{this.state.areafl}</div>
                <br/></div>
                <textarea value={this.state.address} onChange={this.c_address} className={styles.address} placeholder="address" />
                <div className={styles.invalidtxt}>{this.state.addressfl}</div>
                <input value={this.state.city} onChange={this.c_city} className={styles.city} placeholder="city" />
                <div className={styles.invalidtxt}>{this.state.cityfl}</div>
                <textarea value={this.state.desc} onChange={this.c_about} className={styles.about} placeholder="about" />
                <div className={styles.invalidtxt}>{this.state.aboutfl}</div>
                <input value={this.state.type} onChange={this.c_type} className={styles.type} placeholder="type of property" />
                <div className={styles.invalidtxt}>{this.state.typefl}</div>
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