// In server/api/playlistMetadata.js

import { readFile } from 'fs/promises';

export default defineEventHandler(async (event) => {
  try {
    // Read the JSON file
    const data = await readFile('public/playlistMetadata.json', 'utf8');

    // Parse the JSON string to an object
    const metadata = JSON.parse(data);

    // Send the metadata in the response
    return metadata;
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
    // Return a 500 error response
    throw createError({ statusCode: 500, statusMessage: 'Server Error' });
  }
});
