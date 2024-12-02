import React, {useState, useTransition} from 'react';
import {useTheme} from '~/Hooks';
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as styles from './styles.module.css';

function SearchBox() {
    const [, startTransition] = useTransition();
    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [, changeClass] = useTheme(styles);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        if(pathname !== '/account/search')
            navigate('/account/search');
        startTransition(() => {
            dispatch({type: 'UPDATE_SEARCH', payload: query});
        })
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