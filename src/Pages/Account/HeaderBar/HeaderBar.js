import React from 'react';
import SearchBox from './SearchBox';
import Settings from './Settings';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';


function HeaderBar() {
    const [,changeClass] = useTheme(styles);

    return(
        <header className={changeClass('header')}>
            <h1 className={changeClass('header_title')}>
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