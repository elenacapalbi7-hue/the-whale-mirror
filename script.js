const tableBody = document.getElementById('table-body');
const modal = document.getElementById('modal-detalle');
const modalInfo = document.getElementById('modal-info');
const closeModal = document.querySelector('.close-modal');

const data = [
    { activo: 'ETH', tipo: 'COMPRAR', cantidad: '$2,501,307', hash: '0x71c...8f9' },
    { activo: 'BTC', tipo: 'VENDER', cantidad: '$4,527,290', hash: '0x32a...1e2' },
    { activo: 'AVAX', tipo: 'COMPRAR', cantidad: '$825,177', hash: '0x99b...4d3' }
];

function loadTable() {
    tableBody.innerHTML = data.map(item => `
        <tr onclick="showDetails('${item.activo}')">
            <td>🟡 ${item.activo}</td>
            <td style="color: ${item.tipo === 'COMPRAR' ? '#27ae60' : '#e74c3c'}">${item.tipo}</td>
            <td style="color: var(--gold)">${item.cantidad}</td>
            <td><span class="btn-verify">Verificar</span></td>
        </tr>
    `).join('');
}

function showDetails(coin) {
    modalInfo.innerHTML = `
        <h2>Análisis de ${coin}</h2>
        <div style="background: #000; height: 200px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin: 20px 0;">
            <p style="color: #666; text-align: center; padding: 20px;">
                🔒 Gráfico de TradingView bloqueado.<br>
                <small>Disponible solo para usuarios PRO.</small>
            </p>
        </div>
        <p>Esta ballena ha movido grandes cantidades de ${coin} en las últimas 24h.</p>
        <a href="https://s.binance.com/CG8zHTCm" class="btn-pay">Desbloquear con Plan Pro</a>
    `;
    modal.style.display = 'block';
}

closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };

loadTable();
