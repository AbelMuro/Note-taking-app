import React from 'react';
import {useTheme} from '~/Hooks'
import {Outlet} from 'react-router-dom';
import NavigationBar from './NavigationBar';
import HeaderBar from './HeaderBar';
import * as styles from './styles.module.css';

function Account() {
    const [, changeClass] = useTheme(styles);

    return(
        <main className={changeClass('container')}>
            <NavigationBar/>
            <HeaderBar/>
            <Outlet/>
        </main>
    )
}

export default Account;