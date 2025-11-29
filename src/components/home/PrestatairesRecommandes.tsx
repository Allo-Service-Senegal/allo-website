import Link from 'next/link'
import { Star, MapPin, CheckCircle, Briefcase } from 'lucide-react'

const prestataires = [
  { id: '1', nom: 'Mamadou Diallo', metier: 'Plombier', note: 4.9, nombreAvis: 127, quartier: 'Almadies', ville: 'Dakar', verifie: true, experience: 8 },
  { id: '2', nom: 'Fatou Sow', metier: 'Agent de ménage', note: 4.8, nombreAvis: 89, quartier: 'Pikine', ville: 'Dakar', verifie: true, experience: 5 },
  { id: '3', nom: 'Ibrahima Ndiaye', metier: 'Électricien', note: 4.7, nombreAvis: 64, quartier: 'Centre', ville: 'Thiès', verifie: true, experience: 10 },
  { id: '4', nom: 'Aissatou Ba', metier: 'Peintre', note: 4.9, nombreAvis: 45, quartier: 'Plateau', ville: 'Dakar', verifie: true, experience: 6 },
]

export default function PrestatairesRecommandes() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="text-3xl">👨‍🔧</span>
          <h2 className="text-3xl font-bold text-primary">Prestataires recommandés</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {prestataires.map((p) => (
            <Link key={p.id} href={`/prestataires/${p.id}`} className="card text-center group hover:border-secondary border-2 border-transparent">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-3xl font-bold">{p.nom.split(' ').map(n => n.charAt(0)).join('')}</span>
                </div>
                {p.verifie && <div className="absolute bottom-0 right-0 bg-secondary text-white rounded-full p-1"><CheckCircle size={18} /></div>}
              </div>
              <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition-colors duration-200">{p.nom}</h3>
              <p className="text-gray-600 mb-2">{p.metier}</p>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="text-yellow-500 fill-yellow-500" size={18} />
                <span className="font-semibold">{p.note}</span>
                <span className="text-gray-400 text-sm">({p.nombreAvis} avis)</span>
              </div>
              <div className="flex items-center justify-center text-gray-500 text-sm mb-3">
                <MapPin size={14} className="mr-1" />{p.quartier}, {p.ville}
              </div>
              <div className="flex items-center justify-center text-gray-500 text-sm">
                <Briefcase size={14} className="mr-1" />{p.experience} ans d'expérience
              </div>
              <button className="mt-4 w-full btn-outline text-sm py-2 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary">Voir le profil</button>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/prestataires" className="btn-primary">Voir tous les prestataires</Link>
        </div>
      </div>
    </section>
  )
}
