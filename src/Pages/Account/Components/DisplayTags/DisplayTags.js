import React, {useState, useEffect} from 'react';
import CreateNewNote from '~/Common/Buttons/CreateNewNote';
import LoadingTags from '~/Common/Components/LoadingTags';
import {usePreNavigate} from '~/Hooks';
import {useTheme, useGetRequest, useMediaQuery} from '~/Hooks';
import * as styles from './styles.module.css';

function DisplayMobileTags() {
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [makeFetch] = useGetRequest();
    const [,changeClass] = useTheme(styles);
    const navigate = usePreNavigate();

    const handleTag = (tag) => {
        navigate(`${tag}`);
    }

    const getTags = async () => {
        setLoading(true);
        const tags = await makeFetch(`https://note-taking-server-thr9.onrender.com/get-notes/tags`, {
            method: 'GET',
            credentials: 'include'
        });
        setAllTags && setAllTags(tags);
        setLoading && setLoading(false);
    }

    useEffect(() => {
        if(!tablet) return;
        getTags();
    }, [tablet])

    return tablet ? 
        <section className={changeClass('tags')}>
            <CreateNewNote/>
            <h1 className={changeClass('tags_title')}>
                Tags
            </h1>
            <div className={styles.tags_all}>
                {
                   loading ? <LoadingTags/> : allTags.map((tag, i) => {
                        return(
                            <React.Fragment key={tag}>
                                <div className={changeClass('tags_tag')} onClick={() => handleTag(tag)}>
                                    <img className={changeClass('tags_icon')} />
                                    <span>{tag}</span>
                                </div>
                                {i !== allTags.length - 1 && <hr className={changeClass('line')}/>}                                
                            </React.Fragment>
                        )
                    })
                }                
            </div>
        </section> :    
        <div className={changeClass('column')}>
            <CreateNewNote/>
            <p className={changeClass('empty_message')}>
                No tags have been selected, please select a tag to view the notes.          
            </p>    
        </div>       
}

export default DisplayMobileTags;