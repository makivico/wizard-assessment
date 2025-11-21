// Tests for validateInfoSoftFields utility, which validates optional info fields (email, age, startDate)
import { describe, it, expect } from 'vitest';
import { validateInfoSoftFields } from '../utils/infoValidation';
import type { InfoFormState } from '../types/wizard';

const baseInfo: InfoFormState = {
  firstName: '',
  lastName: '',
  age: '',
  email: '',
  startDate: '',
  location: '',
  language: '',
  description: '',
};

describe('validateInfoSoftFields', () => {
  it('returns no errors when optional fields are empty', () => {
    const errors = validateInfoSoftFields(baseInfo);
    expect(errors).toEqual({});
  });

  it('validates email format when provided', () => {
    const bad = validateInfoSoftFields({
      ...baseInfo,
      email: 'not-an-email',
    });
    expect(bad.email).toBeDefined();

    const good = validateInfoSoftFields({
      ...baseInfo,
      email: 'user@example.com',
    });
    expect(good.email).toBeUndefined();
  });

  it('validates age as positive number when provided', () => {
    const bad = validateInfoSoftFields({
      ...baseInfo,
      age: '-5',
    });
    expect(bad.age).toBeDefined();

    const good = validateInfoSoftFields({
      ...baseInfo,
      age: '30',
    });
    expect(good.age).toBeUndefined();
  });

  it('validates startDate as a real date when provided', () => {
    const bad = validateInfoSoftFields({
      ...baseInfo,
      startDate: 'not-a-date',
    });
    expect(bad.startDate).toBeDefined();

    const good = validateInfoSoftFields({
      ...baseInfo,
      startDate: '2025-01-01',
    });
    expect(good.startDate).toBeUndefined();
  });
});
