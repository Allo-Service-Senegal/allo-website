'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, MapPin, Clock, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Service {
  id: number
  titre: string
  description: string
  tarif: number
  type_tarif: string
  duree_estimee?: string
  image?: string
  prestataire: {
    id: number
    user: {
      nom: string
      prenom: string
    }
    note_globale: number
    quartier?: {
      nom: string
      ville?: {
        nom: string
      }
    }
  }
}

export default function ServicesEnVedette() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_URL}/api/services?vedette=true&limit=6`)
        if (res.ok) {
          const data = await res.json()
          if (data.data?.services) {
            setServices(data.data.services)
          }
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const formatTarif = (tarif: number, type: string) => {
    const f = tarif.toLocaleString('fr-FR')
    switch (type) {
      case 'HEURE': return `${f} CFA/h`
      case 'M2': return `${f} CFA/m²`
      case 'JOUR': return `${f} CFA/jour`
      default: return `À partir de ${f} CFA`
    }
  }

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-2 mb-12">
            <Star className="text-yellow-500 fill-yellow-500" size={28} />
            <h2 className="text-3xl font-bold text-primary">Services en vedette</h2>
          </div>
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (services.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-2 mb-12">
          <Star className="text-yellow-500 fill-yellow-500" size={28} />
          <h2 className="text-3xl font-bold text-primary">Services en vedette</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`} className="card overflow-hidden group">
              <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-secondary/20 flex items-center justify-center">
                {service.image ? (
                  <img src={service.image} alt={service.titre} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-secondary text-6xl font-bold opacity-30">{service.titre.charAt(0)}</span>
                )}
                <div className="absolute top-4 left-4 z-20 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} className="fill-white" /> En vedette
                </div>
              </div>
              <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition-colors duration-200 mb-2">
                {service.titre}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-secondary font-bold text-lg">
                  {formatTarif(service.tarif, service.type_tarif)}
                </span>
                {service.duree_estimee && (
                  <span className="flex items-center text-gray-500 text-sm">
                    <Clock size={16} className="mr-1" />
                    {service.duree_estimee}
                  </span>
                )}
              </div>
              <div className="flex items-center pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">
                    {service.prestataire.user.prenom?.charAt(0) || service.prestataire.user.nom.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-primary text-sm">
                    {service.prestataire.user.prenom} {service.prestataire.user.nom}
                  </div>
                  {service.prestataire.quartier && (
                    <div className="flex items-center text-gray-500 text-xs">
                      <MapPin size={12} className="mr-1" />
                      {service.prestataire.quartier.nom}
                      {service.prestataire.quartier.ville && `, ${service.prestataire.quartier.ville.nom}`}
                    </div>
                  )}
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} className="fill-yellow-500 mr-1" />
                  <span className="font-semibold">{service.prestataire.note_globale?.toFixed(1) || '5.0'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/services" className="btn-primary">Voir tous les services</Link>
        </div>
      </div>
    </section>
  )
}
