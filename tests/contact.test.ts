import { describe, expect, it } from 'vitest';
import { validateContact } from '../src/lib/contact';
const valid = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  interest: 'Residential',
  message: 'An imagined reading room with warm natural light.',
};
describe('local contact preview', () => {
  it('accepts a complete enquiry with outer whitespace', () =>
    expect(
      validateContact({
        ...valid,
        name: '  Alex Morgan  ',
        email: ' alex@example.com ',
      }),
    ).toEqual({}));
  it('rejects missing and whitespace-only required values', () =>
    expect(
      Object.keys(
        validateContact({
          name: '  ',
          email: '',
          interest: '',
          message: '   ',
        }),
      ),
    ).toEqual(['name', 'email', 'interest', 'message']));
  it('rejects invalid email, unknown type and too long messages', () =>
    expect(
      validateContact({
        ...valid,
        email: 'alex@',
        interest: 'Unknown',
        message: 'x'.repeat(2001),
      }),
    ).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        interest: expect.any(String),
        message: expect.any(String),
      }),
    ));
  it('checks the exact message length boundary', () => {
    expect(
      validateContact({ ...valid, message: 'x'.repeat(19) }),
    ).toHaveProperty('message');
    expect(
      validateContact({ ...valid, message: 'x'.repeat(20) }),
    ).not.toHaveProperty('message');
  });
});
