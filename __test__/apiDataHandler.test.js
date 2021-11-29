import {
  processScoreTag,
  assignColorClass,
  processApiData,
} from '../src/client/js/apiDataHandler';

describe('Testing the apiDataHandler functionality', () => {
  test('Testing the processScoreTag() function', () => {
    expect(processScoreTag('N+')).toBe('N+ (strong negative)');
  });

  test('Testing the processScoreTag() function', () => {
    expect(assignColorClass('NONIRONIC')).toBe('positive');
  });

  test('Testing the processApiData() function', () => {
    expect(processApiData).toBeDefined();
  });
});
