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
      setModelUrl(null)
    }
  }

  const handleGenerateClick = () => {
    if (!photoFile) return
    setIsLoading(true)
    setTimeout(() => {
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
    <div className="flex flex-col h-full p-6">
      {/* Title */}
      <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">3D Fitting Room</h2>
      <p className="text-sm text-gray-400 mb-6">Refine your silhouette in the digital atelier.</p>

      {/* Step Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-blue-500 font-bold text-sm">01</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">Photo Upload</span>
      </div>

      {/* Photo Preview / Upload */}
      <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-[3/4] mb-4 group cursor-pointer">
        {photoPreviewUrl ? (
          <img src={photoPreviewUrl} alt="User Upload" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-blue-400 transition-colors pointer-events-none">
            <svg className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs font-medium">Click to upload photo</span>
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg, image/png"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>

      {/* Status Indicator */}
      {photoFile && (
        <div className="flex items-center gap-3 mb-4 px-1">
          <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px]">✓</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">Image Processed</p>
            <p className="text-xs text-gray-400">Optimal lighting detected</p>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerateClick}
        disabled={!photoFile || isLoading}
        className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] shadow-md shadow-blue-500/20 disabled:shadow-none"
      >
        {isLoading ? 'Processing...' : 'Start 3D Generation'}
      </button>

      {photoFile && (
        <button
          onClick={handleClear}
          className="mt-3 text-xs text-gray-400 hover:text-red-400 transition-colors self-center"
        >
          Change photo
        </button>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 my-6" />

      {/* Current Selection (placeholder) */}
      <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Current Selection</h3>
      <div className="flex gap-3">
        <div className="w-24 h-28 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
          <span className="text-3xl">👕</span>
        </div>
        <div className="w-24 h-28 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-300 hover:text-blue-400 hover:border-blue-300 transition-colors cursor-pointer">
          <span className="text-xl">+</span>
          <span className="text-[9px] font-semibold uppercase mt-1">Add Bottoms</span>
        </div>
      </div>
    </div>
  )
}
