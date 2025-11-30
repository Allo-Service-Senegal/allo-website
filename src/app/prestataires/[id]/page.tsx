'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  MapPin, Star, CheckCircle, Phone, MessageCircle, 
  Share2, Heart, ArrowLeft, Calendar, Shield, ChevronRight,
  Briefcase, Clock, Award, ThumbsUp
} from 'lucide-react'

// Données de démonstration
const prestatairesData: { [key: string]: any } = {
  '1': {
    id: 1,
    user: { nom: 'Diallo', prenom: 'Mamadou' },
    bio: 'Climaticien professionnel avec plus de 8 ans d\'expérience. Spécialisé dans l\'installation et la maintenance de systèmes de climatisation pour particuliers et entreprises. Je travaille avec toutes les grandes marques : Samsung, LG, Daikin, Carrier, etc. Mon objectif est de vous garantir un confort optimal toute l\'année.',
    experience: 8,
    note_globale: 4.9,
    nombre_avis: 127,
    verifie: true,
    telephone: '+221 77 123 45 67',
    quartier: { nom: 'Almadies', ville: { nom: 'Dakar' } },
    services: [
      { id: 1, titre: 'Installation Climatiseur', tarif: 25000, type_tarif: 'FORFAIT', categorie: { nom: 'Climatisation' } },
      { id: 2, titre: 'Maintenance Climatiseur', tarif: 15000, type_tarif: 'FORFAIT', categorie: { nom: 'Climatisation' } },
      { id: 3, titre: 'Réparation Climatiseur', tarif: 10000, type_tarif: 'HEURE', categorie: { nom: 'Climatisation' } },
    ],
    avis: [
      { id: 1, auteur: 'Aminata S.', note: 5, date: '15 Nov 2025', commentaire: 'Excellent travail ! Installation rapide et propre. Je recommande vivement.' },
      { id: 2, auteur: 'Ibrahima D.', note: 5, date: '10 Nov 2025', commentaire: 'Très professionnel, ponctuel et efficace. Le climatiseur fonctionne parfaitement.' },
      { id: 3, auteur: 'Fatou N.', note: 4, date: '5 Nov 2025', commentaire: 'Bon service, juste un petit retard mais travail de qualité.' },
    ],
    stats: {
      projets_completes: 180,
      clients_satisfaits: 98,
      reponse_moyenne: '< 1 heure'
    }
  },
  '2': {
    id: 2,
    user: { nom: 'Sow', prenom: 'Fatou' },
    bio: 'Agent de ménage expérimentée avec 5 ans d\'expérience. Nettoyage professionnel pour particuliers et entreprises. Je suis minutieuse, ponctuelle et je m\'adapte à vos besoins spécifiques.',
    experience: 5,
    note_globale: 4.8,
    nombre_avis: 89,
    verifie: true,
    telephone: '+221 77 234 56 78',
    quartier: { nom: 'Pikine', ville: { nom: 'Dakar' } },
    services: [
      { id: 4, titre: 'Nettoyage Complet Maison', tarif: 15000, type_tarif: 'FORFAIT', categorie: { nom: 'Ménage' } },
      { id: 5, titre: 'Ménage Régulier', tarif: 5000, type_tarif: 'HEURE', categorie: { nom: 'Ménage' } },
      { id: 6, titre: 'Nettoyage Bureaux', tarif: 20000, type_tarif: 'FORFAIT', categorie: { nom: 'Ménage' } },
    ],
    avis: [
      { id: 1, auteur: 'Marie L.', note: 5, date: '12 Nov 2025', commentaire: 'Fatou est très professionnelle et fait un travail impeccable.' },
      { id: 2, auteur: 'Omar T.', note: 5, date: '8 Nov 2025', commentaire: 'Très satisfait du service. Maison impeccable !' },
    ],
    stats: {
      projets_completes: 120,
      clients_satisfaits: 96,
      reponse_moyenne: '< 2 heures'
    }
  },
  '3': {
    id: 3,
    user: { nom: 'Tall', prenom: 'Omar' },
    bio: 'Plombier et climaticien avec 12 ans d\'expérience. Intervention rapide pour tous vos problèmes de plomberie. Disponible 7j/7 pour les urgences.',
    experience: 12,
    note_globale: 4.7,
    nombre_avis: 156,
    verifie: true,
    telephone: '+221 77 345 67 89',
    quartier: { nom: 'Médina', ville: { nom: 'Dakar' } },
    services: [
      { id: 7, titre: 'Réparation Plomberie', tarif: 10000, type_tarif: 'HEURE', categorie: { nom: 'Plomberie' } },
      { id: 8, titre: 'Débouchage Canalisation', tarif: 15000, type_tarif: 'FORFAIT', categorie: { nom: 'Plomberie' } },
      { id: 9, titre: 'Installation Sanitaire', tarif: 25000, type_tarif: 'FORFAIT', categorie: { nom: 'Plomberie' } },
    ],
    avis: [
      { id: 1, auteur: 'Cheikh D.', note: 5, date: '14 Nov 2025', commentaire: 'Intervention très rapide pour une urgence. Merci !' },
      { id: 2, auteur: 'Aissatou B.', note: 4, date: '9 Nov 2025', commentaire: 'Bon travail, tarifs corrects.' },
    ],
    stats: {
      projets_completes: 250,
      clients_satisfaits: 94,
      reponse_moyenne: '< 30 min'
    }
  }
}

