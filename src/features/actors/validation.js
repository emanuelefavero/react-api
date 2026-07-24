// @ts-check
/** @import { ApiActor } from './types' */

/**
 * @param {unknown} value
 * @returns {value is string[]}
 */
const isStringArray = (value) =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

/**
 * @param {unknown} value
 * @returns {value is ApiActor}
 */
const isApiActor = (value) => {
  if (typeof value !== 'object' || value === null) return false;

  const actor = /** @type {Record<string, unknown>} */ (value);

  return (
    typeof actor.id === 'number' &&
    typeof actor.name === 'string' &&
    typeof actor.birth_year === 'number' &&
    typeof actor.nationality === 'string' &&
    typeof actor.biography === 'string' &&
    typeof actor.image === 'string' &&
    isStringArray(actor.known_for) &&
    isStringArray(actor.awards) &&
    (actor.death_year === undefined || typeof actor.death_year === 'number')
  );
};

/**
 * @param {unknown} data
 * @returns {ApiActor[]}
 */
export const validateActorsData = (data) => {
  if (!Array.isArray(data) || !data.every(isApiActor)) {
    throw new Error('Invalid actors data received from the API');
  }

  return data;
};
