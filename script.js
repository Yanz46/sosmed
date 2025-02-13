const searchKeyword = document.getElementById('search-keyword');
const searchCategory = document.getElementById('search-category');
const searchButton = document.getElementById('search-button');
const contentList = document.getElementById('content-list');

searchButton.addEventListener('click', () => {
    const keyword = searchKeyword.value.toLowerCase();
    const category = searchCategory.value;

    // Data contoh (ganti dengan data dari server atau database Anda)
    const contentData = [
        { title: 'Mod Keren 1', category: 'mods', description: 'Deskripsi mod 1' },
        { title: 'Addon Mantap', category: 'addons', description: 'Deskripsi addon ini' },
        { title: 'Tekstur HD', category: 'textures', description: 'Tekstur berkualitas tinggi' },
        // ... tambahkan data lainnya ...
    ];

    const searchResults = contentData.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(keyword);
        const categoryMatch = category === '' || item.category === category;
        return titleMatch && categoryMatch;
    });

    displayResults(searchResults);
});

function displayResults(results) {
    contentList.innerHTML = ''; // Kosongkan hasil sebelumnya

    if (results.length === 0) {
        contentList.innerHTML = '<p>Tidak ada hasil yang ditemukan.</p>';
        return;
    }

    results.forEach(item => {
        const contentItem = document.createElement('div');
        contentItem.classList.add('content-item');
        contentItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        contentList.appendChild(contentItem);
    });
}
