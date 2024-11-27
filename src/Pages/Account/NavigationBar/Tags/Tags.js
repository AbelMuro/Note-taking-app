import React, {useState, useEffect} from 'react';
import {useNotes} from '~/Hooks';
import { useNavigate} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import {useGetNotes} from '~/Hooks';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '~/Hooks';
import icons from '../icons';
import * as styles from './styles.module.css';

function Tags({handleStyles, handleColor}){
    const navigate = useNavigate();
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [makeFetch] = useGetNotes();
    const [theme, changeClass] = useTheme(styles);
    const option = useSelector(state => state.nav.nav);
    const dispatch = useDispatch();

    const handleTag = (selectedTag) => {
        dispatch({type: 'UPDATE_NAV', payload: selectedTag});
        navigate(`/account/${selectedTag}`);
    }

    const getTags = async () => {
        setLoading(true);
        const tags = await makeFetch(`http://localhost:4000/get-notes/tags`, {
            method: 'GET',
            credentials: 'include'
        });
        setAllTags && setAllTags(tags);
        setLoading && setLoading(false);
    }

    useEffect(() => {
        getTags();
        document.addEventListener('update-tags', getTags);
        return () => document.removeEventListener('update-tags', getTags);
    }, [])


    return(
        <section className={styles.tags}>
            <h1 className={styles.tags_title}>
                Tags
            </h1>
            {
                loading ? <ClipLoader size='35px' color='#335CFF'/> : allTags.map((tag) => {
                    return(
                        <div className={changeClass('tags_tag')} style={handleStyles(tag)} onClick={() => handleTag(tag)} key={tag}>
                            <img className={changeClass('tags_icon')} style={handleColor(tag)}/>
                            {tag}
                            {option === tag && <img className={styles.tags_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
                        </div>
                    )
                })
            }
        </section>
    )
}

export default Tags;