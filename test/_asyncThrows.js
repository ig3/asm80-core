export const asyncThrows = (assert, fn) => {
  const done = assert.async();
  return new Promise((resolve, reject) => {
    fn().then(() => {
      assert.ok(false);
      resolve();
      done();
    })
    .catch(e => {
      assert.ok(true);
      resolve();
      done();
    });
  });
};
