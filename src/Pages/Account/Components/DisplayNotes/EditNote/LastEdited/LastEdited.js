import React from 'react';
import {useTheme} from '~/Hooks';
import icons from '`/icons';
import * as styles from './styles.module.css';

//this is where i left off, i will need 
function LastEdited() {
    const [theme, changeClass] = useTheme(styles);

    return(
        <div className={styles.container}>
            <div className={changeClass('header')}>
                <img className={changeClass('header_icon')}/>
                Last Edited
            </div>
            <p className={changeClass('date')}>
                29 Oct 2024
            </p>
        </div>
    )
}

export default LastEdited;