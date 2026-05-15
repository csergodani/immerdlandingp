// Példa: Dinamikus URL váltás teszteléshez
function loadCar(dealer, carId) {
    const iframe = document.getElementById('immerdrive-iframe');
    const newUrl = `https://immerdrive.vercel.app/showroom/${dealer}/${carId}`;
    
    console.log("Új autó betöltése:", newUrl);
    iframe.src = newUrl;
}

// Hibakezelés tesztelése (opcionális)
window.addEventListener('message', (event) => {
    // Itt fogadhatod az üzeneteket a showroom iframe-ből, 
    // ha később építesz be eseményküldést (pl. "user_clicked_hotspot")
    console.log("Üzenet érkezett az iframe-ből:", event.data);
});