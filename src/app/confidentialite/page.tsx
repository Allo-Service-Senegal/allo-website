import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - Allo Service Sénégal',
  description: 'Politique de confidentialité et protection des données personnelles',
}

export default function Confidentialite() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-8">
          Politique de Confidentialité
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              1. Introduction
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Allo Service Sénégal s'engage à protéger la vie privée de ses utilisateurs. 
                Cette politique de confidentialité explique comment nous collectons, utilisons, 
                partageons et protégeons vos informations personnelles.
              </p>
              <p>
                En utilisant notre plateforme, vous acceptez les pratiques décrites dans 
                cette politique.
              </p>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              2. Données collectées
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>Nous collectons les types de données suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Données d'identification :</strong> nom, prénom, adresse email, 
                  numéro de téléphone
                </li>
                <li>
                  <strong>Données professionnelles (prestataires) :</strong> compétences, 
                  expérience, zone d'intervention, tarifs
                </li>
                <li>
                  <strong>Données de localisation :</strong> région, ville, quartier
                </li>
                <li>
                  <strong>Données de transaction :</strong> historique des demandes, 
                  paiements, avis
                </li>
                <li>
                  <strong>Données techniques :</strong> adresse IP, type de navigateur, 
                  pages visitées
                </li>
              </ul>
            </div>
          </section>

          {/* Utilisation des données */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              3. Utilisation des données
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>Vos données sont utilisées pour :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Créer et gérer votre compte utilisateur</li>
                <li>Mettre en relation clients et prestataires</li>
                <li>Traiter les demandes de services</li>
                <li>Gérer les paiements et transactions</li>
                <li>Envoyer des notifications relatives à vos demandes</li>
                <li>Améliorer nos services et votre expérience utilisateur</li>
                <li>Assurer la sécurité de la plateforme</li>
                <li>Répondre à vos demandes d'assistance</li>
              </ul>
            </div>
          </section>

          {/* Partage des données */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              4. Partage des données
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>Vos données peuvent être partagées avec :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Les prestataires/clients :</strong> informations nécessaires à la 
                  réalisation du service (nom, téléphone, adresse)
                </li>
                <li>
                  <strong>Les prestataires de paiement :</strong> Wave, Orange Money, Free Money 
                  pour le traitement des transactions
                </li>
                <li>
                  <strong>Les autorités :</strong> en cas d'obligation légale
                </li>
              </ul>
              <p>
                Nous ne vendons jamais vos données personnelles à des tiers.
              </p>
            </div>
          </section>

          {/* Protection des données */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              5. Protection des données
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger 
                vos données personnelles :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Chiffrement des données sensibles (mots de passe, données de paiement)</li>
                <li>Connexion sécurisée (HTTPS)</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Surveillance régulière de nos systèmes</li>
              </ul>
            </div>
          </section>

          {/* Conservation des données */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              6. Conservation des données
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Vos données sont conservées pendant la durée de votre inscription sur la 
                plateforme, puis pendant une durée de 3 ans après votre dernière activité 
                pour des raisons légales et comptables.
              </p>
              <p>
                Vous pouvez demander la suppression de vos données à tout moment en nous 
                contactant.
              </p>
            </div>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              7. Vos droits
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>Conformément à la réglementation en vigueur, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à : <strong>support@alloservicesenegal.com</strong>
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              8. Cookies
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                Les cookies sont de petits fichiers stockés sur votre appareil.
              </p>
              <p>Types de cookies utilisés :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
                <li><strong>Cookies de performance :</strong> pour analyser l'utilisation du site</li>
                <li><strong>Cookies de préférence :</strong> pour mémoriser vos choix</li>
              </ul>
              <p>
                Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              9. Contact
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>
                Pour toute question concernant cette politique de confidentialité, 
                vous pouvez nous contacter :
              </p>
              <p><strong>Email :</strong> support@alloservicesenegal.com</p>
              <p><strong>Téléphone :</strong> +221 78 788 64 64</p>
              <p><strong>Adresse :</strong> Dakar, Sénégal</p>
            </div>
          </section>

          {/* Date de mise à jour */}
          <section className="pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Dernière mise à jour : Novembre 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
