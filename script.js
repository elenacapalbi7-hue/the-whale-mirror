// 1. CONFIGURACIÓN DEL DELAY (5 MINUTOS)
let contadorGratis = 300; 

// 2. NOTICIAS "BOMBA"
const noticiasBomba = [
    { id: 1, titulo: "Movimiento masivo de $500M detectado en Arbitrum", tiempo: "Hace 2 min", desc: "Transferencia institucional hacia exchange detectada. Posible presión de venta o liquidez para futuros." },
    { id: 2, titulo: "Ballenas de SOL incrementan posiciones un 12%", tiempo: "Hace 10 min", desc: "Acumulación agresiva en niveles de soporte clave. Las billeteras TOP 10 han aumentado su balance hoy." }
];

function mostrarNoticiasBomba() {
    const container = document.getElementById('news-bomb-container');
    container.innerHTML = noticiasBomba.map(n => `
        <div class="news-card" onclick="abrirNoticia(${n.id})">
            <div class="news-header">
                <span class="tag-new">🔥 [ ALERTA ] NUEVO</span>
                <span class="news-time">${n.tiempo}</span>
            </div>
            <h4>${n.titulo}</h4>
            <span class="btn-details">VER DETALLES ></span>
        </div>
    `).join('');
}

// 3. ACTUALIZACIÓN DE TABLA CADA 5 MINUTOS
setInterval(() => {
    generarDatos(); // Sigue generando ballenas en el buffer interno
    if (contadorGratis <= 0) {
        renderizarTabla(); 
        contadorGratis = 300;
    } else {
        contadorGratis--;
    }
    // Formato MM:SS para el temporizador
    const min = Math.floor(contadorGratis / 60);
    const seg = (contadorGratis % 60).toString().padStart(2, '0');
    document.getElementById('update-timer').innerText = `${min}:${seg}`;
}, 1000);

// Función para ver la noticia completa
function abrirNoticia(id) {
    const n = noticiasBomba.find(item => item.id === id);
    const modal = document.getElementById('modal-detalle');
    document.getElementById('modal-full-content').innerHTML = `
        <h2 style="color:var(--gold)">${n.titulo}</h2>
        <p style="margin:20px 0;">${n.desc}</p>
        <div style="background:#000; padding:15px; border:1px dashed #444; text-align:center;">
            <p>🔒 <strong>DATOS TÉCNICOS BLOQUEADOS</strong></p>
            <p style="font-size:0.8rem;">Suscríbete para ver billeteras de origen y análisis de impacto.</p>
        </div>
        <a href="https://s.binance.com/CG8zHTCm" class="btn-pay-pro">DESBLOQUEAR TODO ($9.99)</a>
    `;
    modal.style.display = 'block';
}

// Ejecutar al cargar
mostrarNoticiasBomba();
