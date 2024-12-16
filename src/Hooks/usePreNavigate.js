import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { clearSessionStorage } from '~/Common/Functions';

function usePreNavigate(){
    const changesSaved = useSelector(state => state.changesSaved.changesSaved);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const preNavigate = (pathname, options = {}) => {
        if(changesSaved === true){
            navigate(pathname, options)
            clearSessionStorage();
        }
        else{
            if(confirm('You have unsaved changes, are you sure you wish to proceed?')){
                dispatch({type: 'SET_CHANGES', payload: true});
                clearSessionStorage();
                navigate(pathname, options);
            }       
        }
    }

    return preNavigate;  
}

export default usePreNavigate;