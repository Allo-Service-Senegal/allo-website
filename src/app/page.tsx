'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isLaunched, setIsLaunched] = useState(false)

  useEffect(() => {
    // Date de lancement : Lundi 19 janvier 2026 à 8h00 (heure de Dakar)
    const launchDate = new Date('2026-01-28T08:00:00+00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate - now

      if (distance < 0) {
        clearInterval(timer)
        setIsLaunched(true)
        window.location.href = '/accueil'
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Si lancé, rediriger
  if (isLaunched) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003238] via-[#004a52] to-[#003238] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Bulles animées en fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#5dc3ab]/10 animate-float"
            style={{
              width: `${20 + Math.random() * 80}px`,
              height: `${20 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-150px',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#5dc3ab] rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            Allo Service <span className="text-[#5dc3ab]">Sénégal</span>
          </h1>
        </div>

        {/* Titre principal */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Quelque chose de <span className="text-[#5dc3ab]">grand</span> arrive !
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto">
          La première plateforme sénégalaise qui connecte clients et prestataires de services en toute confiance.
        </p>

        {/* Compte à rebours */}
        <div className="flex justify-center gap-3 md:gap-4 mb-10 flex-wrap">
          {[
            { value: timeLeft.days, label: 'Jours' },
            { value: timeLeft.hours, label: 'Heures' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Secondes' }
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] transition-all hover:bg-[#5dc3ab]/20 hover:-translate-y-1 ${
                index === 3 ? 'animate-pulse' : ''
              }`}
            >
              <div className="text-3xl md:text-4xl font-bold text-[#5dc3ab]">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Message teasing */}
        <div className="bg-[#5dc3ab]/15 border border-[#5dc3ab]/30 rounded-xl p-5 md:p-6 mb-10 max-w-xl mx-auto">
          <p className="text-white text-base md:text-lg">
            🚀 Plombiers, électriciens, coiffeurs, nettoyage, cours particuliers... 
            Trouvez le prestataire idéal près de chez vous en quelques clics ! ✨
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
          {[
            { icon: '📍', text: 'Partout au Sénégal' },
            { icon: '✅', text: 'Prestataires vérifiés' },
            { icon: '💳', text: 'Paiement sécurisé' }
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-white/80">
              <span className="text-xl">{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Réseaux sociaux */}
        <div className="mb-8">
          <p className="text-white/70 mb-4">Suivez-nous pour ne rien manquer !</p>
          <div className="flex justify-center gap-4">
            {[
              { name: 'Facebook', href: 'https://www.facebook.com/alloservicesenegal', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { name: 'Instagram', href: 'https://www.instagram.com/alloservicesenegal', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
              { name: 'TikTok', href: 'https://www.tiktok.com/@alloservicesenegal', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
              { name: 'WhatsApp', href: 'https://wa.me/221787886464', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' }
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#5dc3ab] hover:-translate-y-1 transition-all"
                title={social.name}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <p className="text-white/60 text-sm">
          Une question ? <a href="mailto:support@alloservicesenegal.com" className="text-[#5dc3ab] hover:underline">support@alloservicesenegal.com</a>
        </p>
      </div>

      {/* Styles pour l'animation des bulles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}
