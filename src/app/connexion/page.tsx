'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react'

export default function ConnexionPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // TODO: Appel API réel
      // const response = await authService.login(formData)
      
      // Simulation pour le moment
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirection selon le rôle (à adapter avec l'API)
      // Pour le moment, redirection vers la page d'accueil
      router.push('/')
    } catch (err) {
      setError('Email ou mot de passe incorrect')
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
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Bon retour !</h1>
              <p className="text-gray-500">Connectez-vous à votre compte</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="••••••••"
                    required
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

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <Link 
                  href="/mot-de-passe-oublie" 
                  className="text-sm text-secondary hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500">
                Pas encore de compte ?{' '}
                <Link href="/inscription" className="text-secondary font-medium hover:underline">
                  Créer un compte
                </Link>
              </p>
            </div>
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
            Trouvez les meilleurs prestataires près de chez vous
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Plombiers, électriciens, climaticiens et bien plus encore. 
            Des professionnels vérifiés à votre service.
          </p>
          
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary">2,800+</p>
              <p className="text-white/70">Utilisateurs</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary">340+</p>
              <p className="text-white/70">Prestataires</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary">4.8</p>
              <p className="text-white/70">Note moyenne</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
