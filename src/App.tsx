import { MannequinViewer } from './components/canvas/MannequinViewer'
import { UploadPanel } from './components/ui/UploadPanel'

function App() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-start py-10 bg-slate-900 overflow-x-hidden overflow-y-auto">
      <div className="text-center mb-6 px-4">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-sm">
          3D Style Fitting
        </h1>
        <p className="mt-3 text-slate-400 max-w-lg mx-auto text-sm lg:text-base">
          본인의 전신 사진을 업로드하여 실제 체형이 반영된 가상의 3D 마네킹을 생성해 보세요.
        </p>
      </div>

      <div className="flex-1 w-full max-w-6xl flex flex-col lg:flex-row gap-6 px-4">
        {/* 사이드 패널 (사진 업로드 폼) */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-4">
          <UploadPanel />
        </aside>

        {/* 3D 뷰어 메인 영역 */}
        <main className="w-full lg:w-2/3 flex-1 min-h-[500px] mb-4">
          <MannequinViewer />
        </main>
      </div>
    </div>
  )
}

export default App
