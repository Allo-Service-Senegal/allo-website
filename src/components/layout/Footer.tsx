import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const services = [
    { name: 'Plomberie', href: '/services?categorie=plomberie' },
    { name: 'Électricité', href: '/services?categorie=electricite' },
    { name: 'Ménage', href: '/services?categorie=menage' },
    { name: 'Peinture', href: '/services?categorie=peinture' },
    { name: 'Climatisation', href: '/services?categorie=climatisation' },
  ]

  const villes = [
    { name: 'Dakar', href: '/prestataires?ville=dakar' },
    { name: 'Thiès', href: '/prestataires?ville=thies' },
    { name: 'Saint-Louis', href: '/prestataires?ville=saint-louis' },
    { name: 'Kaolack', href: '/prestataires?ville=kaolack' },
    { name: 'Ziguinchor', href: '/prestataires?ville=ziguinchor' },
  ]

  const legal = [
    { name: 'Conditions générales', href: '/cgu' },
    { name: 'Politique de confidentialité', href: '/confidentialite' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AS</span>
              </div>
              <div>
                <span className="font-bold text-xl">Allo Service</span>
                <span className="font-bold text-xl text-secondary"> Sénégal</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              La plateforme qui connecte les meilleurs artisans et prestataires de services avec les familles sénégalaises.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Villes */}
          <div>
            <h3 className="font-bold text-lg mb-4">Villes</h3>
            <ul className="space-y-2">
              {villes.map((ville) => (
                <li key={ville.name}>
                  <Link
                    href={ville.href}
                    className="text-gray-300 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {ville.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-secondary" />
                <a href="tel:+221787886464" className="text-gray-300 hover:text-secondary transition-colors duration-200 text-sm">
                  78 788 64 64
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-secondary" />
                <a href="mailto:support@alloservicesenegal.com" className="text-gray-300 hover:text-secondary transition-colors duration-200 text-sm">
                  support@alloservicesenegal.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-secondary mt-1" />
                <span className="text-gray-300 text-sm">Dakar, Sénégal</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Légal</h4>
              <ul className="space-y-2">
                {legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-secondary transition-colors duration-200 text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Allo Service Sénégal — Teranga & Services
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Fait avec ❤️ au Sénégal
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
