import { describe, it, expect } from 'vitest';
import { getStateFromZip, getZipPrefix } from './zip-lookup';

describe('getStateFromZip', () => {
  it('returns NY for Manhattan ZIP', () => {
    expect(getStateFromZip('10001')).toBe('NY');
  });

  it('returns CA for Los Angeles ZIP', () => {
    expect(getStateFromZip('90001')).toBe('CA');
  });

  it('returns MA for Boston ZIP', () => {
    expect(getStateFromZip('02101')).toBe('MA');
  });

  it('returns TX for Houston ZIP', () => {
    expect(getStateFromZip('77001')).toBe('TX');
  });

  it('returns IL for Chicago ZIP', () => {
    expect(getStateFromZip('60601')).toBe('IL');
  });

  it('returns PA for Philadelphia ZIP', () => {
    expect(getStateFromZip('19101')).toBe('PA');
  });

  it('returns undefined for invalid ZIP', () => {
    expect(getStateFromZip('abc')).toBeUndefined();
  });

  it('returns undefined for short ZIP', () => {
    expect(getStateFromZip('100')).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(getStateFromZip('')).toBeUndefined();
  });
});

describe('getZipPrefix', () => {
  it('returns first 3 digits', () => {
    expect(getZipPrefix('10001')).toBe('100');
  });

  it('returns first 3 digits for another ZIP', () => {
    expect(getZipPrefix('90210')).toBe('902');
  });
});
