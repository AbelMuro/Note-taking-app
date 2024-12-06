import React from 'react';
import {Outlet} from 'react-router-dom';
import NavigationBar from './NavigationBar'
import * as styles from './styles.module.css';

// this is where i left, i will need to implement the log out component in the components folder 
// and i need to refactor the password and email input components into hooks
function Settings() {
    return(
        <section className={styles.container}>
            <NavigationBar/>
            <Outlet/>
        </section>
    )
}

export default Settings;