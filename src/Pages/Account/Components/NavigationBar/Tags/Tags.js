import React, {useState, useEffect} from 'react';
import {usePreNavigate} from '~/Hooks';
import LoadingTags from '~/Common/Components/LoadingTags';
import {useGetRequest} from '~/Hooks';
import {useTheme} from '~/Hooks';
import icons from '`/icons';
import * as styles from './styles.module.css';

function Tags({option, handleStyles, handleColor}){
    const navigate = usePreNavigate();
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [makeFetch] = useGetRequest();
    const [theme, changeClass] = useTheme(styles);

    const handleTag = (option) => {
        navigate(`/account/tags/${option}`);
    }

    const getTags = async () => {
        setLoading(true);
        const tags = await makeFetch(`https://note-taking-server.netlify.app/get-notes/tags`, {
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
                loading ? <LoadingTags/> : allTags.map((tag) => {
                    return(
                        <div className={changeClass('tags_tag')} style={handleStyles(tag)} onClick={() => handleTag(tag)} key={tag}>
                            <img className={changeClass('tags_icon')} style={handleColor(tag)}/>
                            <span>{tag}</span>
                            {option === tag && <img className={styles.tags_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
                        </div>
                    )
                })
            }
        </section>
    )
}

export default Tags;