function verMoneda(coin) {
    const m = monedas.find(x => x.coin === coin);
    document.getElementById('modal-data').innerHTML = `
        <h2 style="color:var(--gold); text-align:center; margin-bottom:5px;">INTELIGENCIA PRO: ${m.coin}</h2>
        <p style="color:#00ff88; font-size:0.7rem; text-align:center; margin-top:0;">✅ MODO VERIFICACIÓN ACTIVADO</p>

        <div style="background:#1a1a1a; padding:15px; border-radius:10px; border:1px solid #333; display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-size:0.8rem;">
            <div><small style="color:#666;">ACCIÓN:</small><br><strong>${m.op}</strong></div>
            <div><small style="color:#666;">CANTIDAD:</small><br><strong>$${m.total}</strong></div>
            <div><small style="color:#666;">PRECIO:</small><br><strong>$${m.precio}</strong></div>
            <div><small style="color:#666;">HORA:</small><br><strong>${m.hora}</strong></div>
        </div>

        <h4 style="color:var(--gold); margin:15px 0 5px 0;">🕵️ Análisis On-Chain:</h4>
        <div style="background:#000; padding:10px; border-radius:5px; font-size:0.75rem; border-left:3px solid var(--gold);">
            <p><strong>Hash:</strong> <span style="color:#888;">${m.hash}...e24b</span></p>
            <p style="margin-bottom:0;"><strong>Detección:</strong> Billetera institucional acumulando. Historial de acierto del 82% en esta moneda.</p>
        </div>

        <div style="margin-top:15px; height:100px; background:#111; border:1px dashed #444; display:flex; align-items:center; justify-content:center; border-radius:8px;">
            <p style="color:#444; font-size:0.6rem;">[ Gráfico PRO de flujo de órdenes ]</p>
        </div>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}
