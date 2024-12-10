import React from 'react';
import {useTheme} from '~/Hooks';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function Settings() {
    const [,changeClass] = useTheme(styles);
    const navigate = useNavigate();

    const handleSettings = () => {
        navigate('/account/settings');
    }

    return(
        <button className={styles.settings} onClick={handleSettings}>
            <img className={changeClass('settings_icon')}/>
        </button>
    )
}

export default Settings;
