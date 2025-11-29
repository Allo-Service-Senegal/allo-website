import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Allo Service Sénégal | Trouvez les meilleurs artisans près de chez vous',
  description: 'Plateforme de mise en relation entre clients et prestataires de services au Sénégal. Plomberie, électricité, ménage, peinture et plus encore.',
  keywords: 'services, artisans, Sénégal, Dakar, plombier, électricien, ménage, prestataire',
  openGraph: {
    title: 'Allo Service Sénégal',
    description: 'Trouvez les meilleurs artisans près de chez vous',
    url: 'https://alloservicesenegal.com',
    siteName: 'Allo Service Sénégal',
    locale: 'fr_SN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
