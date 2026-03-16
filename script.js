// 1. Datos iniciales para que nunca esté vacía
let bufferBallenas = [
    { coin: 'BTC', tipo: 'COMPRAR', monto: '4.2M' },
    { coin: 'ETH', tipo: 'VENDER', monto: '1.8M' },
    { coin: 'SOL', tipo: 'COMPRAR', monto: '950K' }
];

let contadorGratis = 300; // 5 Minutos

// 2. Noticias con el diseño que te gusta
const noticias = [
    { id: 1, titulo: "Movimiento de $500M en Arbitrum", tiempo: "2 min", color: "#f39c12" },
    { id: 2, titulo: "Ballenas de SOL acumulan +12%", tiempo: "10 min", color: "#2ecc71" }
];

function renderNoticias() {
    const container = document.getElementById('news-bomb-container');
    if(!container) return;
    container.innerHTML = noticias.map(n => `
        <div class="news-card" style="border-left: 4px solid ${n.color}">
            <div class="news-header">
                <span class="tag-new">🔥 ALERTA</span>
                <span class="news-time">Hace ${n.tiempo}</span>
            </div>
            <h4>${n.titulo}</h4>
        </div>
    `).join('');
}

function renderTabla() {
    const body = document.getElementById('table-body');
    if(!body) return;
    body.innerHTML = bufferBallenas.map(b => `
        <tr>
            <td><strong style="color:#d4af37">🟡 ${b.coin}</strong></td>
            <td style="color:${b.tipo === 'COMPRAR' ? '#00ff88' : '#ff4444'}">${b.tipo}</td>
            <td>$${b.monto}</td>
        </tr>
    `).join('');
}

// 3. Temporizador de 5 minutos (300 seg)
setInterval(() => {
    contadorGratis--;
    
    if (contadorGratis <= 0) {
        // Aquí actualizaríamos con datos nuevos reales
        contadorGratis = 300; 
        renderTabla();
    }

    const min = Math.floor(contadorGratis / 60);
    const seg = (contadorGratis % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('update-timer');
    if(timerElem) timerElem.innerText = `${min}:${seg}`;
}, 1000);

// Carga inicial
window.onload = () => {
    renderNoticias();
    renderTabla();
};
