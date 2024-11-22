import React from 'react';
import SearchBox from './SearchBox';
import Settings from './Settings';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

//now i need to work on the themes of this component

function HeaderBar() {
    const [theme, changeClass] = useTheme(styles);

    return(
        <header className={changeClass('header')}>
            <h1 className={styles.header_title}>
                All Notes
            </h1>
            <div className={styles.header_group}>
                <SearchBox/>        
                <Settings/>        
            </div>
        </header>
    )
}


export default HeaderBar;