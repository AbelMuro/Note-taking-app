import React from 'react';
import {useTheme} from '~/Hooks';
import SelectMode from './SelectMode';
import * as styles from './styles.module.css';

//this is where i left off, i will need to use redux persist to 'persist' the theme state with the local storage and i also need to implement the logic for the system theme
//also, make sure to optimize the app when the theme is changed (prevent unnecessary re-renders)
function ColorTheme(){
    const [, changeClass] = useTheme(styles);

    return(
        <form className={styles.theme}>
            <fieldset className={styles.theme_group}>
                <h2 className={changeClass('theme_title')}>
                    Color Theme
                </h2>
                <p className={changeClass('theme_desc')}>
                    Choose your color theme
                </p>                
            </fieldset>
            <SelectMode mode='light' title='Light Mode' desc='Pick a clean and classic light theme'/>
            <SelectMode mode='dark' title='Dark Mode' desc='Select a sleek and modern dark theme'/>
            <SelectMode mode='system' title='System' desc='Adapts to your device’s theme'/>
        </form>
    )
}

export default ColorTheme;