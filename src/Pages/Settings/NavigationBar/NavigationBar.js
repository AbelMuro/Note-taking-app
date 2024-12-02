import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import icons from '`/icons';
import * as styles from './styles.module.css';

function NavigationBar(){
    const navigate = useNavigate();
    const [setting, setSetting] = useState('theme');
    const [theme, changeClass] = useTheme(styles);

    const handleStyles = (option) => {
        if(option === setting)
            return {backgroundColor: '#F3F5F8'}
        else
            return {}
    }

    const handleSetting = (setting) => {
        setSetting(setting);
    }

    useEffect(() => {
        navigate(`/account/settings/${setting}`)
    }, [setting])

    return(
        <nav className={styles.nav}>
            <button className={styles.nav_button} onClick={() => handleSetting('theme')} style={handleStyles('theme')}>
                <img className={styles.nav_icon_theme}/>
                Color Theme
                {setting === 'theme' && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
            <button className={styles.nav_button} onClick={() => handleSetting('font')} style={handleStyles('font')}>
                <img className={styles.nav_icon_font}/>
                Font Theme
                {setting === 'font' && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
            <button className={styles.nav_button} onClick={() => handleSetting('password')} style={handleStyles('password')}>
                <img className={styles.nav_icon_lock}/>
                 Change Password
                {setting === 'password' && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
            <hr className={styles.nav_line}/>
            <button className={styles.nav_button} onClick={() => handleSetting('logout')} style={handleStyles('logout')}>
                <img className={styles.nav_icon_logout}/>
                 Logout
                {setting === 'logout' && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
        </nav>
    )
}

export default NavigationBar;