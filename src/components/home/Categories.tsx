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
  'wrench': '🔧',
  'zap': '⚡',
  'spray-can': '🧹',
  'paintbrush': '🎨',
  'snowflake': '❄️',
  'hammer': '🔨',
  'chef-hat': '👨‍🍳',
  'car': '🚗',
  'truck': '🚚',
  'tree-deciduous': '🌳',
  'scissors': '✂️',
  'home': '🏠',
  'droplets': '💧',
  'lightbulb': '💡',
  'settings': '⚙️',
  'computer': '💻',
  'phone': '📱',
  'shield': '🛡️',
  'heart': '❤️',
  'book': '📚',
  'tools': '🛠️',
  'star': '⭐',
  'package': '📦'
}

// Couleurs par défaut basées sur l'index
const colors = [
  'bg-blue-100 text-blue-600',
  'bg-yellow-100 text-yellow-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
  'bg-cyan-100 text-cyan-600',
  'bg-orange-100 text-orange-600',
  'bg-red-100 text-red-600',
  'bg-gray-100 text-gray-600',
  'bg-indigo-100 text-indigo-600',
  'bg-emerald-100 text-emerald-600',
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
          if (data.data) {
            setCategories(data.data.slice(0, 10)) // Max 10 catégories
          }
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
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Nos services populaires</h2>
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <h2 className="section-title">Nos services populaires</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const emoji = iconeEmoji[category.icone] || '📦'
            const color = colors[index % colors.length]
            
            return (
              <Link
                key={category.id}
                href={`/services?categorie=${category.slug}`}
                className="card flex flex-col items-center text-center group hover:border-secondary border-2 border-transparent"
              >
                <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-3xl">{emoji}</span>
                </div>
                <span className="font-semibold text-primary group-hover:text-secondary transition-colors duration-200">
                  {category.nom}
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
