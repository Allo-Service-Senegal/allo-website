'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X, UserPlus, User, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allo-api-production.up.railway.app'
const DASHBOARD_URL = 'https://dashboard.alloservicesenegal.com'

interface UserInfo {
  id: number
  nom: string
  prenom: string
  email: string
  role: string
}

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  // Fermer le menu utilisateur quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        // Token invalide, le supprimer
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Erreur auth:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsUserMenuOpen(false)
    setIsMenuOpen(false)
    router.push('/')
  }

  const getDashboardUrl = () => {
    if (!user) return DASHBOARD_URL
    switch (user.role) {
      case 'ADMIN':
        return `${DASHBOARD_URL}/admin`
      case 'PRESTATAIRE':
        return `${DASHBOARD_URL}/prestataire`
      case 'CLIENT':
        return `${DASHBOARD_URL}/client`
      default:
        return DASHBOARD_URL
    }
  }

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
            {loading ? (
              // Placeholder pendant le chargement
              <div className="w-32 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
            ) : user ? (
              // Utilisateur connecté - Menu Mon compte
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.prenom?.charAt(0)}{user.nom?.charAt(0)}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">{user.prenom}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Menu déroulant */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2 z-50">
                    <div className="px-4 py-2 border-b mb-2">
                      <p className="text-sm font-medium text-gray-900">{user.prenom} {user.nom}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <a
                      href={getDashboardUrl()}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-3" />
                      Tableau de bord
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Utilisateur non connecté
              <>
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
              </>
            )}
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
              
              {loading ? (
                <div className="h-10 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : user ? (
                // Utilisateur connecté - Menu mobile
                <>
                  <div className="flex items-center space-x-3 px-2 py-2 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {user.prenom?.charAt(0)}{user.nom?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.prenom} {user.nom}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <a
                    href={getDashboardUrl()}
                    className="flex items-center text-gray-700 hover:text-primary transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-5 h-5 mr-2" />
                    Tableau de bord
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-red-600 hover:text-red-700 transition"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Se déconnecter
                  </button>
                </>
              ) : (
                // Utilisateur non connecté - Menu mobile
                <>
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
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}