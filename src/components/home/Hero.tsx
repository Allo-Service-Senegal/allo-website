'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, MapPin, Wrench, Zap, SprayCan, Paintbrush } from 'lucide-react'

export default function Hero() {
  const [service, setService] = useState('')
  const [ville, setVille] = useState('')

  const liensRapides = [
    { nom: 'Plomberie', icon: Wrench },
    { nom: 'Électricité', icon: Zap },
    { nom: 'Ménage', icon: SprayCan },
    { nom: 'Peinture', icon: Paintbrush },
  ]

  return (
    <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Texte à gauche */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
              Trouvez le prestataire idéal près de chez vous
            </h1>
            <p className="text-lg lg:text-xl mb-6 lg:mb-8 text-white/90">
              Plombiers, électriciens, ménage et plus. Des professionnels vérifiés à votre service partout au Sénégal.
            </p>

            {/* Barre de recherche */}
            <div className="bg-white rounded-xl p-3 lg:p-4 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Quel service recherchez-vous ?"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary text-gray-800"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary text-gray-800 appearance-none bg-white"
                  >
                    <option value="">Toutes les villes</option>
                    <option value="dakar">Dakar</option>
                    <option value="thies">Thiès</option>
                    <option value="saint-louis">Saint-Louis</option>
                    <option value="kaolack">Kaolack</option>
                    <option value="ziguinchor">Ziguinchor</option>
                  </select>
                </div>
                <button className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-6 lg:px-8 py-3 rounded-lg transition whitespace-nowrap">
                  Rechercher
                </button>
              </div>
            </div>

            {/* Liens rapides */}
            <div className="mt-6 lg:mt-8">
              <p className="text-white/80 mb-3">Recherches populaires :</p>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {liensRapides.map((lien) => (
                  <button
                    key={lien.nom}
                    className="flex items-center bg-white/10 hover:bg-white/20 px-3 lg:px-4 py-2 rounded-full transition text-sm lg:text-base"
                  >
                    <lien.icon className="w-4 h-4 mr-2" />
                    {lien.nom}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 lg:mt-10 grid grid-cols-3 gap-4 lg:gap-8">
              <div>
                <p className="text-2xl lg:text-3xl font-bold">500+</p>
                <p className="text-white/80 text-sm lg:text-base">Prestataires</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold">1000+</p>
                <p className="text-white/80 text-sm lg:text-base">Clients satisfaits</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold">14</p>
                <p className="text-white/80 text-sm lg:text-base">Régions couvertes</p>
              </div>
            </div>
          </div>

          {/* Image à droite */}
          <div className="hidden lg:block">
            <div className="relative">
              <Image 
                src="/images/hero-image.jpg" 
                alt="Prestataires Allo Service Sénégal"
                width={600}
                height={450}
                className="rounded-2xl shadow-2xl object-cover"
                priority
              />
              {/* Badge flottant */}
              <div className="absolute -bottom-4 -left-4 bg-white text-primary px-4 py-3 rounded-xl shadow-lg">
                <p className="text-sm font-semibold">✅ Prestataires vérifiés</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-secondary text-primary px-4 py-3 rounded-xl shadow-lg">
                <p className="text-sm font-semibold">⭐ Note moyenne 4.8/5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
