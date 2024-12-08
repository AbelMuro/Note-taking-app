import React from 'react';
import {useTheme, useMediaQuery} from '~/Hooks'
import {Outlet} from 'react-router-dom';
import NavigationBar from './NavigationBar';
import MobileNavigationBar from './MobileNavigationBar';
import HeaderBar from './HeaderBar';
import MobileHeaderBar from './MobileHeaderBar';
import * as styles from './styles.module.css';

function Account() {
    const [, changeClass] = useTheme(styles);
    const [tablet] = useMediaQuery('(max-width: 850px)');

    return(
        <main className={changeClass('container')}>
            {tablet ? <MobileNavigationBar/> : <NavigationBar/>}
            {tablet ? <MobileHeaderBar/> : <HeaderBar/>}
            <Outlet/>
        </main>
    )
}

export default Account;