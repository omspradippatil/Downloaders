# OM Downloader

A simple web application to download YouTube videos as MP3 files.

## Features

- Convert YouTube videos to MP3 format
- Simple and intuitive user interface
- Fast conversion and download

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Copy a YouTube video URL
2. Paste it in the input field
3. Click the "Download" button
4. Wait for processing to complete
5. Click the download link to save your MP3 file

## Troubleshooting

### "Failed to execute 'json' on 'Response': Unexpected end of JSON input"

This error occurs when the server response cannot be parsed as valid JSON. This may happen due to:

1. **Server timeout**: The server might be timing out before completing the response
   - Try downloading shorter videos first
   - Ensure your internet connection is stable

2. **Server errors**: The backend might be crashing during processing
   - Check the server console for error messages
   - Make sure ffmpeg is properly installed and accessible

3. **CORS issues**: Cross-origin resource sharing problems
   - Ensure the CORS middleware is properly configured on the server

If the problem persists, try clearing your browser cache or using a different browser.

## Dependencies

- Express
- ytdl-core
- ffmpeg-static
- fluent-ffmpeg
- cors

## Note

This application is created for educational purposes only. Please respect YouTube's Terms of Service and copyright laws when using this tool.

## License

ISC
