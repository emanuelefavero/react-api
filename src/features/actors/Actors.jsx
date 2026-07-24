// @ts-check
/** @import { ActorsState } from './types' */
import { useState, useEffect, useCallback } from 'react';
import { fetchActors } from './api';

/** @type {ActorsState} */
const INITIAL_STATE = Object.freeze({ step: 'idle' });

export const Actors = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const loadActors = useCallback(async () => {
    setState({ step: 'loading' });

    try {
      const data = await fetchActors();

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
  }, []);

  useEffect(() => {
    loadActors();
  }, [loadActors]);

  return (
    <div className='actors'>
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
    </div>
  );
};
