import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Users, Shield, MapPin, Heart, Target, Eye, 
  CheckCircle, ArrowRight, Phone, Mail 
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos - Allo Service Sénégal',
  description: 'Découvrez Allo Service Sénégal, la marketplace de services de confiance au Sénégal',
}

const values = [
  {
    icon: Shield,
    title: 'Confiance',
    description: 'Nous vérifions l\'identité de nos prestataires pour garantir des services de qualité.'
  },
  {
    icon: Heart,
    title: 'Teranga',
    description: 'L\'hospitalité sénégalaise au cœur de notre plateforme. Chaque interaction compte.'
  },
  {
    icon: Users,
    title: 'Communauté',
    description: 'Nous construisons une communauté de professionnels et de clients solidaires.'
  },
  {
    icon: MapPin,
    title: 'Proximité',
    description: 'Des prestataires locaux dans toutes les régions du Sénégal.'
  },
]

const stats = [
  { value: '500+', label: 'Prestataires' },
  { value: '1000+', label: 'Clients satisfaits' },
  { value: '14', label: 'Régions couvertes' },
  { value: '10', label: 'Catégories de services' },
]

export default function APropos() {
  return (
    <div className="bg-white">
      {/* Hero avec image de fond */}
      <section className="relative bg-primary text-white py-20 overflow-hidden">
        {/* Image de fond */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/hero-image.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                À propos d'Allo Service Sénégal
              </h1>
              <p className="text-xl text-white/90">
                La marketplace de services de confiance qui connecte les Sénégalais 
                avec des professionnels vérifiés partout au pays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Notre histoire</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Allo Service Sénégal est née d'un constat simple : trouver un prestataire 
                    de confiance au Sénégal n'est pas toujours facile. Entre le bouche-à-oreille 
                    et les recherches hasardeuses, beaucoup de temps est perdu.
                  </p>
                  <p>
                    Notre plateforme a été créée pour résoudre ce problème en mettant en relation 
                    directe les particuliers et les entreprises avec des professionnels qualifiés 
                    et vérifiés dans leur région.
                  </p>
                  <p>
                    Que vous ayez besoin d'un plombier à Dakar, d'un électricien à Thiès ou 
                    d'un traiteur à Saint-Louis, Allo Service Sénégal vous aide à trouver 
                    le bon prestataire en quelques clics.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre mission</h3>
                <p className="text-gray-600">
                  Faciliter l'accès aux services de qualité pour tous les Sénégalais, 
                  tout en offrant aux artisans et professionnels une plateforme pour 
                  développer leur activité et atteindre de nouveaux clients.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre vision</h3>
                <p className="text-gray-600">
                  Devenir la référence des services à domicile au Sénégal et en Afrique 
                  de l'Ouest, en créant un écosystème de confiance où chaque prestataire 
                  peut prospérer et chaque client trouve satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Nos valeurs</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Les principes qui guident notre action au quotidien
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Pourquoi nous choisir ?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Prestataires vérifiés</h4>
                  <p className="text-gray-600">Nous vérifions l'identité et les compétences de chaque prestataire</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Avis clients authentiques</h4>
                  <p className="text-gray-600">Des avis réels de clients pour vous aider à choisir</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Couverture nationale</h4>
                  <p className="text-gray-600">Des prestataires dans les 14 régions du Sénégal</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Paiement sécurisé</h4>
                  <p className="text-gray-600">Wave, Orange Money, Free Money et cartes bancaires</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Service client réactif</h4>
                  <p className="text-gray-600">Une équipe disponible pour vous accompagner</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Gratuit pour les clients</h4>
                  <p className="text-gray-600">L'inscription et la recherche sont 100% gratuites</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-primary rounded-2xl p-8 lg:p-12 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                    Une question ?
                  </h2>
                  <p className="text-white/80 mb-6">
                    Notre équipe est disponible pour répondre à toutes vos questions et 
                    vous accompagner dans votre utilisation de la plateforme.
                  </p>
                  <div className="space-y-3">
                    <a href="tel:+221787886464" className="flex items-center text-white/90 hover:text-white">
                      <Phone className="w-5 h-5 mr-3" />
                      +221 78 788 64 64
                    </a>
                    <a href="mailto:support@alloservicesenegal.com" className="flex items-center text-white/90 hover:text-white">
                      <Mail className="w-5 h-5 mr-3" />
                      support@alloservicesenegal.com
                    </a>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <Link 
                    href="/contact"
                    className="inline-flex items-center bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary/90 transition font-medium"
                  >
                    Nous contacter
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Inscription */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Prêt à commencer ?
              </h2>
              <p className="text-gray-600 mb-8">
                Rejoignez des milliers d'utilisateurs qui font confiance à Allo Service Sénégal
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/services"
                  className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition font-medium"
                >
                  Trouver un prestataire
                </Link>
                <Link 
                  href="/inscription"
                  className="inline-flex items-center justify-center border-2 border-secondary text-secondary px-8 py-3 rounded-lg hover:bg-secondary hover:text-white transition font-medium"
                >
                  Devenir prestataire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
