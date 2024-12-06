import React, {useState} from 'react';
import {useTheme, usePassword} from '~/Hooks';
import * as styles from './styles.module.css';
import icons from  '`/icons';

function EnterPassword(){
    const [theme, changeClass] = useTheme(styles);
    const [password, error, handlePassword, handleBlur, handleInvalid] = usePassword();
    const [displayPassword, setDisplayPassword] = useState(false);

    const handleDisplayPassword = () => {
        setDisplayPassword(!displayPassword);
    } 

    return(
        <fieldset className={styles.container}>
            <label className={changeClass('label')}>
                New Password
            </label>
            <div className={styles.input_container}>
                <input 
                    type={displayPassword ? 'text' : 'password'} 
                    name='password'
                    value={password}
                    className={changeClass('input')} 
                    pattern={'.{8,}'}
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
            <div className={changeClass('password_requirement')} style={error ? {color: '#FB3748'} : {}}>
                <img style={error ? {backgroundColor: '#FB3748'} : {}}/>
                At least 8 characters
            </div>
        </fieldset>
    )
}

export default EnterPassword;