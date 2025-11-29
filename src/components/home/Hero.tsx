'use client'

import { Search, MapPin, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVille, setSelectedVille] = useState('dakar')

  const quickLinks = ['Plomberie', 'Électricité', 'Ménage', 'Peinture', 'Climatisation']
  const stats = [
    { value: '500+', label: 'Prestataires' },
    { value: 'Garanti', label: 'Service qualité' },
    { value: 'Wave', label: 'Paiement sécurisé' },
  ]
  const villes = [
    { value: 'dakar', label: 'Dakar' },
    { value: 'thies', label: 'Thiès' },
    { value: 'saint-louis', label: 'Saint-Louis' },
    { value: 'kaolack', label: 'Kaolack' },
    { value: 'ziguinchor', label: 'Ziguinchor' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/services?q=${searchQuery}&ville=${selectedVille}`)
  }

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-700 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn">
            Trouvez les meilleurs artisans
            <span className="text-secondary block mt-2">près de chez vous</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Plombiers, électriciens, agents de ménage, peintres... 
            Tous les professionnels dont vous avez besoin, à portée de clic.
          </p>

          <form onSubmit={handleSearch} className="bg-white rounded-xl p-2 shadow-2xl max-w-3xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Que recherchez-vous ?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div className="relative min-w-[180px]">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={selectedVille}
                  onChange={(e) => setSelectedVille(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary appearance-none cursor-pointer"
                >
                  {villes.map((ville) => (
                    <option key={ville.value} value={ville.value}>{ville.label}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-secondary px-8 py-4 flex items-center justify-center space-x-2">
                <Search size={20} />
                <span>Rechercher</span>
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {quickLinks.map((link) => (
              <a
                key={link}
                href={`/services?categorie=${link.toLowerCase()}`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="text-secondary" size={24} />
                <div className="text-left">
                  <div className="font-bold text-lg">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
