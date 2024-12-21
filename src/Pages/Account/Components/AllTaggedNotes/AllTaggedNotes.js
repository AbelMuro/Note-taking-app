import React, {useEffect} from 'react';
import CreateNewNote from '~/Common/Buttons/CreateNewNote';
import {usePreNavigate} from '~/Hooks';
import {useNotes, useTheme, useMediaQuery} from '~/Hooks';
import {useParams} from 'react-router-dom';
import FormatNotes from '~/Common/Components/FormatNotes'
import * as styles from './styles.module.css';


function AllTaggedNotes() {
    const navigate = usePreNavigate();
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const {tags} = useParams();
    const [allNotes, loading, setUrl] = useNotes(`https://note-taking-server.netlify.app/get-notes/tags:${tags}`);
    const [, changeClass] = useTheme(styles);

    const handleGoBack = () => {
        navigate('/account/tags');
    }

    useEffect(() => {
        setUrl(`https://note-taking-server.netlify.app/get-notes/tags:${tags}`);
    }, [tags])

    useEffect(() => {
        if(loading) return;

        if(!allNotes.length) 
            navigate('/account/tags');
    }, [allNotes, loading])

    return (
        <div className={changeClass('notes')}>
            <CreateNewNote/>
            {tablet && 
                <div className={styles.notes_data}>
                    <button className={changeClass('notes_goBack')} onClick={handleGoBack}>
                        <img className={changeClass('notes_arrow')}/>
                        All Tags
                    </button>
                    <h1 className={changeClass('notes_title')}>
                        Notes Tagged: <span>{tags}</span>
                    </h1>
                    <p className={changeClass('notes_message')}>
                        All notes with the <span>"{tags}"</span> are shown here.
                    </p>
                </div>
            }
            <FormatNotes 
                allNotes={allNotes} 
                loading={loading} 
                emptyMessage={'No tags have been selected, please select a tag to view the notes.'}/>
        </div>
    )

}

export default AllTaggedNotes;