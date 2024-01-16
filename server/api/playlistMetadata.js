// In server/api/playlistMetadata.js

import { readFile } from 'fs/promises';

export default defineEventHandler(async (event) => {
  try {

    event.res.setHeader('Access-Control-Allow-Credentials', true)
    event.res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    event.res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    event.res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (event.req.method === 'OPTIONS') {
      event.res.status(200).end()
      return
    }
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
