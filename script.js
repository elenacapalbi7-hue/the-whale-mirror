const movimientosBase = [
    { activo: 'BTC', tipo: 'COMPRAR', hash: '0x32a...1e2' },
    { activo: 'ETH', tipo: 'VENDER', hash: '0x71c...8f9' },
    { activo: 'SOL', tipo: 'COMPRAR', hash: '0x99b...4d3' },
    { activo: 'AVAX', tipo: 'VENDER', hash: '0x44d...7a1' },
    { activo: 'LINK', tipo: 'COMPRAR', hash: '0x11e...9b2' },
    { activo: 'DOT', tipo: 'COMPRAR', hash: '0x55f...2c1' },
    { activo: 'MATIC', tipo: 'VENDER', hash: '0x88g...3d4' },
    { activo: 'ADA', tipo: 'COMPRAR', hash: '0x22h...9e5' },
    { activo: 'SHIB', tipo: 'VENDER', hash: '0x66i...1f6' },
    { activo: 'ARB', tipo: 'COMPRAR', hash: '0x44j...8g7' }
];

const tableBody = document.getElementById('table-body');
const modal = document.getElementById('modal-detalle');
const modalInfo = document.getElementById('modal-info');
const closeModal = document.querySelector('.close-modal');

function generarMonto() {
    return '$' + (Math.random() * (5000000 - 100000) + 100000).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
}

function cargarTabla() {
    // Tomamos 10 movimientos y les asignamos montos aleatorios cada vez
    tableBody.innerHTML = movimientosBase.map(m => `
        <tr onclick="abrirDetalles('${m.activo}', '${generarMonto()}', '${m.tipo}')">
            <td><strong style="color: #d4af37">🟡 ${m.activo}</strong></td>
            <td><span style="color: ${m.tipo === 'COMPRAR' ? '#27ae60' : '#e74c3c'}; font-weight: bold;">${m.tipo}</span></td>
            <td style="color: #d4af37">${generarMonto()}</td>
            <td><span class="btn-verify">VERIFICAR</span></td>
        </tr>
    `).join('');
}

// SIMULACIÓN DE ACTUALIZACIÓN: Refresca la tabla cada 5 segundos para que no esté "congelada"
setInterval(cargarTabla, 5000);

function abrirDetalles(moneda, monto, operacion) {
    modalInfo.innerHTML = `
        <h2 style="color: #d4af37;">Análisis: ${moneda}</h2>
        <p><strong>Estado:</strong> Movimiento detectado en tiempo real</p>
        <div style="background: #000; height: 150px; border-radius: 10px; margin: 15px 0; border: 1px dashed #444; display: flex; align-items: center; justify-content: center; flex-direction: column;">
            <p style="color: #d4af37; font-size: 0.8rem;">🔒 Gráfico PRO Bloqueado</p>
        </div>
        <div style="text-align: left; background: #111; padding: 10px; border-radius: 8px; font-size: 0.85rem;">
            <p>✅ Confirmaciones: 12/12</p>
            <p>🔗 Hash: <span style="color: #d4af37;">Verificar en Blockchain</span></p>
        </div>
        <a href="https://s.binance.com/CG8zHTCm" class="btn-pay" style="margin-top: 15px; display: block; text-decoration: none; text-align: center;">Acceso Total PRO ($9.99)</a>
    `;
    modal.style.display = 'block';
}

closeModal.onclick = () => { modal.style.display = 'none'; };
window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };

cargarTabla();
