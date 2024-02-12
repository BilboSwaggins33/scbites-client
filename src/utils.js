import * as Realm from "realm-web";
export const toggleBoolean = (prev) => !prev;

const isValidArrayIndex = (arr, idx) => {
  return !(idx < 0 || idx >= arr.length);
};

export function updateTag(value) {
  return value.tags;
}


export function addValueAtIndex(arr, idx, value) {
  if (!isValidArrayIndex(arr, idx) && idx !== arr.length) {
    throw new Error(`Cannot add value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), value, ...arr.slice(idx)];
}

export function replaceValueAtIndex(arr, idx, newValue) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot replace value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), newValue, ...arr.slice(idx + 1)];
}

export function updateValueAtIndex(arr, idx, updater) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot update value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), updater(arr[idx]), ...arr.slice(idx + 1)];
}

export function removeValueAtIndex(arr, idx) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot remove value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

export const createObjectId = () => {
  return new Realm.BSON.ObjectId()
};

export const getKeywordId = (keyword) => {
  if (keyword._id instanceof Realm.BSON.ObjectId) {

    return keyword._id.toHexString();
  }
  return keyword._id
};

export const isSameKeyword = (keyword1, keyword2) =>
  getKeywordId(keyword1) === getKeywordId(keyword2);

export const getKeywordIndex = (keywords, keyword) => {
  const idx = keywords.findIndex((t) => isSameKeyword(t, keyword));
  return idx >= 0 ? idx : null;
}

