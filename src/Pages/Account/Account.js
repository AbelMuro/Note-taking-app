import React from 'react';
import {Outlet} from 'react-router-dom';
import NavigationBar from './NavigationBar';
import HeaderBar from './HeaderBar';
import * as styles from './styles.module.css';

function Account() {
    return(
        <main className={styles.container}>
            <NavigationBar/>
            <HeaderBar/>
            <Outlet/>
        </main>
    )
}

export default Account;