import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';

function ChangeBackground() {
    const theme = useSelector(state => state.theme.theme);

    useEffect(() => {
        const body = document.body;
        body.style.backgroundColor = theme === 'light' ? '#F3F5F8' : '#2B303B';
    }, [theme]);


    return <></>;
}

export default ChangeBackground;