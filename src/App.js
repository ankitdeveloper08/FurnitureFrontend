import React from 'react';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🪑 Mahesh Furniture Gallery</h1>
        <p className="subtitle">Explore our elegant furniture collection</p>
      </header>
      <main className="main">
        <Gallery />
      </main>
    </div>
  );
}

export default App;
