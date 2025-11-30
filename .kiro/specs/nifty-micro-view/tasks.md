# Implementation Plan

- [x] 1. Set up project structure and Python environment


  - Create virtual environment and install Flask and requests packages
  - Create directory structure: static/ folder for CSS/JS, templates/ for HTML
  - Create requirements.txt with Flask and requests dependencies
  - _Requirements: 8.1, 8.2, 8.3_

- [x] 2. Implement Flask backend server

  - [x] 2.1 Create Flask application with port 8000 configuration


    - Write app.py with Flask initialization
    - Configure server to run on port 8000
    - Set up route for serving index.html
    - _Requirements: 8.2, 7.1_

  - [x] 2.2 Implement API proxy endpoint for Yahoo Finance


    - Create /api/stocks GET endpoint that accepts comma-separated symbols
    - Implement request forwarding to Yahoo Finance API
    - Parse and return JSON response with error handling
    - Handle network failures, timeouts, and invalid responses
    - _Requirements: 2.1, 2.5, 3.1, 3.4_

  - [ ]* 2.3 Write property test for API error resilience
    - **Property 8: API error resilience**
    - **Validates: Requirements 2.5, 3.4**

  - [ ]* 2.4 Write unit tests for Flask endpoints
    - Test /api/stocks endpoint with valid symbols
    - Test error handling for invalid API responses
    - Test CORS headers if needed
    - _Requirements: 2.1, 2.5_

- [x] 3. Create HTML structure and glassmorphic UI

  - [x] 3.1 Build index.html with semantic structure


    - Create header with app title "Nifty Micro-View"
    - Add stock input section with input field and Add Stock button
    - Create watchlist section with table structure
    - Add action buttons section (Refresh All, Clear All)
    - Create recommendations section with three card placeholders
    - _Requirements: 1.1, 5.1, 6.1_

  - [x] 3.2 Implement glassmorphic CSS styling


    - Create style.css with dark gradient background
    - Implement glass card effects with backdrop-filter blur
    - Style input field and buttons with glassmorphic design
    - Create responsive table layout with color-coded changes
    - Add hover effects and transitions
    - Implement responsive breakpoints for mobile/tablet/desktop
    - _Requirements: 6.1, 6.3_

  - [ ]* 3.3 Test responsive design at different viewports
    - Verify layout at 320px (mobile), 768px (tablet), 1200px (desktop)
    - Test glassmorphic effects render correctly
    - _Requirements: 6.1_

- [x] 4. Implement frontend JavaScript for watchlist management

  - [x] 4.1 Create watchlist state management


    - Initialize empty watchlist array in JavaScript
    - Implement addStock function that validates and adds to array
    - Implement removeStock and clearAll functions
    - Implement getStockCount function
    - _Requirements: 1.1, 4.1, 7.3_

  - [x] 4.2 Implement input validation and duplicate prevention


    - Validate input is not empty or whitespace-only
    - Check for duplicate symbols before adding
    - Display notification for duplicate attempts
    - Clear input field after successful addition
    - _Requirements: 1.2, 1.3, 1.5_

  - [ ]* 4.3 Write property test for empty input rejection
    - **Property 2: Empty input rejection**
    - **Validates: Requirements 1.2**

  - [ ]* 4.4 Write property test for watchlist uniqueness
    - **Property 1: Watchlist uniqueness**
    - **Validates: Requirements 1.5**

  - [ ]* 4.5 Write property test for input field clearing
    - **Property 6: Input field clearing**
    - **Validates: Requirements 1.3**

