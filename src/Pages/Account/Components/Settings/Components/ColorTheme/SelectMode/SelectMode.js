import React, {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '~/Hooks';
import icons from '`/icons';
import * as styles from './styles.module.css';

function SelectMode({mode, title, desc}) {
    const dispatch = useDispatch();
    const [theme, changeClass] = useTheme(styles);
    const originalTheme = useSelector(state => state.theme.theme);

    const handleStyles = () => {
        if(originalTheme === mode)
            return theme === 'light' ? {backgroundColor: '#F3F5F8'} : {backgroundColor: '#2B303B'};
        else
            return {};
    }

    const handleTheme = (theme) => {
        dispatch({type: 'SET_CHANGES', payload: false});
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
                {originalTheme === mode && <img className={styles.radio_checked} src={icons['checked']}/>}
                <input type='radio' id={mode} checked={originalTheme === mode} onChange={() => handleTheme(mode)}/>
            </label>
        </label>
    )
}

export default memo(SelectMode);