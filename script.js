let IS_PRO = false; // Cambiar a true para ver la versión suscripto
let visibleCoins = IS_PRO ? 20 : 10;
let timeLeft = 600; // 10 minutos para versión gratis

const coinData = [
    {id: 'BTC', name: 'Bitcoin'}, {id: 'ETH', name: 'Ethereum'}, {id: 'SOL', name: 'Solana'},
    {id: 'BNB', name: 'Binance Coin'}, {id: 'XRP', name: 'Ripple'}, {id: 'ADA', name: 'Cardano'},
    {id: 'AVAX', name: 'Avalanche'}, {id: 'DOT', name: 'Polkadot'}, {id: 'MATIC', name: 'Polygon'},
    {id: 'LINK', name: 'Chainlink'}, {id: 'PEPE', name: 'Pepe Coin'}, {id: 'SHIB', name: 'Shiba Inu'}
];

const networks = ['Ethereum', 'Solana', 'BSC', 'Polygon', 'Arbitrum'];

function renderTable(filter = "") {
    const tbody = document.getElementById('table-body');
    const filtered = coinData.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.id.toLowerCase().includes(filter.toLowerCase()));
    
    // Si no es PRO, solo mostramos las primeras 10
    const displayList = IS_PRO ? filtered.slice(0, visibleCoins) : filtered.slice(0, 10);
    
    tbody.innerHTML = displayList.map(c => {
        const isBuy = Math.random() > 0.4;
        return `
            <tr>
                <td><b style="color:var(--gold)">${c.id}</b><br><small style="color:#666">${c.name}</small></td>
                <td style="color:${isBuy ? 'var(--green)' : 'var(--red)'}">${isBuy ? 'COMPRA' : 'VENTA'}</td>
                <td>$${(Math.random() * 900000 + 100000).toLocaleString()}</td>
                <td>0x${Math.random().toString(16).slice(2,8)}...</td>
                <td>${networks[Math.floor(Math.random() * networks.length)]}</td>
                <td style="color:var(--green)">+${(Math.random()*4).toFixed(2)}%</td>
                <td>Institutional</td>
                <td>HIGH</td>
                <td style="color:var(--green)">SAFE ✅</td>
                <td><button onclick="openSubscription()" style="background:var(--gold); border:none; padding:4px; border-radius:4px; font-weight:bold; font-size:0.6rem;">DETALLES</button></td>
            </tr>`;
    }).join('');
}

// Configuración inicial por nivel de usuario
if(IS_PRO) {
    document.getElementById('search-bar-container').style.display = 'block';
    document.getElementById('load-more-btn').style.display = 'block';
    document.getElementById('timer-display').innerText = "LIVE (1s)";
    setInterval(() => renderTable(), 1000);
} else {
    setInterval(updateTimer, 1000);
    setInterval(() => renderTable(), 5000); // Actualiza cada 5 seg en gratis
}

function updateTimer() {
    if(timeLeft <= 0) timeLeft = 600;
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timer-display').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function searchCoins() {
    const val = document.getElementById('coin-search').value;
    renderTable(val);
}

function loadMoreCoins() {
    visibleCoins += 20;
    renderTable();
}

function openSubscription() {
    document.getElementById('modal-content').innerHTML = `
        <h2 style="color:var(--gold)">WHALE MIRROR PRO</h2>
        <p style="color:#ccc; font-size:0.8rem; margin:15px 0;">
            ✅ +1000 monedas monitoreadas<br>
            ✅ Actualización segundo a segundo<br>
            ✅ Buscador avanzado activado<br>
            ✅ Alertas de ballenas institucionales
        </p>
        <button class="btn-gold" onclick="document.getElementById('modal').style.display='none'">CERRAR</button>
    `;
    document.getElementById('modal').style.display = 'block';
}

renderTable();
