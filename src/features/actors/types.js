// @ts-check
/** @typedef {'male' | 'female'} Gender */

/**
 * @typedef {Object} ApiActor
 * @property {number} id
 * @property {string} name
 * @property {number} birth_year
 * @property {number} [death_year]
 * @property {string} nationality
 * @property {string[]} known_for
 * @property {string[]} awards
 * @property {string} biography
 * @property {string} image
 */

/**
 * @typedef {ApiActor & {
 *   uid: string,
 *   gender: Gender
 * }} Actor
 */

/**
 * @typedef {
 *   | { step: 'idle' }
 *   | { step: 'loading' }
 *   | { step: 'success', data: Actor[] }
 *   | { step: 'error', error: Error }
 * } ActorsState
 */

/**
 * @typedef {'all' | 'living' | 'deceased'} LifeStatus
 */

/**
 * @typedef {Object} ActorsFilter
 * @property {Gender | 'all'} gender
 * @property {string} nationality
 * @property {string} birthDecade
 * @property {LifeStatus} lifeStatus
 */

export {};
