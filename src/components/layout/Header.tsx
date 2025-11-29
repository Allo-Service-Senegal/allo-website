'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User, ChevronDown } from 'lucide-react'

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
            <Link href="/services" className="text-gray-700 hover:text-primary transition">
              Services
            </Link>
            <Link href="/prestataires" className="text-gray-700 hover:text-primary transition">
              Prestataires
            </Link>
            <Link href="/comment-ca-marche" className="text-gray-700 hover:text-primary transition">
              Comment ça marche
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary transition">
              Blog
            </Link>
          </nav>

          {/* Actions Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="/connexion" 
              className="text-gray-700 hover:text-primary transition flex items-center"
            >
              <User className="w-5 h-5 mr-2" />
              Connexion
            </Link>
            <Link 
              href="/inscription" 
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
            >
              Inscription
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
                href="/services" 
                className="text-gray-700 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/prestataires" 
                className="text-gray-700 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Prestataires
              </Link>
              <Link 
                href="/comment-ca-marche" 
                className="text-gray-700 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Comment ça marche
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <hr className="my-2" />
              <Link 
                href="/connexion" 
                className="text-gray-700 hover:text-primary transition flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-2" />
                Connexion
              </Link>
              <Link 
                href="/inscription" 
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Inscription
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
