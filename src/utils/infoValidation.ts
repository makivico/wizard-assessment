import type { InfoFormState } from '../types/wizard';

export interface InfoSoftErrors {
  email?: string;
  age?: string;
  startDate?: string;
}

// Optional fields basic validation
export function validateInfoSoftFields(info: InfoFormState): InfoSoftErrors {
  const errors: InfoSoftErrors = {};

  // Email check
  const email = info.email.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Age check
  const ageRaw = info.age.trim();

  // treat empty / "0" as "not provided"
  if (ageRaw !== '' && ageRaw !== '0') {
    const ageNum = Number(ageRaw);
    if (!Number.isFinite(ageNum) || ageNum <= 0) {
      errors.age = 'Age must be a positive number.';
    }
  }

  // Date check
  if (info.startDate) {
    const date = new Date(info.startDate);
    if (Number.isNaN(date.getTime())) {
      errors.startDate = 'Please choose a valid date.';
    }
  }

  return errors;
}
