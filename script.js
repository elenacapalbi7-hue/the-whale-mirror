class WhaleTracker {
    constructor() {
        this.isPro = false;
        this.assets = ['BTC', 'ETH', 'SOL', 'BNB', 'AVAX', 'LINK', 'UNI', 'AAVE', 'MATIC', 'DOGE'];
        this.newsItems = [
            "🐋 Ballena acumula 500 ETH en 2 horas",
            "🚀 SOL rompe resistencia - $150 próximo?",
            "⚠️ Grandes ventas de BTC detectadas",
            "💎 Ballena compra 2M $PEPE tokens",
            "📈 Volumen de LINK sube 300% en 24h"
        ];
        this.initElements();
        this.init();
    }

    initElements() {
        this.tableBody = document.getElementById('tableBody');
        this.connectBtn = document.getElementById('connectWallet');
        this.upgradeProBtn = document.getElementById('upgradePro');
        this.userStatus = document.getElementById('userStatus');
        this.newsFlash = document.getElementById('newsFlash');
        this.chartModal = document.getElementById('chartModal');
        this.proModal = document.getElementById('proModal');
        this.closeModalBtn = document.getElementById('closeModal');
        this.totalVolume = document.getElementById('totalVolume');
        this.activeWhales = document.getElementById('activeWhales');
        this.txnCount = document.getElementById('txnCount');
        this.transactions = [];
    }

    init() {
        this.simulateProStatus();
        this.generateInitialData();
        this.renderTable();
        this.bindEvents();
        this.startLiveUpdates();
        this.startNewsRotation();
        this.startStatsAnimation();
    }

    simulateProStatus() {
        // 30% chance de simular usuario Pro
        this.isPro = Math.random() > 0.7;
        this.updateUserStatus();
    }

    updateUserStatus() {
        if (this.isPro) {
            this.userStatus.textContent = 'PRO';
            this.userStatus.classList.add('pro');
            this.upgradeProBtn.classList.remove('hidden');
        }
    }

    bindEvents() {
        this.connectBtn.addEventListener('click', () => this.connectWallet());
        this.upgradeProBtn.addEventListener('click', () => this.showProModal());
        this.closeModalBtn.addEventListener('click', () => this.hideChartModal());
        this.chartModal.addEventListener('click', (e) => {
            if (e.target === this.chartModal) this.hideChartModal();
        });
        this.proModal.addEventListener('click', (e) => {
            if (e.target === this.proModal) this.hideProModal();
        });
    }

    generateTransaction() {
        const asset = this.assets[Math.floor(Math.random() * this.assets.length)];
        const isBuy = Math.random() > 0.4;
        const amount = (Math.random() * 2500000 + 75000).toLocaleString();
        const time = new Date(Date.now() - Math.random() * 7200000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        const fullAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random()*16).toString(16)).join('');
        const shortAddress = fullAddress.slice(0, 10) + '...' + fullAddress.slice(-4);

        return { asset, type: isBuy ? 'BUY' : 'SELL', amount, time, fullAddress, shortAddress };
    }

    generateInitialData() {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                this.transactions.unshift(this.generateTransaction());
                this.renderTable();
            }, i * 200);
        }
    }

    renderTable() {
        this.tableBody.innerHTML = '';
        this.transactions.slice(0, 15).forEach((tx, index) => {
            const row = document.createElement('tr');
            row.className = 'group transition-all duration-300 hover:bg-coal-light/50 cursor-pointer';
            row.innerHTML = `
                <td class="px-6 py-4 font-mono">
                    <div class="flex items-center space-x-3 cursor-pointer" onclick="${this.isPro ? `window.tracker.showChart('${tx.asset}')` : 'window.tracker.showProModal()'}">
                        <span class="w-3 h-3 bg-gradient-to-r from-gold to-yellow-400 rounded-full ${this.isPro ? 'animate-pulse' : ''}"></span>
                        <span class="font-bold text-lg hover:text-gold transition-colors">${tx.asset}</span>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span class="px-4 py-2 rounded-full text-xs font-bold ${
                        tx.type === 'BUY' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }">${tx.type}</span>
                </td>
                <td class="px-6 py-4 text-right font-mono font-bold text-2xl text-gold">$${tx.amount}</td>
                <td class="px-6 py-4 text-right text-sm text-gray-400 font-mono">${tx.time}</td>
                <td class="px-6 py-4 text-right">
                    <span class="text-sm font-mono text-gray-300 hover:text-white transition-colors">${tx.shortAddress}</span>
                </td>
                <td class="px-4 py-4 text-center">
                    ${this.isPro ? 
                        `<a href="https://etherscan.io/address/${tx.fullAddress}" target="_blank" class="text-gold hover:text-yellow-400 font-medium text-sm flex items-center justify-center space-x-1 group">
                            <span>Verificar</span>
                            <svg class="w-4 h-4 group-hover
