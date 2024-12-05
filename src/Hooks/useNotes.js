import {useState, useEffect} from 'react';
import {useGetRequest} from '~/Hooks'

function useNotes(initialUrl){
    const [url, setUrl] = useState(initialUrl);
    const [makeFetch] = useGetRequest();
    const [allNotes, setAllNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNotes = async () => {
        setLoading(true);
        const notes = await makeFetch(url,  {method: 'GET', credentials: 'include'});
        setAllNotes && setAllNotes(notes);
        setLoading && setLoading(false);
    }

    useEffect(() => {
        fetchNotes();
    }, [url]);

    useEffect(() => {
        document.addEventListener('notes-updated', fetchNotes);
        return () => document.removeEventListener('notes-updated', fetchNotes);    
    }, [url])

    return [allNotes, loading, setUrl]
}

export default useNotes;