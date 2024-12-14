import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useTheme, useMediaQuery} from '~/Hooks';
import LogOut from './LogOut';
import icons from '`/icons';
import * as styles from './styles.module.css';

function NavigationBar(){
    const {pathname} = useLocation()
    const [tablet] = useMediaQuery('(max-width: 850px)');
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
        navigate(`/account/settings/${setting}`);
    }

    useEffect(() => {
        if(pathname === '/account/settings/theme')
            setSetting('theme');
        else if(pathname === '/account/settings/font')
            setSetting('font')
        else if(pathname === '/account/settings/password')
            setSetting('password');
        else{
            if(tablet === false)
                setSetting('theme');
        } 
    }, [pathname, tablet])

    useEffect(() => {
        if(tablet === false)
            navigate(`/account/settings/theme`);
    
    }, [tablet])

    return(
        <nav className={changeClass('nav')}>
            {tablet && 
                <h1 className={changeClass('nav_title')}>
                    Settings
                </h1>}
            <button className={changeClass('nav_button')} onClick={() => handleSetting('theme')} style={tablet ? {} : handleStyles('theme')}>
                <img className={changeClass('nav_icon_theme')} style={tablet ? {} : handleIcon('theme')}/>
                Color Theme
                {(setting === 'theme' && !tablet) && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
            <button className={changeClass('nav_button')} onClick={() => handleSetting('font')} style={tablet ? {} : handleStyles('font')}>
                <img className={changeClass('nav_icon_font')} style={tablet ? {} : handleIcon('font')}/>
                Font Theme
                {(setting === 'font' && !tablet) && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
            <button className={changeClass('nav_button')} onClick={() => handleSetting('password')} style={tablet ? {} : handleStyles('password')}>
                <img className={changeClass('nav_icon_lock')} style={tablet ? {} : handleIcon('password')}/>
                 Change Password
                {(setting === 'password' && !tablet) && <img className={styles.nav_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
            <hr className={changeClass('nav_line')}/>
            <LogOut/>
        </nav>
    )
}

export default NavigationBar;