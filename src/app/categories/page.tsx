import Link from 'next/link'
import { Metadata } from 'next'
import { 
  Wrench, Zap, SprayCan, Paintbrush, Snowflake, 
  Hammer, ChefHat, Car, Truck, TreeDeciduous, ArrowRight 
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Toutes les catégories - Allo Service Sénégal',
  description: 'Découvrez toutes les catégories de services disponibles sur Allo Service Sénégal',
}

const categories = [
  { 
    id: 1, 
    nom: 'Plomberie', 
    slug: 'plomberie',
    icon: Wrench,
    color: 'bg-blue-100 text-blue-600',
    description: 'Installation, réparation de plomberie, débouchage, fuites d\'eau et travaux sanitaires.',
    services: ['Réparation de fuites', 'Débouchage', 'Installation sanitaire', 'Chauffe-eau']
  },
  { 
    id: 2, 
    nom: 'Électricité', 
    slug: 'electricite',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600',
    description: 'Installation électrique, dépannage, mise aux normes et travaux électriques.',
    services: ['Installation électrique', 'Dépannage', 'Mise aux normes', 'Éclairage']
  },
  { 
    id: 3, 
    nom: 'Ménage', 
    slug: 'menage',
    icon: SprayCan,
    color: 'bg-green-100 text-green-600',
    description: 'Nettoyage professionnel pour maisons, appartements et bureaux.',
    services: ['Ménage régulier', 'Grand nettoyage', 'Nettoyage bureaux', 'Repassage']
  },
  { 
    id: 4, 
    nom: 'Peinture', 
    slug: 'peinture',
    icon: Paintbrush,
    color: 'bg-purple-100 text-purple-600',
    description: 'Travaux de peinture intérieure et extérieure, décoration murale.',
    services: ['Peinture intérieure', 'Peinture extérieure', 'Décoration', 'Ravalement']
  },
  { 
    id: 5, 
    nom: 'Climatisation', 
    slug: 'climatisation',
    icon: Snowflake,
    color: 'bg-cyan-100 text-cyan-600',
    description: 'Installation, maintenance et réparation de climatiseurs.',
    services: ['Installation clim', 'Maintenance', 'Réparation', 'Recharge gaz']
  },
  { 
    id: 6, 
    nom: 'Menuiserie', 
    slug: 'menuiserie',
    icon: Hammer,
    color: 'bg-orange-100 text-orange-600',
    description: 'Fabrication et réparation de meubles, portes, fenêtres en bois.',
    services: ['Meubles sur mesure', 'Portes', 'Fenêtres', 'Réparation']
  },
  { 
    id: 7, 
    nom: 'Traiteur', 
    slug: 'traiteur',
    icon: ChefHat,
    color: 'bg-red-100 text-red-600',
    description: 'Services traiteur pour événements, mariages, baptêmes et fêtes.',
    services: ['Mariages', 'Baptêmes', 'Anniversaires', 'Événements d\'entreprise']
  },
  { 
    id: 8, 
    nom: 'Mécanique', 
    slug: 'mecanique',
    icon: Car,
    color: 'bg-gray-200 text-gray-600',
    description: 'Réparation et entretien automobile, diagnostic et dépannage.',
    services: ['Réparation moteur', 'Vidange', 'Freins', 'Diagnostic']
  },
  { 
    id: 9, 
    nom: 'Déménagement', 
    slug: 'demenagement',
    icon: Truck,
    color: 'bg-indigo-100 text-indigo-600',
    description: 'Services de déménagement, transport de meubles et objets.',
    services: ['Déménagement complet', 'Transport meubles', 'Emballage', 'Montage']
  },
  { 
    id: 10, 
    nom: 'Jardinage', 
    slug: 'jardinage',
    icon: TreeDeciduous,
    color: 'bg-emerald-100 text-emerald-600',
    description: 'Entretien de jardins, espaces verts, taille et aménagement.',
    services: ['Entretien jardin', 'Taille haies', 'Tonte pelouse', 'Aménagement']
  },
]

export default function Categories() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Toutes les catégories
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Découvrez l'ensemble de nos services et trouvez le prestataire idéal pour vos besoins
            </p>
          </div>

          {/* Grille des catégories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => {
              const Icon = category.icon
              return (
                <Link 
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition group"
                >
                  {/* Header catégorie */}
                  <div className="flex items-start mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${category.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition">
                        {category.nom}
                      </h2>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>

                  {/* Services populaires */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Services populaires :</p>
                    <div className="flex flex-wrap gap-2">
                      {category.services.slice(0, 3).map((service, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Lien voir plus */}
                  <div className="flex items-center text-secondary font-medium group-hover:underline">
                    Voir les prestataires
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-primary rounded-2xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Vous êtes professionnel ?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Rejoignez Allo Service Sénégal et développez votre activité. Des milliers de clients vous attendent !
            </p>
            <Link 
              href="/inscription"
              className="inline-flex items-center bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary/90 transition font-medium"
            >
              Devenir prestataire
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
