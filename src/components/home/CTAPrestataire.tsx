import Link from 'next/link'
import { CheckCircle, Users, TrendingUp, Shield } from 'lucide-react'

const avantages = [
  { text: 'Inscription gratuite', icon: CheckCircle },
  { text: 'Visibilité dans votre zone', icon: Users },
  { text: 'Développez votre clientèle', icon: TrendingUp },
  { text: 'Paiements sécurisés', icon: Shield },
]

export default function CTAPrestataire() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
      </div>
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🛠️</div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Vous êtes artisan ou professionnel ?</h2>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">Rejoignez Allo Service Sénégal et développez votre activité. Des milliers de clients vous attendent !</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {avantages.map((a, i) => { const Icon = a.icon; return (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-3"><Icon className="text-secondary" size={24} /></div>
                <span className="text-sm font-medium">{a.text}</span>
              </div>
            )})}
          </div>
          <Link href="/inscription?type=prestataire" className="inline-block bg-secondary hover:bg-secondary-600 text-white font-bold px-10 py-4 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">Devenir prestataire</Link>
          <p className="mt-6 text-gray-300 text-sm">Déjà inscrit ? <Link href="/connexion" className="text-secondary hover:underline">Se connecter</Link></p>
        </div>
      </div>
    </section>
  )
}
