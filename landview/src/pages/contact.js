import React from 'react';
import history from './history';
import scontact from '../style/about.module.scss';
class Contact extends React.Component {
    render() {
      return <div className={scontact.about}>
        <h2>phno :</h2>
         +91 9487757919<br/>
         <br/>
        <h2>address :</h2> 
        123, 2nd street,<br/>main road near river,<br/>wakanda -1998.
      </div>;
    }
  }
   export default Contact;