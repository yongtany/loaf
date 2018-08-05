import React from 'react';
import styles from './styles.scss';

const Loading = props => (
    <div className={styles.container}>
        <img 
            src={require("images/loading.png")} 
            className={styles.spinner} 
            alt="Loading"
         />
    </div>
)

export default Loading;