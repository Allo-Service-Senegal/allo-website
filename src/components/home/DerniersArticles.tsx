'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Article {
  id: number
  titre: string
  slug: string
  extrait: string
  image?: string
  created_at: string
  categorie?: {
    nom: string
  }
}

export default function DerniersArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_URL}/api/articles?limit=3`)
        if (res.ok) {
          const data = await res.json()
          if (data.data?.articles) {
            setArticles(data.data.articles)
          }
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const formatDate = (d: string) => {
    if (!d) return ''
    return new Date(d).toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-2 mb-12">
            <span className="text-3xl">📰</span>
            <h2 className="text-3xl font-bold text-primary">Derniers articles</h2>
          </div>
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="text-3xl">📰</span>
          <h2 className="text-3xl font-bold text-primary">Derniers articles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="card overflow-hidden group">
              <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-primary/10 flex items-center justify-center">
                {article.image ? (
                  <img src={article.image} alt={article.titre} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-primary text-6xl font-bold opacity-20">{article.titre.charAt(0)}</span>
                )}
                {article.categorie && (
                  <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {article.categorie.nom}
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition-colors duration-200 mb-3 line-clamp-2">
                {article.titre}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.extrait}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={14} className="mr-2" />
                  {formatDate(article.created_at)}
                </div>
                <span className="text-secondary font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200">
                  Lire <ArrowRight size={16} className="ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog" className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-semibold transition-colors duration-200">
            <span>Voir tous les articles</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
