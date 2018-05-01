import { selectConsistencyState } from './consistency';
import { DEFAULT_STATE, DEFAULT_CONSISTENCY_STATE } from '../models';

describe('selectors/consistency', () => {
  describe('selectConsistencyState', () => {
    it('should select consistency state from the store', () => {
      expect(selectConsistencyState(DEFAULT_STATE)).toBe(DEFAULT_CONSISTENCY_STATE);
    });
  });
});
