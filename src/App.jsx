import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * @typedef {Object} Data
 * @property {number} id
 * @property {string} name
 * @property {number} birth_year
 * @property {string} nationality
 * @property {string[]} known_for
 * @property {string[]} awards
 * @property {string} biography
 * @property {string} image
 */

/** @type {{
 *  step: 'idle' | 'loading' | 'success' | 'error',
 *  data?: Data[],
 *  error?: Error
 * }}
 */
const INITIAL_STATE = { step: 'idle' };

const ACTORS_URL = 'https://lanciweb.github.io/demo/api/actors/';
const ACTRESSES_URL = 'https://lanciweb.github.io/demo/api/actresses/';

const fetchData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const loadData = async (url, setState) => {
  setState({ step: 'loading' });

  try {
    const data = await fetchData(url);
    setState({ step: 'success', data });
  } catch (error) {
    setState({ step: 'error', error });
  }
};

export function App() {
  const [actors, setActors] = useState(INITIAL_STATE);
  const [actresses, setActresses] = useState(INITIAL_STATE);

  useEffect(() => {
    loadData(ACTORS_URL, setActors);
    loadData(ACTRESSES_URL, setActresses);
  }, []);

  return (
    <div className='app'>
      <header className='header'>
        <div className='container'>
          <h1 className='font-semibold text-4xl'>React API</h1>
        </div>
      </header>

      <main className='main'>
        <div className='container'>
          <code style={{ color: 'var(--warning)' }}>
            {JSON.stringify(actors.data, null, 2)}
          </code>

          <code style={{ color: 'var(--danger)' }}>
            {JSON.stringify(actresses.data, null, 2)}
          </code>
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