- [x] 5. Implement stock data fetching and display

  - [x] 5.1 Create API client function to fetch stock data


    - Implement fetchStocks function that calls /api/stocks endpoint
    - Handle loading states during API calls
    - Parse response and extract relevant fields
    - Handle API errors gracefully
    - _Requirements: 1.4, 2.1, 2.5_

  - [x] 5.2 Implement table rendering with color-coded changes


    - Create renderWatchlist function that updates table DOM
    - Calculate price change and percentage change
    - Apply green color for positive changes
    - Apply red color for negative changes
    - Apply neutral color for zero changes
    - Display stock symbol, name, prices, and changes
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 5.3 Write property test for color coding consistency
    - **Property 3: Color coding consistency**
    - **Validates: Requirements 2.2, 2.3**

  - [ ]* 5.4 Write unit tests for table rendering
    - Test rendering with positive, negative, and zero changes
    - Test rendering with missing data fields
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 6. Implement Refresh All functionality

  - [x] 6.1 Create batch refresh function


    - Implement refreshAll function that collects all symbols
    - Make single API call with comma-separated symbols
    - Update all stocks in watchlist with new data
    - Show loading indicator during refresh
    - Handle partial failures (some stocks succeed, others fail)
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 6.2 Write property test for batch API efficiency
    - **Property 4: Batch API efficiency**
    - **Validates: Requirements 3.1**

  - [ ]* 6.3 Write unit tests for refresh functionality
    - Test refresh with multiple stocks
    - Test refresh with empty watchlist
    - Test refresh with API failure
    - _Requirements: 3.1, 3.2, 3.4_

- [x] 7. Implement Clear All functionality

  - [x] 7.1 Create clear all function with confirmation


    - Implement clearAll function that empties watchlist array
    - Update UI to show empty state
    - Update stock count to zero
    - Display empty state message
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ]* 7.2 Write property test for clear all completeness
    - **Property 5: Clear all completeness**
    - **Validates: Requirements 4.1, 4.2**

- [x] 8. Implement stock recommendations feature



  - [x] 8.1 Create recommendations display

    - Define three recommended Indian stocks (e.g., RELIANCE.NS, TCS.NS, HDFCBANK.NS)
    - Create recommendation cards with symbol, name, and brief reason
    - Style cards with glassmorphic design

    - _Requirements: 5.1, 5.2_

  - [x] 8.2 Implement click-to-add functionality for recommendations

    - Add click event listeners to recommendation cards
    - Call addStock function when recommendation is clicked
    - Provide visual feedback on successful addition
    - _Requirements: 5.3_

  - [ ]* 8.3 Write property test for recommendation clickability
    - **Property 7: Recommendation clickability**
    - **Validates: Requirements 5.3**

- [x] 9. Add event listeners and wire up UI interactions

  - [x] 9.1 Connect all UI elements to JavaScript functions


    - Add event listener for Add Stock button click
    - Add event listener for Enter key in input field
    - Add event listener for Refresh All button
    - Add event listener for Clear All button
    - Add event listeners for recommendation cards
    - Implement debouncing for Refresh All to prevent spam
    - _Requirements: 1.1, 3.1, 4.1, 5.3_

  - [ ]* 9.2 Write integration tests for complete user workflows
    - Test add → refresh → clear workflow
    - Test adding from recommendations
    - Test error scenarios end-to-end
    - _Requirements: 1.1, 3.1, 4.1_

- [x] 10. Final polish and testing

  - [x] 10.1 Add loading states and user feedback


    - Implement loading spinner for API calls
    - Add toast notifications for errors and success messages
    - Ensure smooth transitions and animations
    - _Requirements: 3.3_

  - [x] 10.2 Test with real Yahoo Finance API


    - Verify API integration with actual NSE stock symbols
    - Test with RELIANCE.NS, TCS.NS, HDFCBANK.NS, INFY.NS
    - Verify data accuracy and formatting
    - Test error handling with invalid symbols
    - _Requirements: 2.1, 2.5_

  - [x] 10.3 Verify stateless behavior


    - Confirm no data persists after browser refresh
    - Verify server runs without database
    - Test that watchlist resets on page reload
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 11. Checkpoint - Ensure all tests pass



  - Ensure all tests pass, ask the user if questions arise.
