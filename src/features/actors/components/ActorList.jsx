import './ActorList.css';
import { ActorCard } from './ActorCard';

export const ActorList = ({ actors }) => (
  <ul className='actor-list'>
    {actors.map((actor) => (
      <li key={actor.uid} className='item'>
        <ActorCard actor={actor} />
      </li>
    ))}
  </ul>
);
