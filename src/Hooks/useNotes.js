import {useState, useEffect} from 'react';
import {useGetNotes} from '~/Hooks'

function useNotes(url){
    const [makeFetch] = useGetNotes();
    const [allNotes, setAllNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNotes = async () => {
        setLoading(true);
        const notes = await makeFetch(url);
        setAllNotes && setAllNotes(notes);
        setLoading && setLoading(false);
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        document.addEventListener('notes-updated', fetchNotes);
        return () => document.removeEventListener('notes-update', fetchNotes);    
    }, [])

    return [allNotes, loading, fetchNotes]
}

export default useNotes;