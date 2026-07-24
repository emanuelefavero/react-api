// @ts-check
/** @import { ActorsState } from './types' */
import { useState, useEffect, useCallback } from 'react';
import { fetchActors } from './api';
import { ActorList } from './components/ActorList';

/** @type {ActorsState} */
const INITIAL_STATE = Object.freeze({ step: 'idle' });

/**
 * Main Orchestrator for the Actors feature. It handles the fetching of actors data from the API, manages the loading and error states, and renders the ActorList component with the fetched data.
 */
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

  const handleReload = () => loadActors();

  const getContent = () => {
    switch (state.step) {
      case 'idle':
        return null;
      case 'loading':
        return <p role='status'>Loading...</p>;
      case 'error':
        return (
          <div role='alert'>
            <p>Error: {state.error.message}</p>
            <button onClick={handleReload}>Retry</button>
          </div>
        );
      case 'success':
        return <ActorList actors={state.data} />;
      default:
        return null;
    }
  };

  return (
    <section className='actors' aria-labelledby='actors-title'>
      <h2 id='actors-title'>All Actors</h2>

      {getContent()}
    </section>
  );
};
