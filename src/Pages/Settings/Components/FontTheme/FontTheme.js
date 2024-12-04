import React, {useState, useEffect} from 'react';
import {useTheme} from '~/Hooks';
import SelectMode from './SelectMode';
import * as styles from './styles.module.css';

//this is where i left off, i will need to use the local storage to store the users prefered font 
//and i will need extract it and place it in the local state of this component
//i will also need to get the font option from the local storage before the app is mounted.
function ColorTheme(){
    const [, changeClass] = useTheme(styles);
    const [font, setFont] = useState('sans-serif');

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--font', font);
    }, [font])

    return(
        <form className={styles.theme}>
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
        </form>
    )
}

export default ColorTheme;