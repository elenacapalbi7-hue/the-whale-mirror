<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Whale Mirror - Intelligence Terminal</title>
    <style>
        /* DISEÑO INTEGRADO - TODO EN UNO */
        :root { 
            --gold: #d4af37; 
            --bg: #050505; 
            --card: #111; 
            --green: #00ff88; 
            --red: #ff4444; 
            --text-dim: #666;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }

        body { background-color: var(--bg) !important; color: #e0e0e0; padding: 10px; }

        .container { max-width: 500px; margin: auto; }

        /* Encabezado */
        .brand-header { background: var(--card); padding: 20px; border-radius: 15px; border: 1px solid #222; margin-bottom: 20px; text-align: center; }
        .brand-header h1 { color: var(--gold); letter-spacing: 3px; font-size: 1.5rem; margin-top: 10px; font-weight: bold; }
        .tagline { font-size: 0.6rem; color: var(--text-dim); text-transform: uppercase; }

        /* Caja 'Sobre nosotros' */
        .about-box { background: var(--card); padding: 15px; border-radius: 12px; border: 1px solid #333; margin-bottom: 20px; }
        .about-box h2 { color: var(--gold); font-size: 0.9rem; margin-bottom: 5px; }
        .about-box p { font-size: 0.75rem; color: #999; line-height: 1.4; }

        /* Gráfico */
        .chart-container { height: 250px; border-radius: 15px; overflow: hidden; border: 1px solid #333; margin-bottom: 20px; }

        /* Radar Header */
        .radar-header { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.7rem; color: var(--gold); font-weight: bold; }

        /* TABLA CON DESPLAZAMIENTO LATERAL */
        .table-wrapper { 
            width: 100%; 
            height: 450px; 
            overflow-x: auto; 
            background: #000; 
            border: 1px solid #222; 
            border-radius: 12px; 
        }

        table { width: 100%; border-collapse: collapse; min-width: 1000px; }

        th { background: #1a1a1a; color: var(--gold); font-size: 0.65rem; padding: 12px; text-align: left; position: sticky; top: 0; z-index: 10; border-bottom: 1px solid #333; }
        th small { color: var(--text-dim); font-weight: normal; font-size: 0.55rem; display: block; margin-top: 2px; }

        td { padding: 12px; border-bottom: 1px solid #111; font-size: 0.72rem; font-family: monospace; white-space: nowrap; }

        /* Botón de Suscripción */
        .btn-gold { width: 100%; padding: 15px; background: var(--gold); border: none; border-radius: 10px; font-weight: bold; cursor: pointer; color: black; margin-top: 20px; text-transform: uppercase; }

        /* Modal */
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 1000; }
        .modal-content { max-width: 400px; margin: 25% auto; padding: 25px; background: #0a0a0a; border: 1px solid var(--gold); border-radius: 15px; text-align: center; }
    </style>
</head>
<body>

<div class="container">
    <div class="brand-header">
        <img src="ballena.png" width="80" alt="EMC Logo" onerror="this.style.display='none'">
        <h1>WHALE MIRROR</h1>
        <p class="tagline">SISTEMA DE AUDITORÍA BLOCKCHAIN NIVEL 4</p>
    </div>

    <div class="about-box">
        <h2>¿Qué es Whale Mirror?</h2>
        <p>Terminal de inteligencia financiera que monitorea movimientos de ballenas en tiempo real mediante nodos RPC.</p>
    </div>

    <div class="chart-container">
        <iframe src="https://s.tradingview.com/widgetembed/?symbol=BINANCE:BTCUSDT&interval=D&theme=dark" width="100%" height="250" frameborder="0"></iframe>
    </div>

    <div class="radar-header">
        <span>📡 RADAR LIVE (10 COLUMNAS PRO)</span>
        <span>05:00</span>
    </div>

    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Activo<br><small>Moneda/Par</small></th>
                    <th>Estado<br><small>Acción Live</small></th>
                    <th>Flujo USD<br><small>Monto total</small></th>
                    <th>Wallet<br><small>ID Billetera</small></th>
                    <th>Red<br><small>Blockchain</small></th>
                    <th>Impacto<br><small>Volatilidad</small></th>
                    <th>Tipo<br><small>Origen</small></th>
                    <th>Liquidez<br><small>Respaldo</small></th>
                    <th>Seguridad<br><small>Contrato</small></th>
                    <th>Análisis<br><small>Ver detalles</small></th>
                </tr>
            </thead>
            <tbody id="table-body">
                </tbody>
        </table>
    </div>

    <button class="btn-gold" onclick="openSubscription()">ACCESO TOTAL (SUSCRIBIRSE)</button>
</div>

<div id="modal" class="modal">
    <div class="modal-content">
        <h2 style="color:var(--gold);">WHALE MIRROR PRO</h2>
        <p style="margin:15px 0; font-size:0.8rem; color:#ccc;">Suscríbete para acceder a la terminal completa.</p>
        <button class="btn-gold" onclick="closeModal()">CERRAR</button>
    </div>
</div>

<script>
    const coins = ['BTC', 'ETH', 'SOL', 'PEPE', 'WIF', 'BONK', 'BNB', 'XRP', 'ADA', 'AVAX'];
    const networks = ['Ethereum', 'Solana', 'BSC', 'Arbitrum', 'Polygon'];
    const whaleTypes = ['Institutional', 'Exchange Out', 'Private Wallet', 'OTC Desk'];

    function renderTable() {
        const tbody = document.getElementById('table-body');
        if(!tbody) return;
        
        tbody.innerHTML = coins.map(s => {
            const isBuy = Math.random() > 0.4;
            const impact = (Math.random() * 5).toFixed(2);
            
            return `
                <tr>
                    <td style="color:var(--gold); font-weight:bold;">${s}/USDT</td>
                    <td style="color:${isBuy ? 'var(--green)' : 'var(--red)'}">${isBuy ? 'COMPRA' : 'VENTA'}</td>
                    <td>$${(Math.random() * 500000 + 50000).toLocaleString()}</td>
                    <td style="color:#555;">0x${Math.random().toString(16).slice(2,8)}...</td>
                    <td>${networks[Math.floor(Math.random() * networks.length)]}</td>
                    <td style="color:var(--green)">+${impact}%</td>
                    <td>${whaleTypes[Math.floor(Math.random() * whaleTypes.length)]}</td>
                    <td>ALTA</td>
                    <td style="color:var(--green)">SEGURO ✅</td>
                    <td><button onclick="openSubscription()" style="background:var(--gold); border:none; padding:5px 8px; border-radius:4px; font-size:0.6rem; cursor:pointer; font-weight:bold;">DETALLES</button></td>
                </tr>`;
        }).join('');
    }

    function openSubscription() { document.getElementById('modal').style.display = 'block'; }
    function closeModal() { document.getElementById('modal').style.display = 'none'; }

    renderTable();
    setInterval(renderTable, 3000);
</script>

</body>
</html>
