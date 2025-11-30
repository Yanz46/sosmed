document.getElementById('downloadButton').addEventListener('click', async () => {
    const urlInput = document.getElementById('tiktokUrl').value.trim();
    const messageElement = document.getElementById('message');
    const resultElement = document.getElementById('videoResult');
    const downloadLinksElement = document.getElementById('downloadLinks');
    const downloadButton = document.getElementById('downloadButton');

    // Reset tampilan
    messageElement.classList.add('hidden');
    resultElement.classList.add('hidden');
    messageElement.textContent = '';
    downloadLinksElement.innerHTML = '';
    
    if (!urlInput) {
        messageElement.textContent = '⚠️ Harap masukkan tautan video TikTok.';
        messageElement.classList.remove('hidden');
        messageElement.classList.add('message-error');
        return;
    }

    try {
        // Nonaktifkan tombol saat proses berlangsung
        downloadButton.textContent = 'Memproses...';
        downloadButton.disabled = true;

        // Konstruksi URL API BARU
        // Kita menggunakan encodeURIComponent agar URL TikTok aman dalam parameter query
        const encodedUrl = encodeURIComponent(urlInput);
        
        // --- PERUBAHAN API ENDPOINT DI SINI ---
        const apiUrl = `https://api.nekolabs.my.id/downloader/tiktok?url=${encodedUrl}`;
        // ------------------------------------

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Asumsi: Kita asumsikan API nekolabs.my.id juga mengembalikan link video 
        // tanpa watermark (biasanya di properti 'nowatermark' atau 'url')
        if (data.status && data.status === 200 && data.result) {
            
            // Coba ambil dari properti yang paling mungkin (sesuaikan jika ada error)
            const videoUrl = data.result.nowatermark || data.result.url || data.result.video;
            
            if (videoUrl) {
                // Tampilkan tautan unduhan
                const link = document.createElement('a');
                link.href = videoUrl;
                link.download = `tiktok-video-${Date.now()}.mp4`; // Nama file
                link.textContent = '📥 Unduh Video (No Watermark)';
                downloadLinksElement.appendChild(link);
                
                resultElement.classList.remove('hidden');
            } else {
                 messageElement.textContent = '❌ Error: Data video tidak ditemukan dalam respons API.';
                 messageElement.classList.remove('hidden');
                 messageElement.classList.add('message-error');
            }

        } else {
            // Jika API mengembalikan status error 
            let errorMessage = data.message || 'Gagal mengunduh. Pastikan tautan TikTok benar dan publik.';
            messageElement.textContent = `❌ Error: ${errorMessage}`;
            messageElement.classList.remove('hidden');
            messageElement.classList.add('message-error');
        }

    } catch (error) {
        console.error('Terjadi kesalahan saat memanggil API:', error);
        messageElement.textContent = 'Terjadi kesalahan jaringan atau server.';
        messageElement.classList.remove('hidden');
        messageElement.classList.add('message-error');
    } finally {
        // Aktifkan kembali tombol
        downloadButton.textContent = 'Unduh';
        downloadButton.disabled = false;
    }
});
