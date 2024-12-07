import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import LogOut from './LogOut';
import icons from '`/icons';
import * as styles from './styles.module.css';

function NavigationBar(){
    const navigate = useNavigate();
    const [setting, setSetting] = useState('');
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
            <button className={changeClass('nav_button')} onClick={() => handleSetting('')} style={handleStyles('')}>
                <img className={changeClass('nav_icon_theme')} style={handleIcon('')}/>
                Color Theme
                {setting === '' && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
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
            <LogOut/>
        </nav>
    )
}

export default NavigationBar;