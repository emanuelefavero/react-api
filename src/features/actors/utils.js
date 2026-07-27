// @ts-check
/** @import { Actor, ApiActor, Gender, ActorsFilter } from './types' */

/**
 * Normalizes the actors data fetched from the API by adding a unique identifier and gender to each actor for preventing key collisions in React lists (uid) and for filtering actors by gender.
 *
 * @param {ApiActor[]} data
 * @param {Gender} gender
 * @returns {Actor[]}
 */
export const normalizeActorsData = (data, gender) =>
  data.map((item) => ({
    ...item,
    uid: `${gender}-${item.id}`,
    gender,
  }));

/**
 * Filters the actors based on the provided filters.
 *
 * @param {Actor[]} actors
 * @param {ActorsFilter} filters
 * @returns {Actor[]}
 */
export const filterActors = (actors, filters) =>
  actors.filter((actor) => {
    // Gender
    if (filters.gender !== 'all' && actor.gender !== filters.gender) {
      return false;
    }

    // Nationality
    if (
      filters.nationality !== 'all' &&
      actor.nationality !== filters.nationality
    )
      return false;

    // Birth Decade
    const actorBirthDecade = Math.floor(actor.birth_year / 10) * 10;
    if (
      filters.birthDecade !== 'all' &&
      actorBirthDecade !== Number(filters.birthDecade)
    )
      return false;

    // Life Status
    const isDeceased = actor.death_year !== undefined;
    if (filters.lifeStatus === 'living' && isDeceased) return false;
    if (filters.lifeStatus === 'deceased' && !isDeceased) return false;

    return true;
  });

/**
 * Sorts the actors alphabetically by their names.
 *
 * @param {Actor[]} actors
 * @returns {Actor[]}
 */
export const sortActors = (actors) =>
  [...actors].sort((a, b) => a.name.localeCompare(b.name));

// const nationalities = [
//     ...new Set(actors.map((actor) => actor.nationality)),
//   ].sort((a, b) => a.localeCompare(b));

/**
 * Extracts and returns a sorted list of unique nationalities from actors
 *
 * @param {Actor[]} actors
 * @returns {string[]}
 */
export const getNationalities = (actors) =>
  [...new Set(actors.map((actor) => actor.nationality))].sort((a, b) =>
    a.localeCompare(b),
  );

/**
 * Extracts and returns a sorted list of unique birth decades from actors
 *
 * @param {Actor[]} actors
 * @returns {number[]}
 */
export const getBirthDecades = (actors) =>
  [
    ...new Set(
      actors
        .map((actor) => Math.floor(actor.birth_year / 10) * 10)
        .filter((decade) => !isNaN(decade)),
    ),
  ].sort((a, b) => a - b);
