import React from 'react';
import {useTheme} from '~/Hooks';
import {useLocation} from 'react-router-dom';
import {usePreNavigate} from '~/Hooks';
import {useDispatch, useSelector} from 'react-redux';
import * as styles from './styles.module.css';

function SearchBox() {
    const search = useSelector(state => state.search.search);
    const navigate = usePreNavigate();
    const {pathname} = useLocation();
    const [, changeClass] = useTheme(styles);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        const query = e.target.value;
        if(pathname !== '/account/search')
            navigate('/account/search');
        dispatch({type: 'UPDATE_SEARCH', payload: query});
        
    }

    return(
        <div className={styles.search}>
            <input 
                type='search' 
                value={search}
                onChange={handleSearch}
                className={changeClass('search_box')} 
                placeholder='Search by title, content, or tags...'/>  
            <img className={changeClass('search_icon')}/>          
        </div>

    )
}


export default SearchBox;