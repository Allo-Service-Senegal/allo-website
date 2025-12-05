'use client'
import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Temoignage {
  id: number
  nom_client: string
  quartier: string
  contenu: string
  note: number
  photo?: string
}

export default function Temoignages() {
  const [temoignages, setTemoignages] = useState<Temoignage[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchTemoignages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/temoignages`)
        if (res.ok) {
          const data = await res.json()
          if (data.data && data.data.length > 0) {
            setTemoignages(data.data)
          }
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTemoignages()
  }, [])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % temoignages.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + temoignages.length) % temoignages.length)

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Ce que disent nos clients</h2>
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (temoignages.length === 0) {
    return null
  }

  const current = temoignages[currentIndex]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <h2 className="section-title">Ce que disent nos clients</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {temoignages.length > 1 && (
              <>
                <button 
                  onClick={prevSlide} 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-200 z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextSlide} 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-200 z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-secondary/20 rounded-full flex items-center justify-center">
                <Quote className="text-secondary" size={32} />
              </div>
              <p className="text-xl lg:text-2xl text-gray-700 italic mb-8 leading-relaxed">
                "{current.contenu}"
              </p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < current.note ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} 
                  />
                ))}
              </div>
              <div>
                <div className="font-bold text-primary text-lg">{current.nom_client}</div>
                <div className="text-gray-500">{current.quartier}</div>
              </div>
            </div>
          </div>
          {temoignages.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {temoignages.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentIndex(index)} 
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-secondary' : 'bg-gray-300'
                  }`} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
