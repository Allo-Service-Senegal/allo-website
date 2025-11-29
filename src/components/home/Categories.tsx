import Link from 'next/link'
import { Wrench, Zap, SprayCan, Paintbrush, Snowflake, Hammer, ChefHat, Car, Truck, TreeDeciduous, ArrowRight } from 'lucide-react'

export default function Categories() {
  const categories = [
    { name: 'Plomberie', slug: 'plomberie', icon: Wrench, color: 'bg-blue-100 text-blue-600' },
    { name: 'Électricité', slug: 'electricite', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Ménage', slug: 'menage', icon: SprayCan, color: 'bg-green-100 text-green-600' },
    { name: 'Peinture', slug: 'peinture', icon: Paintbrush, color: 'bg-purple-100 text-purple-600' },
    { name: 'Climatisation', slug: 'climatisation', icon: Snowflake, color: 'bg-cyan-100 text-cyan-600' },
    { name: 'Menuiserie', slug: 'menuiserie', icon: Hammer, color: 'bg-orange-100 text-orange-600' },
    { name: 'Traiteur', slug: 'traiteur', icon: ChefHat, color: 'bg-red-100 text-red-600' },
    { name: 'Mécanique', slug: 'mecanique', icon: Car, color: 'bg-gray-100 text-gray-600' },
    { name: 'Déménagement', slug: 'demenagement', icon: Truck, color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Jardinage', slug: 'jardinage', icon: TreeDeciduous, color: 'bg-emerald-100 text-emerald-600' },
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <h2 className="section-title">Nos services populaires</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.slug}
                href={`/services?categorie=${category.slug}`}
                className="card flex flex-col items-center text-center group hover:border-secondary border-2 border-transparent"
              >
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={32} />
                </div>
                <span className="font-semibold text-primary group-hover:text-secondary transition-colors duration-200">
                  {category.name}
                </span>
              </Link>
            )
          })}
        </div>
        <div className="text-center mt-10">
          <Link href="/categories" className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-semibold transition-colors duration-200">
            <span>Voir toutes les catégories</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
