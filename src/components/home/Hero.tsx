'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Wrench, Zap, SprayCan, Paintbrush, CheckCircle, Star } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Stats {
  prestataires: number
  clients: number
  regions: number
}

export default function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVille, setSelectedVille] = useState('')
  const [stats, setStats] = useState<Stats>({
    prestataires: 0,
    clients: 0,
    regions: 14
  })

  // Charger les stats au montage
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/stats/public`)
        if (res.ok) {
          const data = await res.json()
          if (data.success && data.data) {
            setStats({
              prestataires: data.data.prestataires || 0,
              clients: data.data.clients || 0,
              regions: data.data.regions || 14
            })
          }
        }
      } catch (error) {
        console.error('Erreur chargement stats:', error)
      }
    }
    fetchStats()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams()
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim())
    }
    if (selectedVille && selectedVille !== 'Toutes les villes') {
      params.set('ville', selectedVille)
    }
    
    const queryString = params.toString()
    router.push(`/services${queryString ? `?${queryString}` : ''}`)
  }

  // Formater les nombres (ex: 1500 -> "1 500+")
  const formatNumber = (num: number) => {
    if (num === 0) return '...'
    return num.toLocaleString('fr-FR') + '+'
  }

  return (
    <section className="bg-primary text-white py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu gauche */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Trouvez le prestataire idéal près de chez vous
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Plombiers, électriciens, ménage et plus. Des professionnels vérifiés à votre service partout au Sénégal.
              </p>

              {/* Barre de recherche */}
              <form onSubmit={handleSearch} className="bg-white rounded-xl p-2 flex flex-col sm:flex-row gap-2 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Quel service recherchez-vous ?"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <select 
                    value={selectedVille}
                    onChange={(e) => setSelectedVille(e.target.value)}
                    className="w-full sm:w-48 pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none appearance-none bg-white border-l sm:border-l-gray-200"
                  >
                    <option value="">Toutes les villes</option>
                    <option value="Dakar">Dakar</option>
                    <option value="Thiès">Thiès</option>
                    <option value="Saint-Louis">Saint-Louis</option>
                    <option value="Kaolack">Kaolack</option>
                    <option value="Ziguinchor">Ziguinchor</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition font-medium"
                >
                  Rechercher
                </button>
              </form>

              {/* Liens rapides */}
              <div className="mb-8">
                <p className="text-white/70 text-sm mb-3">Recherches populaires :</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/services?categorie=plomberie" className="flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">
                    <Wrench className="w-4 h-4 mr-2" />
                    Plomberie
                  </Link>
                  <Link href="/services?categorie=electricite" className="flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">
                    <Zap className="w-4 h-4 mr-2" />
                    Électricité
                  </Link>
                  <Link href="/services?categorie=menage" className="flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">
                    <SprayCan className="w-4 h-4 mr-2" />
                    Ménage
                  </Link>
                  <Link href="/services?categorie=peinture" className="flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">
                    <Paintbrush className="w-4 h-4 mr-2" />
                    Peinture
                  </Link>
                </div>
              </div>

              {/* Stats dynamiques */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold">{formatNumber(stats.prestataires)}</p>
                  <p className="text-white/70">Prestataires</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{formatNumber(stats.clients)}</p>
                  <p className="text-white/70">Clients satisfaits</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.regions}</p>
                  <p className="text-white/70">Régions couvertes</p>
                </div>
              </div>
            </div>

            {/* Image droite */}
            <div className="hidden lg:block relative">
              <Image 
                src="/images/hero-image.jpg" 
                alt="Prestataires Allo Service Sénégal"
                width={600}
                height={450}
                className="rounded-2xl shadow-2xl object-cover"
                priority
              />
              
              {/* Badge vérifié */}
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-4 py-3 rounded-xl shadow-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-medium">Prestataires vérifiés</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}