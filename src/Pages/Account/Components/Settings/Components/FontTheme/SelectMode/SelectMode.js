import React from 'react';
import icons from '`/icons';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function SelectMode({font, setFont, mode, title, desc}) {
    const [theme, changeClass] = useTheme(styles);

    const handleStyles = () => {
        if(font === mode)
            return theme === 'light' ? {backgroundColor: '#F3F5F8'} : {backgroundColor: '#232530'};
        else
            return {};
    }

    const handleFont = (font) => {
        setFont(font);
    }


    const handleIcon = () => {
        if(mode === 'sans-serif')
            return {maskImage: 'url(/icons/icon-font-sans-serif.svg)'};
        else if(mode === 'monospace')
            return {maskImage: 'url(/icons/icon-font-monospace.svg)'}
        else
            return {maskImage: 'url(/icons/icon-font-serif.svg)'}
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
                {font === mode && <img className={styles.radio_checked} src={icons['checked']}/>}
                <input type='radio' id={mode} checked={font === mode} onChange={() => handleFont(mode)}/>
            </label>
        </label>
    )
}

export default SelectMode;