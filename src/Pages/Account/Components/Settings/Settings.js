import React from 'react';
import {useMediaQuery} from '~/Hooks';
import {Outlet, useLocation} from 'react-router-dom';
import NavigationBar from './NavigationBar'
import * as styles from './styles.module.css';

function Settings() {
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const {pathname} = useLocation();
    let paths = pathname && pathname.split('/');
    paths.shift();

    return tablet ? 
        (paths.length === 2) ? <NavigationBar/> : <Outlet/> : 
        <section className={styles.container}>
            <NavigationBar/>
            <Outlet/>
        </section>
    
}

export default Settings;