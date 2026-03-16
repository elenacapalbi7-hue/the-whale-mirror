// Cargar Gráfico Real de TradingView
new TradingView.widget({
  "width": "100%", "height": 300, "symbol": "BINANCE:BTCUSDT",
  "interval": "D", "timezone": "Etc/UTC", "theme": "dark", "style": "1",
  "locale": "es", "container_id": "tradingview_widget"
});

// Noticias Bomba actualizadas cada 5-10 min
const noticias = [
    { titulo: "Movimiento masivo de $500M detectado en cadena Arbitrum", tiempo: "Hace 2 min" },
    { titulo: "Ballenas de SOL incrementan posiciones un 12% en la última hora", tiempo: "Hace 10 min" }
];

// Temporizador de 5 minutos (300 segundos) para la versión GRATIS
let segundosRestantes = 300;

function actualizarUI() {
    // 1. Renderizar Noticias
    const newsContainer = document.getElementById('news-bomb-container');
    newsContainer.innerHTML = noticias.map(n => `
        <div class="news-card">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span class="tag-alerta">🔥 [ ALERTA ] NUEVO</span>
                <span style="font-size:0.7rem; color:#666;">${n.tiempo}</span>
            </div>
            <h4 style="margin:0; font-size:0.95rem;">${n.titulo}</h4>
        </div>
    `).join('');

    // 2. Renderizar Tabla (Muestra datos fijos hasta que el contador llegue a cero)
    const tableBody = document.getElementById('table-body');
    const datosCarga = [
        { coin: 'BTC', tipo: 'COMPRAR', monto: '4.2M' },
        { coin: 'ETH', tipo: 'VENDER', monto: '1.8M' },
        { coin: 'SOL', tipo: 'COMPRAR', monto: '950K' }
    ];
    tableBody.innerHTML = datosCarga.map(d => `
        <tr>
            <td><strong style="color:#d4af37">🟡 ${d.coin}</strong></td>
            <td style="color:${d.tipo === 'COMPRAR' ? '#00ff88' : '#ff4444'}">${d.tipo}</td>
            <td>$${d.monto}</td>
        </tr>
    `).join('');
}

// Reloj de actualización
setInterval(() => {
    segundosRestantes--;
    if (segundosRestantes < 0) segundosRestantes = 300;

    const min = Math.floor(segundosRestantes / 60);
    const seg = (segundosRestantes % 60).toString().padStart(2, '0');
    document.getElementById('update-timer').innerText = `${min}:${seg}`;
}, 1000);

// Ejecutar al iniciar
actualizarUI();
