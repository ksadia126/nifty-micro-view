# Design Document

## Overview

Nifty Micro-View is a lightweight, single-page web application built with Flask that provides real-time stock monitoring for Indian NSE stocks. The application uses a stateless architecture with no database, relying entirely on Yahoo Finance API for data aggregation. The frontend features a modern glassmorphic design with responsive layouts for all device sizes.

## Architecture

### System Architecture

The application follows a simple client-server architecture:

```
┌─────────────────┐
│   Web Browser   │
│  (HTML/CSS/JS)  │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│  Flask Server   │
│   (Port 8000)   │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│ Yahoo Finance   │
│      API        │
└─────────────────┘
```

### Technology Stack

- **Backend**: Python 3.x with Flask framework
- **Frontend**: HTML5, CSS3 (with glassmorphism effects), Vanilla JavaScript
- **API**: Yahoo Finance API (query1.finance.yahoo.com)
- **Environment**: Python virtual environment (venv)
- **Port**: 8000

### Key Design Decisions

1. **Stateless Architecture**: No database or session storage - watchlist exists only in browser memory
2. **Single-Page Application**: All interactions happen without page reloads
3. **API Aggregation**: Batch API calls to fetch multiple stocks in one request
4. **Client-Side State Management**: Watchlist stored in JavaScript array, lost on page refresh

## Components and Interfaces

### Backend Components

#### 1. Flask Application (`app.py`)
- Main application entry point
- Serves static HTML/CSS/JS files
- Provides API endpoints for stock data

#### 2. API Proxy Endpoint (`/api/stocks`)
- **Method**: GET
- **Parameters**: `symbols` (comma-separated list of stock symbols)
- **Response**: JSON array of stock data
- **Purpose**: Proxies requests to Yahoo Finance API to avoid CORS issues

#### 3. Static File Server
- Serves `index.html`, `style.css`, `script.js`
- Handles favicon and other static assets

### Frontend Components

#### 1. Stock Input Component
- Text input field for stock symbols
- Add Stock button
- Enter key handler for quick addition

#### 2. Watchlist Display Component
- Dynamic table showing stock data
- Columns: Symbol, Name, Current Price, Previous Close, Change, % Change
- Color-coded change indicators (green/red)
- Stock count display

#### 3. Action Buttons Component
- Refresh All button
- Clear All button
- Loading state indicators

#### 4. Recommendations Component
- Static display of 3 recommended stocks
- Clickable cards that add stocks to watchlist
- Brief rationale for each recommendation

### API Interface

#### Yahoo Finance API Endpoint
```
GET https://query1.finance.yahoo.com/v7/finance/quote?symbols=SYMBOL1.NS,SYMBOL2.NS
```

**Response Structure**:
```json
{
  "quoteResponse": {
    "result": [
      {
        "symbol": "RELIANCE.NS",
        "shortName": "Reliance Industries",
        "regularMarketPrice": 2450.50,
        "regularMarketPreviousClose": 2430.00,
        "regularMarketChange": 20.50,
        "regularMarketChangePercent": 0.84
      }
    ]
  }
}
```

## Data Models

### Stock Data Model (Frontend JavaScript)

```javascript
{
  symbol: string,           // e.g., "RELIANCE.NS"
  name: string,             // e.g., "Reliance Industries"
  currentPrice: number,     // Current market price
  previousClose: number,    // Previous day's closing price
  change: number,           // Price change (current - previous)
  changePercent: number,    // Percentage change
  lastUpdated: timestamp    // When data was last fetched
}
```

### Watchlist Model (Frontend JavaScript)

