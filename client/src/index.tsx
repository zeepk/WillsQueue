import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import '/node_modules/primeflex/primeflex.css';

ReactDOM.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH_DOMAIN || ''}
        clientId={process.env.REACT_APP_AUTH_ID || ''}
        redirectUri={process.env.REACT_APP_API_URL || ''}
    >
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
