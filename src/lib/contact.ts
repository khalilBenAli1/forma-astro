export interface ContactValues {
  name: string;
  email: string;
  interest: string;
  message: string;
}
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim().length < 2 || values.name.trim().length > 100)
    errors.name = 'Enter a name between 2 and 100 characters.';
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) ||
    values.email.length > 254
  )
    errors.email = 'Enter a valid email address.';
  if (
    ![
      'Residential',
      'Hospitality',
      'Workplace',
      'Cultural',
      'Something else',
    ].includes(values.interest)
  )
    errors.interest = 'Choose the type of space you have in mind.';
  if (values.message.trim().length < 20 || values.message.trim().length > 2000)
    errors.message = 'Tell us a little more, between 20 and 2,000 characters.';
  return errors;
}
