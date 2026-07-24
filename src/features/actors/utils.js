// @ts-check
/** @import { Actor, ApiActor, Gender } from './types' */

/**
 * Normalizes the actors data fetched from the API by adding a unique identifier and gender to each actor for preventing key collisions in React lists (uid) and for filtering actors by gender.
 *
 * @param {ApiActor[]} data
 * @param {Gender} gender
 * @returns {Actor[]}
 */
export const normalizeActorsData = (data, gender) => {
  return data.map((item) => ({
    ...item,
    uid: `${gender}-${item.id}`,
    gender,
  }));
};
