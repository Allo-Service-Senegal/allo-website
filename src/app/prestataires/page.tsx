'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MapPin, Filter, Star, CheckCircle, Briefcase, ChevronDown, X } from 'lucide-react'

interface Prestataire {
  id: number
  user: {
    nom: string
    prenom: string
  }
  bio: string
  experience: number
  note_globale: number
  nombre_avis: number
  verifie: boolean
  quartier?: {
    nom: string
    ville: {
      nom: string
    }
  }
  services: {
    categorie: {
      nom: string
    }
  }[]
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
const prestatairesDemo: Prestataire[] = [
  {
    id: 1,
    user: { nom: 'Diallo', prenom: 'Mamadou' },
    bio: 'Plombier professionnel avec plus de 8 ans d\'expérience. Spécialisé dans les installations et réparations de plomberie.',
    experience: 8,
    note_globale: 4.9,
    nombre_avis: 127,
    verifie: true,
    quartier: { nom: 'Almadies', ville: { nom: 'Dakar' } },
    services: [{ categorie: { nom: 'Plomberie' } }]
  },
  {
    id: 2,
    user: { nom: 'Sow', prenom: 'Fatou' },
    bio: 'Agent de ménage expérimentée. Nettoyage professionnel pour particuliers et entreprises.',
    experience: 5,
    note_globale: 4.8,
    nombre_avis: 89,
    verifie: true,
    quartier: { nom: 'Pikine', ville: { nom: 'Dakar' } },
    services: [{ categorie: { nom: 'Ménage' } }]
  },
  {
    id: 3,
    user: { nom: 'Ndiaye', prenom: 'Ibrahima' },
    bio: 'Électricien certifié. Installation, dépannage et mise aux normes électriques.',
    experience: 10,
    note_globale: 4.7,
    nombre_avis: 64,
    verifie: true,
    quartier: { nom: 'Centre', ville: { nom: 'Thiès' } },
    services: [{ categorie: { nom: 'Électricité' } }]
  },
  {
    id: 4,
    user: { nom: 'Ba', prenom: 'Aissatou' },
    bio: 'Peintre professionnelle. Travaux de peinture intérieure et extérieure de qualité.',
    experience: 6,
    note_globale: 4.9,
    nombre_avis: 45,
    verifie: true,
    quartier: { nom: 'Plateau', ville: { nom: 'Dakar' } },
    services: [{ categorie: { nom: 'Peinture' } }]
  },
  {
    id: 5,
    user: { nom: 'Tall', prenom: 'Omar' },
    bio: 'Plombier et climaticien. Installation et maintenance de systèmes de climatisation.',
    experience: 12,
    note_globale: 4.7,
    nombre_avis: 156,
    verifie: true,
    quartier: { nom: 'Médina', ville: { nom: 'Dakar' } },
    services: [{ categorie: { nom: 'Climatisation' } }, { categorie: { nom: 'Plomberie' } }]
  },
  {
    id: 6,
    user: { nom: 'Gueye', prenom: 'Mariama' },
    bio: 'Traiteur spécialisée dans la cuisine sénégalaise traditionnelle pour tous vos événements.',
    experience: 15,
    note_globale: 4.8,
    nombre_avis: 78,
    verifie: true,
    quartier: { nom: 'Grand Dakar', ville: { nom: 'Dakar' } },
    services: [{ categorie: { nom: 'Traiteur' } }]
  },
  {
    id: 7,
    user: { nom: 'Faye', prenom: 'Moussa' },
    bio: 'Menuisier ébéniste. Fabrication et réparation de meubles sur mesure.',
    experience: 20,
    note_globale: 4.6,
    nombre_avis: 34,
    verifie: false,
    quartier: { nom: 'Rufisque', ville: { nom: 'Dakar' } },
    services: [{ categorie: { nom: 'Menuiserie' } }]
  },
  {
    id: 8,
    user: { nom: 'Diop', prenom: 'Cheikh' },
    bio: 'Mécanicien automobile. Réparation et entretien tous types de véhicules.',
    experience: 7,
    note_globale: 4.5,
    nombre_avis: 52,
    verifie: true,
    quartier: { nom: 'Parcelles Assainies', ville: { nom: 'Dakar' } },
    services: [{ categorie: { nom: 'Mécanique' } }]
  },
]

export default function Prestataires() {
  const [prestataires, setPrestataires] = useState<Prestataire[]>(prestatairesDemo)
  const [filteredPrestataires, setFilteredPrestataires] = useState<Prestataire[]>(prestatairesDemo)
  const [isLoading, setIsLoading] = useState(false)
  
  const [filters, setFilters] = useState({
    search: '',
    categorie: '',
    ville: '',
    verifie: false
  })

  useEffect(() => {
    let result = prestataires

    if (filters.search) {
      result = result.filter(p => 
        p.user.nom.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.user.prenom.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.bio.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.categorie) {
      result = result.filter(p => 
        p.services.some(s => s.categorie.nom.toLowerCase() === filters.categorie.toLowerCase())
      )
    }

    if (filters.ville) {
      result = result.filter(p => 
        p.quartier?.ville.nom.toLowerCase() === filters.ville.toLowerCase()
      )
    }

    if (filters.verifie) {
      result = result.filter(p => p.verifie)
    }

    setFilteredPrestataires(result)
  }, [filters, prestataires])

  const clearFilters = () => {
    setFilters({
      search: '',
      categorie: '',
      ville: '',
      verifie: false
    })
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Nos Prestataires</h1>
          <p className="text-gray-600">Trouvez le prestataire idéal pour vos besoins</p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un prestataire..."
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
                <option value="">Tous les métiers</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.nom}>{cat.nom}</option>
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
          </div>

          {/* Filtres supplémentaires */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verifie}
                onChange={(e) => setFilters({ ...filters, verifie: e.target.checked })}
                className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Prestataires vérifiés uniquement</span>
            </label>

            {(filters.search || filters.categorie || filters.ville || filters.verifie) && (
              <button
                onClick={clearFilters}
                className="flex items-center text-sm text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4 mr-1" />
                Effacer les filtres
              </button>
            )}

            <span className="ml-auto text-sm text-gray-500">
              {filteredPrestataires.length} prestataire(s) trouvé(s)
            </span>
          </div>
        </div>

        {/* Liste des prestataires */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredPrestataires.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun prestataire trouvé</h3>
            <p className="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={clearFilters}
              className="text-secondary hover:underline"
            >
              Effacer les filtres
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrestataires.map(prestataire => (
              <Link 
                key={prestataire.id} 
                href={`/prestataires/${prestataire.id}`}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition group text-center"
              >
                {/* Avatar */}
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-primary">
                      {prestataire.user.prenom.charAt(0)}{prestataire.user.nom.charAt(0)}
                    </span>
                  </div>
                  {prestataire.verifie && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Nom */}
                <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-primary transition">
                  {prestataire.user.prenom} {prestataire.user.nom}
                </h3>

                {/* Métier */}
                <p className="text-secondary text-sm mb-2">
                  {prestataire.services.map(s => s.categorie.nom).join(', ')}
                </p>

                {/* Note */}
                <div className="flex items-center justify-center mb-3">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="ml-1 font-semibold text-gray-900">{prestataire.note_globale}</span>
                  <span className="ml-1 text-gray-500 text-sm">({prestataire.nombre_avis} avis)</span>
                </div>

                {/* Localisation */}
                <p className="text-gray-500 text-sm flex items-center justify-center mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {prestataire.quartier?.nom}, {prestataire.quartier?.ville.nom}
                </p>

                {/* Expérience */}
                <p className="text-gray-500 text-sm flex items-center justify-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {prestataire.experience} ans d'expérience
                </p>

                {/* Bouton */}
                <button className="mt-4 w-full py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium">
                  Voir le profil
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
