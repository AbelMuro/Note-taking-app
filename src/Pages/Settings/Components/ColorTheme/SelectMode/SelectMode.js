import React from 'react';
import {useDispatch} from 'react-redux';
import {useTheme} from '~/Hooks';
import icons from './icons';
import * as styles from './styles.module.css';

function SelectMode({mode, title, desc}) {
    const dispatch = useDispatch();
    const [theme, changeClass] = useTheme(styles);

    const handleStyles = () => {
        if(theme === mode)
            return theme === 'light' ? {backgroundColor: '#F3F5F8'} : {backgroundColor: '#2B303B'};
        else
            return {};
    }

    const handleTheme = (theme) => {
        dispatch({type: 'UPDATE_THEME', payload: theme});
    }


    const handleIcon = () => {
        if(mode === 'light')
            return {maskImage: 'url(/icons/icon-sun.svg)'};
        else if(mode === 'dark')
            return {maskImage: 'url(/icons/icon-moon.svg)'}
        else
            return {maskImage: 'url(/icons/icon-system-theme.svg)'}
    }

    return(
        <label className={changeClass('button')} htmlFor={mode} style={handleStyles()}>
            <div className={changeClass('button_icon_container')}>
                <img className={changeClass('button_icon')} style={handleIcon()}/>
            </div>
            <h2 className={changeClass('button_title')}>
                {title}
            </h2>
            <p className={changeClass('button_desc')}>
                {desc}
            </p>
            <label className={changeClass('radio')} htmlFor={mode}>
                {theme === mode && <img className={styles.radio_checked} src={icons['checked']}/>}
                <input type='radio' id={mode} checked={theme === mode} onChange={() => handleTheme(mode)}/>
            </label>
        </label>
    )
}

export default SelectMode;