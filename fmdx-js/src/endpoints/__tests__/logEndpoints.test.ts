import {describe, test} from 'vitest';
import {getTestVars} from '../../testUtils/test.js';
import {FmdxEndpoints} from '../fmdxEndpoints.js';

const vars = getTestVars();
const endpoints = new FmdxEndpoints({
  authToken: vars.authToken,
  serverURL: vars.serverURL,
});

describe('log endpoints', () => {
  test('ingest logs succeeds', async () => {
    await endpoints.logs.ingestLogs({
      appId: vars.appId,
      logs: [
        {
          message: 'Hello, world!',
          level: 'info',
          timestamp: new Date(),
        },
        {
          message: 'Hello, world!',
          level: 'info',
        },
        {
          some: 'other',
        },
      ],
    });
  });
});
