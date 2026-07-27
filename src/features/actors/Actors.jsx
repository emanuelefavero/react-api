import { useState, useEffect, useCallback } from 'react';
import { IncrementalList } from '@/components/shared/IncrementalList';
import { Spinner } from '@/components/ui/Spinner';
import { delay } from '@/lib/utils';
import { fetchActors } from './api';
import { ActorList } from './components/ActorList';
import { ActorFilter } from './components/ActorFilter';
import './Actors.css';

const INITIAL_STATE = Object.freeze({ step: 'idle' });
const INITIAL_FILTER = Object.freeze({ gender: 'all' });

/**
 * Main Orchestrator for the Actors feature. It handles the fetching of actors data from the API, manages the loading and error states, and renders the ActorList component with the fetched data.
 */
export const Actors = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [filter, setFilter] = useState(INITIAL_FILTER);

  const loadActors = useCallback(async () => {
    setState({ step: 'loading' });

    try {
      const [data] = await Promise.all([fetchActors(), delay()]);

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

  const handleFilterChange = (e) => {
    const { type, name, value: inputValue, checked } = e.target;
    const value = type === 'checkbox' ? checked : inputValue;

    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

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
        const filteredActors =
          filter.gender === 'all'
            ? state.data
            : state.data?.filter((actor) => actor.gender === filter.gender);

        return (
          <>
            <ActorFilter filter={filter} onFilterChange={handleFilterChange} />

            <IncrementalList
              key={filter.gender}
              items={filteredActors}
              renderList={(visibleActors) => (
                <ActorList actors={visibleActors} />
              )}
            />
          </>
        );
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
