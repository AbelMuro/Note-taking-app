import React, {useState, useEffect} from 'react';
import {useTheme} from '~/Hooks';
import icons from '`/icons'
import Tags from './Tags';
import {getRootofRoute} from '~/Common/Functions';
import {useLocation, useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function NavigationBar(){
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [theme, changeClass] = useTheme(styles);
    const [option, setOption] = useState('all');

    const handleStyles = (selectedOption) => {
        if(theme === 'light')
            return option === selectedOption ? {backgroundColor: '#F3F5F8'} : {}
        else 
            return option === selectedOption ? {backgroundColor: '#232530'} : {}
    }

    const handleColor = (selectedOption) => {
        return option === selectedOption ? {backgroundColor: '#335CFF'} : {}
    }

    const handleOption = (option) => {
        if(option === 'all')
            navigate('/account');
        else if(option === 'archived')
            navigate('/account/archived-notes');
    }

    useEffect(() => {
        const route = getRootofRoute(pathname);

        if(route === '/account/archived-notes')
            setOption('archived');
        else if(route === '/account/settings')
            setOption('settings');
        else if(route === '/account')
            setOption('all');
        else{
            const tag = pathname.split('/')[3];
            setOption(tag);
        }
    }, [pathname])


    return(
        <nav className={changeClass('navigation')}>
            {theme === 'light' ? 
                <img src={icons['logo']} className={styles.navigation_logo}/> : 
                <img src={icons['logoDark']} className={styles.navigation_logo}/>
            }
            <button 
                className={changeClass('navigation_link')} 
                onClick={() => {handleOption('all')}}
                style={handleStyles('all')}
                >
                <img className={changeClass('navigation_icon')} style={handleColor('all')}/> All Notes
                {option === 'all' && <img className={styles.navigation_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
            <button 
                className={changeClass('navigation_link')} 
                onClick={() => {handleOption('archived')}}
                style={handleStyles('archived')}
                >
                <img className={changeClass('navigation_icon')} style={handleColor('archived')}/> Archived Notes
                {option === 'archived' && <img className={styles.navigation_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </button>
            <hr className={changeClass('navigation_line')}/>
            <Tags option={option} handleStyles={handleStyles} handleColor={handleColor}/>
        </nav>
    )
}

export default NavigationBar;