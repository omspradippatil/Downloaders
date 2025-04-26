const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

// Configure ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
const PORT = process.env.PORT || 3000;

// Create downloads directory if it doesn't exist
const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/download', async (req, res) => {
    try {
        const { url } = req.body;
        
        // Validate YouTube URL
        if (!ytdl.validateURL(url)) {
            return res.status(400).json({ error: 'Invalid YouTube URL' });
        }

        // Get video info
        const info = await ytdl.getInfo(url);
        const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
        const fileName = `${videoTitle}.mp3`;
        const filePath = path.join(downloadsDir, fileName);

        // Create download and conversion pipeline
        ytdl(url, { 
            quality: 'highestaudio',
            filter: 'audioonly' 
        })
        .pipe(fs.createWriteStream(filePath))
        .on('finish', () => {
            res.json({ 
                success: true, 
                message: 'Download completed',
                fileName: fileName,
                downloadLink: `/downloads/${fileName}`
            });
        })
        .on('error', (err) => {
            console.error('Error downloading:', err);
            res.status(500).json({ error: 'Failed to download audio' });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
