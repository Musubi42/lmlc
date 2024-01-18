#!/bin/bash

# Directory containing the MP3 files
SOURCE_DIR="/Users/dontpanic/Documents/Freelance/LMLC-Communication/assets/vercelBlob/music"

# Subdirectory to save the converted files
OUTPUT_DIR="${SOURCE_DIR}/optimized-mp3-files"

# Create the output directory if it doesn't exist
mkdir -p "${OUTPUT_DIR}"

# Loop through all .mp3 files in the source directory
for file in "${SOURCE_DIR}"/*.mp3; do
    # Skip if no files are found
    [ -e "$file" ] || continue

    # Extract filename without extension
    filename=$(basename "$file" .mp3)

    # Path for the output file
    output_file="${OUTPUT_DIR}/${filename}.mp3"

    # Get the bitrate of the current file
    bitrate=$(ffmpeg -i ${file} 2>&1 | awk -F ', ' '/bitrate: / {print $3}' | sed 's/bitrate: //g' | sed 's/ kb\/s//')

    # Check if the bitrate is higher than 150Kbps orherwise converting the file is useless
    if [ "$bitrate" -gt 150 ]; then
        # Convert the file to mono and lower bitrate
        ffmpeg -i "$file" -ac 1 -ab 128k "$output_file" > /dev/null 2>&1
        echo "Processing ${filename}.mp3 at ${bitrate}kbps"
    else
        # Copy the original file to the optimized folder
        cp "$file" "$output_file" > /dev/null 2>&1
        echo "skip ${filename}.mp3 at ${bitrate}kbps"
    fi
done

echo "Conversion complete. Files saved in ${OUTPUT_DIR}"
