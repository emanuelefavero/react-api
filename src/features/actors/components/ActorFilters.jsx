import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import './ActorFilters.css';

const GENDER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const LIFE_STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'living', label: 'Living' },
  { value: 'deceased', label: 'Deceased' },
];

export const ActorFilters = ({
  filters,
  onFilterChange,
  nationalities,
  birthDecades,
}) => {
  return (
    <Card className='actor-filter'>
      <Card.Header>
        <Card.Title as='h3'>Filter Actors</Card.Title>
      </Card.Header>

      <Card.Content>
        <form className='form'>
          {/* GENDER */}
          <div className='form-group'>
            <label htmlFor='gender-select' className='font-medium text-base'>
              Gender
            </label>
            <Select
              name='gender'
              id='gender-select'
              value={filters.gender}
              onChange={onFilterChange}
            >
              {GENDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {/* NATIONALITY */}
          <div className='form-group'>
            <label
              htmlFor='nationality-select'
              className='font-medium text-base'
            >
              Nationality
            </label>
            <Select
              name='nationality'
              id='nationality-select'
              value={filters.nationality}
              onChange={onFilterChange}
            >
              <option value='all'>All</option>

              {nationalities.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>

          {/* BIRTH DECADE */}
          <div className='form-group'>
            <label htmlFor='decade-select' className='font-medium text-base'>
              Birth decade
            </label>

            <Select
              name='birthDecade'
              id='decade-select'
              value={filters.birthDecade}
              onChange={onFilterChange}
            >
              <option value='all'>All</option>

              {birthDecades.map((decade) => (
                <option key={decade} value={decade}>
                  {decade}s
                </option>
              ))}
            </Select>
          </div>

          {/* LIFE STATUS */}
          <div className='form-group'>
            <label htmlFor='status-select' className='font-medium text-base'>
              Life status
            </label>

            <Select
              name='lifeStatus'
              id='status-select'
              value={filters.lifeStatus}
              onChange={onFilterChange}
            >
              {LIFE_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </form>
      </Card.Content>
    </Card>
  );
};
