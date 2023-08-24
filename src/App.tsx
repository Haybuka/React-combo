import './App.css';

import Header from './components/header';
import Login from './components/login';

export type decodedTextType = string | number | null;

function App() {
  return (
    <main className="h-screen flex justify-center  p-3">
      <section className="mx-auto">
        <Header text="React Hook Form" />
        <Login />
      </section>
    </main>
  );
}

export default App;
