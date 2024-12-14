import React, {useEffect} from 'react';
import GoBackButton from '../GoBackButton';
import {useTheme, useFont, useMediaQuery} from '~/Hooks';
import SelectMode from './SelectMode';
import * as styles from './styles.module.css';

function FontTheme(){
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const [, changeClass] = useTheme(styles);
    const [font, setFont] = useFont();

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--font', font);
    }, [font])

    return(
        <form className={changeClass('theme')}>
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
            
        </form>
    )
}

export default FontTheme;