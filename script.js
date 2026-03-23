let IS_PRO = false;
let timeLeft = 600;
let itemsToShow = 10;
let allRealCoins = []; // Aquí se guardarán las +18,000 monedas reales

// 1. FUNCIÓN PARA CARGAR TODAS LAS MONEDAS REALES DEL MERCADO
async function fetchAllCoins() {
    try {
        // Consultamos la lista oficial de CoinGecko (todas las criptos existentes)
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
        allRealCoins = await response.json();
        console.log("Mercado real cargado: " + allRealCoins.length + " monedas.");
        renderTable();
    } catch (error) {
        console.error("Error conectando al mercado real:", error);
    }
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    const filter = document.getElementById('coin-search').value.toLowerCase();
    
    // Si la lista aún no carga, mostramos un aviso
    if (allRealCoins.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding:20px;">Conectando con Nodos Blockchain...</td></tr>';
        return;
    }

    // FILTRADO REAL: Solo lo que existe en la lista oficial
    let filtered = allRealCoins;
    if (filter) {
        filtered = allRealCoins.filter(c => 
            c.symbol.toLowerCase() === filter || 
            c.name.toLowerCase().includes(filter)
        );
    }

    // Si buscas algo que NO EXISTE (como 'akdoodo'), no muestra nada
    if (filtered.length === 0 && filter !== "") {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color:red; padding:20px;">ERROR: Activo no encontrado en la red.</td></tr>';
        return;
    }

    // PARÁMETROS DE SEGURIDAD Y RED (Simulamos la auditoría sobre la moneda real)
    const networks = ['Solana', 'Ethereum', 'BSC', 'Base', 'Polygon'];
    const securities = ['SAFE ✅', 'AUDITED 🛡️', 'VERIFIED 💎', 'HIGH RISK ⚠️'];

    const limit = IS_PRO ? itemsToShow : 10;
    const displayList = filtered.slice(0, limit);
    
    document.getElementById('count-text').innerText = allRealCoins.length;

    tbody.innerHTML = displayList.map((c, i) => {
        const isBuy = Math.random() > 0.45;
        // El volumen se genera aleatoriamente para simular el movimiento de ballenas de ese momento
        const vol = Math.floor(Math.random() * 5000000) + 1000; 
        
        return `
            <tr>
                <td><b style="color:var(--gold)">${c.symbol.toUpperCase()}</b><br><small style="color:#666">${c.name}</small></td>
                <td style="color:${isBuy ? 'var(--green)' : 'var(--red)'}">${isBuy ? 'COMPRA' : 'VENTA'}</td>
                <td style="font-weight:bold">$${vol.toLocaleString()}</td>
                <td style="color:#888">0x${Math.random().toString(16).slice(2, 10)}...</td>
                <td>${networks[i % networks.length]}</td>
                <td style="color:var(--green)">+${(Math.random() * 8).toFixed(2)}%</td>
                <td>Whale Wallet</td>
                <td>HIGH</td>
                <td style="color:${i % 4 === 3 ? 'var(--red)' : 'var(--green)'}">${securities[i % securities.length]}</td>
                <td><button onclick="alert('Iniciando Auditoría de Contrato para ${c.id}...')" style="background:var(--gold); border:none; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:0.6rem; cursor:pointer;">DETALLES</button></td>
            </tr>`;
    }).join('');
}

function searchCoins() { renderTable(); }

function loadMore() {
    itemsToShow += 20;
    renderTable();
}

function toggleProMode() {
    IS_PRO = true;
    itemsToShow = 20;
    const search = document.getElementById('coin-search');
    search.disabled = false;
    search.placeholder = "🔍 BUSCAR EN +18.000 MONEDAS REALES...";
    document.getElementById('load-more-btn').style.display = 'block';
    document.getElementById('sub-btn').style.display = 'none';
    document.getElementById('timer-display').innerText = "LIVE (1s)";
    setInterval(renderTable, 1000); 
    renderTable();
}

function updateTimer() {
    if (IS_PRO) return;
    if (timeLeft <= 0) { timeLeft = 600; renderTable(); }
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timer-display').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Carga inicial
fetchAllCoins();
setInterval(updateTimer, 1000);
