const urlInput = document.getElementById('showroom-url');
const loadBtn = document.getElementById('load-btn');
const iframe = document.getElementById('immerdrive-iframe');
const consoleDiv = document.getElementById('error-log');
const statusBadge = document.getElementById('status-badge');
const downloadBtn = document.getElementById('download-log');

let logs = [];

// 📍 Naplózó függvény
function logMessage(message, type = 'info') {
    const time = new Date().toLocaleTimeString();
    const logEntry = `[${time}] ${message}`;
    logs.push(logEntry);

    const p = document.createElement('p');
    p.className = `msg-${type}`;
    p.textContent = logEntry;
    
    consoleDiv.appendChild(p);
    consoleDiv.scrollTop = consoleDiv.scrollHeight; // Görgetés az aljára
}

// 📍 Autó betöltése
function loadShowroom() {
    const url = urlInput.value.trim();

    if (!url) {
        logMessage("HIBA: Üres URL mező!", "error");
        return;
    }

    if (!url.startsWith('http')) {
        logMessage("HIBA: Érvénytelen URL formátum! (http:// vagy https:// szükséges)", "error");
        return;
    }

    logMessage(`Importálás indítása: ${url}...`, "info");
    statusBadge.textContent = "Betöltés folyamatban...";
    statusBadge.style.color = "var(--primary)";

    // Iframe frissítése
    iframe.src = url;

    // Ellenőrizzük a betöltést
    iframe.onload = function() {
        logMessage("SIKER: A showroom sikeresen betöltve az oldalra.", "success");
        statusBadge.textContent = "Aktív nézet";
        statusBadge.style.color = "var(--success)";
    };

    iframe.onerror = function() {
        logMessage("HIBA: Az iframe nem tudta betölteni a forrást. Ellenőrizd a linket!", "error");
        statusBadge.textContent = "Hiba történt";
        statusBadge.style.color = "var(--error)";
    };
}

// Gomb kattintás
loadBtn.addEventListener('click', loadShowroom);

// Enter gomb kezelése
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') loadShowroom();
});

// 📍 Log letöltése fájlként
downloadBtn.addEventListener('click', () => {
    const blob = new Blob([logs.join('\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `immerdrive-test-log-${new Date().getTime()}.txt`;
    a.click();
});