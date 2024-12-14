import React, {useState, useEffect} from 'react';
import GoBackButton from '../GoBackButton';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme, useMediaQuery} from '~/Hooks';
import SelectMode from './SelectMode';
import * as styles from './styles.module.css';

//this is where i left off, i will need to fix the useEffect of this component
//idk why the savedChanges is returning false
function ColorTheme(){
    const [savedChanges, setSavedChanges] = useState(false);
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.theme);
    const [, changeClass] = useTheme(styles);
    const [tablet] = useMediaQuery('(max-width: 850px)');

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('users-preferred-theme', theme);
        const event = new CustomEvent('display-message', {'detail': {message: 'Color theme has been saved'}})
        document.dispatchEvent(event);
        setSavedChanges(true);
    }

    useEffect(() => {
        return () => {
            if(!savedChanges)
                dispatch({type: 'RESET_THEME'});
        }
    }, [savedChanges])

    return(
        <form className={changeClass('theme')} onSubmit={handleSubmit}>
            {tablet && <GoBackButton/>}
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
            <button className={styles.theme_submit}>
                Apply Changes
            </button>
        </form>
    )
}

export default ColorTheme;