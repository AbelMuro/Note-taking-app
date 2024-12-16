import React, {memo} from 'react';
import {usePreNavigate} from '~/Hooks';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function GoBackButton() {
    const [,changeClass] = useTheme(styles);
    const navigate = usePreNavigate();

    const handleNavigate = () => {
        navigate('..');
    }

    return(                
        <button className={changeClass('theme_button')} onClick={handleNavigate}>
            <img className={changeClass('theme_button_icon')}/>
            Settings
        </button>
    )
}

export default memo(GoBackButton);