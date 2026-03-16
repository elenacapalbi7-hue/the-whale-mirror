// ==========================================
// CONFIGURACIÓN DE VERIFICACIÓN (DESBLOQUEADO)
// ==========================================

// 1. INICIALIZAR GRÁFICO PRINCIPAL
new TradingView.widget({
  "width": "100%", "height": 350, "symbol": "BINANCE:BTCUSDT",
  "interval": "D", "timezone": "Etc/UTC", "theme": "dark", "container_id": "tv_widget_container"
});

// 2. DATOS DE LAS 10 MONEDAS (Montos Exactos con decimales)
const monedas = [
    { coin: 'BTC', op: 'COMPRA', total: '1,245,607.82', precio: '68,432.10', hora: '05:12:04', hash: '0x7a...f2e' },
    { coin: 'ETH', op: 'VENTA', total: '3,890,211.45', precio: '3,452.90', hora: '05:11:58', hash: '0x1b...a9d' },
    { coin: 'SOL', op: 'COMPRA', total: '950,432.11', precio: '145.22', hora: '05:11:30', hash: '0x9c...31b' },
    { coin: 'BNB', op: 'VENTA', total: '1,722,890.00', precio: '592.15', hora: '05:10:45', hash: '0x4d...88c' },
    { coin: 'LINK', op: 'COMPRA', total: '4,678,991.23', precio: '18.45', hora: '05:10:12', hash: '0x2e...11a' },
    { coin: 'ADA', op: 'VENTA', total: '5,044,874.66', precio: '0.45', hora: '05:09:50', hash: '0x8f...44d' },
    { coin: 'DOT', op: 'COMPRA', total: '2,153,473.09', precio: '7.12', hora: '05:09:20', hash: '0x5a...99b' },
    { coin: 'AVAX', op: 'VENTA', total: '8,312,890.55', precio: '35.60', hora: '05:08:44', hash: '0x3c...22e' },
    { coin: 'MATIC', op: 'COMPRA', total: '425,177.30', precio: '0.68', hora: '05:08:10', hash: '0x6d...77f' },
    { coin: 'SHIB', op: 'COMPRA', total: '3,424,818.12', precio: '0.00002', hora: '05:07:55', hash: '0x0b...55a' }
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

// 3. NOTICIAS INTERACTIVAS
const noticias = [
    { id: 1, tag: "ALERTA", tit: "Movimiento de $500M en Arbitrum", desc: "Se detectó una transferencia masiva a Binance de 400,000 ARB. Las ballenas están preparando liquidez.", anal: "Históricamente, estos movimientos preceden una volatilidad del 8% en las siguientes 24hs.", impact: "ALTO 🔥" },
    { id: 2, tag: "HOT", tit: "Acumulación en SOL del 12%", desc: "Billeteras institucionales han comprado masivamente en el nivel de $140 USD.", anal: "Soporte confirmado. El flujo de dinero inteligente sugiere una ruptura alcista inminente.", impact: "MEDIO 🚀" }
];

function renderNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = noticias.map(n => `
        <div class="news-card" onclick="verNoticia(${n.id})">
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span class="news-tag">${n.tag}</span>
                <span style="font-size:0.7rem; color:#666;">Actualizado hace 2 min</span>
            </div>
            <div style="font-weight:bold; font-size:0.9rem;">${n.tit}</div>
            <div style="color:var(--gold); font-size:0.7rem; margin-top:5px;">[ CLIC PARA ANÁLISIS COMPLETO ]</div>
        </div>
    `).join('');
}

// 4. LÓGICA DE DESBLOQUEO PARA VERIFICACIÓN
function verNoticia(id) {
    const n = noticias.find(x => x.id === id);
    document.getElementById('modal-data').innerHTML = `
        <h2 style="color:var(--gold); margin-top:0;">${n.tit}</h2>
        <div style="background:#000; padding:10px; border-radius:5px; border:1px solid #333; margin-bottom:15px;">
            <p style="color:#00ff88; font-size:0.8rem; margin:0;">✅ MODO VERIFICACIÓN: ACCESO CONCEDIDO</p>
        </div>
        <p style="line-height:1.6;">${n.desc}</p>
        <div style="background:#222; padding:15px; border-radius:8px; margin:15px 0;">
            <h4 style="margin-top:0; color:var(--gold);">ANÁLISIS TÉCNICO PRO:</h4>
            <p style="font-size:0.9rem; margin:0;">${n.anal}</p>
        </div>
        <p><strong>Impacto en Mercado:</strong> <span style="color:white;">${n.impact}</span></p>
        <p style="font-size:0.8rem; color:#666;">Fuente: Whales-Monitor API v2.0</p>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}

function verMoneda(coin) {
    const m = monedas.find(x => x.coin === coin);
    document.getElementById('modal-data').innerHTML = `
        <h2 style="color:var(--gold); margin-top:0;">MOVIMIENTOS DE ${m.coin}</h2>
        <div style="background:#000; padding:10px; border-radius:5px; border:1px solid #333; margin-bottom:15px;">
            <p style="color:#00ff88; font-size:0.8rem; margin:0;">✅ MODO VERIFICACIÓN: ACCESO CONCEDIDO</p>
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-size:0.9rem;">
            <div><strong>Operación:</strong> <span style="color:${m.op==='COMPRA'?'#00ff88':'#ff4444'}">${m.op}</span></div>
            <div><strong>Monto:</strong> $${m.total}</div>
            <div><strong>Precio:</strong> $${m.precio}</div>
            <div><strong>Hora:</strong> ${m.hora}</div>
        </div>
        <hr style="border:0; border-top:1px solid #333; margin:20px 0;">
        <h4 style="color:var(--gold); margin-bottom:5px;">Rastreo Blockchain:</h4>
        <code style="display:block; background:#000; padding:10px; font-size:0.7rem; color:#888;">
            Hash: ${m.hash}...e24b<br>
            Status: Confirmado en bloque #827,112
        </code>
        <div style="margin-top:20px; text-align:center;">
            <p style="font-size:0.7rem; color:#666;">Aquí aparecería el botón de pago en la versión real.</p>
        </div>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}

function cerrarModal() { document.getElementById('detail-modal').style.display = 'none'; }

// 5. TEMPORIZADOR DE 5 MINUTOS (Para ver cómo baja)
let timeLeft = 300;
setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        const min = Math.floor(timeLeft / 60);
        const seg = (timeLeft % 60).toString().padStart(2, '0');
        document.getElementById('timer').innerText = `${min}:${seg}`;
    } else {
        timeLeft = 300; // Reinicio automático para tu test
    }
}, 1000);

window.onload = () => { renderTable(); renderNews(); };
