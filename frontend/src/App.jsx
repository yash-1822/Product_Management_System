import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductListPage from './pages/ProductList/ProductListPage.jsx';
import { ModalProvider } from './Context/ModalContext.jsx';
import './App.css';
import LoginPage from './pages/Login/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const token = localStorage.getItem('authToken');
  ;

  return (
    <Router>
      <ModalProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/products" element={<ProductListPage />} />
        </Routes>
      </ModalProvider>
    </Router>
  );
}

export default App;
