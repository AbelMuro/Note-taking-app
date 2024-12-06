import React, {useState} from 'react';
import {useTheme, usePassword} from '~/Hooks';
import * as styles from './styles.module.css';
import icons from '`/icons'

function ConfirmPassword(){
    const [theme, changeClass] = useTheme(styles);
    const [password, error, handlePassword, handleBlur, handleInvalid] = usePassword();
    const [displayPassword, setDisplayPassword] = useState(false);
    
    const handleDisplayPassword = () => {
        setDisplayPassword(!displayPassword);
    } 


    return(
        <fieldset className={styles.container}>
            <label className={changeClass('label')}>
                Confirm New Password
            </label>
            <div className={styles.input_container}>
                <input 
                    type={displayPassword ? 'text' : 'password'} 
                    name='confirm-password'
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
            {error === 'empty' && 
                <div className={styles.error}>
                    <img className={styles.error_icon} src={icons['error']}/>
                    Can't be empty
                </div>}
        </fieldset>
    )
}

export default ConfirmPassword;