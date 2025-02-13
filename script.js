// Data addon (contoh)
const addons = [
    // ... (data addon sebelumnya) ...
];

// Fungsi untuk menampilkan daftar addon
function displayAddons(addons, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Kosongkan container sebelum menambahkan addon baru
    addons.forEach(addon => {
        const addonItem = document.createElement("div");
        addonItem.classList.add("addon-item");
        addonItem.innerHTML = `
            <img src="${addon.image}" alt="${addon.title}">
            <div class="addon-details">
                <h3>${addon.title}</h3>
                <p>${addon.description}</p>
                <a href="${addon.link}">Unduh</a>
            </div>
        `;
        container.appendChild(addonItem);
    });
}

// ... (kode JavaScript lainnya) ...
