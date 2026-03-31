import React from 'react'
import { useFittingStore } from '../../store/useFittingStore'

export const SculptPanel: React.FC = () => {
  const { modelUrl, bodyParams, setBodyParams, setActiveTool } = useFittingStore()

  // 슬라이더 변경 핸들러
  const handleSliderChange = (param: keyof typeof bodyParams, value: number) => {
    setBodyParams({ [param]: value })
  }

  // 값이 기본값(1.0)인지 확인해 초기화 버튼 활성화 제어
  const isModified = bodyParams.height !== 1.0 || bodyParams.width !== 1.0 || bodyParams.depth !== 1.0

  return (
    <div className="flex flex-col h-full p-6 animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-serif text-2xl font-bold text-gray-900">Body Sculpting</h2>
        <button 
          onClick={() => setActiveTool('VIEW')}
          className="text-gray-400 hover:text-gray-900 transition-colors w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold"
        >
          ✕
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-8">Adjust the overall proportions of the generated avatar.</p>

      {!modelUrl ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 text-gray-400">
          <span className="text-4xl mb-3">🧍‍♂️</span>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2">No Avatar Found</p>
          <p className="text-xs">Please generate a 3D avatar first in the VIEW tab.</p>
          <button 
            onClick={() => setActiveTool('VIEW')}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-sm"
          >
            Go to Upload
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Height Slider */}
          <div className="group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-700 flex items-center gap-2">
                <span className="text-lg">↕️</span> Height
              </span>
              <span className="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold border border-blue-100">
                {Math.round(bodyParams.height * 100)}%
              </span>
            </div>
            <input 
              type="range" 
              min="0.8" max="1.2" step="0.01" 
              value={bodyParams.height}
              onChange={(e) => handleSliderChange('height', parseFloat(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
              <span>Shorter</span>
              <span>Taller</span>
            </div>
          </div>

          {/* Width Slider */}
          <div className="group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-700 flex items-center gap-2">
                <span className="text-lg">↔️</span> Width (Shoulders)
              </span>
              <span className="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold border border-blue-100">
                {Math.round(bodyParams.width * 100)}%
              </span>
            </div>
            <input 
              type="range" 
              min="0.75" max="1.25" step="0.01" 
              value={bodyParams.width}
              onChange={(e) => handleSliderChange('width', parseFloat(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
              <span>Slimmer</span>
              <span>Broader</span>
            </div>
          </div>

          {/* Depth Slider */}
          <div className="group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-700 flex items-center gap-2">
                <span className="text-lg">🔄</span> Depth (Chest/Belly)
              </span>
              <span className="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold border border-blue-100">
                {Math.round(bodyParams.depth * 100)}%
              </span>
            </div>
            <input 
              type="range" 
              min="0.5" max="1.5" step="0.01" 
              value={bodyParams.depth}
              onChange={(e) => handleSliderChange('depth', parseFloat(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
              <span>Thinner</span>
              <span>Thicker</span>
            </div>
          </div>

          {/* Reset Button */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <button 
              onClick={() => setBodyParams({ height: 1.0, width: 1.0, depth: 1.0 })}
              disabled={!isModified}
              className="w-full py-3 bg-white border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:scale-[0.98]"
            >
              Reset Proportions
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
