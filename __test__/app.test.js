import { app, scrollToId } from '../src/client/js/app';

describe('Testing the app.js functionality', () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test('Testing the app() function', () => {
    expect(app).toBeDefined();
  });

  test('Testing the scrollToId() function', () => {
    expect(scrollToId).toBeDefined();
  });
});
