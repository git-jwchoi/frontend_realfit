import React from 'react'

export const AboutPanel: React.FC = () => {
  return (
    <div className="w-full bg-white text-gray-900 selection:bg-blue-100 min-h-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-32 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-6xl md:text-7xl font-serif font-light leading-tight mb-8">
            Redefining <br />
            <span className="font-bold">Digital</span> Fitting
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-lg mb-10">
            RealFIT combines cutting-edge AI rendering with true-to-life 3D topology to help you visualize garments before you buy. Experience sustainable fashion directly from your screen.
          </p>
          <div className="flex gap-6 items-center border-l-2 border-gray-900 pl-6 h-20">
            <div className="flex flex-col">
              <span className="text-3xl font-bold font-serif mb-1 uppercase tracking-tight">0%</span>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Data Kept</span>
            </div>
            <div className="flex flex-col border-l border-gray-200 pl-6">
              <span className="text-3xl font-bold font-serif mb-1 uppercase tracking-tight">40+</span>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Garments</span>
            </div>
            <div className="flex flex-col border-l border-gray-200 pl-6">
              <span className="text-3xl font-bold font-serif mb-1 uppercase tracking-tight">3s</span>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Latency</span>
            </div>
          </div>
        </div>
        <div className="relative h-[60vh] bg-gray-100 rounded-3xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop" 
            alt="Virtual Fitting Model" 
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
          />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl border border-white/20 text-white">
              <h3 className="text-sm font-bold tracking-widest uppercase mb-2">Sustainable Fashion</h3>
              <p className="text-sm font-light leading-relaxed opacity-90">Reducing global fashion carbon footprints by virtually previewing clothes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-gray-50 py-32 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-serif mb-6">Built on Privacy</h2>
            <p className="text-gray-500 font-light leading-relaxed text-lg">
              We understand the sensitivity of your personal body data. That's why RealFIT is designed from the ground up to prioritize your privacy above all else.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: '🔒', 
                title: 'No Image Storage', 
                desc: 'All photos uploaded to the Atelier are processed entirely in memory. Your images are never saved to our database or any third-party servers.'
              },
              { 
                icon: '⚡', 
                title: 'Real-Time Edge AI', 
                desc: 'By leveraging WebGL and optimized diffusion pipelines, our fitting is generated securely and instantly on demanding infrastructures.'
              },
              { 
                icon: '🎯', 
                title: 'Parametric 3D Avatars', 
                desc: 'Instead of scanning your exact topology, we use a scalable parametric model (SCULPT) to guarantee absolute anonymity.'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-500">
                <span className="text-4xl mb-6 block border border-gray-100 w-16 h-16 rounded-xl flex items-center justify-center bg-gray-50">{feature.icon}</span>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-100 pb-4">{feature.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer className="w-full text-center py-12 border-t border-gray-200 text-gray-400 text-sm font-mono uppercase tracking-widest">
        © 2026 RealFIT Technologies
      </footer>
    </div>
  )
}
