import React from 'react';
import history from './history';
import scontact from '../style/about.module.scss';
class Contact extends React.Component {
    render() {
      return <div className={scontact.about}>
        <h2 className={scontact.head}>phno :</h2>
         <div className={scontact.cont}>+91 9487757919</div><br/>
         <br/>
        <h2 className={scontact.head}>address :</h2> 
        <div className={scontact.cont}>123, 2nd street,<br/>main road near river,<br/>wakanda -1998.</div>
      </div>;
    }
  }
   export default Contact;