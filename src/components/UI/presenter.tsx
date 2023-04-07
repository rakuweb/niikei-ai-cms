import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import React, { useState } from 'react';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Header isOpen={isOpen} />
    </div>
  );
};

export default App;
