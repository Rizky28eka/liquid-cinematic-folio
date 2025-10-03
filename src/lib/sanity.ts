import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '889te60g',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-01-01', // use current date (YYYY-MM-DD) to target the latest API version
});
