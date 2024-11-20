import {useSelector} from 'react-redux';

function useTheme(style) {
    const theme = useSelector(state => state.theme.theme);

    const changeClass = (className) => {
        return theme === 'light' ? [style[className], style['light']].join(' ') : [style[className], style['dark']].join(' ')
    }

    return [theme, changeClass];
}

export default useTheme;