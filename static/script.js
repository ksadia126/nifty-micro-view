// Watchlist state management
let watchlist = [];

// Get stock count
function getStockCount() {
    return watchlist.length;
}

// Add stock to watchlist
function addStock(symbol, stockData = null) {
    // Normalize symbol to uppercase
    symbol = symbol.trim().toUpperCase();
    
    // Check if already exists
    if (watchlist.some(stock => stock.symbol === symbol)) {
        return { success: false, message: 'Stock already in watchlist' };
    }
    
    // Add to watchlist
    if (stockData) {
        watchlist.push(stockData);
    } else {
        watchlist.push({ symbol, name: 'Loading...', currentPrice: 0, previousClose: 0, change: 0, changePercent: 0 });
    }
    
    return { success: true, message: 'Stock added successfully' };
}

// Remove stock from watchlist
function removeStock(symbol) {
    watchlist = watchlist.filter(stock => stock.symbol !== symbol);
    updateStockCount();
    renderWatchlist();
}

// Clear all stocks
function clearAll() {
    watchlist = [];
    updateStockCount();
    renderWatchlist();
}

// Update stock count display
function updateStockCount() {
    document.getElementById('stockCount').textContent = getStockCount();
}

// Validate stock symbol input
function validateInput(input) {
    // Check if empty or only whitespace
    if (!input || input.trim() === '') {
        return { valid: false, message: 'Please enter a stock symbol' };
    }
    
    // Check if valid format (alphanumeric and dot)
    const validFormat = /^[A-Z0-9.]+$/i.test(input.trim());
    if (!validFormat) {
        return { valid: false, message: 'Invalid symbol format. Use alphanumeric characters and dots only.' };
    }
    
    return { valid: true };
}

// Show notification
function showNotification(message, type = 'error') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Handle add stock button click
function handleAddStock() {
    const input = document.getElementById('stockInput');
    const symbol = input.value;
    
    // Validate input
    const validation = validateInput(symbol);
    if (!validation.valid) {
        if (symbol.trim() !== '') {
            showNotification(validation.message, 'error');
        }
        return;
    }
    
    // Add to watchlist
    const result = addStock(symbol);
    
    if (!result.success) {
        showNotification(result.message, 'error');
        return;
    }
    
    // Clear input field
    input.value = '';
    
    // Update UI
    updateStockCount();
    renderWatchlist();
    
    // Fetch stock data
    fetchStockData(symbol.trim().toUpperCase());
}

// Fetch stock data from API
async function fetchStockData(symbol) {
    try {
        const response = await fetch(`/api/stocks?symbols=${symbol}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch stock data');
        }
        
        if (data.stocks && data.stocks.length > 0) {
            // Update watchlist with fetched data
            const stockData = data.stocks[0];
            const index = watchlist.findIndex(s => s.symbol === symbol);
            if (index !== -1) {
                watchlist[index] = stockData;
                renderWatchlist();
            }
        } else {
            showNotification(`No data found for ${symbol}`, 'error');
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        showNotification(error.message, 'error');
    }
}

// Fetch multiple stocks
async function fetchStocks(symbols) {
    if (symbols.length === 0) return;
    
    const symbolString = symbols.join(',');
    
    try {
        const response = await fetch(`/api/stocks?symbols=${symbolString}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch stock data');
        }
        
        if (data.stocks && data.stocks.length > 0) {
            // Update watchlist with fetched data
            data.stocks.forEach(stockData => {
                const index = watchlist.findIndex(s => s.symbol === stockData.symbol);
                if (index !== -1) {
                    watchlist[index] = stockData;
                }
            });
            renderWatchlist();
        }
    } catch (error) {
        console.error('Error fetching stocks:', error);
        showNotification(error.message, 'error');
    }
}

