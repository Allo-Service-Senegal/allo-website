'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MapPin, Filter, Star, CheckCircle, Briefcase, X } from 'lucide-react'

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

const villesQuartiers: { [key: string]: string[] } = {
  'Dakar': ['Almadies', 'Plateau', 'Médina', 'Pikine', 'Grand Dakar', 'Parcelles Assainies', 'Rufisque', 'Guédiawaye', 'Ouakam', 'Ngor', 'Yoff', 'Mermoz', 'Fann', 'Point E', 'Sacré-Coeur'],
  'Thiès': ['Centre', 'Mbour', 'Saly', 'Tivaouane'],
  'Saint-Louis': ['Centre', 'Sor', 'Langue de Barbarie', 'Guet Ndar'],
  'Kaolack': ['Centre', 'Médina Baye', 'Ndangane'],
  'Ziguinchor': ['Centre', 'Boucotte', 'Lyndiane'],
  'Diourbel': ['Centre', 'Touba', 'Mbacké'],
  'Louga': ['Centre', 'Kébémer'],
  'Tambacounda': ['Centre', 'Kidira'],
}

const villes = Object.keys(villesQuartiers)

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
  const [prestataires] = useState<Prestataire[]>(prestatairesDemo)
  const [filteredPrestataires, setFilteredPrestataires] = useState<Prestataire[]>(prestatairesDemo)
  const [isLoading] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [quartiers, setQuartiers] = useState<string[]>([])
  
  const [filters, setFilters] = useState({
    search: '',
    categorie: '',
    ville: '',
    quartier: '',
    verifie: false
  })

  // Mettre à jour les quartiers quand la ville change
  useEffect(() => {
    if (filters.ville && villesQuartiers[filters.ville]) {
      setQuartiers(villesQuartiers[filters.ville])
    } else {
      setQuartiers([])
    }
    setFilters(prev => ({ ...prev, quartier: '' }))
  }, [filters.ville])

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

    if (filters.quartier) {
      result = result.filter(p => 
        p.quartier?.nom.toLowerCase() === filters.quartier.toLowerCase()
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
      quartier: '',
      verifie: false
    })
  }

  const hasActiveFilters = filters.search || filters.categorie || filters.ville || filters.quartier || filters.verifie

  // Composant Filtres
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Recherche */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rechercher
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Nom, prénom..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Métier */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Métier
        </label>
        <select
          value={filters.categorie}
          onChange={(e) => setFilters({ ...filters, categorie: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm bg-white"
        >
          <option value="">Tous les métiers</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.nom}>{cat.nom}</option>
          ))}
        </select>
      </div>

      {/* Ville */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ville
        </label>
        <select
          value={filters.ville}
          onChange={(e) => setFilters({ ...filters, ville: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm bg-white"
        >
          <option value="">Toutes les villes</option>
          {villes.map(ville => (
            <option key={ville} value={ville}>{ville}</option>
          ))}
        </select>
      </div>

      {/* Quartier */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quartier
        </label>
        <select
          value={filters.quartier}
          onChange={(e) => setFilters({ ...filters, quartier: e.target.value })}
          disabled={!filters.ville}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Tous les quartiers</option>
          {quartiers.map(quartier => (
            <option key={quartier} value={quartier}>{quartier}</option>
          ))}
        </select>
        {!filters.ville && (
          <p className="text-xs text-gray-500 mt-1">Sélectionnez d'abord une ville</p>
        )}
      </div>

      {/* Vérifié */}
      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.verifie}
            onChange={(e) => setFilters({ ...filters, verifie: e.target.checked })}
            className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Vérifiés uniquement</span>
        </label>
      </div>

      {/* Bouton effacer */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center text-sm text-red-600 hover:text-red-700 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition"
        >
          <X className="w-4 h-4 mr-2" />
          Effacer les filtres
        </button>
      )}
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Nos Prestataires</h1>
            <p className="text-gray-600">Trouvez le prestataire idéal pour vos besoins</p>
          </div>

          {/* Bouton filtre mobile */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden w-full flex items-center justify-center px-4 py-3 mb-6 bg-white border border-gray-300 rounded-lg shadow-sm"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filtres
            {hasActiveFilters && (
              <span className="ml-2 bg-secondary text-white text-xs px-2 py-0.5 rounded-full">
                Actifs
              </span>
            )}
          </button>

          {/* Layout principal */}
          <div className="flex gap-8">
            {/* Sidebar Filtres - Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="font-semibold text-lg text-gray-900 mb-6 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtres
                </h2>
                <FilterContent />
              </div>
            </aside>

            {/* Liste des prestataires */}
            <div className="flex-1">
              {/* Compteur */}
              <div className="mb-4 text-sm text-gray-500">
                {filteredPrestataires.length} prestataire(s) trouvé(s)
              </div>

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
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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
        </div>
      </div>

      {/* Modal Filtres Mobile */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-lg">Filtres</h2>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
