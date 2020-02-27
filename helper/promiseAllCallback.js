

export const allProgress = (promises, progressCallback) => {
  let d = 0;
  progressCallback(0);

  for (const promise of promises) {
    promise.then(() => {
      d++;
      progressCallback(d/promises.length);
    });
  }
  return Promise.all(promises);
}