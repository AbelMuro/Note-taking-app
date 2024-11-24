import React from 'react';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function LastEdited({lastEdited}) {
    const [,changeClass] = useTheme(styles);

    return(
        <div className={styles.container}>
            <div className={changeClass('header')}>
                <img className={changeClass('header_icon')}/>
                Last Edited
            </div>
            <p className={changeClass('date')}>
                {
                    lastEdited ? lastEdited : <span className={styles.empty}>Not yet saved</span>
                }
            </p>
        </div>
    )
}

export default LastEdited;