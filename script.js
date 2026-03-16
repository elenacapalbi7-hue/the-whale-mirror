const activos = ['BTC', 'ETH', 'SOL', 'AVAX', 'LINK', 'DOT', 'MATIC', 'ADA', 'SHIB', 'ARB'];
const tableBody = document.getElementById('table-body');

function generarMovimiento() {
    const filas = activos.map(coin => {
        const tipo = Math.random() > 0.5 ? 'COMPRAR' : 'VENDER';
        const monto = '$' + (Math.random() * 5000000).toLocaleString(undefined, {maximumFractionDigits:0});
        return `
            <tr onclick="mostrarModal('${coin}', '${monto}', '${tipo}')">
                <td><strong style="color:var(--gold)">🟡 ${coin}</strong></td>
                <td style="color:${tipo === 'COMPRAR' ? '#27ae60' : '#e74c3c'}">${tipo}</td>
                <td style="color:var(--gold)">${monto}</td>
                <td><span class="btn-verify">VERIF</span></td>
            </tr>`;
    }).join('');
    tableBody.innerHTML = filas;
}

function mostrarModal(coin, monto, tipo) {
    document.getElementById('modal-info').innerHTML = `
        <h2 style="color:var(--gold)">${coin} - Detalle Pro</h2>
        <p>Operación de ${tipo} por ${monto}</p>
        <div style="background:#000; height:120px; border:1px dashed #444; margin:15px 0; display:flex; align-items:center; justify-content:center;">
            <p style="color:#666; font-size:0.8rem;">🔒 Gráfico en tiempo real bloqueado</p>
        </div>
        <a href="https://s.binance.com/CG8zHTCm" class="btn-pay">Desbloquear con Plan PRO</a>
    `;
    document.getElementById('modal-detalle').style.display = 'block';
}

document.querySelector('.close-modal').onclick = () => { document.getElementById('modal-detalle').style.display = 'none'; };

// Actualiza los datos automáticamente cada 4 segundos para que no esté "congelado"
setInterval(generarMovimiento, 4000);
generarMovimiento();
