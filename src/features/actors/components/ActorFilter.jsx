import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import './ActorFilter.css';

const GENDER_SELECT_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export const ActorFilter = ({ filter, onFilterChange }) => {
  const handleSubmit = (e) => e.preventDefault();

  return (
    <Card className='actor-filter'>
      <Card.Header>
        <Card.Title as='h3'>Filter Actors</Card.Title>
      </Card.Header>
      <Card.Content>
        <form onSubmit={handleSubmit} className='form'>
          <div className='form-group'>
            <label htmlFor='gender-select' className='font-medium text-base'>
              Gender
            </label>
            <Select
              name='gender'
              id='gender-select'
              value={filter.gender}
              onChange={onFilterChange}
            >
              {GENDER_SELECT_OPTIONS.map((option) => (
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
