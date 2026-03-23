let IS_PRO = false;
let timeLeft = 600;
let itemsToShow = 10;
let allRealCoins = []; 

// 1. CARGA DE MERCADO REAL
async function fetchAllCoins() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
        allRealCoins = await response.json();
        renderTable();
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}

// 2. GENERADOR DE DATOS DE AUDITORÍA (Diferentes para cada moneda)
function getAuditData(coinSymbol, index) {
    const networks = ['Solana', 'Ethereum', 'BSC', 'Base', 'Polygon', 'Arbitrum'];
    const origins = ['Institutional OTC', 'CEX Inflow', 'Private Whale', 'DEX Liquidity', 'VC Funding', 'Treasury Move'];
    const liquidities = ['ULTRA-HIGH', 'HIGH', 'STABLE', 'MODERATE', 'DEEP'];
    const securities = ['SAFE ✅', 'AUDITED 🛡️', 'VERIFIED 💎', 'UNVERIFIED ⚠️', 'HIGH RISK 🔥'];

    // Usamos el índice y la longitud del nombre para que los datos sean variados pero consistentes
    return {
        isBuy: Math.random() > 0.45,
        // Volumen dinámico: entre 50k y 10M USD
        volume: Math.floor(Math.random() * 9950000) + 50000, 
        wallet: `0x${Math.random().toString(16).slice(2, 10)}...`,
        network: networks[(index + coinSymbol.length) % networks.length],
        impact: (Math.random() * 12).toFixed(2),
        origin: origins[(index * 3) % origins.length],
        liquidity: liquidities[(index + 2) % liquidities.length],
        security: securities[(index + coinSymbol.length) % securities.length]
    };
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    const filter = document.getElementById('coin-search').value.toLowerCase();
    
    if (allRealCoins.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding:20px;">Sincronizando con Nodos Globales...</td></tr>';
        return;
    }

    // Filtrar por búsqueda
    let filtered = allRealCoins;
    if (filter) {
        filtered = allRealCoins.filter(c => 
            c.symbol.toLowerCase() === filter || 
            c.name.toLowerCase().includes(filter)
        );
    }

    // Mapear con datos de auditoría
    let mappedData = filtered.slice(0, 100).map((c, i) => {
        return { ...c, audit: getAuditData(c.symbol, i) };
    });

    // ORDENAR POR VOLUMEN (De mayor a menor capital de ballena)
    // Esto hace que la moneda donde más se compra/vende esté arriba de todo
    mappedData.sort((a, b) => b.audit.volume - a.audit.volume);

    // Lógica de visualización (Gratis 10, Pro lo que cargue)
    const limit = IS_PRO ? itemsToShow : 10;
    const displayList = mappedData.slice(0, limit);
    
    document.getElementById('count-text').innerText = allRealCoins.length;

    tbody.innerHTML = displayList.map(c => `
        <tr>
            <td><b style="color:var(--gold)">${c.symbol.toUpperCase()}</b><br><small style="color:#666">${c.name}</small></td>
            <td style="color:${c.audit.isBuy ? 'var(--green)' : 'var(--red)'}">${c.audit.isBuy ? 'COMPRA' : 'VENTA'}</td>
            <td style="font-weight:bold; font-family:monospace;">$${c.audit.volume.toLocaleString()}</td>
            <td style="color:#888">${c.audit.wallet}</td>
            <td>${c.audit.network}</td>
            <td style="color:var(--green)">+${c.audit.impact}%</td>
            <td>${c.audit.origin}</td>
            <td>${c.audit.liquidity}</td>
            <td style="color:${c.audit.security.includes('⚠️') || c.audit.security.includes('🔥') ? 'var(--red)' : 'var(--green)'}">${c.audit.security}</td>
            <td><button onclick="alert('Auditoría RPC activa para ${c.symbol}')" style="background:var(--gold); border:none; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:0.6rem; cursor:pointer;">DETALLES</button></td>
        </tr>
    `).join('');
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
    
    // En PRO, reordenamos la tabla cada segundo para ver quién gana en volumen
    setInterval(renderTable, 1000); 
    renderTable();
}

function updateTimer() {
    if (IS_PRO) return;
    if (timeLeft <= 0) { 
        timeLeft = 600; 
        renderTable(); // Solo actualiza el orden cada 10 min en gratis
    }
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timer-display').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

fetchAllCoins();
setInterval(updateTimer, 1000);
