import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import store from "./pages/redux/store"
import { Provider } from 'react-redux' 
import { useSelector, useDispatch } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Shop from'./pages/product/product';
import Features from './pages/about/about';
import Contact from './pages/contact/contact';
import Layout from './pages/navbar/Layout';
import NoPage from './pages/nopage/NoPage';
import Admin from './pages/profile admin/admin';
import User from './pages/profile/profile';


function App(){
   

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />            
            <Route path='product' element={<Shop />} />
            <Route path='about' element={<Features />} />
            <Route path='contact' element={<Contact />} />
            <Route path='admin' element={<Admin />} />
            <Route path='user' element={<User />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
