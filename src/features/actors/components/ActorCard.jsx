import './ActorCard.css';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export const ActorCard = ({ actor }) => (
  <Card as='article' className='actor-card'>
    <div className='header'>
      <img
        className='portrait'
        src={actor.image}
        alt={`${actor.name} portrait`}
        loading='lazy'
        decoding='async'
      />

      <div className='info'>
        <h3 className='name text-xl font-semibold'>{actor.name}</h3>

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

        <div className='movies'>
          <p className='label sr-only'>Movies</p>
          <ul className='list' aria-label={`${actor.name} movies`}>
            {actor.known_for.map((movie) => (
              <li key={movie} className='movie'>
                <Badge>{movie}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className='awards'>
          <p className='label sr-only'>Awards</p>
          <ul className='list' aria-label={`${actor.name} awards`}>
            {actor.awards.map(
              (award) =>
                award !== 'None' && (
                  <li key={award} className='award'>
                    <Badge variant={Badge.variant.warning}>{award}</Badge>
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
    </div>

    <p className='biography text-base'>{actor.biography}</p>
  </Card>
);
