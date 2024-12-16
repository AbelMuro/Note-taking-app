import React, {useState} from 'react';
import {useTheme, usePassword} from '~/Hooks';
import * as styles from './styles.module.css';
import icons from '`/icons'
import {usePreNavigate} from '~/Hooks';

function EnterPassword(){
    const [theme, changeClass] = useTheme(styles);
    const [password, error, handlePassword, handleBlur, handleInvalid] = usePassword();
    const [displayPassword, setDisplayPassword] = useState(false);
    const navigate = usePreNavigate();

    const handleForgot = () => {
        navigate('/forgot');
    }
    
    const handleDisplayPassword = () => {
        setDisplayPassword(!displayPassword);
    } 

    return(
        <fieldset className={styles.container}>
            <label className={changeClass('label')}>
                Password
            </label>
            <div className={styles.input_container}>
                <input 
                    type={displayPassword ? 'text' : 'password'} 
                    name='password'
                    value={password}
                    className={changeClass('input')} 
                    onBlur={handleBlur}
                    onChange={handlePassword}
                    onInvalid={handleInvalid}
                    required
                    />
                {
                displayPassword ? 
                    <img className={styles.eye_icon} src={theme === 'light' ? icons['hide'] : icons['hideDark']} onClick={handleDisplayPassword}/>
                        :
                    <img className={styles.eye_icon} src={theme === 'light' ? icons['show'] : icons['showDark']} onClick={handleDisplayPassword}/>
                }
            </div>
            <a className={styles.forgot_password} onClick={handleForgot}>
                Forgot
            </a>
            {error === 'empty' && 
                <div className={styles.error}>
                    <img className={styles.error_icon} src={icons['error']}/>
                    Can't be empty
                </div>}
        </fieldset>
    )
}

export default EnterPassword;