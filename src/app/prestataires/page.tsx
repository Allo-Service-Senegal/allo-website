'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MapPin, Filter, Star, CheckCircle, Briefcase, X, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Prestataire {
  id: number
  user: {
    nom: string
    prenom: string
    photo?: string
  }
  bio: string
  experience: number
  note_globale: number
  nombre_avis: number
  verifie: boolean
  services: {
    categorie: {
      nom: string
    }
  }[]
}

interface Categorie {
  id: number
  nom: string
  slug: string
}

interface Ville {
  id: number
  nom: string
}

interface Quartier {
  id: number
  nom: string
  ville_id: number
}

export default function Prestataires() {
  const [prestataires, setPrestataires] = useState<Prestataire[]>([])
  const [categories, setCategories] = useState<Categorie[]>([])
  const [villes, setVilles] = useState<Ville[]>([])
  const [quartiers, setQuartiers] = useState<Quartier[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  const [filters, setFilters] = useState({
    search: '',
    categorie: '',
    ville: '',
    quartier: '',
    verifie: false
  })

  // Charger les catégories et villes au démarrage
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, villesRes] = await Promise.all([
          fetch(`${API_URL}/api/categories`),
          fetch(`${API_URL}/api/villes`)
        ])
        
        if (catRes.ok) {
          const data = await catRes.json()
          setCategories(data.data || [])
        }
        
        if (villesRes.ok) {
          const data = await villesRes.json()
          setVilles(data.data || [])
        }
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
    fetchInitialData()
  }, [])

  // Charger les quartiers quand la ville change
  useEffect(() => {
    const fetchQuartiers = async () => {
      if (!filters.ville) {
        setQuartiers([])
        return
      }
      try {
        const villeSelected = villes.find(v => v.nom === filters.ville)
        if (villeSelected) {
          const res = await fetch(`${API_URL}/api/quartiers?ville_id=${villeSelected.id}`)
          if (res.ok) {
            const data = await res.json()
            setQuartiers(data.data || [])
          }
        }
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
    fetchQuartiers()
    setFilters(prev => ({ ...prev, quartier: '' }))
  }, [filters.ville, villes])

  // Charger les prestataires
  useEffect(() => {
    const fetchPrestataires = async () => {
      setIsLoading(true)
      try {
        let url = `${API_URL}/api/prestataires?limit=50`
        if (filters.verifie) url += '&verifie=true'
        if (filters.search) url += `&q=${encodeURIComponent(filters.search)}`
        if (filters.ville) url += `&ville=${encodeURIComponent(filters.ville)}`
        if (filters.quartier) url += `&quartier=${encodeURIComponent(filters.quartier)}`
        
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          let results = data.data?.prestataires || []
          
          // Filtrer par catégorie côté client si nécessaire
          if (filters.categorie) {
            results = results.filter((p: Prestataire) => 
              p.services?.some(s => 
                s.categorie?.nom.toLowerCase() === filters.categorie.toLowerCase()
              )
            )
          }
          
          // Trier : vérifiés en premier, puis par note
          results.sort((a: Prestataire, b: Prestataire) => {
            if (a.verifie && !b.verifie) return -1
            if (!a.verifie && b.verifie) return 1
            return (b.note_globale || 0) - (a.note_globale || 0)
          })
          
          setPrestataires(results)
        }
      } catch (error) {
        console.error('Erreur chargement prestataires:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPrestataires()
  }, [filters.search, filters.verifie, filters.categorie, filters.ville, filters.quartier])

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

  // Dédupliquer les métiers pour l'affichage
  const getUniqueMetiers = (services: Prestataire['services']) => {
    if (!services) return 'Prestataire'
    const metiers = services.map(s => s.categorie?.nom).filter(Boolean)
    const unique = metiers.filter((v, i, a) => a.indexOf(v) === i)
    return unique.join(', ') || 'Prestataire'
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Recherche */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rechercher
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Nom, prénom..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Métier/Catégorie */}
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
            <option key={ville.id} value={ville.nom}>{ville.nom}</option>
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
            <option key={quartier.id} value={quartier.nom}>{quartier.nom}</option>
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
    <div className="bg-gray-50 min-h-screen py-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Espace Publicitaire */}
          <div className="mb-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-6 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-sm">Espace publicitaire</p>
          </div>

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
                {prestataires.length} prestataire(s) trouvé(s)
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
              ) : prestataires.length === 0 ? (
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
                  {prestataires.map(prestataire => (
                    <Link 
                      key={prestataire.id} 
                      href={`/prestataires/${prestataire.id}`}
                      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition group text-center"
                    >
                      {/* Avatar */}
                      <div className="relative inline-block mb-4">
                        {prestataire.user.photo ? (
                          <img 
                            src={prestataire.user.photo} 
                            alt={`${prestataire.user.prenom} ${prestataire.user.nom}`}
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-2xl font-bold text-primary">
                              {prestataire.user.prenom?.charAt(0)}{prestataire.user.nom?.charAt(0)}
                            </span>
                          </div>
                        )}
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

                      {/* Métier - Dédupliqué */}
                      <p className="text-secondary text-sm mb-2">
                        {getUniqueMetiers(prestataire.services)}
                      </p>

                      {/* Note */}
                      <div className="flex items-center justify-center mb-3">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="ml-1 font-semibold text-gray-900">
                          {prestataire.note_globale?.toFixed(1) || '0.0'}
                        </span>
                        <span className="ml-1 text-gray-500 text-sm">
                          ({prestataire.nombre_avis || 0} avis)
                        </span>
                      </div>

                      {/* Expérience */}
                      {prestataire.experience && (
                        <p className="text-gray-500 text-sm flex items-center justify-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {prestataire.experience} ans d'expérience
                        </p>
                      )}

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
