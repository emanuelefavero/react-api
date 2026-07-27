import { useState } from 'react';
import { IncrementalList } from '@/components/shared/IncrementalList';
import { ActorFilters } from './ActorFilters';
import { ActorList } from './ActorList';
import { filterActors, sortActors } from '@/features/actors/utils';

const INITIAL_FILTERS = Object.freeze({
  gender: 'all',
});

export const ActorCatalog = ({ actors }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const filteredActors = filterActors(actors, filters);
  const sortedActors = sortActors(filteredActors);
  const queryKey = Object.values(filters).join('-');

  const handleFilterChange = (event) => {
    const { type, name, value: inputValue, checked } = event.target;

    const value = type === 'checkbox' ? checked : inputValue;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));
  };

  if (sortedActors.length === 0)
    return <p role='alert'>No actors found matching the selected filters.</p>;

  return (
    <>
      <ActorFilters filters={filters} onFilterChange={handleFilterChange} />

      <IncrementalList
        key={queryKey} // <- Reset incremental list state when filters change
        items={sortedActors}
        renderList={(visibleActors) => <ActorList actors={visibleActors} />}
      />
    </>
  );
};
