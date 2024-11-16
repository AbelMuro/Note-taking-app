import React, {useState, useEffect} from 'react';
import EnterPassword from './EnterPassword';
import ReEnterPassword from './ReEnterPassword';
import * as styles from './styles.module.css';

function Form() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setError('unequal');
            return;
        }
    }

    useEffect(() => {
        setError('');
    }, [password, confirmPassword])

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <EnterPassword password={password} setPassword={setPassword}/>
            <ReEnterPassword password={confirmPassword} setPassword={setConfirmPassword}/>
            {error && 
                <div className={styles.error}> 
                    <img className={styles.error_icon}/>
                    Passwords are not the same
                </div>}
            <button className={styles.form_submit}>
                Reset Password
            </button>
        </form>
    )
}

export default Form;