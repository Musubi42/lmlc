// In server/api/playlistMetadata.js

import { readFile } from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), '/assets/vercelBlob', 'playlistMetadata.json');
    const data = await readFile(filePath, 'utf8');

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
