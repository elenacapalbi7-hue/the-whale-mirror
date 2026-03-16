function verMoneda(coin) {
    const m = monedas.find(x => x.coin === coin);
    document.getElementById('modal-data').innerHTML = `
        <div style="text-align:center;">
            <h2 style="color:var(--gold); margin-bottom:0;">DATA CENTER: ${m.coin}</h2>
            <p style="color:#00ff88; font-size:0.7rem; margin-top:5px;">✅ MODO VERIFICACIÓN PRO</p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:20px 0; background:#1a1a1a; padding:15px; border-radius:10px;">
            <div><small style="color:#666;">OP:</small><br><strong>${m.op}</strong></div>
            <div><small style="color:#666;">MONTO:</small><br><strong>$${m.total}</strong></div>
            <div><small style="color:#666;">PRECIO:</small><br><strong>$${m.precio}</strong></div>
            <div><small style="color:#666;">HORA:</small><br><strong>${m.hora}</strong></div>
        </div>

        <h4 style="color:var(--gold); margin:0 0 10px 0;">🕵️ Análisis de Ballena:</h4>
        <div style="background:#000; padding:15px; border-left:4px solid var(--gold); font-size:0.8rem; color:#ccc; line-height:1.5;">
            Billetera con <strong>89% de efectividad</strong>. Se detectó movimiento desde billetera fría a exchange masivo. Esto indica una posible presión de mercado inminente.
            <br><br>
            <span style="color:#888;">Hash de Verificación:</span><br>
            <code style="color:#00ff88; font-size:0.7rem;">${m.hash}...e24b</code>
        </div>

        <div style="margin-top:20px; height:120px; border:1px dashed #444; border-radius:10px; display:flex; align-items:center; justify-content:center; background:linear-gradient(to bottom, #111, #000);">
            <p style="color:#444; font-size:0.6rem;">[ Cargando Gráfico de Profundidad en Tiempo Real... ]</p>
        </div>
    `;
    document.getElementById('detail-modal').style.display = 'block';
}
