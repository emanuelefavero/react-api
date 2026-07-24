// @ts-check
/** @import { Actor } from './types' */
import { fetchData } from '@/lib/api';
import { normalizeActorsData } from './utils';

const ACTORS_URL = 'https://lanciweb.github.io/demo/api/actors/';
const ACTRESSES_URL = 'https://lanciweb.github.io/demo/api/actresses/';

/**
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