```javascript
{
  stocks: Array<StockData>, // Array of stock objects
  count: number             // Number of stocks in watchlist
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Watchlist uniqueness
*For any* watchlist state and any stock symbol, attempting to add a duplicate symbol should not increase the watchlist count and should maintain the existing stock data unchanged.
**Validates: Requirements 1.5**

### Property 2: Empty input rejection
*For any* input string composed entirely of whitespace or empty characters, attempting to add it to the watchlist should be rejected and the watchlist should remain unchanged.
**Validates: Requirements 1.2**

### Property 3: Color coding consistency
*For any* stock with a positive price change, the displayed change value should be styled with green color; for any stock with negative change, it should be styled with red color.
**Validates: Requirements 2.2, 2.3**

### Property 4: Batch API efficiency
*For any* watchlist containing N stocks (where N > 0), clicking Refresh All should result in exactly one API call containing all N symbols as comma-separated parameters.
**Validates: Requirements 3.1**

### Property 5: Clear all completeness
*For any* watchlist state with N stocks (where N > 0), clicking Clear All should result in a watchlist with exactly 0 stocks and an empty table display.
**Validates: Requirements 4.1, 4.2**

### Property 6: Input field clearing
*For any* valid stock symbol that is successfully added to the watchlist, the input field should be empty immediately after the addition.
**Validates: Requirements 1.3**

### Property 7: Recommendation clickability
*For any* of the three recommended stocks, clicking on the recommendation should add that stock to the watchlist if it's not already present.
**Validates: Requirements 5.3**

### Property 8: API error resilience
*For any* API request that fails or returns invalid data, the system should display an error message and maintain the previous watchlist state without data loss.
**Validates: Requirements 2.5, 3.4**

## Error Handling

### API Errors
- **Network Failure**: Display "Unable to fetch stock data. Please check your connection."
- **Invalid Symbol**: Display "Stock symbol not found" for that specific stock
- **Rate Limiting**: Display "Too many requests. Please wait a moment."
- **Timeout**: Display "Request timed out. Please try again."

### Input Validation Errors
- **Empty Input**: Silently prevent addition, no error message
- **Duplicate Symbol**: Display toast notification "Stock already in watchlist"
- **Invalid Format**: Display "Please enter a valid NSE symbol (e.g., RELIANCE.NS)"

### Frontend Errors
- **JavaScript Errors**: Graceful degradation with console logging
- **Rendering Errors**: Display fallback UI with error boundary

## Testing Strategy

### Unit Testing

Unit tests will verify specific examples and edge cases:

1. **Input Validation Tests**
   - Test empty string rejection
   - Test whitespace-only string rejection
   - Test valid symbol acceptance
   - Test duplicate detection

2. **API Response Parsing Tests**
   - Test successful response parsing
   - Test malformed response handling
   - Test missing fields handling

3. **Color Coding Tests**
   - Test positive change → green
   - Test negative change → red
   - Test zero change → neutral

4. **Watchlist Operations Tests**
   - Test add operation
   - Test clear operation
   - Test count updates

### Property-Based Testing

Property-based tests will verify universal properties across all inputs using **Hypothesis** (Python) for backend and **fast-check** (JavaScript) for frontend:

**Configuration**: Each property test should run a minimum of 100 iterations.

**Test Tagging**: Each property-based test must include a comment in this format:
```python
# Feature: nifty-micro-view, Property 1: Watchlist uniqueness
```

**Property Test Coverage**:
- Property 1: Watchlist uniqueness (generate random symbols, test duplicate prevention)
- Property 2: Empty input rejection (generate whitespace strings, test rejection)
- Property 3: Color coding consistency (generate random price changes, verify colors)
- Property 4: Batch API efficiency (generate random watchlists, verify single API call)
- Property 5: Clear all completeness (generate random watchlists, verify complete clearing)
- Property 6: Input field clearing (generate random valid symbols, verify field clearing)
- Property 7: Recommendation clickability (test all recommendations, verify addition)
- Property 8: API error resilience (generate error scenarios, verify state preservation)

### Integration Testing

- Test complete user workflows (add → refresh → clear)
- Test API integration with Yahoo Finance
- Test responsive design on different viewport sizes

### Manual Testing Checklist

- Verify glassmorphic UI renders correctly
- Test on mobile, tablet, and desktop devices
- Verify color contrast and accessibility
- Test with real NSE stock symbols

## UI/UX Design

### Glassmorphic Design System

**Color Palette**:
- Background: Dark gradient (#0f0f1e to #1a1a2e)
- Glass cards: rgba(255, 255, 255, 0.1) with backdrop-filter blur
- Accent: #00d4ff (cyan for highlights)
- Success: #00ff88 (green for positive changes)
- Error: #ff4444 (red for negative changes)

**Typography**:
- Font: Inter or system-ui
- Headings: 24px, semi-bold
- Body: 16px, regular
- Table data: 14px, monospace for numbers

**Layout**:
- Max width: 1200px, centered
- Padding: 20px on mobile, 40px on desktop
- Card spacing: 20px gap
- Responsive breakpoints: 768px (tablet), 480px (mobile)

### Component Specifications

#### Stock Input Section
- Input field with placeholder "Enter stock symbol (e.g., RELIANCE.NS)"
- Add button with icon
- Glassmorphic card container

#### Watchlist Table
- Header: "📊 Watchlist (N stocks)"
- Columns: Symbol | Name | Price | Prev Close | Change | % Change
- Hover effects on rows
- Smooth transitions for color changes

#### Action Buttons
- Refresh All: Primary button with loading spinner
- Clear All: Secondary button with confirmation
- Positioned at top-right of watchlist

#### Recommendations Section
- Three cards in a row (stack on mobile)
- Each card shows: Symbol, Company name, Brief reason
- Hover effect with scale transform
- Click to add functionality

## Implementation Notes

### Flask Server Setup

```python
# Virtual environment setup
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install flask requests

# Run server
python app.py  # Runs on port 8000
```

### API Proxy Implementation

The Flask backend will proxy Yahoo Finance API requests to avoid CORS issues and provide a clean interface for the frontend.

### State Management

Watchlist state is managed entirely in JavaScript using a simple array. No localStorage or sessionStorage is used, ensuring a fresh start on each page load.

### Performance Considerations

- Debounce refresh button to prevent API spam
- Cache stock data for 30 seconds to reduce API calls
- Lazy load recommendations
- Optimize glassmorphic effects for mobile performance

## Security Considerations

- Input sanitization for stock symbols (alphanumeric + dot only)
- Rate limiting on API proxy endpoint
- No sensitive data storage
- HTTPS for Yahoo Finance API calls
- Content Security Policy headers

## Deployment

The application is designed for local development and can be deployed to:
- Local machine (development)
- Cloud platforms (Heroku, Railway, Render)
- Docker container (optional)

No database setup or environment variables required for basic functionality.
