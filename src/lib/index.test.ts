import { formatDate } from '.';

describe('formatDate', () => {
  test('日付フォーマットテスト', () => {
    expect(formatDate('2023-07-21T02:48:27.445Z')).toBe('2023/07/21 11:48');
  });
});
