'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Home, Search, Users, Info, UserPlus } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Rechercher un service', href: '/services', icon: Search },
    { name: 'Trouver un prestataire', href: '/prestataires', icon: Users },
    { name: 'A propos', href: '/a-propos', icon: Info },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AS</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-primary font-bold text-xl">Allo Service</span>
              <span className="text-secondary font-bold text-xl"> Sénégal</span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Boutons Auth Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/connexion"
              className="text-primary font-semibold hover:text-secondary transition-colors duration-200"
            >
              Se connecter
            </Link>
            <Link
              href="/inscription"
              className="btn-secondary flex items-center space-x-2"
            >
              <UserPlus size={20} />
              <span>S'inscrire</span>
            </Link>
          </div>

          {/* Menu Mobile Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation Mobile */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-700 hover:text-primary font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <hr className="my-2" />
              <Link
                href="/connexion"
                className="text-primary font-semibold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Se connecter
              </Link>
              <Link
                href="/inscription"
                className="btn-secondary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                S'inscrire
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
