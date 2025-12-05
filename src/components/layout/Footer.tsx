import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div>
              <Image 
                src="/images/logo.png" 
                alt="Allo Service Sénégal" 
                width={150} 
                height={40}
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-white/80 mb-4">
                La marketplace de services de confiance au Sénégal. Connectez-vous avec des professionnels vérifiés.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services?categorie=plomberie" className="text-white/80 hover:text-secondary transition">
                    Plomberie
                  </Link>
                </li>
                <li>
                  <Link href="/services?categorie=electricite" className="text-white/80 hover:text-secondary transition">
                    Électricité
                  </Link>
                </li>
                <li>
                  <Link href="/services?categorie=menage" className="text-white/80 hover:text-secondary transition">
                    Ménage
                  </Link>
                </li>
                <li>
                  <Link href="/services?categorie=peinture" className="text-white/80 hover:text-secondary transition">
                    Peinture
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-secondary hover:underline transition">
                    Voir tous les services →
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white/80 hover:text-secondary transition">
                    📰 Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Villes */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Villes</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/prestataires?ville=dakar" className="text-white/80 hover:text-secondary transition">
                    Dakar
                  </Link>
                </li>
                <li>
                  <Link href="/prestataires?ville=thies" className="text-white/80 hover:text-secondary transition">
                    Thiès
                  </Link>
                </li>
                <li>
                  <Link href="/prestataires?ville=saint-louis" className="text-white/80 hover:text-secondary transition">
                    Saint-Louis
                  </Link>
                </li>
                <li>
                  <Link href="/prestataires?ville=kaolack" className="text-white/80 hover:text-secondary transition">
                    Kaolack
                  </Link>
                </li>
                <li>
                  <Link href="/prestataires?ville=ziguinchor" className="text-white/80 hover:text-secondary transition">
                    Ziguinchor
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-secondary" />
                  <a href="tel:+221787886464" className="text-white/80 hover:text-secondary transition">
                    +221 78 788 64 64
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-secondary" />
                  <a href="mailto:support@alloservicesenegal.com" className="text-white/80 hover:text-secondary transition">
                    support@alloservicesenegal.com
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-secondary mt-1" />
                  <span className="text-white/80">
                    Dakar, Sénégal
                  </span>
                </li>
              </ul>
              
              {/* Liens légaux */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/mentions-legales" className="text-white/60 hover:text-secondary transition">
                      Mentions légales
                    </Link>
                  </li>
                  <li>
                    <Link href="/confidentialite" className="text-white/60 hover:text-secondary transition">
                      Politique de confidentialité
                    </Link>
                  </li>
                  <li>
                    <Link href="/cgu" className="text-white/60 hover:text-secondary transition">
                      CGU
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white/60 hover:text-secondary transition">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60">
            <p>© {new Date().getFullYear()} Allo Service Sénégal. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
