import { useState } from 'react';
import { IncrementalList } from '@/components/shared/IncrementalList';
import { ActorFilters } from './ActorFilters';
import { ActorList } from './ActorList';
import {
  filterActors,
  getAppliedFilters,
  getNationalities,
  sortActors,
  getBirthDecades,
} from '@/features/actors/utils';

const INITIAL_FILTERS = Object.freeze({
  gender: 'all',
  nationality: 'all',
  birthDecade: 'all',
  lifeStatus: 'all',
});

export const ActorCatalog = ({ actors }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const filteredActors = filterActors(actors, filters);
  const sortedActors = sortActors(filteredActors);
  const queryKey = Object.values(filters).join('-');
  const nationalities = getNationalities(actors);
  const birthDecades = getBirthDecades(actors);
  const appliedFilters = getAppliedFilters(filters, INITIAL_FILTERS);
  const hasFiltersApplied = Object.values(appliedFilters).some(Boolean);

  const handleFilterChange = (event) => {
    const { type, name, value: inputValue, checked } = event.target;

    const value = type === 'checkbox' ? checked : inputValue;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));
  };

  const handleFilterReset = () => {
    if (!hasFiltersApplied) return;
    setFilters(INITIAL_FILTERS);
  };

  return (
    <>
      <ActorFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onFilterReset={handleFilterReset}
        nationalities={nationalities}
        birthDecades={birthDecades}
        appliedFilters={appliedFilters}
        hasFiltersApplied={hasFiltersApplied}
      />

      {sortedActors.length > 0 ? (
        <IncrementalList
          key={queryKey} // <- Reset incremental list state when filters change
          items={sortedActors}
          renderList={(visibleActors) => <ActorList actors={visibleActors} />}
        />
      ) : (
        <p role='status'>No actors found matching the selected filters.</p>
      )}
    </>
  );
};
