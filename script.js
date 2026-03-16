// 1. Datos simulados pero detallados para que la página se vea "llena"
const movimientos = [
    { activo: 'BTC', tipo: 'COMPRAR', cantidad: '$12,501,307', tiempo: 'hace 2 min', hash: '0x32a...1e2' },
    { activo: 'ETH', tipo: 'VENDER', cantidad: '$8,612,683', tiempo: 'hace 5 min', hash: '0x71c...8f9' },
    { activo: 'SOL', tipo: 'COMPRAR', cantidad: '$1,911,914', tiempo: 'hace 12 min', hash: '0x99b...4d3' },
    { activo: 'AVAX', tipo: 'VENDER', cantidad: '$825,177', tiempo: 'hace 15 min', hash: '0x44d...7a1' },
    { activo: 'LINK', tipo: 'COMPRAR', cantidad: '$3,899,327', tiempo: 'hace 22 min', hash: '0x11e...9b2' }
];

const tableBody = document.getElementById('table-body');
const modal = document.getElementById('modal-detalle');
const modalInfo = document.getElementById('modal-info');
const closeModal = document.querySelector('.close-modal');

// 2. Función para cargar la tabla con la columna de "VERIFICAR"
function cargarTabla() {
    tableBody.innerHTML = movimientos.map(m => `
        <tr onclick="abrirDetalles('${m.activo}', '${m.cantidad}', '${m.tipo}')">
            <td><strong style="color: #d4af37">🟡 ${m.activo}</strong></td>
            <td><span style="color: ${m.tipo === 'COMPRAR' ? '#27ae60' : '#e74c3c'}; font-weight: bold;">${m.tipo}</span></td>
            <td style="color: #d4af37">${m.cantidad}</td>
            <td><span class="btn-verify">VERIFICAR</span></td>
        </tr>
    `).join('');
}

// 3. Función para mostrar el Modal con la "Información Completa"
function abrirDetalles(moneda, monto, operacion) {
    modalInfo.innerHTML = `
        <h2 style="color: #d4af37; margin-bottom: 10px;">Análisis de Ballena: ${moneda}</h2>
        <p><strong>Operación:</strong> ${operacion}</p>
        <p><strong>Monto detectado:</strong> ${monto}</p>
        
        <div class="grafico-container" style="background: #000; height: 180px; border-radius: 10px; margin: 15px 0; border: 1px dashed #444; display: flex; align-items: center; justify-content: center; flex-direction: column;">
            <p style="color: #888; font-size: 0.9rem;">📊 Gráfico de Velas en tiempo real</p>
            <p style="color: #d4af37; font-size: 0.8rem;">🔒 Bloqueado: Suscríbete para ver</p>
        </div>

        <div style="text-align: left; background: #111; padding: 10px; border-radius: 8px; font-size: 0.85rem;">
            <p>✅ <strong>Billetera Verificada:</strong> Smart Money</p>
            <p>✅ <strong>Probabilidad de éxito:</strong> 82%</p>
            <p>🔗 <strong>Blockchain Hash:</strong> <span style="color: #d4af37; text-decoration: underline;">Ver en Explorador</span></p>
        </div>

        <a href="https://s.binance.com/CG8zHTCm" class="btn-pay" style="margin-top: 20px; display: block; text-decoration: none; text-align: center;">Obtener Plan PRO ($9.99)</a>
    `;
    modal.style.display = 'block';
}

// 4. Cerrar el modal
closeModal.onclick = () => { modal.style.display = 'none'; };
window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };

// Iniciar la página
cargarTabla();
