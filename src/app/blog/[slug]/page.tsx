'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Calendar, Clock, User, ArrowLeft, Share2, Facebook, 
  Twitter, Linkedin, ChevronRight, Tag
} from 'lucide-react'

const articlesData: { [key: string]: any } = {
  'comment-choisir-un-bon-plombier': {
    id: 1,
    slug: 'comment-choisir-un-bon-plombier',
    titre: 'Comment choisir un bon plombier à Dakar ?',
    extrait: 'Découvrez nos conseils pour trouver un plombier fiable et compétent à Dakar.',
    contenu: `
      <p>Trouver un bon plombier à Dakar peut sembler difficile, mais avec les bons critères de sélection, vous pouvez identifier un professionnel fiable et compétent. Voici notre guide complet pour vous aider dans votre recherche.</p>

      <h2>1. Vérifiez les qualifications</h2>
      <p>Un bon plombier doit avoir une formation reconnue et de l'expérience. N'hésitez pas à demander depuis combien de temps il exerce et s'il a des certifications particulières. Sur Allo Service Sénégal, tous nos prestataires sont vérifiés.</p>

      <h2>2. Consultez les avis clients</h2>
      <p>Les avis des clients précédents sont une mine d'or d'informations. Ils vous permettent de connaître la qualité du travail, la ponctualité et le professionnalisme du plombier. Sur notre plateforme, chaque prestataire a une note basée sur de vrais avis.</p>

      <h2>3. Demandez un devis détaillé</h2>
      <p>Avant toute intervention, demandez un devis écrit et détaillé. Cela vous évitera les mauvaises surprises. Le devis doit inclure :</p>
      <ul>
        <li>Le coût de la main d'œuvre</li>
        <li>Le prix des pièces et matériaux</li>
        <li>Les frais de déplacement éventuels</li>
        <li>La durée estimée des travaux</li>
      </ul>

      <h2>4. Vérifiez la disponibilité</h2>
      <p>Un bon plombier doit être réactif, surtout pour les urgences. Vérifiez ses horaires de disponibilité et s'il propose un service d'urgence. La plupart de nos prestataires répondent en moins d'une heure.</p>

      <h2>5. Assurez-vous qu'il a une assurance</h2>
      <p>En cas de dégâts lors de l'intervention, il est important que le plombier soit assuré. Cela vous protège en cas de problème.</p>

      <h2>Conclusion</h2>
      <p>Choisir un bon plombier demande un peu de recherche, mais c'est un investissement qui en vaut la peine. Avec Allo Service Sénégal, vous avez accès à des prestataires vérifiés, notés par de vrais clients, et disponibles dans votre quartier.</p>
    `,
    image: '/images/blog/plombier.jpg',
    categorie: 'conseils',
    tags: ['plomberie', 'conseils', 'dakar', 'prestataires'],
    auteur: {
      nom: 'Équipe Allo Service',
      avatar: 'AS'
    },
    date: '25 Nov 2025',
    temps_lecture: '5 min'
  },
  'guide-entretien-climatiseur': {
    id: 2,
    slug: 'guide-entretien-climatiseur',
    titre: 'Guide complet : Entretenir son climatiseur au Sénégal',
    extrait: 'Un climatiseur bien entretenu dure plus longtemps et consomme moins.',
    contenu: `
      <p>Au Sénégal, le climatiseur est devenu indispensable pour affronter les chaleurs. Mais pour qu'il fonctionne efficacement et dure longtemps, un entretien régulier est essentiel. Voici notre guide complet.</p>

      <h2>Pourquoi entretenir son climatiseur ?</h2>
      <p>Un climatiseur mal entretenu :</p>
      <ul>
        <li>Consomme plus d'énergie (jusqu'à 30% de plus)</li>
        <li>Refroidit moins bien</li>
        <li>Tombe en panne plus souvent</li>
        <li>Peut affecter la qualité de l'air</li>
      </ul>

      <h2>Entretien à faire soi-même</h2>
      <h3>Nettoyage des filtres (toutes les 2 semaines)</h3>
      <p>Les filtres accumulent la poussière et doivent être nettoyés régulièrement. Retirez-les délicatement, passez-les sous l'eau tiède avec un peu de savon, laissez sécher complètement avant de les remettre.</p>

      <h3>Nettoyage de l'unité intérieure (mensuel)</h3>
      <p>Dépoussiérez l'extérieur de l'unité avec un chiffon humide. Vérifiez que les ailettes ne sont pas obstruées.</p>

      <h2>Entretien professionnel</h2>
      <p>Une fois par an, faites appel à un professionnel pour :</p>
      <ul>
        <li>Vérifier le niveau de gaz réfrigérant</li>
        <li>Nettoyer l'évaporateur et le condenseur</li>
        <li>Contrôler les connexions électriques</li>
        <li>Vérifier l'étanchéité du circuit</li>
      </ul>

      <h2>Signes qu'il faut appeler un professionnel</h2>
      <p>Contactez un climaticien si :</p>
      <ul>
        <li>Le climatiseur fait des bruits inhabituels</li>
        <li>Il ne refroidit plus comme avant</li>
        <li>Il y a des fuites d'eau</li>
        <li>Il dégage une mauvaise odeur</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Un entretien régulier de votre climatiseur vous fera économiser de l'argent sur le long terme. Pour l'entretien professionnel, trouvez un climaticien de confiance sur Allo Service Sénégal.</p>
    `,
    image: '/images/blog/climatiseur.jpg',
    categorie: 'guides',
    tags: ['climatisation', 'entretien', 'guide', 'économie'],
    auteur: {
      nom: 'Mamadou Diallo',
      avatar: 'MD'
    },
    date: '20 Nov 2025',
    temps_lecture: '8 min'
  },
  'nouvelle-fonctionnalite-paiement-wave': {
    id: 3,
    slug: 'nouvelle-fonctionnalite-paiement-wave',
    titre: 'Nouveau : Payez vos prestataires via Wave !',
    extrait: 'Allo Service Sénégal intègre désormais Wave pour faciliter vos paiements.',
    contenu: `
      <p>Nous sommes ravis de vous annoncer l'intégration de Wave comme moyen de paiement sur Allo Service Sénégal ! Cette nouvelle fonctionnalité va simplifier vos transactions avec les prestataires.</p>

      <h2>Pourquoi Wave ?</h2>
      <p>Wave est devenu l'un des services de paiement mobile les plus populaires au Sénégal. Avec des frais réduits et une simplicité d'utilisation, c'était une évidence de l'intégrer à notre plateforme.</p>

      <h2>Comment ça marche ?</h2>
      <p>C'est très simple :</p>
      <ul>
        <li>Demandez un devis à un prestataire</li>
        <li>Une fois le service effectué, choisissez "Payer avec Wave"</li>
        <li>Scannez le QR code ou entrez le numéro</li>
        <li>Confirmez le paiement</li>
      </ul>

      <h2>Avantages</h2>
      <ul>
        <li>Paiement instantané et sécurisé</li>
        <li>Pas besoin d'espèces</li>
        <li>Historique des transactions</li>
        <li>Protection acheteur</li>
      </ul>

      <h2>Autres moyens de paiement</h2>
      <p>En plus de Wave, vous pouvez toujours payer via :</p>
      <ul>
        <li>Orange Money</li>
        <li>Free Money</li>
        <li>Carte bancaire (via PayDunya)</li>
        <li>Espèces</li>
      </ul>

      <p>Cette intégration s'inscrit dans notre volonté de rendre Allo Service Sénégal toujours plus pratique pour nos utilisateurs.</p>
    `,
    image: '/images/blog/wave.jpg',
    categorie: 'actualites',
    tags: ['paiement', 'wave', 'nouveauté', 'mobile money'],
    auteur: {
      nom: 'Équipe Allo Service',
      avatar: 'AS'
    },
    date: '15 Nov 2025',
    temps_lecture: '3 min'
  }
}

