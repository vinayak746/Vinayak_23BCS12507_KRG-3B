import { sum } from '../data/logs';

describe('sum utility', () => {
  it('adds two numbers correctly', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(-1, 1)).toBe(0);
  });
});
