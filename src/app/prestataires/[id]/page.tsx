'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { 
  MapPin, Star, CheckCircle, Phone, MessageCircle, 
  Share2, Heart, ArrowLeft, Calendar, Shield, ChevronRight,
  Briefcase, Clock, Loader2, X, Send, FileText
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

interface Prestataire {
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
  services: {
    id: number
    titre: string
    tarif: number
    type_tarif: string
    categorie: {
      nom: string
      slug: string
    }
  }[]
}

interface Avis {
  id: number
  note: number
  commentaire: string
  created_at: string
  client: {
    prenom: string
    nom: string
  }
}

export default function PrestataireDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [prestataire, setPrestataire] = useState<Prestataire | null>(null)
  const [avis, setAvis] = useState<Avis[]>([])
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
    service_id: '',
    description: '',
    date_souhaitee: '',
    adresse: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger le prestataire
        const prestRes = await fetch(`${API_URL}/api/prestataires/${id}`)
        if (prestRes.ok) {
          const data = await prestRes.json()
          setPrestataire(data.data || data)
        }

        // Charger les avis
        const avisRes = await fetch(`${API_URL}/api/prestataires/${id}/avis`)
        if (avisRes.ok) {
          const data = await avisRes.json()
          setAvis(data.data || [])
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    
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
      router.push(`/connexion?redirect=/prestataires/${id}`)
      return
    }
    
    if (userRole === 'PRESTATAIRE') {
      alert('Les prestataires ne peuvent pas envoyer de demandes. Connectez-vous avec un compte client.')
      return
    }
    
    setDemandeForm({
      service_id: prestataire?.services?.[0]?.id?.toString() || '',
      description: '',
      date_souhaitee: '',
      adresse: ''
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
          prestataire_id: prestataire?.id,
          service_id: demandeForm.service_id ? parseInt(demandeForm.service_id) : null,
          description: demandeForm.description,
          date_souhaitee: demandeForm.date_souhaitee || null,
          adresse: demandeForm.adresse || null
        })
      })
      
      const data = await res.json()
      
      if (res.ok && data.success) {
        setSubmitSuccess(true)
        setDemandeForm({ service_id: '', description: '', date_souhaitee: '', adresse: '' })
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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    )
  }

  if (!prestataire) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Prestataire non trouvé</h1>
        <Link href="/prestataires" className="text-secondary hover:underline">
          Retour aux prestataires
        </Link>
      </div>
    )
  }

  const phone = prestataire.user?.telephone || '+221787886464'
  const whatsappNumber = phone.replace(/\s/g, '').replace('+', '')
  const metiersSet = prestataire.services?.map(s => s.categorie?.nom).filter(Boolean) || []
  const metiers = metiersSet.filter((v, i, a) => a.indexOf(v) === i)

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
            <span className="text-gray-900">{prestataire.user?.prenom} {prestataire.user?.nom}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profil Header */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    {prestataire.user?.photo ? (
                      <img 
                        src={prestataire.user.photo} 
                        alt={`${prestataire.user.prenom} ${prestataire.user.nom}`}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary">
                          {prestataire.user?.prenom?.charAt(0)}{prestataire.user?.nom?.charAt(0)}
                        </span>
                      </div>
                    )}
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
                          {prestataire.user?.prenom} {prestataire.user?.nom}
                        </h1>
                        <p className="text-secondary font-medium">
                          {metiers.join(', ') || 'Prestataire'}
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

                    <div className="flex flex-wrap gap-4 mt-4 text-sm">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="ml-1 font-semibold">{prestataire.note_globale?.toFixed(1) || '5.0'}</span>
                        <span className="ml-1 text-gray-500">({prestataire.nombre_avis || 0} avis)</span>
                      </div>
                      {prestataire.experience && (
                        <div className="flex items-center text-gray-500">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {prestataire.experience} ans d'exp.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {prestataire.bio && (
                  <div className="mt-6 pt-6 border-t">
                    <h2 className="font-semibold text-gray-900 mb-2">À propos</h2>
                    <p className="text-gray-700 leading-relaxed">{prestataire.bio}</p>
                  </div>
                )}

                {/* Avertissement non vérifié */}
                {!prestataire.verifie && (
                  <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-orange-700 text-sm flex items-center">
                      <span className="mr-2">⚠️</span>
                      Ce prestataire n'est pas encore vérifié. Nous vous recommandons de vérifier ses références avant de faire appel à ses services.
                    </p>
                  </div>
                )}
              </div>

              {/* Services */}
              {prestataire.services && prestataire.services.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="font-semibold text-lg text-gray-900 mb-4">Services proposés</h2>
                  <div className="space-y-4">
                    {prestataire.services.map((service) => (
                      <Link 
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="flex items-center justify-between p-4 border rounded-lg hover:border-secondary hover:bg-secondary/5 transition group"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-secondary transition">
                            {service.titre}
                          </h3>
                          <span className="text-sm text-gray-500">{service.categorie?.nom}</span>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <p className="font-semibold text-secondary">
                            {formatTarif(service.tarif, service.type_tarif)}
                          </p>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Avis */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg text-gray-900">
                    Avis clients ({prestataire.nombre_avis || 0})
                  </h2>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="ml-1 font-semibold text-lg">{prestataire.note_globale?.toFixed(1) || '5.0'}</span>
                  </div>
                </div>

                {avis.length > 0 ? (
                  <div className="space-y-6">
                    {avis.map((a) => (
                      <div key={a.id} className="pb-6 border-b last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="font-medium text-gray-600">
                                {a.client?.prenom?.charAt(0) || 'C'}
                              </span>
                            </div>
                            <div className="ml-3">
                              <p className="font-medium text-gray-900">
                                {a.client?.prenom} {a.client?.nom?.charAt(0)}.
                              </p>
                              <p className="text-sm text-gray-500">{formatDate(a.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex">{renderStars(a.note)}</div>
                        </div>
                        <p className="text-gray-700">{a.commentaire}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Aucun avis pour le moment</p>
                )}
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
                    <span className="text-4xl font-bold ml-2">{prestataire.note_globale?.toFixed(1) || '5.0'}</span>
                  </div>
                  <p className="text-gray-500">{prestataire.nombre_avis || 0} avis clients</p>
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
                    href={`https://wa.me/${whatsappNumber}?text=Bonjour, je vous contacte depuis Allo Service Sénégal.`}
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

                {/* Infos supplémentaires */}
                <div className="mt-6 pt-6 border-t space-y-3 text-sm">
                  {prestataire.experience && (
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {prestataire.experience} ans d'expérience
                    </div>
                  )}
                </div>
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
                  Votre demande a été envoyée à {prestataire.user?.prenom}. 
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
                    <p className="text-sm text-gray-500">À : {prestataire.user?.prenom} {prestataire.user?.nom}</p>
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

                  {/* Sélection du service */}
                  {prestataire.services && prestataire.services.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service concerné
                      </label>
                      <select
                        value={demandeForm.service_id}
                        onChange={(e) => setDemandeForm({ ...demandeForm, service_id: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white"
                      >
                        <option value="">-- Sélectionnez un service (optionnel) --</option>
                        {prestataire.services.map((s) => (
                          <option key={s.id} value={s.id}>{s.titre}</option>
                        ))}
                      </select>
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