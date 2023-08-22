import React, { useState } from 'react';

import './App.css';

import Header from './components/header';
import ProMode from './components/proMode';

export type decodedTextType = string | number | null;

function App() {
  return (
    <main className="App h-screen flex justify-center items-center p-3">
      <section className="md:w-[600px]  mx-auto">
        <Header text="Scan Bus Code" />
        <ProMode />
      </section>
    </main>
  );
}

export default App;
