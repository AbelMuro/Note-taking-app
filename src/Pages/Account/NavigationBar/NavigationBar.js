import React, {useState} from 'react';
import icons from '`/icons'
import localIcons from './icons';
import Tags from './Tags';
import * as styles from './styles.module.css';

//now i need to use the useTheme hook to change the styles from light to dark
function NavigationBar(){
    const [option, setOption] = useState('all');

    const handleStyles = (selectedOption) => {
        return option === selectedOption ? {backgroundColor: '#F3F5F8'} : {}
    }

    const handleColor = (selectedOption) => {
        return option === selectedOption ? {backgroundColor: '#335CFF'} : {}
    }

    const handleOption = (option) => {
        setOption(option);
    }

    return(
        <nav className={styles.navigation}>
            <img src={icons['logo']} className={styles.navigation_logo}/>
            <button 
                className={styles.navigation_link} 
                onClick={() => {handleOption('all')}}
                style={handleStyles('all')}
                >
                <img className={styles.navigation_icon} style={handleColor('all')}/> All Notes
                {option === 'all' && <img className={styles.navigation_arrow} src={localIcons['arrowRight']}/>}
            </button>
            <button 
                className={styles.navigation_link} 
                onClick={() => {handleOption('archived')}}
                style={handleStyles('archived')}
                >
                <img className={styles.navigation_icon} style={handleColor('archived')}/> Archived Notes
                {option === 'archived' && <img className={styles.navigation_arrow} src={localIcons['arrowRight']}/>}
            </button>
            <hr className={styles.navigation_line}/>
            <Tags option={option} setOption={setOption} handleStyles={handleStyles} handleColor={handleColor}/>
        </nav>
    )
}

export default NavigationBar;