import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom'
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function RouteTitle() {
    const search = useSelector(state => state.search.search);
    const [,changeClass] = useTheme(styles);
    const {pathname} = useLocation();

    const path = useMemo(() => {
        let paths = pathname.split('/');
        paths.shift();

        if(paths[1] === 'archived-notes')
            return 'Archived Notes'
        else if(paths[1] === 'tags')
            return (
                <div className={changeClass('title_path')}>  
                    <span>
                        Notes Tagged:&nbsp;
                    </span>
                    {paths[2] || ''}
                </div>)
        else if(paths[1] === 'search')
            return (
                <div className={changeClass('title_path')}>  
                    <span>
                        Showing results for:&nbsp;
                    </span>
                    {paths[2] || ''}
                </div>)
        else if(paths[1] === 'settings')
            return 'Settings';
        else
            return 'All Notes';

    }, [pathname, search])

    return(
        <h1 className={changeClass('title')}>
            {path}
        </h1>
    )
}

export default RouteTitle;