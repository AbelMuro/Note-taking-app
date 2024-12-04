import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './Reducers';
import {                
    persistStore,                                                                   //this function is used to make the global store persist the state
    persistReducer,                                                                 //this function is used to make the ROOT reducer persist the state
    FLUSH,                                                                          //these are all default actions that are used by redux-persist in the background 
    REHYDRATE,                                                                      // to persist the state in the local storage
    PAUSE,                                                                          // Keep in mind that these actions are non-serializable
    PERSIST,                                                                        // so you have to make sure that redux doesnt use serializableCheck on these actions
    PURGE,                                                                          // in the configureStore()
    REGISTER} from 'redux-persist';
import { getPersistConfig } from 'redux-deep-persist';
import storage from 'redux-persist/lib/storage';

const config = getPersistConfig({
    key: 'root',
    storage,
    whitelist: ['theme', 'font'],  
    rootReducer
});
const persistedReducer = persistReducer(config, rootReducer);

const store = configureStore({                   
    reducer: persistedReducer,
    middleware : getDefaultMiddleware => getDefaultMiddleware({serializableCheck: {ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}})
})

export const persistedStore = persistStore(store);

export default store;