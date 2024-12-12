import React, {useEffect} from 'react';
import CreateNewNote from '~/Common/Buttons/CreateNewNote';
import {useNavigate} from 'react-router-dom';
import {useNotes, useTheme, useMediaQuery} from '~/Hooks';
import {useParams} from 'react-router-dom';
import FormatNotes from '~/Common/Components/FormatNotes'
import * as styles from './styles.module.css';


function AllTaggedNotes() {
    const navigate = useNavigate();
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const {tags} = useParams();
    const [allNotes, loading, setUrl] = useNotes(`http://localhost:4000/get-notes/tags:${tags}`);
    const [, changeClass] = useTheme(styles);

    const handleGoBack = () => {
        navigate('/account/tags');
    }

    useEffect(() => {
        setUrl(`http://localhost:4000/get-notes/tags:${tags}`);
    }, [tags])

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