'use client'

import { useState, useEffect } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Publicite {
  id: number
  titre: string
  image_url: string
  lien_url?: string
  est_defaut: boolean
}

interface BannierePublicitaireProps {
  emplacement: 'SERVICES' | 'PRESTATAIRES'
  className?: string
}

export default function BannierePublicitaire({ emplacement, className = '' }: BannierePublicitaireProps) {
  const [publicite, setPublicite] = useState<Publicite | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchPublicite = async () => {
      try {
        const res = await fetch(`${API_URL}/api/publicites/${emplacement}`)
        if (res.ok) {
          const data = await res.json()
          setPublicite(data.data)
        }
      } catch (error) {
        console.error('Erreur chargement publicité:', error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPublicite()
  }, [emplacement])

  const handleClick = async () => {
    if (!publicite) return

    // Tracker le clic
    try {
      await fetch(`${API_URL}/api/publicites/${publicite.id}/clic`, {
        method: 'POST'
      })
    } catch (error) {
      console.error('Erreur tracking clic:', error)
    }

    // Rediriger si lien défini
    if (publicite.lien_url) {
      window.open(publicite.lien_url, '_blank', 'noopener,noreferrer')
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={`mb-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl h-[120px] animate-pulse ${className}`} />
    )
  }

  // Pas de publicité
  if (!publicite || hasError) {
    return null // Ne rien afficher s'il n'y a pas de pub
  }

  return (
    <div 
      className={`mb-8 rounded-xl overflow-hidden shadow-sm ${publicite.lien_url ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
      onClick={handleClick}
    >
      <img 
        src={publicite.image_url} 
        alt={publicite.titre}
        className="w-full h-auto object-cover"
        style={{ maxHeight: '200px' }}
        onError={(e) => {
          // Cacher si l'image ne charge pas
          (e.target as HTMLImageElement).parentElement!.style.display = 'none'
        }}
      />
    </div>
  )
}
