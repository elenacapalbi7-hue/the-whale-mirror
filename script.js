// Base de datos de monedas que las "Ballenas" están operando
const poolBallenas = ['BTC', 'ETH', 'SOL', 'AVAX', 'LINK', 'DOT', 'MATIC', 'ADA', 'SHIB', 'ARB', 'UNI', 'AAVE', 'OP', 'NEAR'];
let movimientosReales = [];

// Genera movimientos "en vivo" constantes
function generarFlujoBallenas() {
    const nuevaBilletera = "0x" + Math.random().toString(16).slice(2, 8) + "..." + Math.random().toString(16).slice(2, 6);
    const operacion = {
        activo: poolBallenas[Math.floor(Math.random() * poolBallenas.length)],
        tipo: Math.random() > 0.5 ? 'COMPRAR' : 'VENDER',
        cantidad: '$' + (Math.random() * 5000000 + 500000).toLocaleString(undefined, {maximumFractionDigits:0}),
        wallet: nuevaBilletera,
        timestamp: new Date().toLocaleTimeString()
    };
    movimientosReales.unshift(operacion);
    if (movimientosReales.length > 10) movimientosReales.pop();
}

// ACTUALIZACIÓN DIFERENCIADA
// PRO: Segundo a segundo | GRATIS: Cada 30 segundos (con retraso)
setInterval(generarFlujoBallenas, 1000); 

function renderizarTabla() {
    const tableBody = document.getElementById('table-body');
    let html = "";
    
    movimientosReales.forEach((m, index) => {
        html += `
            <tr onclick="verificarSuscripcion('${m.activo}', '${m.cantidad}', '${m.wallet}')">
                <td><strong style="color:#d4af37">🟡 ${m.activo}</strong></td>
                <td style="color:${m.tipo === 'COMPRAR' ? '#27ae60' : '#e74c3c'}">${m.tipo}</td>
                <td style="color:#d4af37">${m.cantidad}</td>
                <td><span class="btn-verify">DETALLES</span></td>
            </tr>`;
        
        // ANUNCIOS: Aparecen cada 3 filas solo para versión gratis
        if ((index + 1) % 3 === 0) {
            html += `<tr class="ad-row"><td colspan="4" style="background:#222; font-size:0.7rem; color:#888; text-align:center;">AD: Aprende a tradear como ballena - <span style="color:#d4af37">Click aquí</span></td></tr>`;
        }
    });
    tableBody.innerHTML = html;
}

// Para el usuario gratis, la tabla se refresca lento para incitar al PRO
setInterval(renderizarTabla, 10000); 

function verificarSuscripcion(coin, monto, wallet) {
    const modal = document.getElementById('modal-detalle');
    const info = document.getElementById('modal-info');
    
    // Contenido "Super Completo" para el suscriptor
    info.innerHTML = `
        <h2 style="color:#d4af37">Análisis Técnico: ${coin}</h2>
        <div style="text-align:left; font-size:0.8rem; margin:15px 0; background:#111; padding:10px; border-radius:8px;">
            <p>🐳 <strong>Ballena:</strong> ${wallet}</p>
            <p>💰 <strong>Inversión:</strong> ${monto}</p>
            <p>📊 <strong>Gráfico en vivo:</strong> [TradingView Widget cargando...]</p>
        </div>
        <p style="color:#ff4444; font-weight:bold;">⚠️ Solo visible para suscriptores PRO</p>
        <a href="https://s.binance.com/CG8zHTCm" class="btn-pay">Pagar $9.99 USDT para Desbloquear</a>
    `;
    modal.style.display = 'block';
}

document.querySelector('.close-modal').onclick = () => document.getElementById('modal-detalle').style.display = 'none';
renderizarTabla();
