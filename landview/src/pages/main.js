import React from 'react';
import axios from 'axios';
import styles from '../style/main.module.scss';
import axiosRetry from 'axios-retry';

class Main extends React.Component{
    render(){
        return(
        <div className={cx(styles['main-page'],bs['container-fluid'])}>
            <div className={styles.header}> 
                welcome to S.M promoters
            </div>
        </div>)}
}
export default Main;