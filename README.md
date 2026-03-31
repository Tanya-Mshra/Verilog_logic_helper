⚡ Verilog Logic HelperAn AI-powered hardware design assistant that converts natural language descriptions into synthesizable Verilog HDL code and matching Testbenches. Built for B.Tech students and Digital Logic designers to accelerate the prototyping phase.🚀 Live DemoFrontend: https://verilog-logic-helper.vercel.appBackend API: https://verilog-logic-helper-1.onrender.com✨ FeaturesNatural Language to HDL: Generate complex modules (Flip-flops, Counters, ALUs) using simple English.Automated Testbenches: Every design comes with a complete Verilog testbench for simulation.Modern UI: Built with React and Tailwind CSS for a smooth, responsive experience.AI-Driven: Powered by Google's Gemini 1.5 Flash for high-accuracy hardware logic generation.🛠️ Tech StackCategoryTechnologyFrontendReact.js, Vite, Tailwind CSSBackendNode.js, Express.jsAI IntegrationGoogle Generative AI (Gemini SDK)DeploymentVercel (Frontend), Render (Backend)📂 Project StructurePlaintextverilog_logic_helper/
├── frontend/           # React + Vite application
│   ├── src/
│   │   └── App.jsx     # Main Logic & API Integration
│   └── tailwind.config.js
├── backend/            # Node.js Express server
│   ├── server.js       # API Routes & Gemini Config
│   └── .env            # API Keys (Ignored by Git)
└── README.md           # Project Documentation
⚙️ Local Setup1. Clone the RepositoryBashgit clone https://github.com/Tanya-Mshra/Verilog_logic_helper.git
cd Verilog_logic_helper
2. Configure BackendNavigate to the backend folder: cd backendInstall dependencies: npm installCreate a .env file and add your API key:PlaintextGEMINI_API_KEY=your_actual_api_key_here
PORT=5000
Start the server: node server.js3. Configure FrontendOpen a new terminal in the frontend folder: cd frontendInstall dependencies: npm installStart the development server: npm run devOpen http://localhost:5173 in your browser.🛡️ Environment VariablesTo run this project in production, ensure you set the following environment variables on Render:GEMINI_API_KEY: Your API key from Google AI Studio.PORT: Set to 10000 (Render default) or leave blank for auto-assignment.🤝 ContributingContributions, issues, and feature requests are welcome! Feel free to check the issues page.Author: Tanya Mishra
