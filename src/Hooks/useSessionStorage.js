import {useState, useEffect} from 'react';

function useSessionStorage(item) {
    const [value, setValue] = useState('');

    useEffect(() => {
        const prevValue = sessionStorage.getItem(item);
        setValue(prevValue || '')
    },[]);

    return [value];
}

export default useSessionStorage;