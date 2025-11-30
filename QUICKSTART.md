# Quick Start Guide

Get Nifty Micro-View running in 3 simple steps!

## Step 1: Install Dependencies

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install packages
pip install -r requirements.txt
```

## Step 2: Start the Server

```bash
python app.py
```

You should see:
```
* Running on http://127.0.0.1:8000
```

## Step 3: Open in Browser

Navigate to: **http://localhost:8000**

## Try It Out!

### Add Your First Stock
1. Type `RELIANCE.NS` in the input field
2. Click "Add Stock" or press Enter
3. Watch the stock appear in your watchlist with live data!

### Try Recommendations
Click on any of the three recommended stocks to instantly add them to your watchlist.

### Refresh Data
Click "Refresh All" to update all stocks with the latest prices.

### Clear Watchlist
Click "Clear All" to remove all stocks and start fresh.

## Demo Mode

The app automatically uses demo mode with realistic simulated data if Yahoo Finance API is unavailable. You'll see realistic price changes and the full UI experience!

**Supported Demo Stocks:**
- RELIANCE.NS
- TCS.NS
- HDFCBANK.NS
- INFY.NS
- WIPRO.NS
- ICICIBANK.NS
- SBIN.NS
- BHARTIARTL.NS
- ITC.NS
- HINDUNILVR.NS

## Features to Explore

✅ **Color Coding**: Green for gains, red for losses
✅ **Responsive Design**: Try resizing your browser or open on mobile
✅ **Glassmorphic UI**: Beautiful frosted glass effects
✅ **Real-time Updates**: Click refresh to see price changes
✅ **Duplicate Prevention**: Try adding the same stock twice
✅ **Input Validation**: Try adding empty or invalid symbols

## Troubleshooting

**Port 8000 already in use?**
```bash
# Change the port in app.py (last line):
app.run(host='0.0.0.0', port=8001, debug=True)
```

**Virtual environment not activating?**
```bash
# Make sure you're in the project directory
cd "Nifty micro-view"

# Try the full path
C:\Users\YourName\Desktop\Nifty micro-view\venv\Scripts\activate
```

**Packages not installing?**
```bash
# Upgrade pip first
python -m pip install --upgrade pip

# Then install requirements
pip install -r requirements.txt
```

## Next Steps

- Read [README.md](README.md) for full documentation
- Check [DEMO_MODE.md](DEMO_MODE.md) to understand the demo system
- Explore the code in `app.py`, `static/script.js`, and `templates/index.html`
- Customize the recommended stocks or add more to the demo database

## Need Help?

Check the main README.md for:
- Detailed feature documentation
- API endpoint specifications
- Browser compatibility information
- Complete troubleshooting guide

---

Happy stock monitoring! 📈
