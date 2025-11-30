'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, 
  ArrowLeft, UserCircle, Briefcase, Building2, UserCheck,
  Check, Shield, Star, MessageSquare, CreditCard
} from 'lucide-react'

type UserType = 'client' | 'prestataire' | null
type PrestataireType = 'particulier' | 'entreprise' | null

export default function InscriptionPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<UserType>(null)
  const [prestataireType, setPrestataireType] = useState<PrestataireType>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    // Champs entreprise
    nomEntreprise: '',
    ninea: ''
  })

  const handleSelectType = (type: UserType) => {
    setUserType(type)
    if (type === 'client') {
      setStep(3) // Passer directement au formulaire
    } else {
      setStep(2) // Passer au choix Entreprise/Particulier
    }
  }

  const handleSelectPrestataireType = (type: PrestataireType) => {
    setPrestataireType(type)
    setStep(3)
  }

  const handleBack = () => {
    if (step === 3 && userType === 'prestataire') {
      setStep(2)
    } else if (step === 3 && userType === 'client') {
      setStep(1)
    } else if (step === 2) {
      setStep(1)
      setUserType(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validations
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }

    if (!acceptTerms) {
      setError('Veuillez accepter les conditions d\'utilisation')
      return
    }

    setLoading(true)

    try {
      // TODO: Appel API réel
      // const response = await authService.register({
      //   ...formData,
      //   role: userType,
      //   type_prestataire: prestataireType
      // })
      
      // Simulation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirection selon le type
      if (userType === 'prestataire') {
        router.push('/prestataire')
      } else {
        router.push('/client')
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  // Avantages selon le type d'utilisateur
  const avantagesClient = [
    { icon: Shield, text: 'Accès à des prestataires vérifiés' },
    { icon: MessageSquare, text: 'Demandez des devis gratuitement' },
    { icon: Star, text: 'Consultez les avis des autres clients' },
    { icon: CreditCard, text: 'Paiement sécurisé (Wave, Orange Money)' },
  ]

  const avantagesPrestataire = [
    { icon: UserCheck, text: 'Créez votre profil professionnel' },
    { icon: MessageSquare, text: 'Recevez des demandes de clients' },
    { icon: Briefcase, text: 'Gérez vos services et tarifs' },
    { icon: Star, text: 'Collectez des avis clients' },
  ]

  const avantages = userType === 'prestataire' ? avantagesPrestataire : avantagesClient

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          
          {/* Étape 1: Choix du type de compte */}
          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Créer un compte</h1>
                <p className="text-gray-500">Choisissez votre type de compte</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleSelectType('client')}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-secondary hover:bg-secondary/5 transition text-left group"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition">
                      <UserCircle className="w-6 h-6 text-blue-600 group-hover:text-secondary" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Je suis un client</h3>
                      <p className="text-sm text-gray-500">
                        Je cherche des prestataires pour mes besoins de services à domicile
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-secondary transition" />
                  </div>
                </button>

                <button
                  onClick={() => handleSelectType('prestataire')}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-secondary hover:bg-secondary/5 transition text-left group"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition">
                      <Briefcase className="w-6 h-6 text-green-600 group-hover:text-secondary" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Je suis un prestataire</h3>
                      <p className="text-sm text-gray-500">
                        Je propose mes services et souhaite trouver de nouveaux clients
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-secondary transition" />
                  </div>
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-500">
                  Déjà un compte ?{' '}
                  <Link href="/connexion" className="text-secondary font-medium hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </>
          )}

          {/* Étape 2: Choix Particulier / Entreprise (prestataire uniquement) */}
          {step === 2 && userType === 'prestataire' && (
            <>
              <button
                onClick={handleBack}
                className="flex items-center text-gray-500 hover:text-gray-700 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </button>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Type de prestataire</h1>
                <p className="text-gray-500">Êtes-vous un particulier ou une entreprise ?</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleSelectPrestataireType('particulier')}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-secondary hover:bg-secondary/5 transition text-left group"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition">
                      <UserCheck className="w-6 h-6 text-purple-600 group-hover:text-secondary" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Particulier</h3>
                      <p className="text-sm text-gray-500">
                        Je travaille en tant qu'indépendant ou auto-entrepreneur
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-secondary transition" />
                  </div>
                </button>

                <button
                  onClick={() => handleSelectPrestataireType('entreprise')}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-secondary hover:bg-secondary/5 transition text-left group"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition">
                      <Building2 className="w-6 h-6 text-orange-600 group-hover:text-secondary" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Entreprise</h3>
                      <p className="text-sm text-gray-500">
                        Je représente une société ou une entreprise enregistrée
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-secondary transition" />
                  </div>
                </button>
              </div>
            </>
          )}

          {/* Étape 3: Formulaire d'inscription */}
          {step === 3 && (
            <>
              <button
                onClick={handleBack}
                className="flex items-center text-gray-500 hover:text-gray-700 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </button>

              <div className="text-center mb-6">
                <div className="flex justify-center gap-2 mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    userType === 'client' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {userType === 'client' ? (
                      <><UserCircle className="w-4 h-4 mr-1" /> Client</>
                    ) : (
                      <><Briefcase className="w-4 h-4 mr-1" /> Prestataire</>
                    )}
                  </span>
                  {prestataireType && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      prestataireType === 'particulier'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {prestataireType === 'particulier' ? (
                        <><UserCheck className="w-4 h-4 mr-1" /> Particulier</>
                      ) : (
                        <><Building2 className="w-4 h-4 mr-1" /> Entreprise</>
                      )}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Vos informations</h1>
                <p className="text-gray-500">Remplissez le formulaire ci-dessous</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Champs entreprise */}
                {prestataireType === 'entreprise' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom de l'entreprise *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.nomEntreprise}
                          onChange={(e) => setFormData({ ...formData, nomEntreprise: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                          placeholder="Nom de votre entreprise"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        NINEA (optionnel)
                      </label>
                      <input
                        type="text"
                        value={formData.ninea}
                        onChange={(e) => setFormData({ ...formData, ninea: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="Numéro d'identification"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="Prénom"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="Nom"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="+221 77 000 00 00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="Minimum 8 caractères"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="Confirmez votre mot de passe"
                      required
                    />
                  </div>
                </div>

                <label className="flex items-start cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 mt-1 text-secondary focus:ring-secondary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    J'accepte les{' '}
                    <Link href="/cgu" className="text-secondary hover:underline">
                      conditions générales d'utilisation
                    </Link>
                    {' '}et la{' '}
                    <Link href="/confidentialite" className="text-secondary hover:underline">
                      politique de confidentialité
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition flex items-center justify-center disabled:opacity-50 mt-4"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Créer mon compte
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-500">
                  Déjà un compte ?{' '}
                  <Link href="/connexion" className="text-secondary font-medium hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Avantages - affichés uniquement à l'étape 3 */}
        {step === 3 && (
          <div className="mt-6 bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              {userType === 'prestataire' 
                ? 'Avantages prestataire' 
                : 'Avantages client'
              }
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {avantages.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
