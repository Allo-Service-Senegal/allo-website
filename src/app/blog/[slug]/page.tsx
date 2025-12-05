'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Calendar, Clock, User, ArrowLeft, Share2, Facebook, 
  Twitter, Linkedin, ChevronRight, Loader2, AlertCircle
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Article {
  id: number
  titre: string
  slug: string
  extrait: string
  contenu: string
  image?: string
  vues: number
  created_at: string
  categorie?: {
    id: number
    nom: string
    slug: string
  }
  auteur?: {
    nom: string
    prenom: string
  }
}

export default function ArticleDetail() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_URL}/api/articles/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setArticle(data.data)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Erreur:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    
    if (slug) {
      fetchArticle()
    }
  }, [slug])

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.titre,
          text: article.extrait,
          url: shareUrl
        })
      } catch (err) {
        console.log('Erreur partage:', err)
      }
    } else {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Article non trouvé</h1>
          <p className="text-gray-600 mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link href="/blog" className="text-secondary hover:underline">
            ← Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  const auteurInitiales = article.auteur 
    ? `${article.auteur.prenom?.charAt(0) || ''}${article.auteur.nom?.charAt(0) || ''}`
    : 'AS'

  const auteurNom = article.auteur 
    ? `${article.auteur.prenom} ${article.auteur.nom}`
    : 'Équipe Allo Service'

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header avec image */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-white/70 mb-6">
              <Link href="/blog" className="hover:text-white flex items-center">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Blog
              </Link>
              {article.categorie && (
                <>
                  <ChevronRight className="w-4 h-4 mx-2" />
                  <span className="text-white">{article.categorie.nom}</span>
                </>
              )}
            </div>

            {article.categorie && (
              <span className="inline-block bg-secondary text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                {article.categorie.nom}
              </span>
            )}

            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {article.titre}
            </h1>

            {article.extrait && (
              <p className="text-xl text-white/80 mb-6">
                {article.extrait}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-medium">{auteurInitiales}</span>
                </div>
                {auteurNom}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(article.created_at)}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {article.vues} vue{article.vues > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Contenu principal */}
          <article>
            <div className="bg-white rounded-xl shadow-sm p-6 lg:p-10">
              {/* Image de l'article */}
              {article.image && (
                <div className="mb-8 -mx-6 -mt-6 lg:-mx-10 lg:-mt-10">
                  <img 
                    src={article.image} 
                    alt={article.titre}
                    className="w-full h-64 lg:h-96 object-cover rounded-t-xl"
                  />
                </div>
              )}

              {/* Contenu de l'article */}
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-primary prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-ul:text-gray-700 prose-li:my-1
                  prose-a:text-secondary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: article.contenu || '<p>Contenu non disponible.</p>' }}
              />

              {/* Partage */}
              <div className="mt-10 pt-6 border-t">
                <p className="text-sm font-medium text-gray-500 mb-3">Partager cet article</p>
                <div className="flex gap-2">
                  <button 
                    onClick={handleShare}
                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-gray-600 hover:text-primary"
                    title={copied ? 'Lien copié !' : 'Copier le lien'}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-gray-600 hover:text-blue-600"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.titre}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-gray-600 hover:text-sky-500"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${article.titre}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-gray-600 hover:text-blue-700"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Auteur */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">{auteurInitiales}</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{auteurNom}</p>
                    <p className="text-sm text-gray-500">Publié le {formatDate(article.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-primary rounded-xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                Besoin d'un prestataire ?
              </h2>
              <p className="text-white/80 mb-6">
                Trouvez des professionnels vérifiés près de chez vous
              </p>
              <Link 
                href="/services"
                className="inline-flex items-center bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition font-medium"
              >
                Trouver un prestataire
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
