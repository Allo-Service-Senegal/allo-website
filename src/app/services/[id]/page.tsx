'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { 
  MapPin, Star, Clock, CheckCircle, Phone, MessageCircle, 
  Share2, Heart, ArrowLeft, Calendar, Shield, ChevronRight, Loader2,
  X, Send, FileText
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Service {
  id: number
  titre: string
  description: string
  tarif: number
  type_tarif: string
  duree_estimee: string
  vedette: boolean
  prestataire: {
    id: number
    user: {
      nom: string
      prenom: string
      telephone: string
      photo?: string
    }
    bio: string
    experience: number
    note_globale: number
    nombre_avis: number
    verifie: boolean
  }
  categorie: {
    id: number
    nom: string
    slug: string
  }
}

export default function ServiceDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  
  // État pour le formulaire de demande
  const [showDemandeModal, setShowDemandeModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [demandeForm, setDemandeForm] = useState({
    description: '',
    date_souhaitee: '',
    adresse: ''
  })

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`${API_URL}/api/services/${id}`)
        if (res.ok) {
          const data = await res.json()
          setService(data.data || data)
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchService()
    
    // Vérifier si l'utilisateur est connecté
    checkAuth()
  }, [id])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoggedIn(false)
      return
    }
    
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const user = await res.json()
        setIsLoggedIn(true)
        setUserRole(user.role)
      } else {
        setIsLoggedIn(false)
      }
    } catch {
      setIsLoggedIn(false)
    }
  }

  const handleDemandeClick = () => {
    if (!isLoggedIn) {
      // Rediriger vers la connexion avec retour
      router.push(`/connexion?redirect=/services/${id}`)
      return
    }
    
    if (userRole === 'PRESTATAIRE') {
      alert('Vous êtes connecté en tant que prestataire. Pour demander un devis, connectez-vous avec un compte client.')
      return
    }
    
    // Pré-remplir la description
    setDemandeForm({
      ...demandeForm,
      description: `Demande pour : ${service?.titre}`
    })
    setShowDemandeModal(true)
  }

  const handleSubmitDemande = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!demandeForm.description.trim()) {
      setSubmitError('Veuillez décrire votre besoin')
      return
    }
    
    const token = localStorage.getItem('token')
    if (!token) return
    
    setSubmitting(true)
    setSubmitError('')
    
    try {
      const res = await fetch(`${API_URL}/api/client/demandes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prestataire_id: service?.prestataire?.id,
          service_id: service?.id,
          description: demandeForm.description,
          date_souhaitee: demandeForm.date_souhaitee || null,
          adresse: demandeForm.adresse || null
        })
      })
      
      const data = await res.json()
      
      if (res.ok && data.success) {
        setSubmitSuccess(true)
        setDemandeForm({ description: '', date_souhaitee: '', adresse: '' })
      } else {
        setSubmitError(data.detail || 'Erreur lors de l\'envoi de la demande')
      }
    } catch (error) {
      setSubmitError('Erreur de connexion au serveur')
    } finally {
      setSubmitting(false)
    }
  }

  const formatTarif = (tarif: number, type: string) => {
    const formatted = tarif?.toLocaleString('fr-FR') || '0'
    switch (type) {
      case 'HEURE': return `${formatted} CFA/h`
      case 'M2': return `${formatted} CFA/m²`
      case 'JOUR': return `${formatted} CFA/jour`
      default: return `${formatted} CFA`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Service non trouvé</h1>
        <Link href="/services" className="text-secondary hover:underline">
          Retour aux services
        </Link>
      </div>
    )
  }

  const phone = service.prestataire?.user?.telephone || '+221787886464'
  const whatsappNumber = phone.replace(/\s/g, '').replace('+', '')

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
            <Link href={`/services?categorie=${service.categorie?.slug}`} className="hover:text-primary">
              {service.categorie?.nom}
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
                    {service.titre?.charAt(0)}
                  </span>
                  {service.vedette && (
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
                    <span className="text-secondary text-sm font-medium">{service.categorie?.nom}</span>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
                      {service.titre}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  {service.duree_estimee && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Durée estimée : {service.duree_estimee}
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {service.description || 'Aucune description disponible.'}
                </p>
              </div>

              {/* Prestataire */}
              {service.prestataire && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="font-semibold text-lg text-gray-900 mb-4">À propos du prestataire</h2>
                  <Link href={`/prestataires/${service.prestataire.id}`} className="flex items-start group">
                    <div className="relative">
                      {service.prestataire.user?.photo ? (
                        <img 
                          src={service.prestataire.user.photo} 
                          alt={`${service.prestataire.user.prenom} ${service.prestataire.user.nom}`}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">
                            {service.prestataire.user?.prenom?.charAt(0)}{service.prestataire.user?.nom?.charAt(0)}
                          </span>
                        </div>
                      )}
                      {service.prestataire.verifie && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition">
                        {service.prestataire.user?.prenom} {service.prestataire.user?.nom}
                      </h3>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 font-medium">{service.prestataire.note_globale?.toFixed(1) || '5.0'}</span>
                        <span className="ml-1 text-gray-500 text-sm">({service.prestataire.nombre_avis || 0} avis)</span>
                      </div>
                      {service.prestataire.bio && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {service.prestataire.bio}
                        </p>
                      )}
                    </div>
                  </Link>

                  {/* Avertissement non vérifié */}
                  {!service.prestataire.verifie && (
                    <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-orange-700 text-sm flex items-center">
                        <span className="mr-2">⚠️</span>
                        Ce prestataire n'est pas encore vérifié. Nous vous recommandons de vérifier ses références.
                      </p>
                    </div>
                  )}
                </div>
              )}
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
                  {service.prestataire?.verifie ? (
                    <div className="flex items-center text-sm text-green-600">
                      <Shield className="w-4 h-4 mr-2" />
                      Prestataire vérifié
                    </div>
                  ) : (
                    <div className="flex items-center text-sm text-orange-600">
                      <Shield className="w-4 h-4 mr-2" />
                      Prestataire non vérifié
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    {service.prestataire?.note_globale?.toFixed(1) || '5.0'}/5 ({service.prestataire?.nombre_avis || 0} avis)
                  </div>
                  {service.duree_estimee && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      Durée : {service.duree_estimee}
                    </div>
                  )}
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  {/* Bouton principal - Demande intégrée */}
                  <button 
                    onClick={handleDemandeClick}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition font-medium flex items-center justify-center"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Demander un devis
                  </button>
                  
                  {showPhone ? (
                    <a 
                      href={`tel:${phone}`}
                      className="w-full border-2 border-secondary text-secondary py-3 px-4 rounded-lg hover:bg-secondary hover:text-white transition font-medium flex items-center justify-center"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      {phone}
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
                    href={`https://wa.me/${whatsappNumber}?text=Bonjour, je suis intéressé par votre service : ${service.titre}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition font-medium flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contacter sur WhatsApp
                  </a>
                </div>

                {/* Info connexion */}
                {!isLoggedIn && (
                  <p className="text-xs text-gray-500 text-center mt-4">
                    <Link href="/connexion" className="text-secondary hover:underline">Connectez-vous</Link> pour envoyer une demande et suivre vos échanges
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de demande */}
      {showDemandeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => !submitting && setShowDemandeModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {submitSuccess ? (
              // Message de succès
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
                <p className="text-gray-600 mb-6">
                  Votre demande a été envoyée à {service.prestataire?.user?.prenom}. 
                  Vous recevrez une réponse dans les plus brefs délais.
                </p>
                <div className="space-y-3">
                  <a
                    href="https://dashboard.alloservicesenegal.com/client/demandes"
                    className="block w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition text-center"
                  >
                    Voir mes demandes
                  </a>
                  <button
                    onClick={() => {
                      setShowDemandeModal(false)
                      setSubmitSuccess(false)
                    }}
                    className="block w-full py-3 px-4 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            ) : (
              // Formulaire
              <>
                <div className="p-6 border-b flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Demander un devis</h3>
                    <p className="text-sm text-gray-500">Pour : {service.titre}</p>
                  </div>
                  <button 
                    onClick={() => setShowDemandeModal(false)}
                    disabled={submitting}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmitDemande} className="p-6 space-y-4">
                  {submitError && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                      {submitError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Décrivez votre besoin *
                    </label>
                    <textarea
                      value={demandeForm.description}
                      onChange={(e) => setDemandeForm({ ...demandeForm, description: e.target.value })}
                      rows={4}
                      required
                      placeholder="Décrivez votre projet, vos attentes, les détails importants..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date souhaitée
                    </label>
                    <input
                      type="date"
                      value={demandeForm.date_souhaitee}
                      onChange={(e) => setDemandeForm({ ...demandeForm, date_souhaitee: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse d'intervention
                    </label>
                    <input
                      type="text"
                      value={demandeForm.adresse}
                      onChange={(e) => setDemandeForm({ ...demandeForm, adresse: e.target.value })}
                      placeholder="Ex: Dakar, Almadies"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowDemandeModal(false)}
                      disabled={submitting}
                      className="flex-1 py-3 px-4 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Envoyer
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}