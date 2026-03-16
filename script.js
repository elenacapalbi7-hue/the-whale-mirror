// CONFIGURACIÓN DE TRADINGVIEW
new TradingView.widget({
  "width": "100%", "height": 300, "symbol": "BINANCE:BTCUSDT",
  "interval": "D", "timezone": "Etc/UTC", "theme": "dark",
  "style": "1", "locale": "es", "toolbar_bg": "#f1f3f6",
  "enable_publishing": false, "allow_symbol_change": true,
  "container_id": "tradingview_widget"
});

const activos = ['BTC', 'ETH', 'SOL', 'AVAX', 'LINK', 'BNB', 'DOT', 'MATIC'];
let bufferMovimientos = [];
let contadorSegundos = 30;

// 1. Generar datos y guardarlos en un "Buffer" (Memoria)
function generarDatos() {
    const coin = activos[Math.floor(Math.random() * activos.length)];
    const tipo = Math.random() > 0.4 ? 'COMPRAR' : 'VENDER';
    const monto = (Math.random() * 8 + 1).toFixed(1) + "M";
    
    bufferMovimientos.unshift({ coin, tipo, monto });
    if (bufferMovimientos.length > 15) bufferMovimientos.pop();
}

// 2. Renderizar la tabla (Muestra lo que hay en memoria, no borra nada)
function renderizarTabla() {
    const body = document.getElementById('table-body');
    if (bufferMovimientos.length === 0) return; // Evita que se ponga negro al inicio

    let html = "";
    bufferMovimientos.forEach((m, i) => {
        html += `
            <tr onclick="verPro('${m.coin}', '${m.monto}')">
                <td><strong style="color:#d4af37">🟡 ${m.coin}</strong></td>
                <td style="color:${m.tipo === 'COMPRAR' ? '#00ff88' : '#ff4444'}">${m.tipo}</td>
                <td>$${m.monto}</td>
                <td><span class="btn-info">DETALLES</span></td>
            </tr>`;
        if ((i + 1) % 5 === 0) {
            html += `<tr class="ad-row"><td colspan="4">📢 PUBLICIDAD: Pasa a PRO para tiempo real</td></tr>`;
        }
    });
    body.innerHTML = html;
}

// 3. Temporizador para la versión Gratis (30 segundos)
setInterval(() => {
    generarDatos(); // Las ballenas se mueven internamente cada segundo
    
    if (contadorSegundos <= 0) {
        renderizarTabla(); // Solo actualiza la vista cada 30 segundos
        contadorSegundos = 30;
    } else {
        contadorSegundos--;
    }
    document.getElementById('update-timer').innerText = contadorSegundos + "s";
}, 1000);

// Función para simular noticias técnicas constantes
function refrescarNoticias() {
    const container = document.getElementById('news-container');
    const noticias = [
        "⚠️ [ALERTA] Movimiento masivo de $500M detectado en cadena Arbitrum.",
        "🔥 [HOT] Ballenas de SOL incrementan posiciones un 12% en la última hora.",
        "📊 [INFO] El índice de miedo y codicia se mantiene en 82 (Codicia Extrema).",
        "🐋 [WHALE] Billetera ballena #14 de ETH acaba de depositar $40M en Lido."
    ];
    container.innerHTML = noticias.map(n => `<div class="news-item">${n}</div>`).join('');
}

setInterval(refrescarNoticias, 10000); // Noticias cada 10 seg
refrescarNoticias();
generarDatos();
renderizarTabla();

function verPro(coin, monto) {
    const modal = document.getElementById('modal-detalle');
    document.getElementById('modal-full-content').innerHTML = `
        <h2 style="color:#d4af37">ANÁLISIS INSTITUCIONAL: ${coin}</h2>
        <div class="pro-info-grid">
            <div class="p-box"><h4>VOLUMEN</h4><p>$${monto}</p></div>
            <div class="p-box"><h4>DESTINO</h4><p>Cold Wallet</p></div>
        </div>
        <p style="font-size:0.8rem; background:#000; padding:10px; margin:10px 0;">
            🔒 <strong>DATOS BLOQUEADOS:</strong> Suscríbete para ver el Hash de la transacción, el gráfico de profundidad y alertas instantáneas vía Telegram.
        </p>
        <a href="https://s.binance.com/CG8zHTCm" class="btn-pay-pro">ACTIVAR SUSCRIPCIÓN ($9.99)</a>
    `;
    modal.style.display = 'block';
}
document.querySelector('.close-btn').onclick = () => document.getElementById('modal-detalle').style.display = 'none';
