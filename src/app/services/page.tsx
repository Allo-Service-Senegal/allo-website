'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, MapPin, Filter, Star, X, Loader2 } from 'lucide-react'

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

interface Region {
  id: number
  nom: string
}

interface Ville {
  id: number
  nom: string
  region_id: number
}

function ServicesContent() {
  const searchParams = useSearchParams()
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Categorie[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [villes, setVilles] = useState<Ville[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 })
  
  const [filters, setFilters] = useState({
    search: '',
    categorie: searchParams.get('categorie') || '',
    region: '',
    ville: '',
    vedette: false
  })

  // Charger catégories et régions au démarrage
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, regRes] = await Promise.all([
          fetch(`${API_URL}/api/categories`),
          fetch(`${API_URL}/api/regions`)
        ])
        
        if (catRes.ok) {
          const data = await catRes.json()
          setCategories(data.data || [])
        }
        
        if (regRes.ok) {
          const data = await regRes.json()
          setRegions(data.data || [])
        }
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
    fetchInitialData()
  }, [])

  // Charger les villes quand la région change
  useEffect(() => {
    const fetchVilles = async () => {
      if (!filters.region) {
        setVilles([])
        return
      }
      try {
        const res = await fetch(`${API_URL}/api/villes?region_id=${filters.region}`)
        if (res.ok) {
          const data = await res.json()
          setVilles(data.data || [])
        }
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
    fetchVilles()
    setFilters(prev => ({ ...prev, ville: '' }))
  }, [filters.region])

  // Charger les services
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true)
      try {
        let url = `${API_URL}/api/services?page=${pagination.page}&limit=12`
        
        if (filters.categorie) url += `&categorie=${filters.categorie}`
        if (filters.ville) url += `&ville=${filters.ville}`
        if (filters.search) url += `&q=${encodeURIComponent(filters.search)}`
        if (filters.vedette) url += `&vedette=true`
        
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setServices(data.data?.services || [])
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
      region: '',
      ville: '',
      vedette: false
    })
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const hasActiveFilters = filters.search || filters.categorie || filters.region || filters.ville || filters.vedette

  const formatTarif = (tarif: number, type: string) => {
    const f = tarif.toLocaleString('fr-FR')
    switch (type) {
      case 'HEURE': return `${f} CFA/h`
      case 'M2': return `${f} CFA/m²`
      case 'JOUR': return `${f} CFA/jour`
      default: return `À partir de ${f} CFA`
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

      {/* Région */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Région</label>
        <select
          value={filters.region}
          onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm bg-white"
        >
          <option value="">Toutes les régions</option>
          {regions.map(region => (
            <option key={region.id} value={region.id}>{region.nom}</option>
          ))}
        </select>
      </div>

      {/* Ville */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
        <select
          value={filters.ville}
          onChange={(e) => setFilters({ ...filters, ville: e.target.value })}
          disabled={!filters.region}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Toutes les villes</option>
          {villes.map(ville => (
            <option key={ville.id} value={ville.nom}>{ville.nom}</option>
          ))}
        </select>
        {!filters.region && (
          <p className="text-xs text-gray-500 mt-1">Sélectionnez d'abord une région</p>
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
              <span className="ml-2 bg-secondary text-white text-xs px-2 py-0.5 rounded-full">Actifs</span>
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
                  <button onClick={clearFilters} className="text-secondary hover:underline">
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
                        {/* Image */}
                        <div className="h-40 bg-gradient-to-br from-secondary/20 to-primary/20 relative">
                          {service.image ? (
                            <img src={service.image} alt={service.titre} className="w-full h-full object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-5xl font-bold text-primary/20">{service.titre.charAt(0)}</span>
                            </div>
                          )}
                          {service.vedette && (
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
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                          <p className="text-secondary font-semibold mb-4">{formatTarif(service.tarif, service.type_tarif)}</p>

                          {/* Prestataire */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary font-semibold text-sm">
                                  {service.prestataire.user.prenom?.charAt(0)}{service.prestataire.user.nom?.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                  {service.prestataire.user.prenom} {service.prestataire.user.nom}
                                </p>
                                {service.prestataire.quartier && (
                                  <p className="text-xs text-gray-500 flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {service.prestataire.quartier.nom}
                                    {service.prestataire.quartier.ville && `, ${service.prestataire.quartier.ville.nom}`}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center text-yellow-500">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="ml-1 text-sm font-medium">{service.prestataire.note_globale?.toFixed(1) || '5.0'}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                      <button
                        onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                        disabled={pagination.page === 1}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Précédent
                      </button>
                      <span className="px-4 py-2 text-gray-600">
                        Page {pagination.page} / {pagination.totalPages}
                      </span>
                      <button
                        onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
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

export default function Services() {
  return (
    <Suspense fallback={
      <div className="bg-gray-50 min-h-screen py-8 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    }>
      <ServicesContent />
    </Suspense>
  )
}
