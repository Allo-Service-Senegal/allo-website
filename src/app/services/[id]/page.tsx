'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  MapPin, Star, Clock, CheckCircle, Phone, MessageCircle, 
  Share2, Heart, ArrowLeft, Calendar, Shield, ChevronRight
} from 'lucide-react'

// Données de démonstration
const servicesData: { [key: string]: any } = {
  '1': {
    id: 1,
    titre: 'Installation Climatiseur',
    description: 'Installation complète de climatiseur split avec garantie 1 an. Service professionnel incluant la pose, le raccordement électrique et la mise en service. Nous travaillons avec toutes les marques : Samsung, LG, Daikin, etc.',
    details: [
      'Pose murale ou console',
      'Raccordement électrique aux normes',
      'Mise en service et test',
      'Garantie 1 an sur l\'installation',
      'SAV disponible'
    ],
    tarif: 25000,
    type_tarif: 'FORFAIT',
    duree: '3 heures',
    mis_en_avant: true,
    prestataire: {
      id: 1,
      user: { nom: 'Diallo', prenom: 'Mamadou' },
      bio: 'Climaticien professionnel avec plus de 8 ans d\'expérience. Spécialisé dans l\'installation et la maintenance de systèmes de climatisation pour particuliers et entreprises.',
      experience: 8,
      note_globale: 4.9,
      nombre_avis: 127,
      verifie: true,
      quartier: { nom: 'Almadies', ville: { nom: 'Dakar' } }
    },
    categorie: { id: 5, nom: 'Climatisation', slug: 'climatisation' }
  },
  '2': {
    id: 2,
    titre: 'Nettoyage Complet Maison',
    description: 'Nettoyage professionnel de votre maison ou appartement. Service complet incluant toutes les pièces, les vitres et les sols.',
    details: [
      'Nettoyage de toutes les pièces',
      'Lavage des sols',
      'Nettoyage des vitres',
      'Dépoussiérage complet',
      'Désinfection sanitaires'
    ],
    tarif: 15000,
    type_tarif: 'FORFAIT',
    duree: '4 heures',
    mis_en_avant: true,
    prestataire: {
      id: 2,
      user: { nom: 'Sow', prenom: 'Fatou' },
      bio: 'Agent de ménage expérimentée avec 5 ans d\'expérience.',
      experience: 5,
      note_globale: 4.8,
      nombre_avis: 89,
      verifie: true,
      quartier: { nom: 'Pikine', ville: { nom: 'Dakar' } }
    },
    categorie: { id: 3, nom: 'Ménage', slug: 'menage' }
  },
  '3': {
    id: 3,
    titre: 'Réparation Plomberie',
    description: 'Réparation de fuites, débouchage, installation sanitaire. Intervention rapide et efficace.',
    details: [
      'Réparation de fuites',
      'Débouchage canalisations',
      'Installation sanitaire',
      'Remplacement robinetterie',
      'Dépannage urgent'
    ],
    tarif: 10000,
    type_tarif: 'HEURE',
    duree: '1-2 heures',
    mis_en_avant: true,
    prestataire: {
      id: 3,
      user: { nom: 'Tall', prenom: 'Omar' },
      bio: 'Plombier expérimenté, intervention rapide.',
      experience: 12,
      note_globale: 4.7,
      nombre_avis: 156,
      verifie: true,
      quartier: { nom: 'Médina', ville: { nom: 'Dakar' } }
    },
    categorie: { id: 1, nom: 'Plomberie', slug: 'plomberie' }
  }
}

export default function ServiceDetail() {
  const params = useParams()
  const id = params.id as string
  const [isFavorite, setIsFavorite] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  const service = servicesData[id] || servicesData['1']

  const formatTarif = (tarif: number, type: string) => {
    const formatted = tarif.toLocaleString('fr-FR')
    switch (type) {
      case 'HEURE': return `${formatted} CFA/h`
      case 'M2': return `${formatted} CFA/m²`
      case 'JOUR': return `${formatted} CFA/jour`
      default: return `${formatted} CFA`
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/services" className="hover:text-primary flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Services
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href={`/categories/${service.categorie.slug}`} className="hover:text-primary">
              {service.categorie.nom}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">{service.titre}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image du service */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-64 lg:h-80 bg-gradient-to-br from-secondary/20 to-primary/20 relative flex items-center justify-center">
                  <span className="text-8xl font-bold text-primary/20">
                    {service.titre.charAt(0)}
                  </span>
                  {service.mis_en_avant && (
                    <span className="absolute top-4 left-4 bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      En vedette
                    </span>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} shadow-md hover:scale-105 transition`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 rounded-full bg-white text-gray-600 shadow-md hover:scale-105 transition">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Détails du service */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-secondary text-sm font-medium">{service.categorie.nom}</span>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
                      {service.titre}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Durée estimée : {service.duree}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {service.prestataire.quartier.nom}, {service.prestataire.quartier.ville.nom}
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Ce qui est inclus */}
                <div className="border-t pt-6">
                  <h2 className="font-semibold text-lg text-gray-900 mb-4">Ce qui est inclus</h2>
                  <ul className="space-y-3">
                    {service.details.map((detail: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Prestataire */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">À propos du prestataire</h2>
                <Link href={`/prestataires/${service.prestataire.id}`} className="flex items-start group">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">
                        {service.prestataire.user.prenom.charAt(0)}{service.prestataire.user.nom.charAt(0)}
                      </span>
                    </div>
                    {service.prestataire.verifie && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition">
                      {service.prestataire.user.prenom} {service.prestataire.user.nom}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium">{service.prestataire.note_globale}</span>
                      <span className="ml-1 text-gray-500 text-sm">({service.prestataire.nombre_avis} avis)</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {service.prestataire.bio}
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sidebar - Réservation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                {/* Prix */}
                <div className="mb-6">
                  <p className="text-gray-500 text-sm">À partir de</p>
                  <p className="text-3xl font-bold text-secondary">
                    {formatTarif(service.tarif, service.type_tarif)}
                  </p>
                </div>

                {/* Garanties */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2 text-secondary" />
                    Prestataire vérifié
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    {service.prestataire.note_globale}/5 ({service.prestataire.nombre_avis} avis)
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    Durée : {service.duree}
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  <button className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition font-medium flex items-center justify-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Demander un devis
                  </button>
                  
                  {showPhone ? (
                    <a 
                      href="tel:+221771234567"
                      className="w-full border-2 border-secondary text-secondary py-3 px-4 rounded-lg hover:bg-secondary hover:text-white transition font-medium flex items-center justify-center"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      +221 77 123 45 67
                    </a>
                  ) : (
                    <button 
                      onClick={() => setShowPhone(true)}
                      className="w-full border-2 border-secondary text-secondary py-3 px-4 rounded-lg hover:bg-secondary hover:text-white transition font-medium flex items-center justify-center"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Voir le téléphone
                    </button>
                  )}

                  <a 
                    href={`https://wa.me/221771234567?text=Bonjour, je suis intéressé par votre service : ${service.titre}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition font-medium flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contacter sur WhatsApp
                  </a>
                </div>

                {/* Note de confiance */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  Paiement sécurisé via Wave, Orange Money ou carte bancaire
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
