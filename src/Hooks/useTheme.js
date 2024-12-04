import {useSelector} from 'react-redux';

function useTheme(style) {
    const theme = useSelector(state => state.theme.theme);
    
    const detectSystemTheme = () => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(isDarkMode)
            return 'dark';
        else 
            return 'light';
    }

    const changeClass = (className) => {
        if(theme === 'system'){
            const system = detectSystemTheme();
            return [style[className], style[system]].join(' ');
        }
        else
            return [style[className], style[theme]].join(' ');
           
    }

    if(theme === 'system')
        return [detectSystemTheme(theme), changeClass];
    else
        return [theme, changeClass]
}

export default useTheme;