const articlesRelated = [
  { slug: 'comment-choisir-un-bon-plombier', titre: 'Comment choisir un bon plombier à Dakar ?', categorie: 'conseils' },
  { slug: 'guide-entretien-climatiseur', titre: 'Guide complet : Entretenir son climatiseur', categorie: 'guides' },
  { slug: 'nouvelle-fonctionnalite-paiement-wave', titre: 'Nouveau : Payez via Wave !', categorie: 'actualites' },
]

export default function ArticleDetail() {
  const params = useParams()
  const slug = params.slug as string
  const [copied, setCopied] = useState(false)

  const article = articlesData[slug] || articlesData['comment-choisir-un-bon-plombier']
  const related = articlesRelated.filter(a => a.slug !== slug).slice(0, 2)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = async () => {
    if (navigator.share) {
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
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-white">{article.categorie}</span>
            </div>

            <span className="inline-block bg-secondary text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
              {article.categorie.charAt(0).toUpperCase() + article.categorie.slice(1)}
            </span>

            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {article.titre}
            </h1>

            <p className="text-xl text-white/80 mb-6">
              {article.extrait}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-medium">{article.auteur.avatar}</span>
                </div>
                {article.auteur.nom}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {article.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.temps_lecture} de lecture
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
              {/* Contenu de l'article */}
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-primary prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-ul:text-gray-700 prose-li:my-1
                  prose-a:text-secondary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: article.contenu }}
              />

              {/* Tags */}
              <div className="mt-10 pt-6 border-t">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  {article.tags.map((tag: string) => (
                    <span 
                      key={tag}
                      className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Partage */}
              <div className="mt-8 pt-6 border-t">
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
                    <span className="font-bold text-primary">{article.auteur.avatar}</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{article.auteur.nom}</p>
                    <p className="text-sm text-gray-500">Publié le {article.date}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles connexes */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles connexes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map(item => (
                  <Link 
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition group"
                  >
                    <span className="text-secondary text-sm font-medium">
                      {item.categorie.charAt(0).toUpperCase() + item.categorie.slice(1)}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-2 group-hover:text-primary transition">
                      {item.titre}
                    </h3>
                  </Link>
                ))}
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
