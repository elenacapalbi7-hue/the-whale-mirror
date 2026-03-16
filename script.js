const activos = ['BTC', 'ETH', 'SOL', 'AVAX', 'LINK', 'BNB', 'DOT', 'ARB'];
const noticiasTecnicas = [
    "🐋 ALERTA: Una billetera inactiva de la era Satoshi movió 1,000 BTC.",
    "📈 ANALISIS: La liquidez en los exchanges está en mínimos de 5 años.",
    "🔍 DETECTADO: Instituciones compran el dip de Ethereum masivamente.",
    "⚠️ RIESGO: Liquidaciones cortas de $200M detectadas por encima de $65k.",
    "🌐 GLOBAL: Aprobación de ETF en Hong Kong impulsa volumen en Asia."
];

let movimientos = [];

// 1. Motor de Noticias (Se actualiza visualmente)
function actualizarNoticias() {
    const feed = document.getElementById('news-feed');
    const n1 = noticiasTecnicas[Math.floor(Math.random() * noticiasTecnicas.length)];
    const n2 = noticiasTecnicas[Math.floor(Math.random() * noticiasTecnicas.length)];
    feed.innerHTML = `
        <div class="news-entry"><span>NEW</span> ${n1}</div>
        <div class="news-entry"><span>HOT</span> ${n2}</div>
    `;
}

// 2. Motor de Ballenas (Diferenciando por capital)
function flujoBallenas() {
    const coin = activos[Math.floor(Math.random() * activos.length)];
    const tipo = Math.random() > 0.4 ? 'ACUMULACIÓN' : 'DISTRIBUCIÓN';
    const monto = (Math.random() * 10 + 2).toFixed(1) + "M"; // Capital alto
    const div = (Math.random() * 5).toFixed(2) + "%";
    
    movimientos.unshift({ coin, tipo, monto, div });
    if (movimientos.length > 12) movimientos.pop();
}

// Actualización técnica constante
setInterval(flujoBallenas, 1500);
setInterval(actualizarNoticias, 300000); // Cada 5 min noticias reales

function render() {
    const body = document.getElementById('table-body');
    let html = "";
    movimientos.forEach((m, i) => {
        html += `
            <tr onclick="abrirPro('${m.coin}', '${m.monto}')">
                <td><strong style="color:#d4af37">🟡 ${m.coin}</strong></td>
                <td style="color:${m.tipo === 'ACUMULACIÓN' ? '#00ff88' : '#ff4444'}">${m.tipo}</td>
                <td style="color:#d4af37">$${m.monto}</td>
                <td style="font-family: monospace;">+${m.div}</td>
            </tr>`;
        if ((i + 1) % 4 === 0) {
            html += `<tr class="ad-break"><td colspan="4">💎 SUSCRÍBETE PARA ELIMINAR ANUNCIOS Y VER BILLETERAS</td></tr>`;
        }
    });
    body.innerHTML = html;
}

setInterval(render, 15000); // Delay para el usuario gratis

function abrirPro(coin, monto) {
    const modal = document.getElementById('modal-detalle');
    document.getElementById('modal-full-data').innerHTML = `
        <h2 style="color:#d4af37">WHALE INSIGHT: ${coin}</h2>
        <div class="pro-grid">
            <div class="data-box"><h4>Capital</h4><p>$${monto} USD</p></div>
            <div class="data-box"><h4>Confianza</h4><p>94%</p></div>
        </div>
        <div class="chart-mock">[GRÁFICO DE ORDENES BLOQUEADO]</div>
        <p class="pro-text">Esta ballena está moviendo capital desde Binance hacia una cold wallet. Señal de "HODL" inminente.</p>
        <a href="https://s.binance.com/CG8zHTCm" class="btn-pro">DESBLOQUEAR TERMINAL PRO ($9.99)</a>
    `;
    modal.style.display = 'block';
}

document.querySelector('.close-btn').onclick = () => document.getElementById('modal-detalle').style.display = 'none';
actualizarNoticias();
flujoBallenas();
render();
