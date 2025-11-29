'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, UserPlus } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Allo Service Sénégal" 
              width={150} 
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition">
              Accueil
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary transition">
              Rechercher un service
            </Link>
            <Link href="/prestataires" className="text-gray-700 hover:text-primary transition">
              Trouver un prestataire
            </Link>
            <Link href="/a-propos" className="text-gray-700 hover:text-primary transition">
              A propos
            </Link>
          </nav>

          {/* Actions Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="/connexion" 
              className="text-gray-700 hover:text-primary transition"
            >
              Se connecter
            </Link>
            <Link 
              href="/inscription" 
              className="bg-secondary text-white px-5 py-2.5 rounded-lg hover:bg-secondary/90 transition flex items-center"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              S'inscrire
            </Link>
          </div>

          {/* Menu Mobile Toggle */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Mobile */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                href="/services" 
                className="text-gray-700 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Rechercher un service
              </Link>
              <Link 
                href="/prestataires" 
                className="text-gray-700 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Trouver un prestataire
              </Link>
              <Link 
                href="/a-propos" 
                className="text-gray-700 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                A propos
              </Link>
              <hr className="my-2" />
              <Link 
                href="/connexion" 
                className="text-gray-700 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Se connecter
              </Link>
              <Link 
                href="/inscription" 
                className="bg-secondary text-white px-5 py-2.5 rounded-lg hover:bg-secondary/90 transition flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                S'inscrire
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
