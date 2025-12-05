'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight, Search, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface CategorieArticle {
  id: number
  nom: string
  slug: string
}

interface Article {
  id: number
  titre: string
  slug: string
  extrait: string
  image?: string
  created_at: string
  vues: number
  categorie?: CategorieArticle
  auteur?: {
    nom: string
    prenom: string
  }
}

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<CategorieArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 })

  // Charger les catégories d'articles
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories-articles`)
        if (res.ok) {
          const data = await res.json()
          setCategories(data.data || [])
        }
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
    fetchCategories()
  }, [])

  // Charger les articles
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        let url = `${API_URL}/api/articles?page=${pagination.page}&limit=9`
        if (selectedCategory) url += `&categorie=${selectedCategory}`
        if (searchQuery) url += `&q=${encodeURIComponent(searchQuery)}`

        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setArticles(data.data?.articles || [])
          setPagination(prev => ({
            ...prev,
            total: data.data?.pagination?.total || 0,
            totalPages: data.data?.pagination?.total_pages || 0
          }))
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [selectedCategory, searchQuery, pagination.page])

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const handleCategoryFilter = (slug: string) => {
    setSelectedCategory(slug)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Conseils, guides et actualités pour vous aider à trouver les meilleurs prestataires
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Filtres */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              {/* Catégories */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryFilter('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === ''
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Tous
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryFilter(cat.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedCategory === cat.slug
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat.nom}
                  </button>
                ))}
              </div>

              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Liste des articles */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedCategory 
                ? categories.find(c => c.slug === selectedCategory)?.nom || 'Articles'
                : 'Tous les articles'
              }
              <span className="text-gray-400 font-normal text-lg ml-2">({pagination.total})</span>
            </h2>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : articles.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <p className="text-gray-500">Aucun article trouvé</p>
                {(selectedCategory || searchQuery) && (
                  <button
                    onClick={() => { setSelectedCategory(''); setSearchQuery(''); }}
                    className="mt-4 text-secondary hover:underline"
                  >
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map(article => (
                    <Link 
                      key={article.id}
                      href={`/blog/${article.slug}`}
                      className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
                    >
                      <div className="h-40 bg-gradient-to-br from-secondary/10 to-primary/10 relative">
                        {article.image ? (
                          <img src={article.image} alt={article.titre} className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl font-bold text-primary/15">
                              {article.titre.charAt(0)}
                            </span>
                          </div>
                        )}
                        {article.categorie && (
                          <span className="absolute top-3 left-3 bg-white/90 text-primary text-xs font-medium px-2 py-1 rounded-full">
                            {article.categorie.nom}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition line-clamp-2">
                          {article.titre}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.extrait}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(article.created_at)}
                          </div>
                          {article.auteur && (
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {article.auteur.prenom} {article.auteur.nom}
                            </div>
                          )}
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
          </section>

          {/* CTA Newsletter */}
          <section className="mt-16 bg-primary rounded-2xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Restez informé !
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Inscrivez-vous à notre newsletter pour recevoir nos derniers conseils et actualités.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition font-medium flex items-center justify-center">
                S'inscrire
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
