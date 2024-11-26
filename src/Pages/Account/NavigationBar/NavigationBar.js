import React, {useState, useEffect} from 'react';
import {useTheme} from '~/Hooks';
import icons from '`/icons'
import localIcons from './icons';
import Tags from './Tags';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function NavigationBar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [theme, changeClass] = useTheme(styles);
    const option = useSelector(state => state.nav.nav);

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
        dispatch({type: 'UPDATE_NAV', payload: option});
    }

    useEffect(() => {
        if(option === 'settings')
            navigate('/account/settings');
        else if(option === 'all')
            navigate('/account/notes');
        else if(option === 'archived')
            navigate('/account/archived-notes');
    }, [option])


    return(
        <nav className={changeClass('navigation')}>
            {
                theme === 'light' ? 
                    <img src={icons['logo']} className={styles.navigation_logo}/> : 
                    <img src={icons['logoDark']} className={styles.navigation_logo}/>
            }
            <button 
                className={changeClass('navigation_link')} 
                onClick={() => {handleOption('all')}}
                style={handleStyles('all')}
                >
                <img className={changeClass('navigation_icon')} style={handleColor('all')}/> All Notes
                {option === 'all' && <img className={styles.navigation_arrow} src={theme === 'light' ? localIcons['arrowRight'] : localIcons['arrowRightDark']}/>}
            </button>
            <button 
                className={changeClass('navigation_link')} 
                onClick={() => {handleOption('archived')}}
                style={handleStyles('archived')}
                >
                <img className={changeClass('navigation_icon')} style={handleColor('archived')}/> Archived Notes
                {option === 'archived' && <img className={styles.navigation_arrow} src={theme === 'light' ? localIcons['arrowRight'] : localIcons['arrowRightDark']}/>}
            </button>
            <hr className={changeClass('navigation_line')}/>
            <Tags  handleStyles={handleStyles} handleColor={handleColor}/>
        </nav>
    )
}

export default NavigationBar;