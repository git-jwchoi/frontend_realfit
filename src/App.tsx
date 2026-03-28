import { MannequinViewer } from './components/canvas/MannequinViewer'
import { UploadPanel } from './components/ui/UploadPanel'

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f0f0f0]">
      {/* Top Navigation */}
      <header className="w-full bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold tracking-wide text-gray-900">
          RealFIT
        </h1>
        <nav className="flex gap-8 text-sm font-medium text-gray-400 uppercase tracking-widest">
          <a href="#" className="hover:text-gray-900 transition-colors">Home</a>
          <a href="#" className="text-gray-900 border-b-2 border-blue-500 pb-1">Atelier</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Archive</a>
          <a href="#" className="hover:text-gray-900 transition-colors">About</a>
        </nav>
        <div className="flex gap-4 text-gray-500">
          <button className="hover:text-gray-900 transition-colors">🛒</button>
          <button className="hover:text-gray-900 transition-colors">👤</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Tool Sidebar */}
        <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-6">
          {[
            { icon: '👁️', label: 'VIEW' },
            { icon: '🔧', label: 'SCULPT' },
            { icon: '🎨', label: 'TEXTURE' },
            { icon: '💡', label: 'LIGHT' },
          ].map((tool) => (
            <button
              key={tool.label}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">{tool.icon}</span>
              <span className="text-[9px] font-semibold uppercase tracking-wider">{tool.label}</span>
            </button>
          ))}
        </aside>

        {/* Left Upload Panel */}
        <aside className="w-[340px] bg-white border-r border-gray-200 overflow-y-auto">
          <UploadPanel />
        </aside>

        {/* Right 3D Viewer */}
        <main className="flex-1 flex flex-col p-4">
          {/* Active Status Badge */}
          <div className="mb-3 flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200">
              ● Active Simulation
            </span>
            <div className="flex gap-2">
              {['🔍', '🔄', '◆'].map((icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-lg min-h-[400px]">
            <MannequinViewer />
          </div>

          {/* Bottom Controls */}
          <div className="mt-3 flex items-center justify-center">
            <div className="bg-white rounded-xl px-6 py-3 flex items-center gap-6 shadow-sm border border-gray-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Rotation</span>
              <input type="range" min="0" max="360" defaultValue="0" className="w-40 accent-blue-500" />
              <button className="text-gray-400 hover:text-gray-700 transition-colors">🎥</button>
              <button className="text-gray-400 hover:text-gray-700 transition-colors">📷</button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 px-8 py-3 flex items-center justify-between text-xs text-gray-400">
        <span className="font-serif font-semibold text-gray-600">RealFIT Editorial</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-600">Privacy</a>
          <a href="#" className="hover:text-gray-600">Terms</a>
          <a href="#" className="hover:text-gray-600">Help</a>
        </div>
        <span>© 2026 RealFIT. All rights reserved.</span>
      </footer>
    </div>
  )
}

export default App
