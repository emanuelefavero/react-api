import './App.css';

export function App() {
  return (
    <div className='app'>
      <header className='header'>
        <div className='container'>
          <h1 className='font-semibold text-4xl'>React API</h1>
        </div>
      </header>

      <main className='main'>
        <div className='container'>
          <p>Hello</p>
        </div>
      </main>

      <footer className='footer'>
        <div className='container'>
          <p className='text-sm text-center font-medium'>
            &copy; {new Date().getFullYear()} Emanuele Favero
          </p>
        </div>
      </footer>
    </div>
  );
}
