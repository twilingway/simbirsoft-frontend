import React from 'react';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Football statistics</h1>
      </div>
    </>
  );
};

export default App;
