import React, { useRef } from 'react'
import { useFittingStore } from '../../store/useFittingStore'
import { generate3DModel, generateVTONResult } from '../../api'

const COLOR_SWATCHES = [
  { name: 'Original', hex: 'transparent' },
  { name: 'Black', hex: '#111111' },
  { name: 'Red', hex: '#E53935' },
  { name: 'Blue', hex: '#1E88E5' },
  { name: 'Green', hex: '#43A047' },
]

export const UploadPanel: React.FC = () => {
  const { 
    photoFile, photoPreviewUrl, 
    clothingFile, clothingPreviewUrl, customColor,
    isLoading, 
    setPhoto, setClothing, setCustomColor,
    setIsLoading, setModelUrl, setVtonResultUrl, setActiveTab 
  } = useFittingStore()
  
  const photoInputRef = useRef<HTMLInputElement>(null)
  const clothingInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const previewUrl = URL.createObjectURL(file)
      setPhoto(file, previewUrl)
      // 초기화
      setModelUrl(null)
      setVtonResultUrl(null)
    }
  }

  const handleClothingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const previewUrl = URL.createObjectURL(file)
      setClothing(file, previewUrl)
    }
  }

  const handleGenerate3D = async () => {
    if (!photoFile) return
    setIsLoading(true)
    try {
      const url = await generate3DModel(photoFile)
      setModelUrl(url)
      setActiveTab('3d')
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateVTON = async () => {
    if (!photoFile || !clothingFile) return
    setIsLoading(true)
    try {
      const url = await generateVTONResult(photoFile, clothingFile, customColor)
      setVtonResultUrl(url)
      setActiveTab('2d')
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearPhoto = () => {
    setPhoto(null, null)
    setModelUrl(null)
    setVtonResultUrl(null)
    if (photoInputRef.current) photoInputRef.current.value = ''
  }

  const handleClearClothing = () => {
    setClothing(null, null)
    if (clothingInputRef.current) clothingInputRef.current.value = ''
  }

  return (
    <div className="flex flex-col h-full p-6">
      <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">3D Fitting Room</h2>
      <p className="text-sm text-gray-400 mb-6">Refine your silhouette in the digital atelier.</p>

      {/* 01: Photo Upload */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-blue-500 font-bold text-sm">01</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">Photo Upload</span>
      </div>

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
          onChange={handlePhotoChange}
          ref={photoInputRef}
        />
      </div>

      <button
        onClick={handleGenerate3D}
        disabled={!photoFile || isLoading}
        className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
      >
        {isLoading ? 'Processing...' : 'Generate 3D Avatar'}
      </button>

      {photoFile && (
        <button onClick={handleClearPhoto} className="mt-3 text-xs text-gray-400 hover:text-red-400 transition-colors self-center">
          Change body photo
        </button>
      )}

      <div className="border-t border-gray-200 my-6" />

      {/* 02: Clothing Upload */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-blue-500 font-bold text-sm">02</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">Clothing Upload</span>
      </div>

      <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-square mb-4 group cursor-pointer flex items-center justify-center">
        {clothingPreviewUrl ? (
          <>
            <img src={clothingPreviewUrl} alt="Clothing Upload" className="w-full h-full object-cover" />
            {/* 선택된 색상을 우측 상단에 작게 표시 (전체 필터 제거) */}
            {customColor !== 'transparent' && (
              <div 
                className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center bg-white"
              >
                <div 
                  className="w-full h-full rounded-full" 
                  style={{ backgroundColor: customColor }} 
                />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-blue-400 transition-colors pointer-events-none">
            <span className="text-3xl mb-2">👕</span>
            <span className="text-xs font-medium">Click to upload garment</span>
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg, image/png"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleClothingChange}
          ref={clothingInputRef}
        />
      </div>

      {/* Color Customization Palette */}
      {clothingFile && (
        <div className="mb-6 flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Customize Color</span>
          <div className="flex justify-center gap-3 bg-gray-50 p-2 rounded-full border border-gray-200 shadow-inner mb-1">
            {COLOR_SWATCHES.map((swatch) => (
              <button
                key={swatch.hex}
                onClick={() => setCustomColor(swatch.hex)}
                className={`w-7 h-7 rounded-full shadow-sm transition-all relative ${customColor === swatch.hex ? 'scale-125 ring-2 ring-offset-2 ring-blue-500' : 'hover:scale-110'}`}
                style={{
                  backgroundColor: swatch.hex === 'transparent' ? '#fff' : swatch.hex,
                  backgroundImage: swatch.hex === 'transparent' ? 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)' : 'none',
                  backgroundPosition: '0 0, 4px 4px',
                  backgroundSize: '8px 8px',
                }}
                title={swatch.name}
              />
            ))}
          </div>
          <p className="text-[9px] text-gray-400 text-center leading-tight">
            * AI applies realistic dye to the fabric <br /> excluding the background.
          </p>
        </div>
      )}

      <button
        onClick={handleGenerateVTON}
        disabled={!photoFile || !clothingFile || isLoading}
        className="w-full py-3.5 bg-gray-900 hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-gray-900/20 active:scale-[0.98]"
      >
        {isLoading ? 'Processing...' : 'Start Virtual Fitting'}
      </button>

      {clothingFile && (
        <button onClick={handleClearClothing} className="mt-3 text-xs text-gray-400 hover:text-red-400 transition-colors self-center">
          Change clothing photo
        </button>
      )}
    </div>
  )
}
