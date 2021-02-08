import React from 'react';
import { Navbar } from './components/Navbar';

import { PickerForm } from './components/PickerForm';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <PickerForm />
      </div>
    </>
  );
};

export default App;
