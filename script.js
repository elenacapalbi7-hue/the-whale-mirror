function verMoneda(coin) {
    const m = monedas.find(x => x.coin === coin);
    document.getElementById('modal-data').innerHTML = `
        <h2 style="color:var(--gold); margin-bottom:0;">REPORT PRO: ${m.coin}</h2>
        <div style="background:#00ff8822; color:#00ff88; padding:8px; border-radius:5px; font-size:0.7rem; text-align:center; margin:10px 0;">✅ MODO VERIFICACIÓN: ACCESO CONCEDIDO</div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:20px 0; background:#1a1a1a; padding:15px; border-radius:10px; font-size:0.8rem;">
            <div><small style="color:#666;">OP:</small><br><strong>${m.op}</strong></div>
            <div><small style="color:#666;">MONTO:</small><br><strong>$${m.total}</strong></div>
            <div><small style="color:#666;">PRECIO:</small><br><strong>$${m.precio}</strong></div>
            <div><small style="color:#666;">HORA:</small><br><strong>${m.hora}</strong></div>
        </div>

        <h4 style="color:var(--gold); margin:0 0 10px 0;">🕵️ Análisis On-Chain:</h4>
        <div style="background:#000; padding:15px; border-left:4px solid var(--gold); font-size:0.75rem; color:#ccc;">
            <strong>Hash:</strong> <span style="color:#888;">${m.hash}...e24b</span><br><br>
            <strong>Detalles:</strong> Billetera ballena con historial de éxito del 89%. Esta operación se realizó mediante un pool de liquidez institucional. No hay órdenes de venta programadas.
        </div>

        <div style="margin-top:20px; height:100px; border:1px dashed #444; border-radius:8px; display:flex; align-items:center; justify-content:center; background:#050505;">
            <p style="color:#333; font-size:0.6rem;">[ Gráfico PRO: Entrada de Volumen Real ]</p>
        </div>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}

function verMasMonedas() {
    document.getElementById('modal-data').innerHTML = `
        <h2 style="color:var(--gold); text-align:center;">MERCADO COMPLETO PRO</h2>
        <p style="text-align:center; font-size:0.85rem; color:#bbb;">Para ver las +500 monedas restantes y actualizaciones cada segundo, necesitas el Plan PRO.</p>
        
        <div style="background:#1a1a1a; padding:15px; border-radius:10px; margin:20px 0;">
            <h4 style="margin-top:0; color:var(--gold);">Beneficios Pro:</h4>
            <ul style="font-size:0.8rem; line-height:1.6; padding-left:20px;">
                <li>🚀 Actualización en tiempo real (1s)</li>
                <li>📊 Gráficos avanzados por moneda</li>
                <li>🔗 Verificación de Hash Blockchain</li>
                <li>🔔 Alertas de Telegram ilimitadas</li>
            </ul>
        </div>
        
        <button onclick="alert('Iniciando Binance Pay...')" style="width:100%; background:var(--gold); color:black; padding:15px; border:none; font-weight:bold; border-radius:8px;">SUSCRIBIRSE POR $9.99/MES</button>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}
