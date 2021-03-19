import React from 'react';
import history from './history';
import sabout from '../style/about.module.scss';
class About extends React.Component {
    render() {
      return <div className={sabout.about}>
      <div className={sabout.card}>
        <h1 className={sabout.head}>who are we </h1>
        <div className={sabout.cont}>we are land promoters giving you best deal for land </div>
      </div>
      <div className={sabout.card}>
        <h1 className={sabout.head}>our experience </h1>
        <div className={sabout.cont}>we have 21 years of experience 
        <br/>Baby shark, doo, doo, doo, doo, doo, doo
        <br/>Baby shark, doo, doo, doo, doo, doo, doo
        <br/>Baby shark, doo, doo, doo, doo, doo, doo
        <br/>Baby shark</div>
      </div>
      <div className={sabout.card}>
        <h1 className={sabout.head}>recruitment </h1>
        <div className={sabout.cont}>new recruitment is currently halted due to covid</div>
      </div>
      </div>;
    }
  }
   export default About;