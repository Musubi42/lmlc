const Matter = require('matter-js');
const pathseg = require('pathseg');
const fs = require('fs');
const path = require('path');

const inputDir = '/Users/dontpanic/Documents/Freelance/LMLC-Communication/assets/tableau/svg/optmized'; // Replace with your SVG input directory path
const outputDir = '/Users/dontpanic/Documents/Freelance/LMLC-Communication/assets/tableau/vertices'; // Replace with your desired output directory path

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read all SVG files from the input directory
fs.readdir(inputDir, (err, files) => {
    if (err) {
        return console.error('Error reading input directory:', err);
    }

    files.forEach(file => {
        if (path.extname(file) === '.svg') {
            const filePath = path.join(inputDir, file);
            const outputFilePath = path.join(outputDir, path.basename(file, '.svg') + '.json');

            // Read SVG file content
            const svgContent = fs.readFileSync(filePath, 'utf8');

            // Use a regular expression or a parser to extract the path data from the SVG content
            const pathRegex = /<path[^>]*d="([^"]+)"[^>]*>/;
            const match = pathRegex.exec(svgContent);
            if (match) {
                const pathData = match[1];

                try {
                    // Convert SVG path to vertices
                    const vertices = Matter.Svg.pathToVertices({ path: pathData }, 30); // 30 is the sample length for vertices

                    // Save vertices as JSON
                    fs.writeFileSync(outputFilePath, JSON.stringify(vertices));
                    console.log(`Saved vertices for ${file} to ${outputFilePath}`);
                } catch (error) {
                    console.error(`Error processing ${file}:`, error.message);
                }
            } else {
                console.error(`No path data found in ${file}`);
            }
        }
    });
});