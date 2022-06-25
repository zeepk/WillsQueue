import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import '/node_modules/primeflex/primeflex.css';

ReactDOM.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
        redirectUri={process.env.REACT_APP_BASE_URL || ''}
        audience={process.env.REACT_APP_AUTH0_AUDIENCE || ''}
        scope="openid profile email"
        issuer={process.env.REACT_APP_AUTH0_DOMAIN || ''}
        responseType="token id_token"
    >
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Auth0Provider>,
    document.getElementById('root')
);
