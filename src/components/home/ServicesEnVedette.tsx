import Link from 'next/link'
import { Star, MapPin, Clock } from 'lucide-react'

const servicesEnVedette = [
  { id: '1', titre: 'Installation Climatiseur', description: 'Installation complète de climatiseur split avec garantie 1 an', tarif: 25000, typeTarif: 'FORFAIT', dureeEstimee: '3 heures', prestataire: { nom: 'Mamadou Diallo', note: 4.9, quartier: 'Almadies, Dakar' } },
  { id: '2', titre: 'Nettoyage Complet Maison', description: 'Nettoyage professionnel de votre maison ou appartement', tarif: 15000, typeTarif: 'FORFAIT', dureeEstimee: '4 heures', prestataire: { nom: 'Fatou Sow', note: 4.8, quartier: 'Pikine, Dakar' } },
  { id: '3', titre: 'Réparation Plomberie', description: 'Réparation de fuites, débouchage, installation sanitaire', tarif: 10000, typeTarif: 'HEURE', dureeEstimee: '1-2 heures', prestataire: { nom: 'Omar Tall', note: 4.7, quartier: 'Médina, Dakar' } },
]

export default function ServicesEnVedette() {
  const formatTarif = (tarif: number, type: string) => {
    const f = tarif.toLocaleString('fr-FR')
    return type === 'HEURE' ? `${f} CFA/h` : `À partir de ${f} CFA`
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-2 mb-12">
          <Star className="text-yellow-500 fill-yellow-500" size={28} />
          <h2 className="text-3xl font-bold text-primary">Services en vedette</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesEnVedette.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`} className="card overflow-hidden group">
              <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-secondary/20 flex items-center justify-center">
                <span className="text-secondary text-6xl font-bold opacity-30">{service.titre.charAt(0)}</span>
                <div className="absolute top-4 left-4 z-20 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} className="fill-white" /> En vedette
                </div>
              </div>
              <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition-colors duration-200 mb-2">{service.titre}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-secondary font-bold text-lg">{formatTarif(service.tarif, service.typeTarif)}</span>
                <span className="flex items-center text-gray-500 text-sm"><Clock size={16} className="mr-1" />{service.dureeEstimee}</span>
              </div>
              <div className="flex items-center pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">{service.prestataire.nom.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-primary text-sm">{service.prestataire.nom}</div>
                  <div className="flex items-center text-gray-500 text-xs"><MapPin size={12} className="mr-1" />{service.prestataire.quartier}</div>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} className="fill-yellow-500 mr-1" />
                  <span className="font-semibold">{service.prestataire.note}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/services" className="btn-primary">Voir tous les services</Link>
        </div>
      </div>
    </section>
  )
}
