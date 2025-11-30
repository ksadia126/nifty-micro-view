from flask import Flask, render_template, request, jsonify
import requests
import random
import time

app = Flask(__name__)

# Stock data cache for demo mode
STOCK_DATABASE = {
    'RELIANCE.NS': {'name': 'Reliance Industries Ltd', 'basePrice': 2450.00},
    'TCS.NS': {'name': 'Tata Consultancy Services Ltd', 'basePrice': 3650.00},
    'HDFCBANK.NS': {'name': 'HDFC Bank Ltd', 'basePrice': 1580.00},
    'INFY.NS': {'name': 'Infosys Ltd', 'basePrice': 1420.00},
    'WIPRO.NS': {'name': 'Wipro Ltd', 'basePrice': 385.00},
    'ICICIBANK.NS': {'name': 'ICICI Bank Ltd', 'basePrice': 1125.00},
    'SBIN.NS': {'name': 'State Bank of India', 'basePrice': 625.00},
    'BHARTIARTL.NS': {'name': 'Bharti Airtel Ltd', 'basePrice': 1520.00},
    'ITC.NS': {'name': 'ITC Ltd', 'basePrice': 465.00},
    'HINDUNILVR.NS': {'name': 'Hindustan Unilever Ltd', 'basePrice': 2380.00},
}

def generate_demo_stock_data(symbol):
    """Generate realistic demo stock data with random fluctuations"""
    if symbol in STOCK_DATABASE:
        stock_info = STOCK_DATABASE[symbol]
        base_price = stock_info['basePrice']
        
        # Generate random price change between -3% and +3%
        change_percent = random.uniform(-3.0, 3.0)
        change = base_price * (change_percent / 100)
        current_price = base_price + change
        previous_close = base_price
        
        return {
            'symbol': symbol,
            'name': stock_info['name'],
            'currentPrice': round(current_price, 2),
            'previousClose': round(previous_close, 2),
            'change': round(change, 2),
            'changePercent': round(change_percent, 2)
        }
    else:
        # Unknown symbol - return with N/A
        return {
            'symbol': symbol,
            'name': 'Unknown Stock',
            'currentPrice': 0,
            'previousClose': 0,
            'change': 0,
            'changePercent': 0
        }

app = Flask(__name__)

@app.route('/')
def index():
    """Serve the main application page"""
    return render_template('index.html')

@app.route('/api/stocks')
def get_stocks():
    """Proxy endpoint for stock data with Yahoo Finance fallback to demo mode"""
    symbols = request.args.get('symbols', '')
    
    if not symbols:
        return jsonify({'error': 'No symbols provided'}), 400
    
    symbol_list = [s.strip().upper() for s in symbols.split(',')]
    
    # Try Yahoo Finance API first
    try:
        yahoo_url = f'https://query1.finance.yahoo.com/v7/finance/quote?symbols={symbols}'
        response = requests.get(yahoo_url, timeout=5)
        
        # If successful and not rate limited, use Yahoo data
        if response.status_code == 200:
            data = response.json()
            
            if 'quoteResponse' in data and 'result' in data['quoteResponse']:
                stocks = []
                for stock in data['quoteResponse']['result']:
                    stocks.append({
                        'symbol': stock.get('symbol', ''),
                        'name': stock.get('shortName', stock.get('longName', 'N/A')),
                        'currentPrice': stock.get('regularMarketPrice', 0),
                        'previousClose': stock.get('regularMarketPreviousClose', 0),
                        'change': stock.get('regularMarketChange', 0),
                        'changePercent': stock.get('regularMarketChangePercent', 0)
                    })
                return jsonify({'stocks': stocks})
    
    except Exception as e:
        # Yahoo Finance failed, fall through to demo mode
        print(f"Yahoo Finance unavailable: {e}. Using demo mode.")
    
    # Fallback to demo mode with realistic data
    print(f"Using demo mode for symbols: {symbol_list}")
    stocks = []
    for symbol in symbol_list:
        stocks.append(generate_demo_stock_data(symbol))
    
    return jsonify({'stocks': stocks, 'demo_mode': True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
