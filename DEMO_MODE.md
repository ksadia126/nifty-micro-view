# Demo Mode Documentation

## Overview

Nifty Micro-View includes an intelligent fallback system that automatically switches to demo mode when the Yahoo Finance API is unavailable due to rate limiting or network issues.

## How It Works

1. **Primary Mode**: The application first attempts to fetch real-time data from Yahoo Finance API
2. **Automatic Fallback**: If the API returns an error (429 rate limit, timeout, etc.), the system automatically switches to demo mode
3. **Seamless Experience**: Users experience no interruption - the UI continues to work with realistic simulated data

## Demo Mode Features

### Realistic Data Generation
- Each stock has a base price derived from actual market values
- Prices fluctuate randomly between -3% and +3% on each request
- Change values and percentages are calculated accurately
- Color coding (green/red) works correctly based on positive/negative changes

### Supported Stocks

The demo mode includes 10 popular Indian stocks:

| Symbol | Company Name | Base Price |
|--------|-------------|------------|
| RELIANCE.NS | Reliance Industries Ltd | ₹2,450.00 |
| TCS.NS | Tata Consultancy Services Ltd | ₹3,650.00 |
| HDFCBANK.NS | HDFC Bank Ltd | ₹1,580.00 |
| INFY.NS | Infosys Ltd | ₹1,420.00 |
| WIPRO.NS | Wipro Ltd | ₹385.00 |
| ICICIBANK.NS | ICICI Bank Ltd | ₹1,125.00 |
| SBIN.NS | State Bank of India | ₹625.00 |
| BHARTIARTL.NS | Bharti Airtel Ltd | ₹1,520.00 |
| ITC.NS | ITC Ltd | ₹465.00 |
| HINDUNILVR.NS | Hindustan Unilever Ltd | ₹2,380.00 |

### Unknown Symbols
If a user enters a symbol not in the demo database, the system returns:
- Symbol: As entered
- Name: "Unknown Stock"
- All price values: 0
- This allows the UI to handle gracefully without errors

## API Response Format

Demo mode maintains the same API contract as the real API:

```json
{
  "demo_mode": true,
  "stocks": [
    {
      "symbol": "RELIANCE.NS",
      "name": "Reliance Industries Ltd",
      "currentPrice": 2477.33,
      "previousClose": 2450.00,
      "change": 27.33,
      "changePercent": 1.12
    }
  ]
}
```

The only difference is the addition of `"demo_mode": true` flag, which the frontend can optionally use to display a demo indicator.

## Benefits

1. **No API Dependencies**: Develop and test without worrying about API rate limits
2. **Consistent Testing**: Reliable data for UI testing and development
3. **Offline Development**: Work without internet connection
4. **Instant Setup**: No API keys or configuration required
5. **Realistic Behavior**: Simulated price changes make the UI feel alive

## Implementation Details

### Backend (app.py)
```python
# Try Yahoo Finance first
try:
    response = requests.get(yahoo_url, timeout=5)
    if response.status_code == 200:
        # Use real data
        return jsonify({'stocks': stocks})
except Exception:
    # Fall through to demo mode
    pass

# Generate demo data
stocks = [generate_demo_stock_data(symbol) for symbol in symbol_list]
return jsonify({'stocks': stocks, 'demo_mode': True})
```

### Data Generation
- Base prices are realistic market values (as of implementation)
- Random fluctuations use Python's `random.uniform(-3.0, 3.0)`
- Each request generates new random values (simulating market movement)
- Calculations maintain mathematical accuracy (change = current - previous)

## Future Enhancements

Potential improvements for demo mode:

1. **Time-based Patterns**: Simulate market hours and after-hours trading
2. **Trend Simulation**: Add upward/downward trends over time
3. **Volume Data**: Include trading volume in demo data
4. **More Stocks**: Expand the demo database to 50+ stocks
5. **Configurable Volatility**: Allow users to adjust price fluctuation range
6. **Historical Data**: Generate simulated historical price charts

## Testing Demo Mode

To test demo mode explicitly:

1. Start the server: `python app.py`
2. Make API requests: `curl "http://localhost:8000/api/stocks?symbols=RELIANCE.NS"`
3. Observe the `demo_mode: true` flag in responses
4. Check server logs for "Using demo mode" messages

## Production Considerations

For production deployment:

- Consider using a paid stock data API with higher rate limits
- Implement caching to reduce API calls
- Add user notifications when in demo mode
- Log demo mode usage for monitoring
- Consider removing demo mode or making it opt-in

---

Demo mode ensures Nifty Micro-View is always functional, providing a smooth development and testing experience regardless of external API availability.