// Render watchlist table
function renderWatchlist() {
    const emptyState = document.getElementById('emptyState');
    const table = document.getElementById('watchlistTable');
    const tbody = document.getElementById('watchlistBody');
    
    // Show empty state if no stocks
    if (watchlist.length === 0) {
        emptyState.style.display = 'block';
        table.style.display = 'none';
        return;
    }
    
    // Hide empty state and show table
    emptyState.style.display = 'none';
    table.style.display = 'table';
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Render each stock
    watchlist.forEach(stock => {
        const row = document.createElement('tr');
        
        // Determine color class based on change
        let changeClass = 'price-neutral';
        if (stock.change > 0) {
            changeClass = 'price-positive';
        } else if (stock.change < 0) {
            changeClass = 'price-negative';
        }
        
        // Format numbers
        const price = stock.currentPrice ? stock.currentPrice.toFixed(2) : '0.00';
        const prevClose = stock.previousClose ? stock.previousClose.toFixed(2) : '0.00';
        const change = stock.change ? stock.change.toFixed(2) : '0.00';
        const changePercent = stock.changePercent ? stock.changePercent.toFixed(2) : '0.00';
        
        // Add sign to change values
        const changeDisplay = stock.change >= 0 ? `+${change}` : change;
        const changePercentDisplay = stock.changePercent >= 0 ? `+${changePercent}%` : `${changePercent}%`;
        
        row.innerHTML = `
            <td class="stock-symbol">${stock.symbol}</td>
            <td class="stock-name">${stock.name}</td>
            <td>₹${price}</td>
            <td>₹${prevClose}</td>
            <td class="${changeClass}">${changeDisplay}</td>
            <td class="${changeClass}">${changePercentDisplay}</td>
            <td><button class="btn btn-remove" onclick="removeStock('${stock.symbol}')">Remove</button></td>
        `;
        
        tbody.appendChild(row);
    });
}

// Refresh all stocks
async function refreshAll() {
    if (watchlist.length === 0) {
        showNotification('No stocks to refresh', 'error');
        return;
    }
    
    // Show loading state
    const refreshBtn = document.getElementById('refreshAllBtn');
    const btnText = refreshBtn.querySelector('.btn-text');
    const spinner = refreshBtn.querySelector('.spinner');
    
    btnText.style.display = 'none';
    spinner.style.display = 'inline-block';
    refreshBtn.disabled = true;
    
    try {
        // Get all symbols
        const symbols = watchlist.map(stock => stock.symbol);
        
        // Fetch all stocks in one API call
        await fetchStocks(symbols);
        
        showNotification('Watchlist refreshed successfully', 'success');
    } catch (error) {
        console.error('Error refreshing watchlist:', error);
        showNotification('Failed to refresh watchlist', 'error');
    } finally {
        // Hide loading state
        btnText.style.display = 'inline';
        spinner.style.display = 'none';
        refreshBtn.disabled = false;
    }
}

// Debounce function to prevent spam
let refreshTimeout;
function debounceRefresh() {
    if (refreshTimeout) {
        clearTimeout(refreshTimeout);
    }
    refreshTimeout = setTimeout(refreshAll, 300);
}

// Handle clear all with confirmation
function handleClearAll() {
    if (watchlist.length === 0) {
        showNotification('Watchlist is already empty', 'error');
        return;
    }
    
    if (confirm('Are you sure you want to clear all stocks from the watchlist?')) {
        clearAll();
        showNotification('Watchlist cleared', 'success');
    }
}

// Handle recommendation card click
function handleRecommendationClick(event) {
    const card = event.currentTarget;
    const symbol = card.getAttribute('data-symbol');
    
    if (symbol) {
        const result = addStock(symbol);
        
        if (result.success) {
            updateStockCount();
            renderWatchlist();
            fetchStockData(symbol);
            showNotification(`${symbol} added to watchlist`, 'success');
        } else {
            showNotification(result.message, 'error');
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const stockInput = document.getElementById('stockInput');
    const addStockBtn = document.getElementById('addStockBtn');
    const refreshAllBtn = document.getElementById('refreshAllBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    
    // Add stock button click
    addStockBtn.addEventListener('click', handleAddStock);
    
    // Enter key in input field
    stockInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleAddStock();
        }
    });
    
    // Refresh all button click
    refreshAllBtn.addEventListener('click', debounceRefresh);
    
    // Clear all button click
    clearAllBtn.addEventListener('click', handleClearAll);
    
    // Recommendation cards click
    recommendationCards.forEach(card => {
        card.addEventListener('click', handleRecommendationClick);
    });
    
    // Initialize UI
    updateStockCount();
    renderWatchlist();
});
