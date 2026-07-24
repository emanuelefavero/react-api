// @ts-check
/** @import { Actor } from './types' */
import { fetchData } from '@/lib/api';
import { normalizeActorsData } from './utils';

const ACTORS_URL = 'https://lanciweb.github.io/demo/api/actors/';
const ACTRESSES_URL = 'https://lanciweb.github.io/demo/api/actresses/';

/**
 * Fetches actors and actresses data from the API and returns a combined and normalized list of actors with unique identifiers and gender information.
 *
 * @returns {Promise<Actor[]>}
 */
export const fetchActors = async () => {
  const [actors, actresses] = await Promise.all([
    fetchData(ACTORS_URL),
    fetchData(ACTRESSES_URL),
  ]);

  return [
    ...normalizeActorsData(actors, 'male'),
    ...normalizeActorsData(actresses, 'female'),
  ].sort((a, b) => a.name.localeCompare(b.name));
};
