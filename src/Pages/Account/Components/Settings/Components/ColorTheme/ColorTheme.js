import React, {useState, useEffect} from 'react';
import { ClipLoader } from 'react-spinners';
import GoBackButton from '../GoBackButton';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme, useMediaQuery} from '~/Hooks';
import SelectMode from './SelectMode';
import * as styles from './styles.module.css';

function ColorTheme(){
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const theme = useSelector(state => state.theme.theme);
    const changesSaved = useSelector(state => state.changesSaved.changedSaved);
    const [, changeClass] = useTheme(styles);
    const [tablet] = useMediaQuery('(max-width: 850px)');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        localStorage.setItem('users-preferred-theme', theme);
        const event = new CustomEvent('display-message', {'detail': {message: 'Color theme saved.'}})
        document.dispatchEvent(event);
        dispatch({type: 'SET_CHANGES', payload: true});
        setLoading(false);
    }

    useEffect(() => {
        const unmount = () => {
            if(!changesSaved)                     
                dispatch({type: 'RESET_THEME'});
        }

        return unmount;
    }, [changesSaved])

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
                {loading ? <ClipLoader size='30px' color='white'/> : 'Apply Changes'}
            </button>
        </form>
    )
}

export default ColorTheme;