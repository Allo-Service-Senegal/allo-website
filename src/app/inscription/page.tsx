'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Mail, Lock, Eye, EyeOff, User, Phone, Building, 
  UserPlus, ArrowLeft, ArrowRight, CheckCircle 
} from 'lucide-react'

type Step = 'type' | 'form' | 'success'
type Role = 'CLIENT' | 'PRESTATAIRE'
type TypeCompte = 'PARTICULIER' | 'ENTREPRISE'

export default function Inscription() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('type')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    mot_de_passe: '',
    confirm_password: '',
    role: '' as Role,
    type_compte: 'PARTICULIER' as TypeCompte,
    nom_entreprise: '',
    ninea: '',
    accepte_cgu: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
    setError('')
  }

  const handleRoleSelect = (role: Role) => {
    setFormData({ ...formData, role })
    setStep('form')
  }

  const validateForm = () => {
    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone || !formData.mot_de_passe) {
      setError('Veuillez remplir tous les champs obligatoires')
      return false
    }
    if (formData.mot_de_passe.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return false
    }
    if (formData.mot_de_passe !== formData.confirm_password) {
      setError('Les mots de passe ne correspondent pas')
      return false
    }
    if (!formData.accepte_cgu) {
      setError('Vous devez accepter les conditions générales d\'utilisation')
      return false
    }
    if (formData.type_compte === 'ENTREPRISE' && !formData.nom_entreprise) {
      setError('Veuillez saisir le nom de votre entreprise')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    setError('')

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'
      
      const payload = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        mot_de_passe: formData.mot_de_passe,
        role: formData.role,
        type_compte: formData.type_compte,
        nom_entreprise: formData.type_compte === 'ENTREPRISE' ? formData.nom_entreprise : null,
        ninea: formData.type_compte === 'ENTREPRISE' ? formData.ninea : null
      }

      const response = await fetch(`${API_URL}/api/auth/inscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Erreur lors de l\'inscription')
      }

      // Stocker le token et les infos utilisateur
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      setStep('success')
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  // Étape 1 : Choix du type de compte
  if (step === 'type') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Créer un compte
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Choisissez votre type de compte
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Client */}
            <button
              onClick={() => handleRoleSelect('CLIENT')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-2 border-transparent hover:border-secondary group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20">
                <User className="w-8 h-8 text-blue-600 group-hover:text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Je suis client</h3>
              <p className="text-gray-600 text-sm">
                Je recherche des prestataires pour mes besoins en services
              </p>
            </button>

            {/* Prestataire */}
            <button
              onClick={() => handleRoleSelect('PRESTATAIRE')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-2 border-transparent hover:border-secondary group"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20">
                <Building className="w-8 h-8 text-green-600 group-hover:text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Je suis prestataire</h3>
              <p className="text-gray-600 text-sm">
                Je propose mes services et veux développer ma clientèle
              </p>
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Déjà un compte ?{' '}
            <Link href="/connexion" className="text-secondary hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    )
  }

  // Étape 3 : Succès
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg rounded-xl sm:px-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Inscription réussie !
            </h2>
            <p className="text-gray-600 mb-6">
              Bienvenue sur Allo Service Sénégal. Votre compte a été créé avec succès.
            </p>
            <button
              onClick={() => router.push(formData.role === 'PRESTATAIRE' ? '/prestataire' : '/client')}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition font-medium"
            >
              Accéder à mon espace
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Étape 2 : Formulaire d'inscription
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {formData.role === 'PRESTATAIRE' ? 'Inscription Prestataire' : 'Inscription Client'}
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Remplissez vos informations
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow-lg rounded-xl sm:px-10">
          {/* Bouton retour */}
          <button
            onClick={() => setStep('type')}
            className="flex items-center text-gray-600 hover:text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Changer de type de compte
          </button>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type de compte (Particulier / Entreprise) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de compte
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type_compte: 'PARTICULIER' })}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition ${
                    formData.type_compte === 'PARTICULIER'
                      ? 'border-secondary bg-secondary/10 text-secondary'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Particulier
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type_compte: 'ENTREPRISE' })}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition ${
                    formData.type_compte === 'ENTREPRISE'
                      ? 'border-secondary bg-secondary/10 text-secondary'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Entreprise
                </button>
              </div>
            </div>

            {/* Nom et Prénom */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    required
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Votre prénom"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            {/* Champs entreprise */}
            {formData.type_compte === 'ENTREPRISE' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nom_entreprise" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom entreprise *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="nom_entreprise"
                      name="nom_entreprise"
                      type="text"
                      value={formData.nom_entreprise}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="Nom de l'entreprise"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="ninea" className="block text-sm font-medium text-gray-700 mb-2">
                    NINEA (optionnel)
                  </label>
                  <input
                    id="ninea"
                    name="ninea"
                    type="text"
                    value={formData.ninea}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Numéro NINEA"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de téléphone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="77 123 45 67"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="mot_de_passe" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="mot_de_passe"
                  name="mot_de_passe"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.mot_de_passe}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Minimum 6 caractères"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirmer mot de passe */}
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Confirmer votre mot de passe"
                />
              </div>
            </div>

            {/* CGU */}
            <div className="flex items-start">
              <input
                id="accepte_cgu"
                name="accepte_cgu"
                type="checkbox"
                checked={formData.accepte_cgu}
                onChange={handleChange}
                className="h-4 w-4 mt-1 text-secondary focus:ring-secondary border-gray-300 rounded"
              />
              <label htmlFor="accepte_cgu" className="ml-2 text-sm text-gray-600">
                J'accepte les{' '}
                <Link href="/cgu" target="_blank" className="text-secondary hover:underline">
                  conditions générales d'utilisation
                </Link>{' '}
                et la{' '}
                <Link href="/confidentialite" target="_blank" className="text-secondary hover:underline">
                  politique de confidentialité
                </Link>
              </label>
            </div>

            {/* Bouton inscription */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition disabled:opacity-70 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Inscription en cours...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  S'inscrire
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Déjà un compte ?{' '}
            <Link href="/connexion" className="text-secondary hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
