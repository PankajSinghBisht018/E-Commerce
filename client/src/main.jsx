import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-3jgw81aw0h1dgoia.us.auth0.com"
    clientId="Fef3069eWlZQh0kVi3dVvH7t7Gih3Jmo"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <Provider store={store}>
    <App />
  </Provider>
  </Auth0Provider>
);
