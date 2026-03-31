# ⚡ Verilog Logic Helper

An AI-powered hardware design assistant that converts natural language descriptions into synthesizable **Verilog HDL** code and matching **Testbenches**. Designed to bridge the gap between high-level logic requirements and low-level hardware implementation.

---

## 🚀 Live Links
* **Frontend (React/Vercel):** [https://verilog-logic-helper.vercel.app](https://verilog-logic-helper.vercel.app)
* **Backend (Node.js/Render):** [https://verilog-logic-helper-1.onrender.com](https://verilog-logic-helper-1.onrender.com)

---

## ✨ Features
* **Natural Language Processing**: Describe logic (e.g., "3-bit up-down counter") and get instant Verilog code.
* **Dual Output**: Generates both the functional `design.v` and a corresponding `testbench.v`.
* **Real-time Generation**: Powered by the **Gemini 1.5 Flash** model for low-latency AI responses.
* **Responsive UI**: Clean interface built with **Tailwind CSS**.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **AI Integration** | Google Generative AI (Gemini SDK) |
| **Hosting** | Vercel (Frontend) & Render (Backend) |

---

## 📂 Project Structure
```text
verilog_logic_helper/
├── frontend/           # React application
│   ├── src/
│   │   └── App.jsx     # Frontend Logic & API Fetching
├── backend/            # Express server
│   ├── server.js       # Gemini API Integration & Routes
│   └── .env            # Private API Keys (Hidden)
└── README.md           # Documentation
