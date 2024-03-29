import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Home from './pages/Home/Home';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <ProSidebarProvider>
    {/* <BrowserRouter> */}
    <HashRouter>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </HashRouter>
  </ProSidebarProvider>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
