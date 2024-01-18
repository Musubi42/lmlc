// In server/api/audio.js
import path from 'path';
import fs from 'fs';

export default defineEventHandler(async (event) => {
  const track = getRouterParam(event, 'songName')

  const { req, res } = event;
  // const track = event.context.params.trackID;
  console.log("trackID : " + track);

  const filePath = path.join(process.cwd(), '/assets/vercelBlob/music');
  // const data = await readFile(filePath, 'utf8');
  const trackPath = path.resolve(`${filePath}`, 'optimized-mp3-files', `${track}.mp3`);
  console.log(trackPath);
  const stat = await fs.promises.stat(trackPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(trackPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mpeg",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
    };
    res.writeHead(200, head);
    fs.createReadStream(trackPath).pipe(res);
  }
});

// export default defineEventHandler(async (event) => {
//   console.log("oui");
//   return "hello";
// });

