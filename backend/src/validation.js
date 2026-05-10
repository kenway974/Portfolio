/**
 * Lightweight field validator.
 * Returns array of field error objects (empty = valid).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * @param {Record<string, { value: unknown, required?: boolean, maxLength?: number, isEmail?: boolean, oneOf?: string[] }>} schema
 * @returns {{ field: string, code: string }[]}
 */
export function validate(schema) {
  const errors = []

  for (const [field, rules] of Object.entries(schema)) {
    const val = typeof rules.value === 'string' ? rules.value.trim() : rules.value

    if (rules.required && !val) {
      errors.push({ field, code: 'required' })
      continue
    }

    if (val && rules.isEmail && !EMAIL_RE.test(val)) {
      errors.push({ field, code: 'invalid_email' })
    }

    if (val && rules.maxLength && String(val).length > rules.maxLength) {
      errors.push({ field, code: 'too_long', max: rules.maxLength })
    }

    if (val && rules.oneOf && !rules.oneOf.includes(val)) {
      errors.push({ field, code: 'invalid_value', allowed: rules.oneOf })
    }
  }

  return errors
}
