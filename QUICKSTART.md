# ⚡ Quickstart Guide - Running n8n on localhost:5678

The error **`ERR_CONNECTION_REFUSED`** at `http://localhost:5678` occurs because the **n8n server process** is not running yet.

---

## 🚀 Option 1: Run n8n directly with Node.js (No Docker Required!)

Since Node.js is already installed on your computer, you can run n8n directly with **one command**:

1. Open **PowerShell** or **Command Prompt** in your project directory:
   ```bash
   cd "c:\Users\Gun Gun\OneDrive\Desktop\AI Placement Preparation Agent"
   ```
2. Run this command:
   ```bash
   npx n8n start
   ```
   *(or simply `npm start`)*

3. Once n8n finishes starting, open your browser and navigate to:
   👉 **[http://localhost:5678](http://localhost:5678)**

---

## 🐳 Option 2: Run n8n with Docker

If you prefer using Docker:

1. Open **Docker Desktop** application from your Windows Start Menu.
2. Open PowerShell in the project directory and run:
   ```bash
   docker compose up -d
   ```
3. Open your browser and navigate to:
   👉 **[http://localhost:5678](http://localhost:5678)**

---

## 🌐 Option 3: Run the Web Dashboard UI

To view the interactive Placement Agent Dashboard:

1. Double-click [`index.html`](file:///c:/Users/SAI%20DINESH/OneDrive/Desktop/AI%20Placement%20Preparation%20Agent/index.html) in your file explorer, OR
2. Run:
   ```bash
   npm run dashboard
   ```
   and open **[http://localhost:3000](http://localhost:3000)**.
