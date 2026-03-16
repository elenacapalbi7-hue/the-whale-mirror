class WhaleTracker {
    constructor() {
        this.assets = ['BTC', 'ETH', 'SOL', 'BNB', 'AVAX', 'LINK', 'UNI', 'AAVE', 'MATIC', 'DOGE'];
        this.tableBody = document.getElementById('tableBody');
        this.connectBtn = document.getElementById('connectWallet');
        this.transactions = [];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.generateInitialData();
        this.startLiveUpdates();
    }

    bindEvents() {
        this.connectBtn.addEventListener('click', () => {
            this.connectWallet();
        });
    }

    generateInitialData() {
        for (let i = 0; i < 10; i++) {
            this.transactions.push(this.generateTransaction());
        }
        this.renderTable();
    }

    generateTransaction() {
        const asset = this.assets[Math.floor(Math.random() * this.assets.length)];
        const isBuy = Math.random() > 0.5;
        const amount = (Math.random() * 5000000 + 100000).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        const time = new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        const address = '0x' + Array.from({length: 8}, () => 
            Math.floor(Math.random() * 16).toString(16)
        ).join('') + '...' + Array.from({length: 4}, () => 
            Math.floor(Math.random() * 16).toString(16)
        ).join('');

        return { asset, type: isBuy ? 'BUY' : 'SELL', amount, time, address };
    }

    startLiveUpdates() {
        setInterval(() => {
            // Add new transaction
            this.transactions.unshift(this.generateTransaction());
            
            // Remove old transaction if too many
            if (this.transactions.length > 20) {
                this.transactions.pop();
            }
            
            this.renderTable();
        }, 5000);

        // Pulse effect on connect button
        setInterval(() => {
            this.connectBtn.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.connectBtn.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    renderTable() {
        this.tableBody.innerHTML = '';
        
        this.transactions.forEach((tx, index) => {
            const row = document.createElement('tr');
            row.className = 'group transition-all duration-300 hover:bg-coal-light/50';
            row.style.animationDelay = `${index * 0.1}s`;
            
            row.innerHTML = `
                <td class="px-6 py-4 font-mono font-semibold text-lg">
                    <div class="flex items-center space-x-3">
                        <span class="w-3 h-3 bg-gradient-to-r from-gold to-yellow-400 rounded-full animate-pulse"></span>
                        <span class="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">${tx.asset}</span>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span class="px-4 py-1 rounded-full text-xs font-bold ${
                        tx.type === 'BUY' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }">
                        ${tx.type}
                    </span>
                </td>
                <td class="px-6 py-4 text-right font-mono font-bold text-2xl text-gold">
                    $${tx.amount}
                </td>
                <td class="px-6 py-4 text-right text-sm text-gray-400 font-mono">
                    ${tx.time}
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="text-gold hover:text-yellow-400 text-sm font-medium transition-colors flex items-center justify-end space-x-1 group-hover:translate-x-1 transition-transform">
                        <span>${tx.address}</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </td>
            `;
            
            this.tableBody.appendChild(row);
        });
    }

    connectWallet() {
        // Simulate wallet connection
        const originalText = this.connectBtn.textContent;
        this.connectBtn.textContent = 'Connecting...';
        this.connectBtn.disabled = true;
        
        setTimeout(() => {
            this.connectBtn.textContent = 'Connected ✅';
            this.connectBtn.classList.remove('from-gold', 'to-gold-dark');
            this.connectBtn.classList.add('bg-green-500/20', 'border', 'border-green-400/50', 'text-green-400');
            
            setTimeout(() => {
                this.connectBtn.textContent = originalText;
                this.connectBtn.disabled = false;
                this.connectBtn.classList.remove('bg-green-500/20', 'border', 'border-green-400/50', 'text-green-400');
                this.connectBtn.classList.add('from-gold', 'to-gold-dark');
            }, 2000);
        }, 1500);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WhaleTracker();
});
