import {
  processScoreTag,
  assignColorClass,
  updateUI,
  createTagCloud,
} from '../src/client/js/updateUI';

describe('Testing the updateUI functionality', () => {
  test('Testing the processScoreTag() function', () => {
    expect(processScoreTag('N+')).toBe('N+ (strong negative)');
  });

  test('Testing the processScoreTag() function', () => {
    expect(assignColorClass('NONIRONIC')).toBe('positive');
  });

  test('Testing the createTagCloud() function', () => {
    expect(updateUI).toBeDefined();
  });
  test('Testing the createTagCloud() function', () => {
    expect(updateUI).toBeDefined();
  });
});
