'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, MapPin, CheckCircle, Briefcase, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Prestataire {
  id: number
  user: {
    id: number
    nom: string
    prenom: string
    photo?: string
  }
  bio?: string
  experience?: number
  verifie: boolean
  note_globale: number
  nombre_avis: number
  quartier?: {
    nom: string
    ville?: {
      nom: string
    }
  }
  services?: Array<{
    id: number
    titre: string
    categorie?: {
      nom: string
    }
  }>
}

export default function PrestatairesRecommandes() {
  const [prestataires, setPrestataires] = useState<Prestataire[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrestataires = async () => {
      try {
        const res = await fetch(`${API_URL}/api/prestataires?limit=4`)
        if (res.ok) {
          const data = await res.json()
          setPrestataires(data.data?.prestataires || [])
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPrestataires()
  }, [])

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-2 mb-12">
            <span className="text-3xl">👨‍🔧</span>
            <h2 className="text-3xl font-bold text-primary">Prestataires recommandés</h2>
          </div>
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (prestataires.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="text-3xl">👨‍🔧</span>
          <h2 className="text-3xl font-bold text-primary">Prestataires recommandés</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {prestataires.map((p) => {
            const initiales = `${p.user.prenom?.charAt(0) || ''}${p.user.nom?.charAt(0) || ''}`
            const metier = p.services?.[0]?.categorie?.nom || 'Prestataire'
            
            return (
              <Link key={p.id} href={`/prestataires/${p.id}`} className="card text-center group hover:border-secondary border-2 border-transparent">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {p.user.photo ? (
                    <img src={p.user.photo} alt={`${p.user.prenom} ${p.user.nom}`} className="w-24 h-24 rounded-full object-cover" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-3xl font-bold">{initiales}</span>
                    </div>
                  )}
                  {p.verifie && (
                    <div className="absolute bottom-0 right-0 bg-secondary text-white rounded-full p-1">
                      <CheckCircle size={18} />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition-colors duration-200">
                  {p.user.prenom} {p.user.nom}
                </h3>
                <p className="text-gray-600 mb-2">{metier}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="text-yellow-500 fill-yellow-500" size={18} />
                  <span className="font-semibold">{p.note_globale?.toFixed(1) || '5.0'}</span>
                  <span className="text-gray-400 text-sm">({p.nombre_avis || 0} avis)</span>
                </div>
                {p.quartier && (
                  <div className="flex items-center justify-center text-gray-500 text-sm mb-3">
                    <MapPin size={14} className="mr-1" />
                    {p.quartier.nom}
                    {p.quartier.ville && `, ${p.quartier.ville.nom}`}
                  </div>
                )}
                {p.experience && (
                  <div className="flex items-center justify-center text-gray-500 text-sm">
                    <Briefcase size={14} className="mr-1" />{p.experience} ans d'expérience
                  </div>
                )}
                <button className="mt-4 w-full btn-outline text-sm py-2 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary">
                  Voir le profil
                </button>
              </Link>
            )
          })}
        </div>
        <div className="text-center mt-10">
          <Link href="/prestataires" className="btn-primary">Voir tous les prestataires</Link>
        </div>
      </div>
    </section>
  )
}
