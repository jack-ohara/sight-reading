import type { Subscriber } from "svelte/store";

export const lastPlayedNote = alwaysNotifiesWritable(NaN);

function alwaysNotifiesWritable<T>(initial_value: T) {
  let value = initial_value; // content of the store
  let subs: Subscriber<T>[] = []; // subscriber's handlers

  const subscribe = (handler: Subscriber<T>) => {
    subs = [...subs, handler]; // add handler to the array of subscribers
    handler(value); // call handler with current value
    return () => (subs = subs.filter((sub) => sub !== handler)); // return unsubscribe function
  };

  const set = (new_value: T) => {
    value = new_value; // update value
    subs.forEach((sub) => sub(value)); // update subscribers
  };

  const update = (update_fn: (val: T) => T) => set(update_fn(value)); // update function

  return { subscribe, set, update }; // store contract
}
