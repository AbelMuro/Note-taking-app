import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Store from './Store';
import App from './App.js';

const rootRef = document.getElementById('root');
const root = ReactDOM.createRoot(rootRef);
root.render(
    <Provider store={Store}>
        <App/>
    </Provider>
)