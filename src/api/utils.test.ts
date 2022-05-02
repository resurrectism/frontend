import { data } from './utils';
import { test, expect, describe } from 'vitest';

const successPromiseWithData = (): Promise<{ data: string }> =>
  new Promise((resolve) => {
    return resolve({ data: 'Hello World' });
  });

const failurePromiseWithData = (): Promise<{ data: string }> =>
  new Promise((_, reject) => {
    return reject({ data: 'Hello World' });
  });

describe('data', () => {
  test('returns the "data" attribute on success', () => {
    expect(data(successPromiseWithData())).resolves.toBe('Hello World');
  });

  test('throws on Promise failure', () => {
    expect(() => data(failurePromiseWithData())).rejects.toThrow();
  });
});
