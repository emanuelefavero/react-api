// @ts-check

import './App.css';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/** @typedef {'male' | 'female'} Gender */

/**
 * @typedef {Object} ApiActor
 * @property {number} id
 * @property {string} name
 * @property {number} birth_year
 * @property {number} [death_year]
 * @property {string} nationality
 * @property {string[]} known_for
 * @property {string[]} awards
 * @property {string} biography
 * @property {string} image
 */

/**
 * @typedef {ApiActor & {
 *   uid: string,
 *   gender: Gender
 * }} Actor
 */

/**
 * @typedef {
 *   | { step: 'idle' }
 *   | { step: 'loading' }
 *   | { step: 'success', data: Actor[] }
 *   | { step: 'error', error: Error }
 * } State
 */

/** @type {State} */
const INITIAL_STATE = { step: 'idle' };

const ACTORS_URL = 'https://lanciweb.github.io/demo/api/actors/';
const ACTRESSES_URL = 'https://lanciweb.github.io/demo/api/actresses/';

/**
 * @param {Object[]} data
 * @param {Gender} gender
 * @returns {Actor[]}
 */
const normalizeActorsData = (data, gender) => {
  return data.map((item) => ({
    ...item,
    uid: `${gender}-${item.id}`,
    gender,
  }));
};

const fetchData = async (url, params = {}) => {
  const { data } = await axios.get(url, { params });
  return data;
};

const fetchActors = async () => {
  const [actors, actresses] = await Promise.all([
    fetchData(ACTORS_URL),
    fetchData(ACTRESSES_URL),
  ]);

  return [
    ...normalizeActorsData(actors, 'male'),
    ...normalizeActorsData(actresses, 'female'),
  ].sort((a, b) => a.name.localeCompare(b.name));
};

export function App() {
  const [state, setState] = useState(INITIAL_STATE);

  const loadActors = useCallback(async () => {
    setState({ step: 'loading' });

    try {
      const data = await fetchActors();

      console.log('success', data);
      setState({
        step: 'success',
        data,
      });
    } catch (error) {
      setState({
        step: 'error',
        error,
      });
    }
  }, []); // memoized cause it's inside the component and used in useEffect

  useEffect(() => {
    loadActors();
  }, [loadActors]);

  return (
    <div className='app'>
      <header className='header'>
        <div className='container'>
          <h1 className='font-semibold text-4xl'>React API</h1>
        </div>
      </header>

      <main className='main'>
        <div className='container'>
          <p>
            {(() => {
              switch (state.step) {
                case 'idle':
                  return 'Idle...';
                case 'loading':
                  return 'Loading...';
                case 'success':
                  return `Success: ${state.data.length} items loaded`;
                case 'error':
                  return `Error: ${state.error.message}`;
                default:
                  return '';
              }
            })()}
          </p>
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
