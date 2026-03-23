let IS_PRO = false; // Control de versión
let timeLeft = 600; // 10 minutos para versión gratis

// Base de datos de monedas ampliada
const coinData = [
    {id: 'BTC', name: 'Bitcoin'}, {id: 'ETH', name: 'Ethereum'}, {id: 'SOL', name: 'Solana'},
    {id: 'PEPE', name: 'Pepe Coin'}, {id: 'BNB', name: 'Binance'}, {id: 'XRP', name: 'Ripple'},
    {id: 'WIF', name: 'Dogwifhat'}, {id: 'BONK', name: 'Bonk'}, {id: 'AVAX', name: 'Avalanche'},
    {id: 'ADA', name: 'Cardano'}, {id: 'LINK', name: 'Chainlink'}, {id: 'DOT', name: 'Polkadot'}
];

const networks = ['Ethereum', 'Solana', 'BSC', 'Polygon', 'Arbitrum'];
const origins = ['Institutional', 'Exchange Out', 'Whale Wallet', 'OTC Desk'];
const securityStatus = ['SAFE ✅', 'AUDITED 🛡️', 'VERIFIED 💎', 'HIGH RISK ⚠️'];

function generateRandomWhaleData() {
    // Generamos datos aleatorios para cada moneda simulando volumen real
    return coinData.map(coin => ({
        ...coin,
        isBuy: Math.random() > 0.45,
        volume: Math.floor(Math.random() * 2000000) + 50000, // Volumen entre 50k y 2M
        wallet: `0x${Math.random().toString(16).slice(2, 8)}...`,
        network: networks[Math.floor(Math.random() * networks.length)],
        impact: (Math.random() * 8).toFixed(2),
        origin: origins[Math.floor(Math.random() * origins.length)],
        liquidity: Math.random() > 0.3 ? 'HIGH' : 'MEDIUM',
        security: securityStatus[Math.floor(Math.random() * securityStatus.length)]
    }));
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    let data = generateRandomWhaleData();

    // REGLA DE ORO: Ordenar por Volumen de mayor a menor (Capital de Ballena)
    data.sort((a, b) => b.volume - a.volume);

    // Limitar cantidad según versión
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
            <td><button onclick="openSubscription()" style="background:var(--gold); border:none; padding:4px 8px; border-radius:4px; font-weight:bold; font-size:0.6rem; cursor:pointer;">DETALLES</button></td>
        </tr>
    `).join('');
}

// Lógica de Actualización
function startApp() {
    renderTable();
    
    // Si es PRO: Actualiza cada 1 segundo
    // Si es GRATIS: Actualiza la tabla cada 10 minutos (600 seg)
    if (IS_PRO) {
        setInterval(renderTable, 1000);
    } else {
        setInterval(renderTable, 600000); // 10 minutos
        setInterval(updateTimer, 1000);   // Pero el reloj baja cada segundo
    }
}

function updateTimer() {
    if (IS_PRO) {
        document.getElementById('timer-display').innerText = "LIVE (1s)";
        return;
    }
    if (timeLeft <= 0) {
        timeLeft = 600;
        renderTable(); // Actualiza cuando llega a 0
    }
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timer-display').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// BOTÓN DE PRUEBA: Cambia a PRO sin pagar
function toggleProMode() {
    IS_PRO = true;
    alert("MODO PRO ACTIVADO (Pruebas)");
    document.getElementById('sub-btn').style.display = 'none';
    document.getElementById('timer-display').innerText = "LIVE (1s)";
    renderTable();
    // Reiniciamos el intervalo para que sea de 1 segundo
    setInterval(renderTable, 1000);
}

function openSubscription() {
    if(IS_PRO) {
        alert("Ya eres usuario PRO");
        return;
    }
    document.getElementById('modal-content').innerHTML = `
        <h2 style="color:var(--gold)">WHALE MIRROR PRO</h2>
        <p style="color:#ccc; font-size:0.8rem; margin:15px 0;">
            Estás viendo la versión limitada.<br><br>
            <b>Beneficios PRO:</b><br>
            ✅ Actualización segundo a segundo.<br>
            ✅ Ver todas las monedas por volumen.<br>
            ✅ Detector de Rugpull y Seguridad.
        </p>
        <button class="btn-gold" onclick="toggleProMode(); document.getElementById('modal').style.display='none'">ACTIVAR PRUEBA GRATIS</button>
        <button class="btn-gold" style="background:#333; color:white; margin-top:5px;" onclick="document.getElementById('modal').style.display='none'">CERRAR</button>
    `;
    document.getElementById('modal').style.display = 'block';
}

startApp();
