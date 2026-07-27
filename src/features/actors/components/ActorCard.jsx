import './ActorCard.css';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export const ActorCard = ({ actor }) => {
  const awards = actor.awards.filter((award) => award !== 'None');

  return (
    <Card as='article' className='actor-card'>
      <Card.Header className='header'>
        <img
          className='portrait'
          src={actor.image}
          alt={`${actor.name} portrait`}
          draggable='false'
          loading='lazy'
          decoding='async'
        />

        <div className='info'>
          <Card.Title as='h3' className='name text-xl font-semibold'>
            {actor.name}
          </Card.Title>

          <dl className='details text-sm'>
            <div className='detail'>
              <dt className='sr-only'>Born</dt>
              <dd>{actor.birth_year}</dd>
            </div>
            <div className='detail'>
              <dt className='sr-only'>Nationality</dt>
              <dd>{actor.nationality}</dd>
            </div>
          </dl>
        </div>
      </Card.Header>

      <Card.Content className='content'>
        <p className='biography text-base'>{actor.biography}</p>

        <div className='movies'>
          <h4 className='label text-sm font-semibold'>Known for</h4>
          <p className='titles text-sm'>{actor.known_for.join(' · ')}</p>
        </div>

        {awards.length > 0 && (
          <div className='awards'>
            <h4 className='label text-sm font-semibold'>Awards</h4>
            <ul className='list' aria-label={`${actor.name} awards`}>
              {awards.map((award) => (
                <li key={award} className='award'>
                  <Badge variant={Badge.variant.warning}>{award}</Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};
