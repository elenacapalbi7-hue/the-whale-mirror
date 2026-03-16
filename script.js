// Agregamos esta función al final de tu script.js actual

function verMoneda(coin) {
    const m = monedas.find(x => x.coin === coin);
    
    // HTML enriquecido para el modal PRO
    document.getElementById('modal-data').innerHTML = `
        <h2 style="color:var(--gold); margin-bottom:5px;">REPORT DE INTELIGENCIA: ${m.coin}</h2>
        <div style="background:#00ff8822; padding:10px; border-radius:5px; border:1px solid #00ff88; margin-bottom:15px; text-align:center;">
            <p style="color:#00ff88; font-size:0.8rem; margin:0; font-weight:bold;">✅ ACCESO PRO DESBLOQUEADO (MODO VERIFICACIÓN)</p>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; background:#111; padding:15px; border-radius:8px;">
            <div><small style="color:#666;">FLUJO:</small><br><span style="color:${m.op==='COMPRA'?'#00ff88':'#ff4444'}"><strong>${m.op} MASIVA</strong></span></div>
            <div><small style="color:#666;">CANTIDAD USD:</small><br><strong>$${m.total}</strong></div>
            <div><small style="color:#666;">PRECIO EJECUCIÓN:</small><br><strong>$${m.precio}</strong></div>
            <div><small style="color:#666;">HORA EXACTA:</small><br><strong>${m.hora} UTC</strong></div>
        </div>

        <h4 style="color:var(--gold); margin:15px 0 5px 0;">🕵️ Análisis de Billetera:</h4>
        <div style="font-size:0.85rem; line-height:1.4; color:#bbb; background:#1a1a1a; padding:10px; border-left:3px solid var(--gold);">
            Esta ballena ha mantenido un **85% de efectividad** en los últimos 30 días. Detectamos que esta compra se realizó mediante un **Smart Contract de acumulación gradual**, lo que indica que no planea vender en el corto plazo.
        </div>

        <h4 style="color:var(--gold); margin:15px 0 5px 0;">📈 Acción de Precio (15m):</h4>
        <div style="height:150px; background:#000; display:flex; align-items:center; justify-content:center; border:1px dashed #444; color:#444; font-size:0.7rem;">
             [ Gráfico detallado de entrada de volumen en tiempo real ]
        </div>

        <h4 style="color:var(--gold); margin:15px 0 5px 0;">🔗 Verificación On-Chain:</h4>
        <div style="background:#000; padding:10px; border-radius:5px; border:1px solid #222;">
            <p style="font-size:0.7rem; color:#888; margin-bottom:10px;">Puedes verificar esta transacción directamente en el explorador de bloques:</p>
            <a href="https://etherscan.io/" target="_blank" style="color:#00ff88; font-size:0.75rem; text-decoration:none;">Ver TX: ${m.hash}...e24b ↗️</a>
        </div>

        <div style="margin-top:20px; text-align:center; font-size:0.7rem; color:#444;">
            * Información actualizada segundo a segundo para miembros PRO.
        </div>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}

// NUEVA FUNCIÓN: Botón "Ver Todo el Mercado"
function verMasMonedas() {
    // Aquí simulamos lo que pasaría si no pagaron
    document.getElementById('modal-data').innerHTML = `
        <h2 style="color:var(--gold); text-align:center;">🚀 DESBLOQUEA EL MERCADO COMPLETO</h2>
        <p style="text-align:center; font-size:0.9rem;">Actualmente estás viendo el <strong>TOP 10</strong> con delay de 5 minutos.</p>
        
        <div style="background:#111; padding:15px; border-radius:10px; margin:20px 0;">
            <h4 style="margin-top:0;">Beneficios de Subscribirte:</h4>
            <ul style="font-size:0.85rem; color:#bbb; padding-left:20px;">
                <li>Acceso al 100% de las criptomonedas (más de 500 activos).</li>
                <li>Actualización <strong>SEGUNDO A SEGUNDO</strong> sin esperas.</li>
                <li>Alertas sonoras de movimientos críticos.</li>
                <li>Análisis detallado de cada billetera (Win-rate).</li>
            </ul>
        </div>

        <a href="#" onclick="alert('Iniciando pasarela de pago...'); return false;" style="display:block; background:var(--gold); color:black; text-align:center; padding:15px; text-decoration:none; font-weight:bold; border-radius:8px;">SUSCRIBIRSE AHORA - $9.99/mes</a>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}
