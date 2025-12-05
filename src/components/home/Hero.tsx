'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Wrench, Zap, SprayCan, Paintbrush, CheckCircle, Star } from 'lucide-react'

export default function Hero() {
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
              <div className="bg-white rounded-xl p-2 flex flex-col sm:flex-row gap-2 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Quel service recherchez-vous ?"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full sm:w-48 pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none appearance-none bg-white border-l sm:border-l-gray-200">
                    <option>Toutes les villes</option>
                    <option>Dakar</option>
                    <option>Thiès</option>
                    <option>Saint-Louis</option>
                    <option>Kaolack</option>
                    <option>Ziguinchor</option>
                  </select>
                </div>
                <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition font-medium">
                  Rechercher
                </button>
              </div>

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

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-white/70">Prestataires</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">1000+</p>
                  <p className="text-white/70">Clients satisfaits</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">14</p>
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
              
              {/* Badge note */}
              <div className="absolute -top-4 -right-4 bg-white text-gray-900 px-4 py-3 rounded-xl shadow-lg flex items-center">
                <Star className="w-5 h-5 text-yellow-500 fill-current mr-2" />
                <span className="font-medium">Note moyenne 4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
