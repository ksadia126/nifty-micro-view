# Requirements Document

## Introduction

Nifty Micro-View is a single-page responsive web application designed for Indian stock investors to monitor their watchlist of stocks in real-time. The system aggregates stock data from Yahoo Finance API and presents it in an intuitive glassmorphic user interface without requiring any database storage.

## Glossary

- **System**: The Nifty Micro-View web application
- **User**: An Indian stock investor using the application
- **Stock Symbol**: A unique identifier for a stock on the National Stock Exchange (NSE), formatted as SYMBOL.NS (e.g., RELIANCE.NS)
- **Watchlist**: A collection of stock symbols that the user wants to monitor
- **Yahoo Finance API**: The external API endpoint used to fetch real-time stock data
- **Glassmorphic UI**: A modern design style featuring frosted glass effects with transparency and blur
- **Flask Server**: The Python web server running on port 8000
- **Price Change**: The difference between current price and previous close, displayed with color coding

## Requirements

### Requirement 1

**User Story:** As a user, I want to add stock symbols to my watchlist, so that I can monitor specific Indian stocks I'm interested in.

#### Acceptance Criteria

1. WHEN a user enters a valid stock symbol in the input field and presses Enter or clicks the Add Stock button, THEN the System SHALL add the stock to the watchlist table
2. WHEN a user enters an empty stock symbol, THEN the System SHALL prevent the addition and maintain the current watchlist state
3. WHEN a stock symbol is added, THEN the System SHALL clear the input field for the next entry
4. WHEN a stock is added to the watchlist, THEN the System SHALL fetch and display the stock data immediately
5. WHEN a duplicate stock symbol is entered, THEN the System SHALL prevent adding the duplicate and notify the user

### Requirement 2

**User Story:** As a user, I want to see real-time stock data for my watchlist, so that I can make informed investment decisions.

#### Acceptance Criteria

1. WHEN the System fetches stock data from Yahoo Finance API, THEN the System SHALL display the current price, previous close, and price change for each stock
2. WHEN the price change is positive, THEN the System SHALL display the value in green color
3. WHEN the price change is negative, THEN the System SHALL display the value in red color
4. WHEN the price change is zero, THEN the System SHALL display the value in a neutral color
5. WHEN stock data is unavailable or the API returns an error, THEN the System SHALL display an appropriate error message for that stock

### Requirement 3

**User Story:** As a user, I want to refresh all stocks in my watchlist simultaneously, so that I can get the latest market data efficiently.

#### Acceptance Criteria

1. WHEN a user clicks the Refresh All button, THEN the System SHALL call the Yahoo Finance API with all watchlist symbols in a single request
2. WHEN the refresh operation completes successfully, THEN the System SHALL update all stock data in the table
3. WHEN the refresh operation is in progress, THEN the System SHALL provide visual feedback to indicate loading state
4. WHEN the API request fails, THEN the System SHALL display an error message and maintain the previous data

### Requirement 4

**User Story:** As a user, I want to clear my entire watchlist, so that I can start fresh with a new set of stocks.

#### Acceptance Criteria

1. WHEN a user clicks the Clear All button, THEN the System SHALL remove all stocks from the watchlist
2. WHEN the watchlist is cleared, THEN the System SHALL update the stock count display to show zero stocks
3. WHEN the watchlist is empty, THEN the System SHALL display an appropriate empty state message

### Requirement 5

**User Story:** As a user, I want to see stock recommendations, so that I can discover potential investment opportunities.

#### Acceptance Criteria

1. WHEN the page loads, THEN the System SHALL display three recommended Indian stock symbols to buy
2. WHEN recommendations are displayed, THEN the System SHALL show the stock symbol and a brief reason for the recommendation
3. WHEN a user clicks on a recommended stock, THEN the System SHALL add that stock to the watchlist

### Requirement 6

**User Story:** As a user, I want to use the application on any device, so that I can monitor stocks on desktop, tablet, or mobile.

#### Acceptance Criteria

1. WHEN the application is accessed on different screen sizes, THEN the System SHALL adapt the layout responsively
2. WHEN viewed on mobile devices, THEN the System SHALL maintain readability and usability of all features
3. WHEN the glassmorphic UI is rendered, THEN the System SHALL apply consistent visual styling across all components

### Requirement 7

**User Story:** As a user, I want the application to run without requiring database setup, so that I can use it immediately without complex configuration.

#### Acceptance Criteria

1. WHEN the Flask server starts, THEN the System SHALL serve the application without requiring database connections
2. WHEN the user session ends, THEN the System SHALL not persist watchlist data
3. WHEN a user refreshes the browser, THEN the System SHALL reset to an empty watchlist state

### Requirement 8

**User Story:** As a developer, I want the application to use a Python virtual environment, so that dependencies are isolated and manageable.

#### Acceptance Criteria

1. WHEN the application is set up, THEN the System SHALL use a Python virtual environment for dependency management
2. WHEN the Flask server starts, THEN the System SHALL run on port 8000
3. WHEN dependencies are installed, THEN the System SHALL use the virtual environment's package manager
