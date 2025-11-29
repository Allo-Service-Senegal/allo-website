import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

const articles = [
  { id: '1', titre: 'Comment choisir son plombier à Dakar', extrait: 'Découvrez nos conseils pour trouver un plombier fiable.', categorie: 'Conseils Clients', date: '2025-11-15', slug: 'comment-choisir-son-plombier-dakar' },
  { id: '2', titre: '5 astuces pour développer votre clientèle', extrait: 'Voici les meilleures pratiques pour attirer et fidéliser vos clients.', categorie: 'Guide Métier', date: '2025-11-12', slug: '5-astuces-developper-clientele' },
  { id: '3', titre: 'Nouvelle fonctionnalité : messagerie instantanée', extrait: 'Communiquez plus facilement avec nos nouvelles fonctionnalités.', categorie: 'Actualités', date: '2025-11-10', slug: 'nouvelle-fonctionnalite-messagerie' },
]

export default function DerniersArticles() {
  const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="text-3xl">📰</span>
          <h2 className="text-3xl font-bold text-primary">Derniers articles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((a) => (
            <Link key={a.id} href={`/blog/${a.slug}`} className="card overflow-hidden group">
              <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-6xl font-bold opacity-20">{a.titre.charAt(0)}</span>
                <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">{a.categorie}</div>
              </div>
              <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition-colors duration-200 mb-3 line-clamp-2">{a.titre}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{a.extrait}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-sm"><Calendar size={14} className="mr-2" />{formatDate(a.date)}</div>
                <span className="text-secondary font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200">Lire <ArrowRight size={16} className="ml-1" /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog" className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-semibold transition-colors duration-200">
            <span>Voir tous les articles</span><ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
