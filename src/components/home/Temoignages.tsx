'use client'
import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const temoignages = [
  { id: '1', nomClient: 'Aminata Bâ', quartier: 'Almadies, Dakar', contenu: 'Service rapide et professionnel. Mon climatiseur a été réparé en moins de 2h ! Je recommande vivement Allo Service Sénégal.', note: 5 },
  { id: '2', nomClient: 'Moussa Diop', quartier: 'Plateau, Dakar', contenu: 'Très satisfait du service de ménage. Fatou est ponctuelle, efficace et très professionnelle.', note: 5 },
  { id: '3', nomClient: 'Khady Ndiaye', quartier: 'Pikine, Dakar', contenu: 'Excellent plombier trouvé en quelques minutes. Prix raisonnable et travail de qualité.', note: 4 },
]

export default function Temoignages() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % temoignages.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + temoignages.length) % temoignages.length)

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <h2 className="section-title">Ce que disent nos clients</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-200 z-10"><ChevronLeft size={24} /></button>
            <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-200 z-10"><ChevronRight size={24} /></button>
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-secondary/20 rounded-full flex items-center justify-center"><Quote className="text-secondary" size={32} /></div>
              <p className="text-xl lg:text-2xl text-gray-700 italic mb-8 leading-relaxed">"{temoignages[currentIndex].contenu}"</p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (<Star key={i} size={20} className={i < temoignages[currentIndex].note ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />))}
              </div>
              <div><div className="font-bold text-primary text-lg">{temoignages[currentIndex].nomClient}</div><div className="text-gray-500">{temoignages[currentIndex].quartier}</div></div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-8">
            {temoignages.map((_, index) => (<button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-secondary' : 'bg-gray-300'}`} />))}
          </div>
        </div>
      </div>
    </section>
  )
}
