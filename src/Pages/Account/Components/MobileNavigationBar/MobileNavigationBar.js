import React, {useState, useEffect} from 'react';
import {useTheme, useMediaQuery} from '~/Hooks';
import {getRootofRoute} from '~/Common/Functions';
import { useNavigate, useLocation } from 'react-router-dom';
import * as styles from './styles.module.css';

function MobileNavigationBar() {
    const [mobile] = useMediaQuery('(max-width: 550px)');
    const [link, setLink] = useState('');
    const [theme, changeClass] = useTheme(styles);
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const handleStyles = (currentLink) => {
        if(link === currentLink)
            return theme === 'light' ? {backgroundColor: '#EBF1FF', color: '#335CFF'} : {backgroundColor: '#2B303B', color: '#335CFF'};
        else
            return {}
    }

    const handleIcon = (currentLink) => {
        if(link === currentLink)
            return {backgroundColor: '#335CFF'};
        else
            return {}
    }

    const handleLink = (link) => {
        navigate(link);
    }

    useEffect(() => {
        const route = getRootofRoute(pathname);

        if(route === '/account/archived-notes')
            setLink('archived-notes');
        else if(route === '/account/settings')
            setLink('settings');
        else if(route === '/account')
            setLink('');
        else if(route === '/account/search')
            setLink('search')
        else{
            setLink('tags');
        }
    }, [pathname])

    return(
        <nav className={changeClass('navbar')}>
            <ul className={styles.navbar_links}>
                <li>
                    <button className={changeClass('navbar_link')} onClick={() => {handleLink('')}} style={handleStyles('')}>
                        <img className={styles.navbar_home} style={handleIcon('')}/>
                        {!mobile && 'Home'}
                    </button>
                </li>
                {!mobile && <div className={changeClass('verticalLine')}/> }
                <li>
                    <button className={changeClass('navbar_link')} onClick={() => {handleLink('search')}} style={handleStyles('search')}>
                        <img className={styles.navbar_search} style={handleIcon('search')}/>
                        {!mobile && 'Search'}
                    </button>
                </li>
                {!mobile && <div className={changeClass('verticalLine')}/> }
                <li>
                    <button className={changeClass('navbar_link')} onClick={() => {handleLink('archived-notes')}} style={handleStyles('archived-notes')}>
                        <img className={styles.navbar_archived} style={handleIcon('archived-notes')}/>
                        {!mobile && 'Archived'}
                    </button>
                </li>
                {!mobile && <div className={changeClass('verticalLine')}/> }
                <li>
                    <button className={changeClass('navbar_link')} onClick={() => {handleLink('tags')}} style={handleStyles('tags')}>
                        <img className={styles.navbar_tags} style={handleIcon('tags')}/>
                        {!mobile && 'Tags'}
                    </button>
                </li>
                {!mobile && <div className={changeClass('verticalLine')}/> }
                <li>
                    <button className={changeClass('navbar_link')} onClick={() => {handleLink('settings')}} style={handleStyles('settings')}>
                        <img className={styles.navbar_settings} style={handleIcon('settings')}/>
                        {!mobile && 'Settings'}
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default MobileNavigationBar;