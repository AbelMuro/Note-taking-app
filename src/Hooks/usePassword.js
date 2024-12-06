import {useState} from 'react';

function usePassword(){
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handlePassword = (e) => {
        setPassword(e.target.value);
        e.target.setCustomValidity('');
        setError('');
    }

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        const isInvalid = e.target.validity.patternMismatch;

        if(isEmpty)
            setError('empty');
        else if(isInvalid)
            setError('invalid')
    }

    const handleInvalid = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        e.target.setCustomValidity(' ');

        if(isEmpty)
            setError('empty');
        else
            setError('invalid');
    }

    return [password, error, handlePassword, handleBlur, handleInvalid]

}

export default usePassword;