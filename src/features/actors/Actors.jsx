// @ts-check
/** @import { ActorsState } from './types' */
import { useState, useEffect, useCallback } from 'react';
import { Spinner } from '@/components/ui/Spinner';
import { delay } from '@/lib/utils';
import { fetchActors } from './api';
import { ActorCatalog } from './components/ActorCatalog';
import './Actors.css';

/** @type {ActorsState} */
const INITIAL_STATE = Object.freeze({ step: 'idle' });

/**
 * Main Orchestrator for the Actors feature. It handles the fetching of actors data from the API, manages the loading and error states, and renders the fetched data.
 */
export const Actors = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const loadActors = useCallback(() => {
    setState({ step: 'loading' });

    return Promise.all([fetchActors(), delay()])
      .then(([data]) => setState({ step: 'success', data }))
      .catch((error) =>
        setState({
          step: 'error',
          error,
        }),
      );
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
        return <Spinner />;
      case 'error':
        return (
          <div role='alert'>
            <p>Error: {state.error.message}</p>
            <button onClick={handleReload}>Retry</button>
          </div>
        );
      case 'success':
        return <ActorCatalog actors={state.data} />;
      default:
        return null;
    }
  };

  return (
    <section className='actors' aria-labelledby='actors-title'>
      <h2 id='actors-title' className='font-normal text-3xl'>
        Actors
      </h2>

      {getContent()}
    </section>
  );
};
