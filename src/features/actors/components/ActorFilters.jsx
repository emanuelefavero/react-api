import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import './ActorFilters.css';

const GENDER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export const ActorFilters = ({ filters, onFilterChange, nationalities }) => {
  return (
    <Card className='actor-filter'>
      <Card.Header>
        <Card.Title as='h3'>Filter Actors</Card.Title>
      </Card.Header>
      <Card.Content>
        <form className='form'>
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
        </form>
      </Card.Content>
    </Card>
  );
};
