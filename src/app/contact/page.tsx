'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, AlertCircle } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Une erreur est survenue')
      }

      setSubmitted(true)
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: ''
      })
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'envoi')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-600 text-lg">
            Une question ? Une suggestion ? Notre équipe est là pour vous aider.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Informations de contact */}
          <div className="lg:col-span-1 space-y-6">
            {/* Carte téléphone */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                  <a href="tel:+221787886464" className="text-primary hover:underline">
                    +221 78 788 64 64
                  </a>
                </div>
              </div>
            </div>

            {/* Carte email */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:support@alloservicesenegal.com" className="text-primary hover:underline break-all">
                    support@alloservicesenegal.com
                  </a>
                </div>
              </div>
            </div>

            {/* Carte adresse */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                  <p className="text-gray-600">
                    Dakar, Sénégal
                  </p>
                </div>
              </div>
            </div>

            {/* Carte horaires */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Horaires</h3>
                  <p className="text-gray-600">
                    Lun - Ven : 8h - 18h<br />
                    Sam : 9h - 13h
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/221787886464" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-500 text-white rounded-xl p-4 hover:bg-green-600 transition"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Écrivez-nous sur WhatsApp
            </a>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-primary mb-6">
                Envoyez-nous un message
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-green-700">
                    Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-green-600 hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Nom */}
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Téléphone */}
                    <div>
                      <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="77 123 45 67"
                      />
                    </div>

                    {/* Sujet */}
                    <div>
                      <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <select
                        id="sujet"
                        name="sujet"
                        value={formData.sujet}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="Question générale">Question générale</option>
                        <option value="Je suis client">Je suis client</option>
                        <option value="Je suis prestataire">Je suis prestataire</option>
                        <option value="Partenariat">Partenariat</option>
                        <option value="Réclamation">Réclamation</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>

                  {/* Bouton envoyer */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ rapide */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">
            Questions fréquentes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment m'inscrire comme prestataire ?
              </h3>
              <p className="text-gray-600 text-sm">
                Cliquez sur "S'inscrire", choisissez "Prestataire", remplissez vos informations 
                et commencez à proposer vos services.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment trouver un prestataire ?
              </h3>
              <p className="text-gray-600 text-sm">
                Utilisez la barre de recherche pour trouver un service ou parcourez nos 
                catégories pour découvrir les prestataires disponibles.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment fonctionne le paiement ?
              </h3>
              <p className="text-gray-600 text-sm">
                Le paiement se fait directement entre vous et le prestataire via Wave, 
                Orange Money, Free Money, carte bancaire (Visa/Mastercard) ou en espèces.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Les prestataires sont-ils vérifiés ?
              </h3>
              <p className="text-gray-600 text-sm">
                Oui, nous vérifions l'identité des prestataires. Les badges "vérifié" 
                indiquent les profils ayant passé notre processus de vérification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
