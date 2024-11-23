import React from 'react';
import * as styles from './styles.module.css';

function MiscButtons() {
    return(
        <section className={styles.container}>
            <button className={styles.misc}>
                <img className={styles.misc_icon}/>
                Archive Note
            </button>
            <button className={styles.misc}>
                <img className={styles.misc_icon}/>
                Delete Note
            </button>
        </section>
    )
}

export default MiscButtons;