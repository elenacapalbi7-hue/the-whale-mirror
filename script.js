const activos = ['BTC', 'ETH', 'SOL', 'AVAX', 'LINK', 'DOT', 'MATIC', 'ADA', 'SHIB', 'ARB'];
let movimientos = [];

// 1. Generar movimientos de alto capital (Ballenas)
function actualizarDataReal() {
    const coin = activos[Math.floor(Math.random() * activos.length)];
    const tipo = Math.random() > 0.5 ? 'COMPRAR' : 'VENDER';
    const monto = '$' + (Math.random() * 9000000 + 1000000).toLocaleString(undefined, {maximumFractionDigits:0});
    const wallet = "0x" + Math.random().toString(16).slice(2, 10) + "...whale";
    
    movimientos.unshift({ coin, tipo, monto, wallet });
    if (movimientos.length > 10) movimientos.pop();
}

// 2. Simulación: Las ballenas operan segundo a segundo (PRO)
setInterval(actualizarDataReal, 1000);

// 3. Renderizar para el usuario GRATIS (Actualización cada 10 segundos = Retraso)
function mostrarTabla() {
    const body = document.getElementById('table-body');
    let html = "";
    
    movimientos.forEach((m, i) => {
        html += `
            <tr onclick="abrirPro('${m.coin}', '${m.monto}', '${m.wallet}')">
                <td><strong style="color:var(--gold)">🟡 ${m.coin}</strong></td>
                <td style="color:${m.tipo === 'COMPRAR' ? '#27ae60' : '#e74c3c'}">${m.tipo}</td>
                <td style="color:var(--gold)">${m.monto}</td>
                <td><span class="btn-verify">INFO</span></td>
            </tr>`;
        
        // Agregar anuncio cada 3 filas para versión gratis
        if ((i + 1) % 3 === 0) {
            html += `<tr class="ad-row"><td colspan="4">📢 Publicidad: Pasa a PRO para eliminar anuncios</td></tr>`;
        }
    });
    body.innerHTML = html;
}

// El usuario gratis ve los cambios con delay (cada 10 seg)
setInterval(mostrarTabla, 10000); 

function abrirPro(coin, monto, wallet) {
    const modal = document.getElementById('modal-detalle');
    const data = document.getElementById('modal-data');
    data.innerHTML = `
        <h2 style="color:var(--gold)">${coin} - Datos Pro</h2>
        <div style="text-align:left; font-size:0.8rem; background:#000; padding:15px; border-radius:10px; margin:15px 0;">
            <p>🐳 <strong>Billetera:</strong> ${wallet}</p>
            <p>💰 <strong>Inversión:</strong> ${monto}</p>
            <p>📊 <strong>Gráfico:</strong> [BLOQUEADO]</p>
            <p style="color:#666; font-size:0.7rem;">⚠️ Los usuarios PRO ven la billetera completa y el gráfico de TradingView en vivo.</p>
        </div>
        <a href="https://s.binance.com/CG8zHTCm" class="btn-pay">Obtener Acceso Pro ($9.99)</a>
    `;
    modal.style.display = 'block';
}

document.querySelector('.close-btn').onclick = () => { document.getElementById('modal-detalle').style.display = 'none'; };
mostrarTabla();
