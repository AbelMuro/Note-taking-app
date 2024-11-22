import React from 'react';
import {useTheme} from '~/Hooks';
import icons from '../icons';
import * as styles from './styles.module.css';

function Tags({option, setOption, handleStyles, handleColor}){
    const [theme, changeClass] = useTheme(styles);

    const handleTag = (selectedTag) => {
        setOption(selectedTag);
    }

    return(
        <section className={styles.tags}>
            <h1 className={styles.tags_title}>
                Tags
            </h1>
            <div className={changeClass('tags_tag')} style={handleStyles('Cooking')} onClick={() => handleTag('Cooking')}>
                <img className={changeClass('tags_icon')} style={handleColor('Cooking')}/>
                Cooking
                {option === 'Cooking' && <img className={styles.tags_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </div>
        </section>
    )
}

export default Tags;