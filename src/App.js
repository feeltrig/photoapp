import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider } from './appstate/appState';

// COMPONENTS
import Footer from './components/Footer';
import Header from './components/Header';

// PAGES
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {
  return (
    <>
      <ContextProvider>
        <Router>
          <Header />
          <div className="mainContent">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/*" element={<ProtectedRoutes />} />

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </ContextProvider>
    </>
  );
}

export default App;
