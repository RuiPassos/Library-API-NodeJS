# 📚 Library Management REST API

### 📝 Project Overview
This is a RESTful API developed as part of the Web Programming laboratory at IPMAIA. The system allows for complete management of a digital library, handling books and authors through standard HTTP methods.

### 🚀 Features
- **Full CRUD operations** for books (Create, Read, Update, Delete).
- **Data Validation:** Implementation of mandatory field checks and category validation.
- **Live Logging:** Request logging using `morgan` for easier debugging.
- **CORS Enabled:** Ready to be connected to a frontend application.

### 🛠️ Tech Stack
- **Environment:** Node.js
- **Framework:** Express.js
- **Middleware:** CORS, Morgan, Dotenv

### ⏳ Current Status & Roadmap
- [x] **Phase 1:** Core REST logic and in-memory data management (Arrays).
- [ ] **Phase 2:** Integration with **SQLite** for persistent storage (Planned).
- [ ] **Phase 3:** User authentication and JWT integration.

### 💻 How to Run
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server with `npm run dev` (using nodemon) or `npm start`.
