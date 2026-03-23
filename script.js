let IS_PRO = false;
let timeLeft = 600;
let itemsToShow = 10;

// Lista de referencia (Top Market)
const topCoins = [
    {id: 'BTC', name: 'Bitcoin'}, {id: 'ETH', name: 'Ethereum'}, {id: 'SOL', name: 'Solana'},
    {id: 'BNB', name: 'Binance Coin'}, {id: 'XRP', name: 'Ripple'}, {id: 'DOGE', name: 'Dogecoin'},
    {id: 'ADA', name: 'Cardano'}, {id: 'AVAX', name: 'Avalanche'}, {id: 'DOT', name: 'Polkadot'},
    {id: 'TRX', name: 'TRON'}, {id: 'LINK', name: 'Chainlink'}, {id: 'PEPE', name: 'Pepe'}
];

const networks = ['Solana', 'Ethereum', 'BSC', 'Base', 'Arbitrum', 'Polygon'];
const origins = ['Institutional', 'Exchange Inflow', 'Private Whale', 'DEX LP', 'OTC Trade'];
const liquidities = ['ULTRA-HIGH', 'HIGH', 'STABLE', 'MODERATE'];
const securities = ['SAFE ✅', 'AUDITED 🛡️', 'VERIFIED 💎', 'UNVERIFIED ⚠️', 'HIGH RISK 🔥'];

function renderTable() {
    const tbody = document.getElementById('table-body');
    const filter = document.getElementById('coin-search').value.toUpperCase();
    
    // GENERADOR DE BASE DE DATOS MASIVA (Simula las 18,000 monedas)
    let displayData = [...topCoins];

    // Si el usuario busca algo que no está en el Top (ej: SIREN), lo agregamos dinámicamente
    if (filter && !displayData.some(c => c.id === filter)) {
        displayData.push({ id: filter, name: filter + " Token (Global Search)" });
    }

    // Creamos los datos de "Ballena" para cada una
    let data = displayData.map((coin, index) => {
        return {
            ...coin,
            isBuy: Math.random() > 0.45,
            volume: Math.floor(Math.random() * 15000000) + 2000,
            wallet: `0x${Math.random().toString(16).slice(2, 10)}...`,
            network: networks[index % networks.length],
            impact: (Math.random() * 15).toFixed(2),
            origin: origins[index % origins.length],
            liquidity: liquidities[index % liquidities.length],
            security: securities[index % securities.length]
        };
    });

    // Ordenar por Volumen de mayor a menor (Capital de Ballena)
    data.sort((a, b) => b.volume - a.volume);

    // Lógica de visualización
    const limit = IS_PRO ? itemsToShow : 10;
    const list = data.slice(0, limit);
    
    document.getElementById('count-text').innerText = IS_PRO ? "18,421+" : list.length;

    tbody.innerHTML = list.map(c => `
        <tr>
            <td><b style="color:var(--gold)">${c.id}</b><br><small style="color:#666">${c.name}</small></td>
            <td style="color:${c.isBuy ? 'var(--green)' : 'var(--red)'}">${c.isBuy ? 'COMPRA' : 'VENTA'}</td>
            <td style="font-weight:bold">$${c.volume.toLocaleString()}</td>
            <td style="color:#888">${c.wallet}</td>
            <td>${c.network}</td>
            <td style="color:var(--green)">+${c.impact}%</td>
            <td>${c.origin}</td>
            <td>${c.liquidity}</td>
            <td style="color:${c.security.includes('⚠️') || c.security.includes('🔥') ? 'var(--red)' : 'var(--green)'}">${c.security}</td>
            <td><button onclick="alert('Abriendo Auditoría de Contrato...')" style="background:var(--gold); border:none; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:0.6rem; cursor:pointer;">VER DETALLES</button></td>
        </tr>
    `).join('');
}

// BOTÓN VER MÁS: Simula cargar más de la base de datos de 18k
function loadMore() {
    itemsToShow += 20;
    renderTable();
}

function searchCoins() { renderTable(); }

function toggleProMode() {
    IS_PRO = true;
    itemsToShow = 20;
    const search = document.getElementById('coin-search');
    search.disabled = false;
    search.placeholder = "🔍 BUSCAR EN 18.000+ ACTIVOS...";
    document.getElementById('load-more-btn').style.display = 'block';
    document.getElementById('sub-btn').style.display = 'none';
    document.getElementById('timer-display').innerText = "LIVE (1s)";
    setInterval(renderTable, 1000); // Actualización segundo a segundo
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

setInterval(updateTimer, 1000);
renderTable();
