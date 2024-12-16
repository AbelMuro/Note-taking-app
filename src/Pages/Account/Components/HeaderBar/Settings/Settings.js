import React from 'react';
import {useTheme} from '~/Hooks';
import {usePreNavigate} from '~/Hooks';
import * as styles from './styles.module.css';

function Settings() {
    const [,changeClass] = useTheme(styles);
    const navigate = usePreNavigate();

    const handleSettings = () => {
        navigate('/account/settings/theme');
    }

    return(
        <button className={styles.settings} onClick={handleSettings}>
            <img className={changeClass('settings_icon')}/>
        </button>
    )
}

export default Settings;
