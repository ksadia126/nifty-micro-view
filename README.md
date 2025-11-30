# Nifty Micro-View 📈

A single-page responsive web application for Indian stock investors to monitor their watchlist in real-time with a beautiful glassmorphic UI.

## Features

- ✨ **Glassmorphic UI** - Modern frosted glass design with dark gradient background
- 📊 **Real-time Stock Data** - Fetches live data from Yahoo Finance API with demo mode fallback
- 🎯 **Smart Watchlist** - Add, remove, and monitor multiple NSE stocks
- 🔄 **Batch Refresh** - Update all stocks with a single API call
- 💡 **Stock Recommendations** - Pre-selected top Indian stocks to get started
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🚀 **No Database Required** - Stateless architecture for instant setup
- 🎭 **Demo Mode** - Automatic fallback to realistic demo data when API is unavailable

## Tech Stack

- **Backend**: Python 3.x + Flask
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: Yahoo Finance API
- **Port**: 8000

## Installation

1. **Clone or navigate to the project directory**

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   .\venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Start the Flask server**
   ```bash
   python app.py
   ```

2. **Open your browser and navigate to**
   ```
   http://localhost:8000
   ```

3. **Start monitoring stocks!**
   - Enter a stock symbol (e.g., `RELIANCE.NS`, `TCS.NS`, `HDFCBANK.NS`)
   - Click "Add Stock" or press Enter
   - Click on recommended stocks to add them instantly
   - Use "Refresh All" to update all stocks at once
   - Use "Clear All" to reset your watchlist

## Stock Symbol Format

Indian NSE stocks use the format: `SYMBOL.NS`

Examples:
- `RELIANCE.NS` - Reliance Industries
- `TCS.NS` - Tata Consultancy Services
- `HDFCBANK.NS` - HDFC Bank
- `INFY.NS` - Infosys
- `WIPRO.NS` - Wipro

## Features in Detail

### Color-Coded Changes
- 🟢 **Green** - Positive price change
- 🔴 **Red** - Negative price change
- ⚪ **Neutral** - No change

### Responsive Design
- Desktop: Full table view with all columns
- Tablet: Optimized layout
- Mobile: Stacked cards for easy viewing

### Error Handling
- Invalid symbols are caught and reported
- Network errors are handled gracefully
- Rate limiting is managed with user feedback

## Project Structure

```
nifty-micro-view/
├── app.py                 # Flask backend server
├── requirements.txt       # Python dependencies
├── static/
│   ├── style.css         # Glassmorphic styling
│   └── script.js         # Frontend logic
├── templates/
│   └── index.html        # Main HTML page
└── venv/                 # Virtual environment
```

## API Endpoints

### GET /
Serves the main application page

### GET /api/stocks?symbols=SYMBOL1,SYMBOL2
Fetches stock data for the given symbols

**Parameters:**
- `symbols` - Comma-separated list of stock symbols

**Response:**
```json
{
  "stocks": [
    {
      "symbol": "RELIANCE.NS",
      "name": "Reliance Industries",
      "currentPrice": 2450.50,
      "previousClose": 2430.00,
      "change": 20.50,
      "changePercent": 0.84
    }
  ]
}
```

## Notes

- The watchlist is stored in browser memory and resets on page refresh
- No data is persisted to disk or database
- **Demo Mode**: If Yahoo Finance API is unavailable or rate-limited, the app automatically switches to demo mode with realistic simulated data
- Demo mode includes 10 popular Indian stocks with random price fluctuations (-3% to +3%)
- The application is designed for development use on localhost

## Demo Mode

The application includes an intelligent fallback system:

1. **Primary**: Attempts to fetch real data from Yahoo Finance API
2. **Fallback**: If Yahoo Finance is unavailable (rate limiting, network issues), automatically switches to demo mode
3. **Demo Data**: Generates realistic stock prices with random fluctuations for 10 popular Indian stocks

**Supported Demo Stocks:**
- RELIANCE.NS - Reliance Industries Ltd
- TCS.NS - Tata Consultancy Services Ltd
- HDFCBANK.NS - HDFC Bank Ltd
- INFY.NS - Infosys Ltd
- WIPRO.NS - Wipro Ltd
- ICICIBANK.NS - ICICI Bank Ltd
- SBIN.NS - State Bank of India
- BHARTIARTL.NS - Bharti Airtel Ltd
- ITC.NS - ITC Ltd
- HINDUNILVR.NS - Hindustan Unilever Ltd

Demo mode provides a seamless experience for testing and development without API dependencies.

## Development

The application uses:
- Flask debug mode for hot reloading
- No build process required
- Pure vanilla JavaScript (no frameworks)
- CSS3 with backdrop-filter for glassmorphic effects
- Automatic API fallback for uninterrupted development

## Browser Compatibility

Works best on modern browsers that support:
- CSS backdrop-filter
- ES6+ JavaScript
- Fetch API

Recommended browsers:
- Chrome 76+
- Firefox 103+
- Safari 14+
- Edge 79+

## License

This project is open source and available for educational purposes.

## Troubleshooting

**Server won't start:**
- Ensure virtual environment is activated
- Check that port 8000 is not in use
- Verify Flask is installed: `pip list | grep Flask`

**Stocks not loading:**
- The app automatically uses demo mode if Yahoo Finance is unavailable
- Demo mode provides realistic simulated data for testing
- Supported demo stocks: RELIANCE.NS, TCS.NS, HDFCBANK.NS, INFY.NS, WIPRO.NS, ICICIBANK.NS, SBIN.NS, BHARTIARTL.NS, ITC.NS, HINDUNILVR.NS
- Verify stock symbol format (must end with .NS for NSE stocks)

**UI not displaying correctly:**
- Clear browser cache
- Ensure browser supports backdrop-filter CSS property
- Try a different modern browser

---

Built with ❤️ for Indian stock investors

## Technical Blog

Read the AWS Builder Center article about this project:
(https://builder.aws.com/content/36CmWShiteMUQq4AJFl9CCO84WN/nifty-micro-vew)

