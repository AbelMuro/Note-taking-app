import React, {useState, useEffect} from 'react';
import GoBackButton from '../GoBackButton';
import {useTheme, useFont, useMediaQuery} from '~/Hooks';
import SelectMode from './SelectMode';
import * as styles from './styles.module.css';

function FontTheme(){
    const [savedChanges, setSavedChanges] = useState(false);
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const [, changeClass] = useTheme(styles);
    const [font, setFont] = useFont();

    const handleSubmit = (e) => {
        e.preventDefault();
        const root = document.documentElement;
        const font = root.style.getPropertyValue('--font');
        localStorage.setItem('users-preferred-font', font);
        const event = new CustomEvent('display-message', {'detail': {message: 'Font has been updated'}});
        document.dispatchEvent(event);
        setSavedChanges(true);
    }

    useEffect(() => {
        const unmount = () => {
            if(!savedChanges){
                const oldFont = localStorage.getItem('users-preferred-font');
                const root = document.documentElement;
                root.style.setProperty('--font', oldFont || '');     
            }
        }

        return unmount;
    }, [savedChanges])

    return(
        <form className={changeClass('theme')} onSubmit={handleSubmit}>
            {tablet && <GoBackButton/>}
            <fieldset className={styles.theme_group}>
                <h2 className={changeClass('theme_title')}>
                    Font Theme
                </h2>
                <p className={changeClass('theme_desc')}>
                    Choose your font theme:
                </p>                
            </fieldset>
            <SelectMode font={font} setFont={setFont} mode='sans-serif' title='Sans-serif' desc='Clean and modern, easy to read.'/>
            <SelectMode font={font} setFont={setFont} mode='serif' title='Serif' desc='Classic and elegant for a timeless feel.'/>
            <SelectMode font={font} setFont={setFont} mode='monospace' title='Monospace' desc='Code-like, great for a technical vibe.'/>
            <button className={styles.theme_submit}>
                Apply Changes
            </button>
        </form>
    )
}

export default FontTheme;