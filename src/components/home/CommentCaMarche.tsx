import { Search, MessageCircle, Calendar, CheckCircle } from 'lucide-react'

const etapes = [
  { numero: 1, titre: 'Recherchez', description: 'Trouvez le bon prestataire près de chez vous en quelques clics', icon: Search, color: 'bg-blue-100 text-blue-600' },
  { numero: 2, titre: 'Contactez', description: 'Échangez directement avec le prestataire via la messagerie', icon: MessageCircle, color: 'bg-green-100 text-green-600' },
  { numero: 3, titre: 'Réservez', description: 'Confirmez la date et payez en toute sécurité', icon: Calendar, color: 'bg-purple-100 text-purple-600' },
  { numero: 4, titre: 'Profitez', description: 'Recevez votre service et laissez un avis', icon: CheckCircle, color: 'bg-secondary/20 text-secondary' },
]

export default function CommentCaMarche() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title">Comment ça marche ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {etapes.map((etape) => {
            const Icon = etape.icon
            return (
              <div key={etape.numero} className="text-center relative z-10">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">{etape.numero}</div>
                <div className={`w-24 h-24 mx-auto rounded-full ${etape.color} flex items-center justify-center mb-6`}>
                  <Icon size={40} />
                </div>
                <h3 className="font-bold text-xl text-primary mb-3">{etape.titre}</h3>
                <p className="text-gray-600">{etape.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
