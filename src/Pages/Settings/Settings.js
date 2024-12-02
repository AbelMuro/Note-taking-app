import React from 'react';
import {Outlet} from 'react-router-dom';
import NavigationBar from './NavigationBar'
import * as styles from './styles.module.css';

function Settings() {
    return(
        <section className={styles.container}>
            <NavigationBar/>
            <Outlet/>
        </section>
    )
}

export default Settings;