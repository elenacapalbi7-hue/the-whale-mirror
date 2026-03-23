let IS_PRO = false; 
let timeLeft = 600; 

// Lista de monedas (puedes seguir agregando aquí)
const coinData = [
    {id: 'BTC', name: 'Bitcoin'}, {id: 'ETH', name: 'Ethereum'}, {id: 'SOL', name: 'Solana'},
    {id: 'PEPE', name: 'Pepe Coin'}, {id: 'BNB', name: 'Binance'}, {id: 'XRP', name: 'Ripple'},
    {id: 'WIF', name: 'Dogwifhat'}, {id: 'BONK', name: 'Bonk'}, {id: 'AVAX', name: 'Avalanche'},
    {id: 'ADA', name: 'Cardano'}, {id: 'LINK', name: 'Chainlink'}, {id: 'DOT', name: 'Polkadot'}
];

const networks = ['Ethereum', 'Solana', 'BSC', 'Polygon', 'Arbitrum'];
const origins = ['Institutional', 'Exchange Out', 'Whale Wallet', 'OTC Desk'];
const securityStatus = ['SAFE ✅', 'AUDITED 🛡️', 'VERIFIED 💎', 'HIGH RISK ⚠️'];

function renderTable(filter = "") {
    const tbody = document.getElementById('table-body');
    if(!tbody) return;

    // Generar datos con volumen aleatorio para el orden dinámico
    let data = coinData.map(coin => ({
        ...coin,
        isBuy: Math.random() > 0.45,
        volume: Math.floor(Math.random() * 5000000) + 10000,
        wallet: `0x${Math.random().toString(16).slice(2, 8)}...`,
        network: networks[Math.floor(Math.random() * networks.length)],
        impact: (Math.random() * 10).toFixed(2),
        origin: origins[Math.floor(Math.random() * origins.length)],
        liquidity: Math.random() > 0.3 ? 'HIGH' : 'MEDIUM',
        security: securityStatus[Math.floor(Math.random() * securityStatus.length)]
    }));

    // Filtrar si se usa el buscador
    if(filter) {
        data = data.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.id.toLowerCase().includes(filter.toLowerCase()));
    }

    // ORDENAR POR VOLUMEN (Mayor a menor)
    data.sort((a, b) => b.volume - a.volume);

    const displayList = IS_PRO ? data : data.slice(0, 10);
    
    tbody.innerHTML = displayList.map(c => `
        <tr>
            <td><b style="color:var(--gold)">${c.id}</b><br><small style="color:#666">${c.name}</small></td>
            <td style="color:${c.isBuy ? 'var(--green)' : 'var(--red)'}">${c.isBuy ? 'COMPRA' : 'VENTA'}</td>
            <td>$${c.volume.toLocaleString()}</td>
            <td>${c.wallet}</td>
            <td>${c.network}</td>
            <td style="color:var(--green)">+${c.impact}%</td>
            <td>${c.origin}</td>
            <td>${c.liquidity}</td>
            <td style="color:${c.security.includes('⚠️') ? 'var(--red)' : 'var(--green)'}">${c.security}</td>
            <td><button onclick="alert('Auditoría completa requerida')" style="background:var(--gold); border:none; padding:4px 8px; border-radius:4px; font-weight:bold; font-size:0.6rem; cursor:pointer;">DETALLES</button></td>
        </tr>
    `).join('');
}

// BUSCADOR
function searchCoins() {
    const val = document.getElementById('coin-search').value;
    renderTable(val);
}

// CAMBIO A MODO PRO (Para tus pruebas)
function toggleProMode() {
    IS_PRO = true;
    document.getElementById('search-bar-container').style.display = 'block'; // Muestra buscador
    document.getElementById('sub-btn').style.display = 'none'; // Quita botón suscripción
    document.getElementById('timer-display').innerText = "LIVE (1s)";
    
    // Cambia la velocidad de actualización a 1 segundo
    setInterval(renderTable, 1000);
    renderTable();
    alert("MODO PRO ACTIVADO: Buscador disponible y actualización 1s.");
}

// Reloj para versión gratis
function updateTimer() {
    if (IS_PRO) return;
    if (timeLeft <= 0) {
        timeLeft = 600;
        renderTable(); 
    }
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timer-display').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Inicio
setInterval(updateTimer, 1000);
renderTable();
