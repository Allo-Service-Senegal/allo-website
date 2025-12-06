'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, MapPin, Filter, Star, X, Loader2 } from 'lucide-react'
import BannierePublicitaire from '@/components/BannierePublicitaire'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Service {
  id: number
  titre: string
  description: string
  tarif: number
  type_tarif: string
  vedette: boolean
  image?: string
  prestataire: {
    id: number
    user: {
      nom: string
      prenom: string
    }
    note_globale: number
    verifie?: boolean
    quartier?: {
      nom: string
      ville?: {
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

interface Ville {
  id: number
  nom: string
}

interface Quartier {
  id: number
  nom: string
  ville_id: number
}

function ServicesContent() {
  const searchParams = useSearchParams()
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Categorie[]>([])
  const [villes, setVilles] = useState<Ville[]>([])
  const [quartiers, setQuartiers] = useState<Quartier[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 })
  
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    categorie: searchParams.get('categorie') || '',
    ville: searchParams.get('ville') || '',
    quartier: '',
    vedette: false
  })

  // Charger catégories et villes au démarrage
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
        // Trouver l'ID de la ville sélectionnée
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

  // Charger les services
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true)
      try {
        let url = `${API_URL}/api/services?page=${pagination.page}&limit=12`
        
        if (filters.categorie) url += `&categorie=${filters.categorie}`
        if (filters.ville) url += `&ville=${encodeURIComponent(filters.ville)}`
        if (filters.quartier) url += `&quartier=${encodeURIComponent(filters.quartier)}`
        if (filters.search) url += `&q=${encodeURIComponent(filters.search)}`
        if (filters.vedette) url += `&vedette=true`
        
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          let results = data.data?.services || []
          
          // Trier : prestataires vérifiés en premier, puis par date (plus récent)
          results.sort((a: Service, b: Service) => {
            // Prestataires vérifiés en premier
            if (a.prestataire?.verifie && !b.prestataire?.verifie) return -1
            if (!a.prestataire?.verifie && b.prestataire?.verifie) return 1
            // Puis par ID décroissant (plus récent = ID plus grand)
            return (b.id || 0) - (a.id || 0)
          })
          
          setServices(results)
          setPagination(prev => ({
            ...prev,
            total: data.data?.pagination?.total || 0,
            totalPages: data.data?.pagination?.total_pages || 0
          }))
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchServices()
  }, [filters, pagination.page])

  const clearFilters = () => {
    setFilters({
      search: '',
      categorie: '',
      ville: '',
      quartier: '',
      vedette: false
    })
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const hasActiveFilters = filters.search || filters.categorie || filters.ville || filters.quartier || filters.vedette

  const formatTarif = (tarif: number, type: string) => {
    const formatted = tarif?.toLocaleString('fr-FR') || '0'
    switch (type) {
      case 'HEURE': return `${formatted} CFA/h`
      case 'M2': return `${formatted} CFA/m²`
      case 'JOUR': return `${formatted} CFA/jour`
      default: return `À partir de ${formatted} CFA`
    }
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Recherche */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher un service..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Catégorie */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
        <select
          value={filters.categorie}
          onChange={(e) => setFilters({ ...filters, categorie: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm bg-white"
        >
          <option value="">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.slug}>{cat.nom}</option>
          ))}
        </select>
      </div>

      {/* Ville */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Quartier</label>
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

      {/* En vedette */}
      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.vedette}
            onChange={(e) => setFilters({ ...filters, vedette: e.target.checked })}
            className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">En vedette uniquement</span>
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
          {/* Bannière publicitaire */}
          <BannierePublicitaire emplacement="SERVICES" />

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Nos Services</h1>
            <p className="text-gray-600">Trouvez le service dont vous avez besoin</p>
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

            {/* Liste des services */}
            <div className="flex-1">
              {/* Compteur */}
              <div className="mb-4 text-sm text-gray-500">
                {pagination.total} service(s) trouvé(s)
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
              ) : services.length === 0 ? (
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
                <>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {services.map(service => (
                      <Link 
                        key={service.id} 
                        href={`/services/${service.id}`}
                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group"
                      >
                        {/* Image placeholder */}
                        <div className="h-40 bg-gradient-to-br from-secondary/20 to-primary/20 relative flex items-center justify-center">
                          <span className="text-6xl font-bold text-primary/20">
                            {service.titre?.charAt(0)}
                          </span>
                          {service.vedette && (
                            <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              En vedette
                            </span>
                          )}
                          <span className="absolute top-3 right-3 bg-white text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                            {service.categorie?.nom}
                          </span>
                        </div>

                        {/* Contenu */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition line-clamp-1">
                            {service.titre}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {service.description}
                          </p>
                          
                          <p className="text-secondary font-semibold mb-3">
                            {formatTarif(service.tarif, service.type_tarif)}
                          </p>

                          {/* Prestataire */}
                          {service.prestataire && (
                            <div className="flex items-center justify-between pt-3 border-t">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-primary">
                                    {service.prestataire.user?.prenom?.charAt(0)}{service.prestataire.user?.nom?.charAt(0)}
                                  </span>
                                </div>
                                <span className="ml-2 text-sm text-gray-600">
                                  {service.prestataire.user?.prenom} {service.prestataire.user?.nom}
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="ml-1 font-medium">{service.prestataire.note_globale?.toFixed(1) || '0.0'}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                      <button
                        onClick={() => setPagination(p => ({ ...p, page: Math.max(1, p.page - 1) }))}
                        disabled={pagination.page === 1}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Précédent
                      </button>
                      <span className="px-4 py-2 text-gray-600">
                        Page {pagination.page} sur {pagination.totalPages}
                      </span>
                      <button
                        onClick={() => setPagination(p => ({ ...p, page: Math.min(p.totalPages, p.page + 1) }))}
                        disabled={pagination.page === pagination.totalPages}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Suivant
                      </button>
                    </div>
                  )}
                </>
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

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    }>
      <ServicesContent />
    </Suspense>
  )
}