'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight, Search } from 'lucide-react'

const categories = [
  { id: 'all', nom: 'Tous' },
  { id: 'conseils', nom: 'Conseils' },
  { id: 'guides', nom: 'Guides' },
  { id: 'actualites', nom: 'Actualités' },
  { id: 'temoignages', nom: 'Témoignages' },
]

const articlesDemo = [
  {
    id: 1,
    slug: 'comment-choisir-un-bon-plombier',
    titre: 'Comment choisir un bon plombier à Dakar ?',
    extrait: 'Découvrez nos conseils pour trouver un plombier fiable et compétent à Dakar. Vérifications, questions à poser, signes de qualité...',
    contenu: '',
    image: '/images/blog/plombier.jpg',
    categorie: 'conseils',
    auteur: 'Équipe Allo Service',
    date: '25 Nov 2025',
    temps_lecture: '5 min',
    vedette: true
  },
  {
    id: 2,
    slug: 'guide-entretien-climatiseur',
    titre: 'Guide complet : Entretenir son climatiseur au Sénégal',
    extrait: 'Un climatiseur bien entretenu dure plus longtemps et consomme moins. Voici tous nos conseils pour prendre soin de votre appareil.',
    contenu: '',
    image: '/images/blog/climatiseur.jpg',
    categorie: 'guides',
    auteur: 'Mamadou Diallo',
    date: '20 Nov 2025',
    temps_lecture: '8 min',
    vedette: true
  },
  {
    id: 3,
    slug: 'nouvelle-fonctionnalite-paiement-wave',
    titre: 'Nouveau : Payez vos prestataires via Wave !',
    extrait: 'Allo Service Sénégal intègre désormais Wave pour faciliter vos paiements. Découvrez comment utiliser cette nouvelle fonctionnalité.',
    contenu: '',
    image: '/images/blog/wave.jpg',
    categorie: 'actualites',
    auteur: 'Équipe Allo Service',
    date: '15 Nov 2025',
    temps_lecture: '3 min',
    vedette: false
  },
  {
    id: 4,
    slug: 'temoignage-fatou-menage',
    titre: 'Témoignage : Fatou, agent de ménage à Pikine',
    extrait: 'Fatou nous raconte comment Allo Service Sénégal a transformé son activité et lui a permis de trouver de nouveaux clients.',
    contenu: '',
    image: '/images/blog/temoignage.jpg',
    categorie: 'temoignages',
    auteur: 'Équipe Allo Service',
    date: '10 Nov 2025',
    temps_lecture: '4 min',
    vedette: false
  },
  {
    id: 5,
    slug: 'preparer-hivernage-maison',
    titre: '5 conseils pour préparer votre maison à l\'hivernage',
    extrait: 'L\'hivernage approche ! Découvrez comment protéger votre maison des intempéries avec nos conseils pratiques.',
    contenu: '',
    image: '/images/blog/hivernage.jpg',
    categorie: 'conseils',
    auteur: 'Omar Tall',
    date: '5 Nov 2025',
    temps_lecture: '6 min',
    vedette: false
  },
  {
    id: 6,
    slug: 'tarifs-services-domicile-senegal',
    titre: 'Les tarifs des services à domicile au Sénégal en 2025',
    extrait: 'Combien coûte un plombier, un électricien ou une femme de ménage au Sénégal ? Notre guide des tarifs actualisé.',
    contenu: '',
    image: '/images/blog/tarifs.jpg',
    categorie: 'guides',
    auteur: 'Équipe Allo Service',
    date: '1 Nov 2025',
    temps_lecture: '7 min',
    vedette: false
  },
]

export default function Blog() {
  const [articles] = useState(articlesDemo)
  const [filteredArticles, setFilteredArticles] = useState(articlesDemo)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleFilter = (categorie: string) => {
    setSelectedCategory(categorie)
    filterArticles(categorie, searchQuery)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterArticles(selectedCategory, query)
  }

  const filterArticles = (categorie: string, query: string) => {
    let result = articles

    if (categorie !== 'all') {
      result = result.filter(a => a.categorie === categorie)
    }

    if (query) {
      result = result.filter(a => 
        a.titre.toLowerCase().includes(query.toLowerCase()) ||
        a.extrait.toLowerCase().includes(query.toLowerCase())
      )
    }

    setFilteredArticles(result)
  }

  const articlesVedette = articles.filter(a => a.vedette)

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
          {/* Articles à la une */}
          {articlesVedette.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">À la une</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {articlesVedette.map(article => (
                  <Link 
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/20 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary/20">
                          {article.titre.charAt(0)}
                        </span>
                      </div>
                      <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-medium px-3 py-1 rounded-full">
                        {categories.find(c => c.id === article.categorie)?.nom}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition line-clamp-2">
                        {article.titre}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{article.extrait}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {article.date}
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        {article.temps_lecture}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Filtres */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              {/* Catégories */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleFilter(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedCategory === cat.id
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
              {selectedCategory === 'all' ? 'Tous les articles' : categories.find(c => c.id === selectedCategory)?.nom}
              <span className="text-gray-400 font-normal text-lg ml-2">({filteredArticles.length})</span>
            </h2>

            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <p className="text-gray-500">Aucun article trouvé</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                  <Link 
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="h-40 bg-gradient-to-br from-secondary/10 to-primary/10 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-bold text-primary/15">
                          {article.titre.charAt(0)}
                        </span>
                      </div>
                      <span className="absolute top-3 left-3 bg-white/90 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        {categories.find(c => c.id === article.categorie)?.nom}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition line-clamp-2">
                        {article.titre}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.extrait}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {article.auteur}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.temps_lecture}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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
