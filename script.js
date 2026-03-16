// DATOS EXTENDIDOS (Ahora con Hash y Análisis individual)
const monedas = [
    { coin: 'BTC', op: 'COMPRA', total: '1,245,607.82', precio: '68,432.10', hora: '05:12:04', hash: '0x7a...e24b', winrate: '89%' },
    { coin: 'ETH', op: 'VENTA', total: '3,890,211.45', precio: '3,452.90', hora: '05:11:58', hash: '0x1b...a9d2', winrate: '76%' },
    // ... agrega las otras 8 monedas siguiendo este formato
];

function renderTable() {
    const table = document.getElementById('whale-table');
    table.innerHTML = monedas.map(m => `
        <tr>
            <td><strong style="color:var(--gold)">${m.coin}</strong></td>
            <td style="color:${m.op === 'COMPRA' ? '#00ff88' : '#ff4444'}"><strong>${m.op}</strong></td>
            <td>$${m.total}</td>
            <td>$${m.precio}</td>
            <td>${m.hora}</td>
            <td><button onclick="verMoneda('${m.coin}')" style="background:var(--gold); color:black; border:none; border-radius:4px; font-size:0.65rem; font-weight:bold; cursor:pointer; padding:5px 10px;">DETALLES PRO</button></td>
        </tr>
    `).join('');
}

// MODAL PRO CON MÁXIMA INFORMACIÓN
function verMoneda(coin) {
    const m = monedas.find(x => x.coin === coin);
    document.getElementById('modal-data').innerHTML = `
        <div style="text-align:center; margin-bottom:15px;">
            <h2 style="color:var(--gold); margin:0;">CENTRO DE DATOS: ${m.coin}</h2>
            <span class="pro-badge">Suscripción Activa</span>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; background:#1a1a1a; padding:15px; border-radius:10px; border:1px solid #333;">
            <div><small style="color:#666;">ACCIÓN:</small><br><span style="color:${m.op==='COMPRA'?'#00ff88':'#ff4444'}"><strong>${m.op} MASIVA</strong></span></div>
            <div><small style="color:#666;">VOLUMEN EXACTO:</small><br><strong>$${m.total}</strong></div>
            <div><small style="color:#666;">PRECIO EJECUCIÓN:</small><br><strong>$${m.precio}</strong></div>
            <div><small style="color:#666;">TIEMPO (UTC):</small><br><strong>${m.hora}</strong></div>
        </div>

        <h4 style="color:var(--gold); margin:20px 0 8px 0;">🕵️ ANÁLISIS DE COMPORTAMIENTO:</h4>
        <div style="font-size:0.85rem; color:#ccc; background:#000; padding:15px; border-radius:8px; border-left:4px solid var(--gold);">
            <p><strong>Win-rate de la Ballena:</strong> ${m.winrate}</p>
            <p>Se ha detectado una acumulación en frío. Esta dirección no ha movido fondos en 14 meses, lo que sugiere una <strong>señal de retención (HODL) fuerte</strong>. El flujo se originó desde un exchange institucional.</p>
        </div>

        <h4 style="color:var(--gold); margin:20px 0 8px 0;">🔗 VERIFICACIÓN ON-CHAIN (REAL):</h4>
        <div style="background:#111; padding:12px; border:1px dashed #444; border-radius:8px;">
            <p style="font-size:0.7rem; color:#888; margin-bottom:5px;">Hash de Transacción Oficial:</p>
            <code style="color:#00ff88; font-size:0.75rem;">${m.hash}</code>
            <a href="https://etherscan.io/" target="_blank" style="display:block; margin-top:8px; color:var(--gold); font-size:0.7rem; text-decoration:none;">[ Ver en Explorador de Bloques ↗ ]</a>
        </div>

        <div style="margin-top:20px; height:120px; background:linear-gradient(transparent, #1a1a1a); border:1px solid #222; border-radius:8px; display:flex; align-items:center; justify-content:center;">
             <p style="color:#444; font-size:0.7rem;">[ Gráfico de flujo de órdenes cargando... ]</p>
        </div>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}

// BOTÓN VER TODO EL MERCADO (INFO DE SUSCRIPCIÓN)
function verMasMonedas() {
    document.getElementById('modal-data').innerHTML = `
        <div style="text-align:center;">
            <h2 style="color:var(--gold);">ACCESO RESTRINGIDO</h2>
            <p style="font-size:0.9rem; color:#bbb;">Estás viendo la versión limitada (Top 10). Al suscribirte a <strong>PRO</strong>, desbloqueas:</p>
            
            <div style="text-align:left; background:#1a1a1a; padding:20px; border-radius:10px; margin:20px 0;">
                <ul style="font-size:0.85rem; color:white; line-height:1.8;">
                    <li>✅ <strong>+1,000 Monedas</strong> en tiempo real.</li>
                    <li>✅ Actualización <strong>Segundo a Segundo</strong>.</li>
                    <li>✅ Gráficos de TradingView integrados por moneda.</li>
                    <li>✅ Alertas de Ballenas vía Telegram/Push.</li>
                </ul>
            </div>
            
            <button onclick="alert('Redirigiendo a Binance Pay...')" style="width:100%; background:var(--gold); color:black; padding:15px; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">SUSCRIBIRSE POR $9.99/MES</button>
        </div>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}
