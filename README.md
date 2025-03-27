# Stock Market API  

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js) ![Express.js](https://img.shields.io/badge/Express.js-4.x-black?logo=express) ![JSON Server](https://img.shields.io/badge/JSON%20Server-1.0.0-red?logo=json) ![Dotenv](https://img.shields.io/badge/Dotenv-16.x-yellowgreen?logo=dotenv)  

A  fake **Stock Market API** powered by **Node.js** and **Express**,, designed to fetch real-time and historical stock market data using **FMP API**.

## ✨ Features  
- Retrieve **financial statistics**, **earnings**, and **historical trends**  
- Supports **pagination**, **error handling**, and **caching**  
- Well-structured **RESTful API**  

---

## 🚀 Installation  

### 1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/itsferdiardiansa/stock-market-api.git
cd stock-market-api
```

**✨ Features**
- Fetch real-time  **stock data**
- Retrieve **financial statistics**, **earnings**, and **historical trends**
- Supports **pagination**, **error handling**, and **caching**
- Well-structured  **RESTful API**

----------

**🚀 Installation**


**1️⃣ Clone the Repository**
```
git clone https://github.com/itsferdiardiansa/stock-market-api.git
cd stock-market-api
```

**2️⃣ Install Dependencies**
Using  **pnpm**  (recommended):
```
pnpm install
```

Or using  **npm**:
```
npm install
```

**3️⃣ Set Up Environment Variables**
Create a  .env  file in the project root and configure:
```
PORT=9000
API_VERSION=1.0.0
NEXT_PUBLIC_API_URL=https://yahoo-finance15.p.rapidapi.com/api
```

----------

**🔥 Running the Server**

**🚦 Start the API Server**

```
pnpm start
```

Or

```
npm run start
```

**Server will be running at:**
```sh
📍 http://localhost:9000
```
----------

**🛠 API Endpoints**

**Stock Data**

**✅ Get Stock Market Data**

```
GET /api/v1/markets/stock/modules?ticker=AAPL&module=financial-data
```

📌 **Query Parameters:**

•  ticker  _(required)_: The stock ticker symbol (e.g.,  AAPL)
• module _(required)_: Data type (financial-data, earnings, profile, etc.)

📌 **Example Response:**
```
{
  "meta": {
    "status": 200,
    "message": "Success",
    "timestamp": "2024-03-24T12:34:56.789Z",
    "requestId": "c47fdb70-9e57-4e21-83cb-3c7b5b693d4a",
    "version": "1.0.0",
    "cache": false
  },
  "body": {
    "financialData": {
      "currentPrice": { "raw": 284.43, "fmt": "284.43" },
      "totalRevenue": { "raw": 267683004416, "fmt": "267.68B" }
    }
  }
}
```

----------

**📈 Market Data**

**✅ Get Market Tickers**

```
GET /api/v2/markets/tickers?page=1&type=STOCKS
```

📌 **Query Parameters:**
•  page  _(optional)_: Pagination page number (default:  1)
•  type  _(optional)_: Filter by type (STOCKS,  CRYPTO,  FOREX)

📌 **Example Response:**
```
{
  "meta": {
    "status": 200,
    "message": "Success",
    "timestamp": "2024-03-24T12:34:56.789Z",
    "requestId": "c47fdb70-9e57-4e21-83cb-3c7b5b693d4a",
    "version": "1.0.0",
    "cache": false,
    "pagination": {
      "page": 1,
      "total": 500,
      "totalPages": 50
    }
  },
  "body": {
    "tickers": [
      { "symbol": "AAPL", "name": "Apple Inc.", "type": "STOCK" },
      { "symbol": "GOOGL", "name": "Alphabet Inc.", "type": "STOCK" }
    ]
  }
}
```

----------

**🏗 Project Structure**
```
📂 stock-market-api
 ┣ 📂 data
 ┃ ┣ 📜 financial-data.json
 ┃ ┣ 📜 earnings.json
 ┃ ┗ 📜 profile.json
 ┣ 📂 routes
 ┃ ┣ 📜 stockRoutes.js
 ┃ ┣ 📜 marketRoutes.js
 ┃ ┗ 📜 index.js
 ┣ 📂 utils
 ┃ ┗ 📜 responseFormatter.js
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 package.json
 ┣ 📜 server.js
 ┗ 📜 README.md
```

----------

**⚡ Troubleshooting**

**1️⃣ Issue: Cannot find module 'json-server'**

🔹  **Solution:**  Reinstall dependencies

```
pnpm install
```

**2️⃣ Issue: .env Variables Not Loaded**

🔹  **Solution:**  Ensure  .env  file exists and restart the server

```
pnpm start
```

**3️⃣ Issue: API Rate Limit Exceeded**

🔹  **Solution:**  Upgrade to a  **paid plan**  on  **RapidAPI**  or add multiple API keys.

----------

**📜 License**

This project is  **MIT Licensed**. 🚀