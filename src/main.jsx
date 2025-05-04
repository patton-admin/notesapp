import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import configureStore from "./store/configureStore";
import App from './App'
import './styles/index.css'
import './styles/index.css'

export const store = configureStore();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
)
