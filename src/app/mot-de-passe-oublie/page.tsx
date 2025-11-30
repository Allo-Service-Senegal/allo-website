'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // TODO: Appel API réel
      // await authService.resetPassword(email)
      
      // Simulation
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSent(true)
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {!sent ? (
            <>
              <Link
                href="/connexion"
                className="flex items-center text-gray-500 hover:text-gray-700 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la connexion
              </Link>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Mot de passe oublié ?</h1>
                <p className="text-gray-500">
                  Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
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
                      Envoyer le lien
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email envoyé !</h2>
              <p className="text-gray-500 mb-6">
                Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>. 
                Vérifiez votre boîte mail (et vos spams).
              </p>
              <Link
                href="/connexion"
                className="inline-flex items-center text-secondary font-medium hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la connexion
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
