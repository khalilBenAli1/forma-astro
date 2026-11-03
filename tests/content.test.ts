import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { projectSchema } from '../src/lib/schema';
const directory = new URL('../src/content/projects/', import.meta.url);
const records = readdirSync(directory)
  .filter((name) => name.endsWith('.json'))
  .map((name) => ({
    id: name.replace('.json', ''),
    data: JSON.parse(readFileSync(new URL(name, directory), 'utf8')) as unknown,
  }));
describe('build content contract', () => {
  it('accepts every original study and resolves related routes without self references', () => {
    expect(records).toHaveLength(4);
    const ids = records.map((record) => record.id);
    const covers = new Set<string>();
    for (const record of records) {
      const parsed = projectSchema.parse(record.data);
      covers.add(parsed.cover);
      for (const related of parsed.related) {
        expect(ids).toContain(related);
        expect(related).not.toBe(record.id);
      }
    }
    expect(covers.size).toBe(records.length);
  });
  it('rejects unknown types, empty content and images without descriptive alternatives', () => {
    const valid = projectSchema.parse(records[0]!.data);
    expect(
      projectSchema.safeParse({ ...valid, category: 'Commercial' }).success,
    ).toBe(false);
    expect(
      projectSchema.safeParse({ ...valid, overview: 'short' }).success,
    ).toBe(false);
    expect(projectSchema.safeParse({ ...valid, alt: '' }).success).toBe(false);
    expect(projectSchema.safeParse({ ...valid, gallery: [] }).success).toBe(
      false,
    );
    expect(
      projectSchema.safeParse({ ...valid, related: ['<script>'] }).success,
    ).toBe(false);
  });
});
