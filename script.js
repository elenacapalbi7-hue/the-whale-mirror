// 1. INICIALIZAR GRÁFICO
new TradingView.widget({
  "width": "100%", "height": 350, "symbol": "BINANCE:BTCUSDT",
  "interval": "D", "timezone": "Etc/UTC", "theme": "dark", "container_id": "tv_widget_container"
});

// 2. DATOS DE LAS 10 MONEDAS (Montos Exactos)
const monedas = [
    { coin: 'BTC', op: 'COMPRA', total: '1,245,607.82', precio: '68,432.10', hora: '05:12:04' },
    { coin: 'ETH', op: 'VENTA', total: '3,890,211.45', precio: '3,452.90', hora: '05:11:58' },
    { coin: 'SOL', op: 'COMPRA', total: '950,432.11', precio: '145.22', hora: '05:11:30' },
    { coin: 'BNB', op: 'VENTA', total: '1,722,890.00', precio: '592.15', hora: '05:10:45' },
    { coin: 'LINK', op: 'COMPRA', total: '4,678,991.23', precio: '18.45', hora: '05:10:12' },
    { coin: 'ADA', op: 'VENTA', total: '5,044,874.66', precio: '0.45', hora: '05:09:50' },
    { coin: 'DOT', op: 'COMPRA', total: '2,153,473.09', precio: '7.12', hora: '05:09:20' },
    { coin: 'AVAX', op: 'VENTA', total: '8,312,890.55', precio: '35.60', hora: '05:08:44' },
    { coin: 'MATIC', op: 'COMPRA', total: '425,177.30', precio: '0.68', hora: '05:08:10' },
    { coin: 'SHIB', op: 'COMPRA', total: '3,424,818.12', precio: '0.00002', hora: '05:07:55' }
];

function renderTable() {
    const table = document.getElementById('whale-table');
    table.innerHTML = monedas.map(m => `
        <tr>
            <td><strong style="color:var(--gold)">${m.coin}</strong></td>
            <td style="color:${m.op === 'COMPRA' ? '#00ff88' : '#ff4444'}">${m.op}</td>
            <td>$${m.total}</td>
            <td>$${m.precio}</td>
            <td>${m.hora}</td>
            <td><button onclick="verMoneda('${m.coin}')" style="background:#222; color:white; border:1px solid #444; font-size:0.6rem; cursor:pointer; padding:4px 8px;">DETALLES</button></td>
        </tr>
    `).join('');
}

// 3. NOTICIAS INTERACTIVAS (Update cada 10 min)
const noticias = [
    { id: 1, tag: "ALERTA", tit: "Movimiento de $500M en Arbitrum", desc: "Se detectó una transferencia masiva a Binance. Las ballenas están preparando liquidez para un posible movimiento de precio importante.", impact: "ALTO" },
    { id: 2, tag: "HOT", tit: "Acumulación en SOL del 12%", desc: "Billeteras inactivas desde 2021 han despertado para comprar Solana en el soporte de los $140.", impact: "MEDIO" }
];

function renderNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = noticias.map(n => `
        <div class="news-card" onclick="verNoticia(${n.id})">
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span class="news-tag">${n.tag}</span>
                <span style="font-size:0.7rem; color:#666;">Actualizado hace instantes</span>
            </div>
            <div style="font-weight:bold; font-size:0.9rem;">${n.tit}</div>
        </div>
    `).join('');
}

// 4. FUNCIONES DE MODAL Y TIEMPOS
let timeLeft = 300; // 5 minutos para Gratis
setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        const min = Math.floor(timeLeft / 60);
        const seg = (timeLeft % 60).toString().padStart(2, '0');
        document.getElementById('timer').innerText = `${min}:${seg}`;
    } else {
        renderTable(); // Aquí refrescaría datos reales
        timeLeft = 300;
    }
}, 1000);

function verNoticia(id) {
    const n = noticias.find(x => x.id === id);
    document.getElementById('modal-data').innerHTML = `
        <h2 style="color:var(--gold)">${n.tit}</h2>
        <p style="line-height:1.5;">${n.desc}</p>
        <p><strong>Impacto esperado:</strong> ${n.impact}</p>
        <hr border="1" color="#333">
        <p style="font-size:0.8rem; color:#888;">Verificación: On-Chain Explorer (Etherscan)</p>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}

function verMoneda(coin) {
    // Simulación de bloqueo para Gratis
    document.getElementById('modal-data').innerHTML = `
        <h2 style="color:var(--gold)">ANÁLISIS DE ${coin}</h2>
        <p>🔒 <strong>CONTENIDO PRO:</strong> Estás en la versión gratuita. Suscríbete para ver el gráfico de profundidad de esta ballena, su historial de éxito y la dirección de su billetera.</p>
        <a href="https://s.binance.com/CG8zHTCm" style="display:block; background:var(--gold); color:black; text-align:center; padding:15px; text-decoration:none; font-weight:bold; border-radius:8px;">SUSCRIBIRSE POR $9.99</a>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}

function cerrarModal() { document.getElementById('detail-modal').style.display = 'none'; }

// Iniciar todo
window.onload = () => { renderTable(); renderNews(); };
setInterval(renderNews, 600000); // Noticias cada 10 min
