class WhaleTracker {
    constructor() {
        this.assets = ['BTC', 'ETH', 'SOL', 'BNB', 'AVAX', 'LINK', 'UNI', 'AAVE', 'MATIC', 'DOGE', 'SHIB', 'PEPE'];
        this.tableBody = document.getElementById('tableBody');
        this.connectBtn = document.getElementById('connectWallet');
        this.transactions = [];
        this.init();
    }

    init() {
        this.generateInitialData(15); // Más datos iniciales
        this.renderTable();
        this.bindEvents();
        this.startLiveUpdates();
        this.addTableScrollIndicator();
    }

    bindEvents() {
        this.connectBtn.addEventListener('click', () => {
            this.connectWallet();
        });
    }

    generateInitialData(count = 15) {
        for (let i = 0; i < count; i++) {
            const delay = Math.random() * 2000;
            setTimeout(() => {
                this.transactions.push(this.generateTransaction());
                this.renderTable();
            }, i * 150);
        }
    }

    generateTransaction() {
        const asset = this.assets[Math.floor(Math.random() * this.assets.length)];
        const isBuy = Math.random() > 0.45; // Más compras para efecto positivo
        const baseAmount = Math.random() * 3000000 + 50000;
        const amount = (isBuy ? baseAmount * 1.2 : baseAmount).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        const now = new Date();
        const timeAgo = Math.random() * 3600000; // Hasta 1 hora atrás
        const time = new Date(now - timeAgo).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        const address = `0x${this.randomHex(8)}...${this.randomHex(4)}`;

        return { 
            asset, 
            type: isBuy ? 'BUY' : 'SELL', 
            amount, 
            time, 
            address 
        };
    }

    randomHex(length) {
        return Array.from({length}, () => 
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
    }

    startLiveUpdates() {
        setInterval(() => {
            // Nueva transacción cada 4-6 segundos
            this.transactions.unshift(this.generateTransaction());
            
            // Mantener máximo 20 transacciones visibles
            if (this.transactions.length > 20) {
                this.transactions.pop();
            }
            
            this.renderTable();
        }, Math.random() * 2000 + 4000);
    }

    addTableScrollIndicator() {
        const container = document.querySelector('.table-container');
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-gold-dark opacity-0 transition-opacity duration-300';
        indicator.style.zIndex = '10';
        container.parentNode.style.position = 'relative';
       
