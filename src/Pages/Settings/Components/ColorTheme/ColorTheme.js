import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SelectMode from './SelectMode';
import * as styles from './styles.module.css';

//this is where i left off, i will need to implement the useTheme hook here as well to change the themes
//also, make sure to optimize the app when the theme is changed (prevent unnecessary re-renders)
function ColorTheme(){
    const theme = useSelector(state => state.theme.theme);
    const dispatch = useDispatch();

    const handleTheme = (theme) => {
        dispatch({type: 'UPDATE_THEME', payload: theme});
    }

    return(
        <form className={styles.theme}>
            <fieldset className={styles.theme_group}>
                <h2 className={styles.theme_title}>
                    Color Theme
                </h2>
                <p className={styles.theme_desc}>
                    Choose your color theme
                </p>                
            </fieldset>
            <SelectMode theme={theme} handleTheme={handleTheme} mode='light' title='Light Mode' desc='Pick a clean and classic light theme'/>
            <SelectMode theme={theme} handleTheme={handleTheme} mode='dark' title='Dark Mode' desc='Select a sleek and modern dark theme'/>
            <SelectMode theme={theme} handleTheme={handleTheme} mode='system' title='System' desc='Adapts to your device’s theme'/>
        </form>
    )
}

export default ColorTheme;