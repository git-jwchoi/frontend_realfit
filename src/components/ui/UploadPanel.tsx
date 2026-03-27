import React, { useRef } from 'react'
import { useFittingStore } from '../../store/useFittingStore'

export const UploadPanel: React.FC = () => {
  const { photoFile, photoPreviewUrl, isLoading, setPhoto, setIsLoading, setModelUrl } = useFittingStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const previewUrl = URL.createObjectURL(file)
      setPhoto(file, previewUrl)
      setModelUrl(null) // 새 사진 등록 시 기존 마네킹 초기화
    }
  }

  const handleGenerateClick = () => {
    if (!photoFile) return
    setIsLoading(true)
    
    // 향후 FastAPI 연동을 모방하는 Timeout (가짜 지연 효과)
    setTimeout(() => {
      // 3초 후 가상의 GLB 마네킹 결과 생성 완료 처리
      // 현재 실제 glb 파일이 없으므로 임의의 mock 문자열 전송 (로더가 처리하도록)
      setModelUrl('/mock/mock_mannequin.glb')
      setIsLoading(false)
    }, 3000)
  }

  const handleClear = () => {
    setPhoto(null, null)
    setModelUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 flex flex-col h-full shadow-lg">
      <h2 className="text-xl font-bold text-slate-100 mb-2">1. 사진 업로드</h2>
      <p className="text-sm text-slate-400 mb-6">전신이 잘 보이는 JPG/PNG 파일을 업로드해주세요.</p>

      {/* 미리보기 및 입력 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-xl bg-slate-900/50 relative overflow-hidden group">
        {photoPreviewUrl ? (
          <img src={photoPreviewUrl} alt="User Upload" className="w-full h-full object-contain p-2" />
        ) : (
          <div className="text-center p-6 pointer-events-none">
            <svg className="mx-auto h-12 w-12 text-slate-500 mb-3 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h10a4 4 0 004-4M3 15v-3a4 4 0 014-4h1v1" />
              <path fill="#94a3b8" d="M12 2l4 4h-3v6h-2V6H8l4-4z" />
            </svg>
            <p className="text-slate-300 font-medium">클릭하여 사진 첨부</p>
          </div>
        )}
        <input 
          type="file" 
          accept="image/jpeg, image/png" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>

      {/* 하단 컨트롤 영역 */}
      <div className="mt-6 flex flex-col gap-3">
        {photoFile && (
          <button 
            onClick={handleClear}
            className="text-sm text-slate-400 hover:text-rose-400 transition-colors self-end"
          >
            ❌ 다른 사진으로 변경
          </button>
        )}
        <button 
          onClick={handleGenerateClick}
          disabled={!photoFile || isLoading}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          {isLoading ? 'AI 마네킹 추출 중...' : '3D 마네킹 생성 시작'}
        </button>
      </div>
    </div>
  )
}
