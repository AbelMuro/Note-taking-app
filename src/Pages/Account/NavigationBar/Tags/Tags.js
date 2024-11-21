import React from 'react';
import icons from '../icons';
import * as styles from './styles.module.css';

function Tags({option, setOption, handleStyles, handleColor}){

    const handleTag = (selectedTag) => {
        setOption(selectedTag);
    }

    return(
        <section className={styles.tags}>
            <h1 className={styles.tags_title}>
                Tags
            </h1>
            <div className={styles.tags_tag} style={handleStyles('Cooking')} onClick={() => handleTag('Cooking')}>
                <img className={styles.tags_icon} style={handleColor('Cooking')}/>
                Cooking
            {option === 'Cooking' && <img className={styles.tags_arrow} src={icons['arrowRight']}/>}
            </div>
        </section>
    )
}

export default Tags;