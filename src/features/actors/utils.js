// @ts-check
/** @import { Actor, ApiActor, Gender } from './types' */

/**
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
