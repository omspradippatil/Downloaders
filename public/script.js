document.addEventListener('DOMContentLoaded', () => {
    const videoUrlInput = document.getElementById('videoUrl');
    const downloadBtn = document.getElementById('downloadBtn');
    const statusDiv = document.getElementById('status');
    const resultDiv = document.getElementById('result');
    const songTitleEl = document.getElementById('songTitle');
    const downloadLinkEl = document.getElementById('downloadLink');

    downloadBtn.addEventListener('click', async () => {
        const url = videoUrlInput.value.trim();
        
        if (!url) {
            showStatus('Please enter a YouTube URL', 'error');
            return;
        }
        
        if (!isValidYouTubeUrl(url)) {
            showStatus('Please enter a valid YouTube URL', 'error');
            return;
        }
        
        try {
            resultDiv.classList.add('hidden');
            showStatus('Downloading and converting... This may take a moment', 'loading');
            
            const response = await fetch('/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to download');
            }
            
            statusDiv.classList.add('hidden');
            resultDiv.classList.remove('hidden');
            
            // Extract video title from YouTube URL
            const videoTitle = data.fileName.replace('.mp3', '');
            songTitleEl.textContent = videoTitle;
            downloadLinkEl.href = data.downloadLink;
            downloadLinkEl.download = data.fileName;
            
        } catch (error) {
            showStatus(`Error: ${error.message}`, 'error');
        }
    });
    
    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = type === 'error' ? 'error' : 'loading';
        statusDiv.classList.remove('hidden');
    }
    
    function isValidYouTubeUrl(url) {
        // Basic YouTube URL validation
        const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return youtubeRegex.test(url);
    }
    
    // Allow pressing Enter key to trigger download
    videoUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            downloadBtn.click();
        }
    });
});
