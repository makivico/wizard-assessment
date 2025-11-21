// Tests for isNextDisabled utility, focusing on required fields in the info step
import { describe, it, expect } from 'vitest';
import { isNextDisabled } from '../utils/wizardUtils';
import { initialWizardState } from '../types/wizard';
import type { WizardState } from '../types/wizard';

const baseInfoState: WizardState = {
  ...initialWizardState,
  step: 'info',
};

describe('isNextDisabled - info step', () => {
  it('disables next when first name is missing', () => {
    const state: WizardState = {
      ...baseInfoState,
      info: {
        ...baseInfoState.info,
        firstName: '',
        lastName: 'Doe',
        description: 'Some description',
      },
    };

    expect(isNextDisabled(state)).toBe(true);
  });

  it('disables next when last name is missing', () => {
    const state: WizardState = {
      ...baseInfoState,
      info: {
        ...baseInfoState.info,
        firstName: 'John',
        lastName: '',
        description: 'Some description',
      },
    };

    expect(isNextDisabled(state)).toBe(true);
  });

  it('disables next when description is required and missing', () => {
    const state: WizardState = {
      ...baseInfoState,
      newPlan: {
        ...baseInfoState.newPlan,
        isExtraInfoRequired: true,
      },
      info: {
        ...baseInfoState.info,
        firstName: 'John',
        lastName: 'Doe',
        description: '',
      },
    };

    expect(isNextDisabled(state)).toBe(true);
  });

  it('enables next when all required fields are filled', () => {
    const state: WizardState = {
      ...baseInfoState,
      newPlan: {
        ...baseInfoState.newPlan,
        isExtraInfoRequired: true,
      },
      info: {
        ...baseInfoState.info,
        firstName: 'John',
        lastName: 'Doe',
        description: 'Some description',
      },
    };

    expect(isNextDisabled(state)).toBe(false);
  });
});
