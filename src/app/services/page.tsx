'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MapPin, Filter, Star, Clock, ChevronDown, X } from 'lucide-react'

interface Service {
  id: number
  titre: string
  description: string
  tarif: number
  type_tarif: string
  mis_en_avant: boolean
  prestataire: {
    id: number
    user: {
      nom: string
      prenom: string
    }
    note_globale: number
    quartier?: {
      nom: string
      ville: {
        nom: string
      }
    }
  }
  categorie: {
    id: number
    nom: string
    slug: string
  }
}

interface Categorie {
  id: number
  nom: string
  slug: string
}

const categories = [
  { id: 1, nom: 'Plomberie', slug: 'plomberie' },
  { id: 2, nom: 'Électricité', slug: 'electricite' },
  { id: 3, nom: 'Ménage', slug: 'menage' },
  { id: 4, nom: 'Peinture', slug: 'peinture' },
  { id: 5, nom: 'Climatisation', slug: 'climatisation' },
  { id: 6, nom: 'Menuiserie', slug: 'menuiserie' },
  { id: 7, nom: 'Traiteur', slug: 'traiteur' },
  { id: 8, nom: 'Mécanique', slug: 'mecanique' },
  { id: 9, nom: 'Déménagement', slug: 'demenagement' },
  { id: 10, nom: 'Jardinage', slug: 'jardinage' },
]

const villes = ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Diourbel', 'Louga', 'Tambacounda']

// Données de démonstration
const servicesDemo: Service[] = [
  {
    id: 1,
    titre: 'Installation Climatiseur',
    description: 'Installation complète de climatiseur split avec garantie 1 an',
    tarif: 25000,
    type_tarif: 'FORFAIT',
    mis_en_avant: true,
    prestataire: {
      id: 1,
      user: { nom: 'Diallo', prenom: 'Mamadou' },
      note_globale: 4.9,
      quartier: { nom: 'Almadies', ville: { nom: 'Dakar' } }
    },
    categorie: { id: 5, nom: 'Climatisation', slug: 'climatisation' }
  },
  {
    id: 2,
    titre: 'Nettoyage Complet Maison',
    description: 'Nettoyage professionnel de votre maison ou appartement',
    tarif: 15000,
    type_tarif: 'FORFAIT',
    mis_en_avant: true,
    prestataire: {
      id: 2,
      user: { nom: 'Sow', prenom: 'Fatou' },
      note_globale: 4.8,
      quartier: { nom: 'Pikine', ville: { nom: 'Dakar' } }
    },
    categorie: { id: 3, nom: 'Ménage', slug: 'menage' }
  },
  {
    id: 3,
    titre: 'Réparation Plomberie',
    description: 'Réparation de fuites, débouchage, installation sanitaire',
    tarif: 10000,
    type_tarif: 'HEURE',
    mis_en_avant: true,
    prestataire: {
      id: 3,
      user: { nom: 'Tall', prenom: 'Omar' },
      note_globale: 4.7,
      quartier: { nom: 'Médina', ville: { nom: 'Dakar' } }
    },
    categorie: { id: 1, nom: 'Plomberie', slug: 'plomberie' }
  },
  {
    id: 4,
    titre: 'Installation Électrique',
    description: 'Installation et mise aux normes électriques',
    tarif: 20000,
    type_tarif: 'FORFAIT',
    mis_en_avant: false,
    prestataire: {
      id: 4,
      user: { nom: 'Ndiaye', prenom: 'Ibrahima' },
      note_globale: 4.7,
      quartier: { nom: 'Centre', ville: { nom: 'Thiès' } }
    },
    categorie: { id: 2, nom: 'Électricité', slug: 'electricite' }
  },
  {
    id: 5,
    titre: 'Peinture Intérieure',
    description: 'Peinture de qualité pour vos intérieurs',
    tarif: 5000,
    type_tarif: 'M2',
    mis_en_avant: false,
    prestataire: {
      id: 5,
      user: { nom: 'Ba', prenom: 'Aissatou' },
      note_globale: 4.9,
      quartier: { nom: 'Plateau', ville: { nom: 'Dakar' } }
    },
    categorie: { id: 4, nom: 'Peinture', slug: 'peinture' }
  },
  {
    id: 6,
    titre: 'Service Traiteur Événement',
    description: 'Cuisine sénégalaise traditionnelle pour vos événements',
    tarif: 50000,
    type_tarif: 'FORFAIT',
    mis_en_avant: false,
    prestataire: {
      id: 6,
      user: { nom: 'Gueye', prenom: 'Mariama' },
      note_globale: 4.8,
      quartier: { nom: 'Grand Dakar', ville: { nom: 'Dakar' } }
    },
    categorie: { id: 7, nom: 'Traiteur', slug: 'traiteur' }
  },
]

