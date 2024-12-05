import {useState, useEffect, useMemo} from 'react';

function useFont() {
    const preferredFont = useMemo(() => localStorage.getItem('users-preferred-font'), []);
    const [font, setFont] = useState(preferredFont || 'sans-serif');

    useEffect(() => {
        localStorage.setItem('users-preferred-font', font);
    }, [font])

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--font', font);
    }, [font]);

    return [font, setFont]
}

export default useFont;