export default function PrestataireDetail() {
  const params = useParams()
  const id = params.id as string
  const [isFavorite, setIsFavorite] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  const prestataire = prestatairesData[id] || prestatairesData['1']

  const formatTarif = (tarif: number, type: string) => {
    const formatted = tarif.toLocaleString('fr-FR')
    switch (type) {
      case 'HEURE': return `${formatted} CFA/h`
      case 'M2': return `${formatted} CFA/m²`
      case 'JOUR': return `${formatted} CFA/jour`
      default: return `À partir de ${formatted} CFA`
    }
  }

  const renderStars = (note: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < note ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/prestataires" className="hover:text-primary flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Prestataires
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">{prestataire.user.prenom} {prestataire.user.nom}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profil Header */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">
                        {prestataire.user.prenom.charAt(0)}{prestataire.user.nom.charAt(0)}
                      </span>
                    </div>
                    {prestataire.verifie && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                          {prestataire.user.prenom} {prestataire.user.nom}
                        </h1>
                        <p className="text-secondary font-medium">
                          {prestataire.services.map((s: any) => s.categorie.nom).filter((v: string, i: number, a: string[]) => a.indexOf(v) === i).join(', ')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setIsFavorite(!isFavorite)}
                          className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'} hover:scale-105 transition`}
                        >
                          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:scale-105 transition">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Stats rapides */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="ml-1 font-semibold">{prestataire.note_globale}</span>
                        <span className="ml-1 text-gray-500">({prestataire.nombre_avis} avis)</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {prestataire.quartier.nom}, {prestataire.quartier.ville.nom}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {prestataire.experience} ans d'expérience
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6 pt-6 border-t">
                  <h2 className="font-semibold text-gray-900 mb-2">À propos</h2>
                  <p className="text-gray-700 leading-relaxed">{prestataire.bio}</p>
                </div>

                {/* Stats détaillées */}
                <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Award className="w-5 h-5 text-secondary mr-1" />
                      <span className="text-2xl font-bold text-gray-900">{prestataire.stats.projets_completes}</span>
                    </div>
                    <p className="text-sm text-gray-500">Projets complétés</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <ThumbsUp className="w-5 h-5 text-secondary mr-1" />
                      <span className="text-2xl font-bold text-gray-900">{prestataire.stats.clients_satisfaits}%</span>
                    </div>
                    <p className="text-sm text-gray-500">Clients satisfaits</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="w-5 h-5 text-secondary mr-1" />
                      <span className="text-2xl font-bold text-gray-900">{prestataire.stats.reponse_moyenne}</span>
                    </div>
                    <p className="text-sm text-gray-500">Temps de réponse</p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">Services proposés</h2>
                <div className="space-y-4">
                  {prestataire.services.map((service: any) => (
                    <Link 
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-secondary hover:bg-secondary/5 transition group"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-secondary transition">
                          {service.titre}
                        </h3>
                        <span className="text-sm text-gray-500">{service.categorie.nom}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-secondary">
                          {formatTarif(service.tarif, service.type_tarif)}
                        </p>
                        <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Avis */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg text-gray-900">
                    Avis clients ({prestataire.nombre_avis})
                  </h2>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="ml-1 font-semibold text-lg">{prestataire.note_globale}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {prestataire.avis.map((avis: any) => (
                    <div key={avis.id} className="pb-6 border-b last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="font-medium text-gray-600">
                              {avis.auteur.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{avis.auteur}</p>
                            <p className="text-sm text-gray-500">{avis.date}</p>
                          </div>
                        </div>
                        <div className="flex">{renderStars(avis.note)}</div>
                      </div>
                      <p className="text-gray-700">{avis.commentaire}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                  Voir tous les avis
                </button>
              </div>
            </div>

            {/* Sidebar - Contact */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                {/* Badge vérifié */}
                {prestataire.verifie && (
                  <div className="flex items-center bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="font-medium">Prestataire vérifié</span>
                  </div>
                )}

                {/* Note */}
                <div className="text-center mb-6 pb-6 border-b">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-8 h-8 text-yellow-500 fill-current" />
                    <span className="text-4xl font-bold ml-2">{prestataire.note_globale}</span>
                  </div>
                  <p className="text-gray-500">{prestataire.nombre_avis} avis clients</p>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  <button className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition font-medium flex items-center justify-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Demander un devis
                  </button>
                  
                  {showPhone ? (
                    <a 
                      href={`tel:${prestataire.telephone}`}
                      className="w-full border-2 border-secondary text-secondary py-3 px-4 rounded-lg hover:bg-secondary hover:text-white transition font-medium flex items-center justify-center"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      {prestataire.telephone}
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
                    href={`https://wa.me/${prestataire.telephone.replace(/\s/g, '').replace('+', '')}?text=Bonjour, je vous contacte depuis Allo Service Sénégal.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition font-medium flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contacter sur WhatsApp
                  </a>
                </div>

                {/* Infos supplémentaires */}
                <div className="mt-6 pt-6 border-t space-y-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Répond généralement en {prestataire.stats.reponse_moyenne}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {prestataire.quartier.nom}, {prestataire.quartier.ville.nom}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {prestataire.experience} ans d'expérience
                  </div>
                </div>

                {/* Note de confiance */}
                <p className="text-xs text-gray-500 text-center mt-6">
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
