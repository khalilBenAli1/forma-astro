import { describe, expect, it } from 'vitest';
import { validateContact } from '../src/lib/contact';
const valid = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  interest: 'Residential',
  message: 'An imagined reading room with warm natural light.',
};
describe('local contact preview', () => {
  it.each(['alex<smith>@example.com', 'alex,smith@example.com'])(
    'rejects unsupported punctuation in an unquoted email local part: %s',
    (email) => {
      expect(validateContact({ ...valid, email })).toHaveProperty('email');
    },
  );
  it('preserves trimmed plus/dot addresses, international names and the existing length boundary', () => {
    for (const email of [
      '  alex.smith+studio@example.com  ',
      "o'brien+studio@example.co.uk",
      'a'.repeat(242) + '@example.com',
    ])
      expect(
        validateContact({ ...valid, name: '  Élodie 山田  ', email }),
      ).toEqual({});
    expect(
      validateContact({ ...valid, email: 'a'.repeat(243) + '@example.com' }),
    ).toHaveProperty('email');
  });
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
