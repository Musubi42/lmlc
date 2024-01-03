const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

// Serve static files
app.use(express.static("public"));

// Endpoint to stream audio file
app.get("/audio/:trackID", (req, res) => {
  const track = req.params.trackID;
  console.log(track);
  const trackPath = path.resolve(__dirname, "audio", `${track}.mp3`);
  const stat = fs.statSync(trackPath);
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

app.get("/audio/metadata/:trackID", (req, res) => {
  // Read the JSON file
  fs.readFile("songMetadata.json", "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
      res.status(500).send("Server Error");
    } else {
      console.log(data);
      // Parse the JSON file to an object
      const metadata = JSON.parse(data);

      // Find the song with the given trackID
      const song = metadata[req.params.trackID];

      if (song) {
        // Send the song metadata in the response
        res.json(song);
      } else {
        res.status(404).send("Song not found");
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
