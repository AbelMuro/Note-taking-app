import React, {useState} from 'react';
import icons from '`/icons'
import localIcons from './icons';
import * as styles from './styles.module.css';

function NavigationBar(){

    return(
        <nav className={styles.navigation}>
            <img src={icons['logo']} className={styles.navigation_logo}/>
            <button className={styles.navigation_link}>
                <img className={styles.navigation_icon}/> All Notes
                <img className={styles.navigation_arrow} src={localIcons['arrowRight']}/>
            </button>
            <button className={styles.navigation_link}>
                <img className={styles.navigation_icon}/> Archived Notes
                <img className={styles.navigation_arrow} src={localIcons['arrowRight']}/>
            </button>
        </nav>
    )
}

export default NavigationBar;