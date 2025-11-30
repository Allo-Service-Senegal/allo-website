'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, 
  ArrowLeft, Shield, UserCircle, Briefcase, Check
} from 'lucide-react'

type UserType = 'client' | 'prestataire' | null

export default function InscriptionPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<UserType>(null)
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
    confirmPassword: ''
  })

  const handleSelectType = (type: UserType) => {
    setUserType(type)
    setStep(2)
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
      //   role: userType
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Partie gauche - Formulaire */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center mb-8">
            <Shield className="w-10 h-10 text-secondary mr-2" />
            <span className="text-2xl font-bold text-primary">Allo Service</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-sm p-8">
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

            {/* Étape 2: Formulaire d'inscription */}
            {step === 2 && (
              <>
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center text-gray-500 hover:text-gray-700 mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>

                <div className="text-center mb-8">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                    userType === 'client' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {userType === 'client' ? (
                      <><UserCircle className="w-4 h-4 mr-1" /> Compte Client</>
                    ) : (
                      <><Briefcase className="w-4 h-4 mr-1" /> Compte Prestataire</>
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

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-8">
            © 2025 Allo Service Sénégal. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* Partie droite - Visuel */}
      <div className="hidden lg:flex lg:flex-1 bg-primary items-center justify-center p-12">
        <div className="max-w-lg text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            {userType === 'prestataire' 
              ? 'Développez votre activité avec Allo Service'
              : 'Rejoignez la communauté Allo Service'
            }
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {userType === 'prestataire'
              ? 'Trouvez de nouveaux clients, gérez vos demandes et développez votre réputation.'
              : 'Trouvez des prestataires de confiance pour tous vos besoins de services à domicile.'
            }
          </p>
          
          <div className="space-y-4 text-left bg-white/10 rounded-xl p-6">
            {userType === 'prestataire' ? (
              <>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                  <span>Créez votre profil professionnel</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                  <span>Recevez des demandes de clients</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                  <span>Gérez vos services et tarifs</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                  <span>Collectez des avis clients</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                  <span>Accès à des prestataires vérifiés</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                  <span>Demandez des devis gratuitement</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                  <span>Consultez les avis clients</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                  <span>Paiement sécurisé</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
