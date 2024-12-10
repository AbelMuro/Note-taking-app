import React from 'react';
import {useTheme, useMediaQuery} from '~/Hooks'
import {Outlet} from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import MobileNavigationBar from './Components/MobileNavigationBar';
import HeaderBar from './Components/HeaderBar';
import MobileHeaderBar from './Components/MobileHeaderBar';
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