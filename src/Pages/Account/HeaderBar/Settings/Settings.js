import React from 'react';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function Settings() {
    const navigate = useNavigate();

    const handleSettings = () => {
        //navigate('');
    }

    return(
        <button className={styles.settings} onClick={handleSettings}>
            <img className={styles.settings_icon}/>
        </button>
    )
}

export default Settings;
