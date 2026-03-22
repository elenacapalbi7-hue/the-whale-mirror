const coins = ['BTC', 'ETH', 'SOL', 'PEPE', 'WIF', 'BONK', 'BNB', 'XRP', 'ADA', 'AVAX'];
const networks = ['Ethereum', 'Solana', 'BSC', 'Arbitrum', 'Polygon'];
const whaleTypes = ['Institutional', 'Exchange Outflow', 'Private Wallet', 'OTC Desk'];

function renderTable() {
    const tbody = document.getElementById('table-body');
    if(!tbody) return;
    
    tbody.innerHTML = coins.map(s => {
        const isBuy = Math.random() > 0.4;
        const impact = (Math.random() * 5).toFixed(2);
        
        return `
            <tr>
                <td style="color:var(--gold); font-weight:bold;">${s}/USDT</td>
                <td style="color:${isBuy ? 'var(--green)' : 'var(--red)'}">${isBuy ? 'COMPRA' : 'VENTA'}</td>
                <td>$${(Math.random() * 500000 + 50000).toLocaleString()}</td>
                <td style="color:#555;">0x${Math.random().toString(16).slice(2,8)}...</td>
                <td>${networks[Math.floor(Math.random() * networks.length)]}</td>
                <td style="color:var(--green)">+${impact}%</td>
                <td>${whaleTypes[Math.floor(Math.random() * whaleTypes.length)]}</td>
                <td>HIGH</td>
                <td style="color:var(--green)">SAFE ✅</td>
                <td><button onclick="openSubscription()" style="background:var(--gold); border:none; padding:5px; border-radius:4px; font-size:0.6rem; cursor:pointer; font-weight:bold;">REPORT +</button></td>
            </tr>`;
    }).join('');
}

function openSubscription() {
    document.getElementById('modal-content').innerHTML = `
        <h2 style="color:var(--gold);">WHALE MIRROR PRO</h2>
        <p style="margin:15px 0; font-size:0.8rem; color:#ccc;">Suscríbete para acceder a la terminal completa y auditorías de seguridad en Rosario de Lerma.</p>
        <button class="btn-gold" onclick="closeModal()">CERRAR</button>
    `;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }

renderTable();
setInterval(renderTable, 3000);
