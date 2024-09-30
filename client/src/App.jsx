import React from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from './components/Navbar';

const App = () => {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
};

export default App;