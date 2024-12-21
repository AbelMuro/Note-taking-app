import React from 'react';
import RouteTitle from './RouteTitle';
import SearchBox from '~/Common/Components/SearchBox';
import Settings from './Settings';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function HeaderBar() {
    const [,changeClass] = useTheme(styles);

    return(
        <header className={changeClass('header')}>
            <RouteTitle/>
            <div className={styles.header_group}>
                <SearchBox/>        
                <Settings/>        
            </div>
        </header>
    )
}


export default HeaderBar;