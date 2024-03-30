import type { SnapshotSerializer } from 'vitest';

export const ignoreHashSerializer = {
  test: (val: unknown) => typeof val === 'string',
  serialize: (val: string) => {
    if (/([A-Fa-f0-9]{64}.zip)/.test(val)) {
      return `"${val.replace(/([A-Fa-f0-9]{64}.zip)/, 'HASH-REPLACED.zip')}"`;
    }
    if (/([A-Fa-f0-9]{64}.json)/.test(val)) {
      return `"${val.replace(/([A-Fa-f0-9]{64}.json)/, 'HASH-REPLACED.json')}"`;
    }
    return `"${val}"`;
  },
} as const satisfies SnapshotSerializer;
