# 💹 Crypto Analyzer

**Crypto Analyzer** is a web-based application built with **Node.js**, **Express.js**, and **EJS** that allows users to search and analyze real-time cryptocurrency market data. Leveraging the power of the **Blockchain.com API** for live price data and the **CoinGecko API** for historical trends, this tool provides a comprehensive view of any major cryptocurrency's current market status and recent performance.



---

## 🚀 Features

- 🔍 **Search bar with live suggestions** to find crypto tickers quickly
- 📈 **Real-time price** display including:
  - 24h price change
  - 24h volume
  - Last trade price
- 📊 **Line chart** to visualize recent historical price trends
- 🌐 Uses **Blockchain.com API** for live data and **CoinGecko API** for historical data
- 🖥️ Fully **responsive design** with mobile-friendly layout

---

## 🛠️ Tech Stack

- **Frontend**
  - EJS (Embedded JavaScript Templates)
  - Chart.js (for visualizing historical data)
  - CSS (custom styling with responsive media queries)
- **Backend**
  - Node.js
  - Express.js
  - Axios (for API requests)
- **APIs**
  - [Blockchain.com Exchange API](https://api.blockchain.com/v3/exchange/)
  - [CoinGecko API](https://www.coingecko.com/en/api/documentation)

---

## 📁 Project Structure

- crypto_pricechecker/
- ├── public/
- │ └── styles.css # Main CSS for styling and responsiveness
- ├── views/
- │ └── index.ejs # EJS template for UI rendering
- ├── app.js # Main Express application logic
- ├── package.json # Project dependencies
- └── README.md # Project overview and instructions
---

## ⚙️ How It Works

1. **User Interface**:
   - The homepage shows a search bar that lets the user type in a cryptocurrency symbol (e.g., `BTC-USD`, `ETH-USD`).
   - Matching suggestions appear below the input box.

2. **Form Submission**:
   - Once a crypto symbol is selected, the app fetches:
     - Current price data from **Blockchain.com**
     - Historical price data from **CoinGecko** (mapped internally via symbol-ID mapping)

3. **Chart Rendering**:
   - Chart.js is used to display a line chart of recent prices for that crypto asset.

---

## 📦 Installation

1. **Clone the repo**:
   ```bash
   git clone https://github.com/sar123-bot/CRYPTO_ANALYZER.git
   cd CRYPTO_ANALYZER

2.**Install dependencies**:
   ```bash
      npm install
   ```
3.**Run the app:**:
   ```bash
     node app.js
   ```
4. Visit http://localhost:3000 in your browser.

---

## 📸 Screenshots

### 🧭 Home Page with Search
![Home Page with Search](screenshots/Screenshot%202025-05-21%20031010.png)

### 📈 Price Chart and Data
![Price Chart and Data](screenshots/Screenshot%202025-05-21%20031109.png)





