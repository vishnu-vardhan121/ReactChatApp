import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { DispWidthContextProvider } from './context/dispWidthContex';
import { PageContextProvider } from './context/pageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PageContextProvider>
  <DispWidthContextProvider>
  <AuthContextProvider>
    <ChatContextProvider>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChatContextProvider>
  </AuthContextProvider>
  </DispWidthContextProvider>
  </PageContextProvider>
);


