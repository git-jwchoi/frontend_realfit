import React, { useState } from 'react'
import { useFittingStore } from '../../store/useFittingStore'
import { MOCK_PRODUCTS, CATEGORIES } from '../../data/mockProducts'

export const HomePanel: React.FC = () => {
  const { setClothing, setCurrentPage } = useFittingStore()
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const handleTryOn = async (product: typeof MOCK_PRODUCTS[0]) => {
    setLoadingProductId(product.id)
    try {
      // 1. URL의 이미지를 비동기로 다운로드 (CORS 문제 우회를 위해 fetch 처리)
      const response = await fetch(product.imageUrl)
      const blob = await response.blob()
      
      // 2. 내려받은 Blob 이미지를 프론트엔드 File 객체로 강제 캐스팅(포장)
      const file = new File([blob], `${product.id}_clothing.jpg`, { type: blob.type })
      
      // 3. 상태 저장소에 선택된 옷을 주입하고 화면을 3D 피팅룸으로 넘김
      setClothing(file, product.imageUrl)
      setCurrentPage('ATELIER')
    } catch (error) {
      console.error("Failed to load image for Try-On", error)
      alert("이미지를 불러오는데 실패했습니다.")
    } finally {
      setLoadingProductId(null)
    }
  }

  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <div className="w-full min-h-full bg-[#f9fafb] p-8 md:p-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
            New Arrivals
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto break-keep">
            이번 시즌 새롭게 입고된 컬렉션을 만나보세요. 마음에 드는 의류를 선택하고 "Try On in 3D" 버튼을 클릭하면, 제품 구매 전 나의 3D 디지털 아바타에 직접 입혀볼 수 있습니다.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex justify-center gap-3 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(category => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all ${
                activeCategory === category 
                  ? 'bg-gray-900 text-white shadow-md cursor-default' 
                  : 'bg-white text-gray-400 hover:text-gray-900 border border-gray-200 hover:border-gray-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col cursor-pointer">
              
              {/* Product Image Container */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Try On Button Overlay */}
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTryOn(product);
                    }}
                    disabled={loadingProductId === product.id}
                    className="translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-6 py-3 bg-white text-gray-900 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingProductId === product.id ? 'Loading...' : 'Try On in 3D'}
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">
                  {product.brand}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <span className="text-sm text-gray-600">
                  ₩{product.price.toLocaleString()}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