export default function Services() {
  const [services, setServices] = useState<Service[]>(servicesDemo)
  const [filteredServices, setFilteredServices] = useState<Service[]>(servicesDemo)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  const [filters, setFilters] = useState({
    search: '',
    categorie: '',
    ville: '',
    vedette: false
  })

  useEffect(() => {
    let result = services

    if (filters.search) {
      result = result.filter(s => 
        s.titre.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.categorie) {
      result = result.filter(s => s.categorie.slug === filters.categorie)
    }

    if (filters.ville) {
      result = result.filter(s => 
        s.prestataire.quartier?.ville.nom.toLowerCase() === filters.ville.toLowerCase()
      )
    }

    if (filters.vedette) {
      result = result.filter(s => s.mis_en_avant)
    }

    setFilteredServices(result)
  }, [filters, services])

  const clearFilters = () => {
    setFilters({
      search: '',
      categorie: '',
      ville: '',
      vedette: false
    })
  }

  const formatTarif = (tarif: number, type: string) => {
    const formatted = tarif.toLocaleString('fr-FR')
    switch (type) {
      case 'HEURE': return `${formatted} CFA/h`
      case 'M2': return `${formatted} CFA/m²`
      case 'JOUR': return `${formatted} CFA/jour`
      default: return `À partir de ${formatted} CFA`
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Nos Services</h1>
          <p className="text-gray-600">Trouvez le service dont vous avez besoin</p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>

            {/* Catégorie */}
            <div className="relative lg:w-48">
              <select
                value={filters.categorie}
                onChange={(e) => setFilters({ ...filters, categorie: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white"
              >
                <option value="">Toutes catégories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>{cat.nom}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Ville */}
            <div className="relative lg:w-48">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filters.ville}
                onChange={(e) => setFilters({ ...filters, ville: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white"
              >
                <option value="">Toutes les villes</option>
                {villes.map(ville => (
                  <option key={ville} value={ville}>{ville}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Bouton filtre mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtres
            </button>
          </div>

          {/* Filtres supplémentaires */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.vedette}
                onChange={(e) => setFilters({ ...filters, vedette: e.target.checked })}
                className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Services en vedette uniquement</span>
            </label>

            {(filters.search || filters.categorie || filters.ville || filters.vedette) && (
              <button
                onClick={clearFilters}
                className="flex items-center text-sm text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4 mr-1" />
                Effacer les filtres
              </button>
            )}

            <span className="ml-auto text-sm text-gray-500">
              {filteredServices.length} service(s) trouvé(s)
            </span>
          </div>
        </div>

        {/* Liste des services */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun service trouvé</h3>
            <p className="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={clearFilters}
              className="text-secondary hover:underline"
            >
              Effacer les filtres
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <Link 
                key={service.id} 
                href={`/services/${service.id}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group"
              >
                {/* Image placeholder */}
                <div className="h-40 bg-gradient-to-br from-secondary/20 to-primary/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-primary/20">
                      {service.titre.charAt(0)}
                    </span>
                  </div>
                  {service.mis_en_avant && (
                    <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      En vedette
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-white text-primary text-xs font-medium px-2 py-1 rounded-full">
                    {service.categorie.nom}
                  </span>
                </div>

                {/* Contenu */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary transition">
                    {service.titre}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Tarif */}
                  <p className="text-secondary font-semibold mb-4">
                    {formatTarif(service.tarif, service.type_tarif)}
                  </p>

                  {/* Prestataire */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {service.prestataire.user.prenom.charAt(0)}{service.prestataire.user.nom.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {service.prestataire.user.prenom} {service.prestataire.user.nom}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {service.prestataire.quartier?.ville.nom || 'Dakar'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{service.prestataire.note_globale}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
