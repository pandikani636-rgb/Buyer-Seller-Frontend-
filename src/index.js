import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { SnackbarProvider } from 'notistack';
import { UserProvider } from './context/UserContext';
import { replaceAlert } from './utils/sweetAlert';

// Configure axios for both local development and production
const isDev = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
axios.defaults.baseURL = isDev 
  ? 'http://localhost:4000' 
  : 'https://buyer-seller-backend.vercel.app';

// Enable credentials (cookies) for all requests
axios.defaults.withCredentials = true;

// Handle 401 Unauthorized response globally (session expired / invalid token signature)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const requestUrl = error.config?.url || '';
      const currentPath = window.location.pathname;

      if (requestUrl.includes('/api/v1/seller')) {
        // Clear seller session
        store.dispatch({ type: 'LOGOUT_SELLER_SUCCESS' });
        
        // Only redirect if they are on a seller page
        if (currentPath.startsWith('/seller')) {
          window.location.href = '/login';
        }
      } else {
        // Clear user/admin session
        store.dispatch({ type: 'LOGOUT_USER_SUCCESS' });
        
        // Only redirect if they are on a protected user/admin page
        const isProtected = currentPath.startsWith('/admin') || 
                            currentPath.startsWith('/account') || 
                            currentPath.startsWith('/me') || 
                            currentPath.startsWith('/orders');
        if (isProtected) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Replace all alert functions with SweetAlert
replaceAlert();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <SnackbarProvider
      maxSnack={3}           
      autoHideDuration={3000} 
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
          <Router>
            <App />
          </Router>
        </SnackbarProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);