document.getElementById('convertBtn').addEventListener('click', async () => {
    const youtubeUrl = document.getElementById('youtubeUrl').value;
    const resultDiv = document.getElementById('result');
    const progressBar = document.getElementById('progress');
    const videoPreview = document.getElementById('videoPreview');

    if (!youtubeUrl) {
        resultDiv.textContent = 'Please enter a valid YouTube URL.';
        return;
    }

    const url = `https://youtube-mp310.p.rapidapi.com/download/mp3?url=${encodeURIComponent(youtubeUrl)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '30959fad4amsh1c04bfa7b0509a0p109597jsnbd8a575ffad7',
            'x-rapidapi-host': 'youtube-mp310.p.rapidapi.com'
        }
    };

    try {
        resultDiv.textContent = 'Converting... Please wait.';
        progressBar.style.width = '30%';

        // Simulate fetching video preview (you can use an API for this if available)
        videoPreview.innerHTML = `<img src="https://img.youtube.com/vi/${youtubeUrl.split('v=')[1].split('&')[0]}/0.jpg" alt="Video Thumbnail">`;

        const response = await fetch(url, options);
        const result = await response.json();

        if (result.downloadUrl) {
            progressBar.style.width = '100%';
            resultDiv.textContent = 'Conversion successful! Your download will start in 10 seconds...';

            setTimeout(() => {
                const downloadLink = document.createElement('a');
                downloadLink.href = result.downloadUrl;
                downloadLink.download = 'download.mp3';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                resultDiv.textContent = 'Download started! Check your browser downloads.';
            }, 10000);
        } else {
            resultDiv.textContent = 'Conversion failed. Please try again.';
            progressBar.style.width = '0';
        }
    } catch (error) {
        console.error(error);
        resultDiv.textContent = 'An error occurred. Please try again.';
        progressBar.style.width = '0';
    }
});