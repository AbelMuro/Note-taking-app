import React  from 'react';
import icons from './icons';
import * as styles from './styles.module.css';

function SelectMode({theme, handleTheme, mode, title, desc}) {

    const handleStyles = () => {
        if(theme === mode)
            return {backgroundColor: '#F3F5F8'}
        else
            return {};
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
        <label className={styles.button} htmlFor={mode} style={handleStyles()}>
            <div className={styles.button_icon_container}>
                <img className={styles.button_icon} style={handleIcon()}/>
            </div>
            <h2 className={styles.button_title}>
                {title}
            </h2>
            <p className={styles.button_desc}>
                {desc}
            </p>
            <label className={styles.radio} htmlFor={mode}>
                {theme === mode && <img className={styles.radio_checked} src={icons['checked']}/>}
                <input type='radio' id={mode} checked={theme === mode} onChange={() => handleTheme(mode)}/>
            </label>
        </label>
    )
}

export default SelectMode;