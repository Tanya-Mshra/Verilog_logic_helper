import { useState } from 'react'

function App() {
  const [fileName, setFileName] = useState('my_logic'); 
  const [prompt, setPrompt] = useState('');
  // Now we store both codes in an object
  const [codes, setCodes] = useState({ design: '// Design...', testbench: '// Testbench...' });
  const [activeTab, setActiveTab] = useState('design'); // 'design' or 'testbench'
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return alert("Describe your logic!");
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/generate-verilog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setCodes({ design: data.design, testbench: data.testbench });
    } catch (error) {
      setCodes({ design: "// Error", testbench: "// Error" });
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    const codeToDownload = activeTab === 'design' ? codes.design : codes.testbench;
    const suffix = activeTab === 'design' ? '' : '_tb';
    const finalName = `${fileName.replace('.v', '')}${suffix}.v`;
    
    const element = document.createElement("a");
    const file = new Blob([codeToDownload], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = finalName;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
            Verilog Pro Helper
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl self-start">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Design Specification</h2>
            <textarea 
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500 h-64 resize-none"
              placeholder="Describe your module... (e.g. 4-bit synchronous counter)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="mt-6 w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all"
            >
              {loading ? 'Synthesizing...' : 'Generate Design + TB'}
            </button>
          </div>

          {/* Right: Dual-Tab Output */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col min-h-[500px]">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-800">
              <button 
                onClick={() => setActiveTab('design')}
                className={`flex-1 py-4 font-bold transition-all ${activeTab === 'design' ? 'text-cyan-400 bg-slate-800' : 'text-slate-500'}`}
              >
                Design Module
              </button>
              <button 
                onClick={() => setActiveTab('testbench')}
                className={`flex-1 py-4 font-bold transition-all ${activeTab === 'testbench' ? 'text-emerald-400 bg-slate-800' : 'text-slate-500'}`}
              >
                Testbench
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-grow p-4 bg-black relative">
              <pre className="text-xs md:text-sm text-emerald-500 font-mono h-full overflow-auto whitespace-pre">
                <code>{activeTab === 'design' ? codes.design : codes.testbench}</code>
              </pre>
            </div>

            {/* Save Section */}
            <div className="p-6 bg-slate-900 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="flex-grow bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-cyan-400 outline-none"
                />
                <button 
                  onClick={downloadFile}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold"
                >
                  Download {activeTab === 'design' ? '.v' : '_tb.v'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App