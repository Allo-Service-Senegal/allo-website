'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Categorie {
  id: number
  nom: string
  slug: string
  icone: string
  description?: string
}

// Mapping des icônes vers des emojis
const iconeEmoji: Record<string, string> = {
  'wrench': '🔧', 'hammer': '🔨', 'screwdriver': '🪛', 'drill': '🔩', 'saw': '🪚',
  'zap': '⚡', 'lightbulb': '💡', 'plug': '🔌', 'battery': '🔋',
  'droplets': '💧', 'shower': '🚿', 'faucet': '🚰',
  'spray-can': '🧹', 'sparkles': '✨', 'vacuum': '🧽', 'broom': '🧹',
  'paintbrush': '🎨', 'palette': '🖌️', 'roller': '🖼️',
  'snowflake': '❄️', 'fan': '🌀', 'thermometer': '🌡️',
  'chef-hat': '👨‍🍳', 'utensils': '🍴', 'cake': '🎂',
  'car': '🚗', 'truck': '🚚', 'moving': '📦',
  'tree-deciduous': '🌳', 'flower': '🌸', 'grass': '🌿', 'shovel': '⛏️',
  'scissors': '✂️', 'makeup': '💄', 'spa': '💆',
  'home': '🏠', 'building': '🏢', 'door': '🚪', 'window': '🪟',
  'computer': '💻', 'phone': '📱', 'wifi': '📶', 'printer': '🖨️',
  'shield': '🛡️', 'lock': '🔒', 'camera': '📷',
  'heart': '❤️', 'medical': '🏥', 'fitness': '💪',
  'book': '📚', 'graduation': '🎓', 'briefcase': '💼',
  'settings': '⚙️', 'tools': '🛠️', 'star': '⭐', 'package': '📦'
}

// Couleurs par catégorie
const colors = [
  'bg-blue-100 text-blue-600',
  'bg-yellow-100 text-yellow-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
  'bg-cyan-100 text-cyan-600',
  'bg-orange-100 text-orange-600',
  'bg-red-100 text-red-600',
  'bg-gray-200 text-gray-600',
  'bg-indigo-100 text-indigo-600',
  'bg-emerald-100 text-emerald-600',
  'bg-pink-100 text-pink-600',
  'bg-teal-100 text-teal-600',
]

export default function Categories() {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`)
        if (res.ok) {
          const data = await res.json()
          setCategories(data.data || [])
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Toutes les catégories</h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Découvrez l'ensemble de nos services et trouvez le prestataire idéal pour vos besoins
              </p>
            </div>
            <div className="flex justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          </div>
        </div>
      </div>
    )
  }

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
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucune catégorie disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const emoji = iconeEmoji[category.icone] || '📦'
                const color = colors[index % colors.length]
                
                return (
                  <Link 
                    key={category.id}
                    href={`/services?categorie=${category.slug}`}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition group"
                  >
                    {/* Header catégorie */}
                    <div className="flex items-start mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
                        <span className="text-3xl">{emoji}</span>
                      </div>
                      <div className="ml-4 flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition">
                          {category.nom}
                        </h2>
                      </div>
                    </div>

                    {/* Description */}
                    {category.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {category.description}
                      </p>
                    )}

                    {/* Lien voir plus */}
                    <div className="flex items-center text-secondary font-medium group-hover:underline">
                      Voir les services
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

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
