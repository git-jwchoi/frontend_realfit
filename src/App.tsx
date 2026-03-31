import { MannequinViewer } from './components/canvas/MannequinViewer'
import { UploadPanel } from './components/ui/UploadPanel'
import { SculptPanel } from './components/ui/SculptPanel'
import { HomePanel } from './components/ui/HomePanel'
import { ArchivePanel } from './components/ui/ArchivePanel'
import { AboutPanel } from './components/ui/AboutPanel'
import { useFittingStore } from './store/useFittingStore'

function App() {
  const { currentPage, setCurrentPage, activeTab, setActiveTab, activeTool, setActiveTool, modelUrl, vtonResultUrl, isLoading } = useFittingStore()

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f0f0f0]">
      {/* Top Navigation */}
      <header className="w-full bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between z-20">
        <h1 
          className="font-serif text-xl font-bold tracking-wide text-gray-900 cursor-pointer"
          onClick={() => setCurrentPage('HOME')}
        >
          RealFIT
        </h1>
        <nav className="flex gap-8 text-sm font-medium text-gray-400 uppercase tracking-widest">
          <button 
            onClick={() => setCurrentPage('HOME')}
            className={`transition-colors ${currentPage === 'HOME' ? 'text-gray-900 border-b-2 border-blue-500 pb-1' : 'hover:text-gray-900'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('ATELIER')}
            className={`transition-colors ${currentPage === 'ATELIER' ? 'text-gray-900 border-b-2 border-blue-500 pb-1' : 'hover:text-gray-900'}`}
          >
            Atelier
          </button>
          <button 
            onClick={() => setCurrentPage('ARCHIVE')}
            className={`transition-colors ${currentPage === 'ARCHIVE' ? 'text-gray-900 border-b-2 border-blue-500 pb-1' : 'hover:text-gray-900'}`}
          >
            Archive
          </button>
          <button 
            onClick={() => setCurrentPage('ABOUT')}
            className={`transition-colors ${currentPage === 'ABOUT' ? 'text-gray-900 border-b-2 border-blue-500 pb-1' : 'hover:text-gray-900'}`}
          >
            About
          </button>
        </nav>
        <div className="flex gap-4 text-gray-500">
          <button className="hover:text-gray-900 transition-colors">🛒</button>
          <button className="hover:text-gray-900 transition-colors">👤</button>
        </div>
      </header>

      {/* Main Content Routing */}
      {currentPage === 'HOME' ? (
        <div className="flex-1 overflow-auto bg-white">
          <HomePanel />
        </div>
      ) : currentPage === 'ARCHIVE' ? (
        <div className="flex-1 overflow-auto bg-gray-50">
          <ArchivePanel />
        </div>
      ) : currentPage === 'ABOUT' ? (
        <div className="flex-1 overflow-auto bg-white">
          <AboutPanel />
        </div>
      ) : (
        <div className="flex-1 flex">
        {/* Left Tool Sidebar */}
        <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-6 z-10 shadow-[2px_0_8px_-4px_rgba(0,0,0,0.1)]">
          {[
            { id: 'VIEW', icon: '👁️', label: 'VIEW' },
            { id: 'SCULPT', icon: '🔧', label: 'SCULPT' },
            { id: 'TEXTURE', icon: '🎨', label: 'TEXTURE' },
            { id: 'LIGHT', icon: '💡', label: 'LIGHT' },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              className={`flex flex-col items-center gap-1 transition-colors group relative ${activeTool === tool.id ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
            >
              {activeTool === tool.id && (
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
              )}
              <span className={`text-lg transition-transform ${activeTool === tool.id ? 'scale-110' : 'group-hover:scale-110'}`}>{tool.icon}</span>
              <span className="text-[9px] font-semibold uppercase tracking-wider">{tool.label}</span>
            </button>
          ))}
        </aside>

        {/* Left Upload/Tool Panel */}
        <aside className="w-[340px] bg-white border-r border-gray-200 overflow-y-auto z-0 transition-opacity">
          {activeTool === 'VIEW' && <UploadPanel />}
          {activeTool === 'SCULPT' && <SculptPanel />}
          {activeTool === 'TEXTURE' && (
            <div className="p-8 text-center text-gray-400">
              <span className="text-3xl mb-4 block">🎨</span>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Texture Lab</p>
              <p className="text-xs mt-2">Fabric customization coming soon.</p>
            </div>
          )}
          {activeTool === 'LIGHT' && (
            <div className="p-8 text-center text-gray-400">
              <span className="text-3xl mb-4 block">💡</span>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Lighting Studio</p>
              <p className="text-xs mt-2">Environment mapping coming soon.</p>
            </div>
          )}
        </aside>

        {/* Right 3D Viewer */}
        <main className="flex-1 flex flex-col p-4">
          {/* Center Tabs: 3D vs 2D */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex bg-gray-200 p-1 rounded-lg">
              <button 
                className={`px-6 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeTab === '3d' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('3d')}
              >
                3D Avatar
              </button>
              <button 
                className={`px-6 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeTab === '2d' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('2d')}
              >
                2D Fitting Result
              </button>
            </div>
            
            <div className="flex gap-2">
              {['🔍', '🔄', '◆'].map((icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* 3D or 2D Canvas View */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-lg min-h-[400px] bg-[#1a1a1a] flex items-center justify-center relative">
            
            {activeTab === '3d' ? (
              modelUrl ? (
                <MannequinViewer />
              ) : (
                <div className="text-gray-500 text-sm tracking-widest uppercase">Upload a photo to generate 3D Map</div>
              )
            ) : (
              vtonResultUrl ? (
                <img src={vtonResultUrl} alt="VTON Result" className="h-full object-contain max-h-[600px]" />
              ) : (
                <div className="text-gray-500 text-sm tracking-widest uppercase">Select garment to start fitting</div>
              )
            )}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                  <span className="text-white font-medium tracking-widest uppercase text-sm">AI Computing...</span>
                </div>
              </div>
            )}
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
      )}

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 px-8 py-3 flex items-center justify-between text-xs text-gray-400 z-10">
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
