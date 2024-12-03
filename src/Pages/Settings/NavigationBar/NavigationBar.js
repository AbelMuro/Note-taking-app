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
            return theme === 'light' ? {backgroundColor: '#F3F5F8'} : {backgroundColor: '#232530'};
        else
            return {}
    }

    const handleIcon = (option) => {
        return option === setting ? {backgroundColor: '#335CFF'} : {};
    }

    const handleSetting = (setting) => {
        setSetting(setting);
    }

    useEffect(() => {
        navigate(`/account/settings/${setting}`)
    }, [setting])

    return(
        <nav className={changeClass('nav')}>
            <button className={changeClass('nav_button')} onClick={() => handleSetting('theme')} style={handleStyles('theme')}>
                <img className={changeClass('nav_icon_theme')} style={handleIcon('theme')}/>
                Color Theme
                {setting === 'theme' && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
            <button className={changeClass('nav_button')} onClick={() => handleSetting('font')} style={handleStyles('font')}>
                <img className={changeClass('nav_icon_font')} style={handleIcon('font')}/>
                Font Theme
                {setting === 'font' && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
            <button className={changeClass('nav_button')} onClick={() => handleSetting('password')} style={handleStyles('password')}>
                <img className={changeClass('nav_icon_lock')} style={handleIcon('password')}/>
                 Change Password
                {setting === 'password' && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
            <hr className={changeClass('nav_line')}/>
            <button className={changeClass('nav_button')} onClick={() => handleSetting('logout')} style={handleStyles('logout')}>
                <img className={changeClass('nav_icon_logout')} style={handleIcon('logout')}/>
                 Logout
                {setting === 'logout' && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
        </nav>
    )
}

export default NavigationBar;