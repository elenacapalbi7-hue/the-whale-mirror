let IS_PRO = false;
let timeLeft = 600;
let itemsToShow = 10; // Empieza en 10 para gratis

// Lista extendida para pruebas (en el futuro esto vendrá de una base de datos real)
const baseCoins = [
    {id: 'BTC', name: 'Bitcoin'}, {id: 'ETH', name: 'Ethereum'}, {id: 'SOL', name: 'Solana'},
    {id: 'PEPE', name: 'Pepe Coin'}, {id: 'BNB', name: 'Binance'}, {id: 'XRP', name: 'Ripple'},
    {id: 'WIF', name: 'Dogwifhat'}, {id: 'BONK', name: 'Bonk'}, {id: 'AVAX', name: 'Avalanche'},
    {id: 'ADA', name: 'Cardano'}, {id: 'LINK', name: 'Chainlink'}, {id: 'DOT', name: 'Polkadot'},
    {id: 'NEAR', name: 'Near Protocol'}, {id: 'FET', name: 'Fetch.ai'}, {id: 'RNDR', name: 'Render'},
    {id: 'STX', name: 'Stacks'}, {id: 'ICP', name: 'Internet Computer'}, {id: 'TIA', name: 'Celestia'}
];

// Función para generar muchas monedas para el "Ver más"
let allCoins = [...baseCoins];
for(let i=0; i<100; i++) {
    allCoins.push({id: 'TOKEN'+i, name: 'Altcoin Test '+i});
}

const networks = ['Ethereum', 'Solana', 'BSC', 'Polygon', 'Arbitrum'];
const securityStatus = ['SAFE ✅', 'AUDITED 🛡️', 'VERIFIED 💎', 'HIGH RISK ⚠️'];

function renderTable() {
    const tbody = document.getElementById('table-body');
    const filter = document.getElementById('coin-search').value.toLowerCase();
    
    // Generar datos aleatorios con volumen para ordenar
    let data = allCoins.map(coin => ({
        ...coin,
        isBuy: Math.random() > 0.45,
        volume: Math.floor(Math.random() * 5000000) + 1000,
        wallet: `0x${Math.random().toString(16).slice(2, 8)}...`,
        network: networks[Math.floor(Math.random() * networks.length)],
        impact: (Math.random() * 10).toFixed(2),
        origin: 'Whale Wallet',
        liquidity: 'HIGH',
        security: securityStatus[Math.floor(Math.random() * securityStatus.length)]
    }));

    // Filtrar
    if(filter) {
        data = data.filter(c => c.name.toLowerCase().includes(filter) || c.id.toLowerCase().includes(filter));
    }

    // Ordenar por volumen
    data.sort((a, b) => b.volume - a.volume);

    // Cortar según versión y "Ver más"
    const limit = IS_PRO ? itemsToShow : 10;
    const displayList = data.slice(0, limit);
    
    document.getElementById('count-text').innerText = displayList.length;

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
            <td><button onclick="alert('Suscríbete para ver el reporte')" style="background:var(--gold); border:none; padding:4px 8px; border-radius:4px; font-weight:bold; font-size:0.6rem; cursor:pointer;">REPORT +</button></td>
        </tr>
    `).join('');
}

function loadMore() {
    itemsToShow += 20;
    renderTable();
}

function searchCoins() {
    renderTable();
}

function toggleProMode() {
    IS_PRO = true;
    itemsToShow = 20; // Al activar pro, muestra las primeras 20
    const search = document.getElementById('coin-search');
    search.disabled = false;
    search.placeholder = "🔍 Buscar moneda...";
    document.getElementById('load-more-btn').style.display = 'block';
    document.getElementById('sub-btn').style.display = 'none';
    document.getElementById('timer-display').innerText = "LIVE (1s)";
    
    setInterval(renderTable, 1000);
    renderTable();
    alert("MODO PRO: Buscador activado y carga de 20 en 20 habilitada.");
}

function updateTimer() {
    if (IS_PRO) return;
    if (timeLeft <= 0) { timeLeft = 600; renderTable(); }
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timer-display').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

setInterval(updateTimer, 1000);
renderTable();
