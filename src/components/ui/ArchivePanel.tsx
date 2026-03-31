import React from 'react'
import { useFittingStore } from '../../store/useFittingStore'

const MOCK_ARCHIVES = [
  {
    id: 1,
    date: '2026.03.31',
    description: 'Casual Spring Look',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    tags: ['Daily', 'Denim']
  },
  {
    id: 2,
    date: '2026.03.28',
    description: 'Formal Setup for Interview',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    tags: ['Suit', 'Dark']
  },
  {
    id: 3,
    date: '2026.03.25',
    description: 'Weekend Streetwear',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop',
    tags: ['Street', 'Oversized']
  },
  {
    id: 4,
    date: '2026.03.10',
    description: 'Summer Vibe Check',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop',
    tags: ['Summer', 'Tee']
  },
  {
    id: 5,
    date: '2026.02.14',
    description: 'Valentine Date Outfit',
    imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop',
    tags: ['Date', 'Knit']
  },
]

export const ArchivePanel: React.FC = () => {
  const { setCurrentPage, setVtonResultUrl, setActiveTab } = useFittingStore()

  const handleLoadArchive = (imageUrl: string) => {
    setVtonResultUrl(imageUrl)
    setActiveTab('2d')
    setCurrentPage('ATELIER')
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-12">
      <div className="flex flex-col mb-12 border-b border-gray-200 pb-8">
        <h2 className="text-4xl font-serif font-medium text-gray-900 mb-3 tracking-tight">My Virtual Closet</h2>
        <p className="text-gray-500 font-light flex items-center justify-between">
          <span>Explore and revisit your previously generated VTON results.</span>
          <span className="text-xs font-bold tracking-widest uppercase bg-gray-100 px-3 py-1 rounded-full">{MOCK_ARCHIVES.length} Saved</span>
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {MOCK_ARCHIVES.map((item) => (
          <div key={item.id} className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img 
                src={item.imageUrl} 
                alt={item.description} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <button 
                  onClick={() => handleLoadArchive(item.imageUrl)}
                  className="w-full py-3 bg-white text-gray-900 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                >
                  Load to Atelier
                </button>
              </div>
            </div>
            <div className="p-5 border border-t-0 border-gray-100 rounded-b-2xl">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 text-lg leading-tight">{item.description}</h3>
                <span className="text-xs text-gray-400 font-mono tracking-tighter shrink-0">{item.date}</span>
              </div>
              <div className="flex gap-2 flex-wrap mt-3">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State Mock */}
      {MOCK_ARCHIVES.length === 0 && (
        <div className="py-32 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl text-gray-300">📦</span>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your closet is empty</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't saved any virtual try-on results yet. Go to the Atelier and generate your first fit.</p>
          <button 
            onClick={() => setCurrentPage('ATELIER')}
            className="px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-colors"
          >
            Open Atelier
          </button>
        </div>
      )}
    </div>
  )
}
