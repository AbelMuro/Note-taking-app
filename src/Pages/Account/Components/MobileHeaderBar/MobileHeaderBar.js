import React from 'react';
import {useTheme} from '~/Hooks';
import icons from '`/icons';
import * as styles from './styles.module.css';

function MobileHeaderBar() {
    const [theme, changeClass] = useTheme(styles);

    return(
        <header className={changeClass('header')}>
            {theme === 'light' ? 
                <img className={styles.header_logo} src={icons['logo']}/> : 
                <img className={styles.header_logo} src={icons['logoDark']}/>
            }
            
        </header>
    )
}

export default MobileHeaderBar;