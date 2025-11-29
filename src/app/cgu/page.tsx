import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation - Allo Service Sénégal',
  description: 'Conditions générales d\'utilisation de la plateforme Allo Service Sénégal',
}

export default function CGU() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-8">
          Conditions Générales d'Utilisation
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 space-y-8">
          {/* Préambule */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              1. Préambule
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation 
                de la plateforme Allo Service Sénégal, accessible à l'adresse 
                www.alloservicesenegal.com.
              </p>
              <p>
                En accédant et en utilisant notre plateforme, vous acceptez sans réserve 
                les présentes CGU. Si vous n'acceptez pas ces conditions, vous ne devez 
                pas utiliser nos services.
              </p>
            </div>
          </section>

          {/* Définitions */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              2. Définitions
            </h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>Plateforme :</strong> le site web et l'application Allo Service Sénégal</p>
              <p><strong>Utilisateur :</strong> toute personne utilisant la plateforme</p>
              <p><strong>Client :</strong> utilisateur recherchant un service</p>
              <p><strong>Prestataire :</strong> utilisateur proposant ses services</p>
              <p><strong>Service :</strong> prestation proposée par un prestataire</p>
              <p><strong>Demande :</strong> sollicitation d'un service par un client</p>
            </div>
          </section>

          {/* Objet */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              3. Objet de la plateforme
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Allo Service Sénégal est une marketplace de mise en relation entre des 
                particuliers ou entreprises (clients) recherchant des services et des 
                professionnels (prestataires) proposant leurs compétences.
              </p>
              <p>
                La plateforme facilite la mise en relation mais n'est pas partie aux 
                contrats conclus entre clients et prestataires. Allo Service Sénégal 
                n'est pas employeur des prestataires.
              </p>
            </div>
          </section>

          {/* Inscription */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              4. Inscription et compte utilisateur
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                L'inscription est gratuite et nécessite de fournir des informations exactes 
                et à jour. Vous êtes responsable de la confidentialité de vos identifiants 
                de connexion.
              </p>
              <p>Conditions d'inscription :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Être âgé d'au moins 18 ans</li>
                <li>Fournir une adresse email valide</li>
                <li>Fournir un numéro de téléphone valide</li>
                <li>Accepter les présentes CGU</li>
              </ul>
              <p>
                Allo Service Sénégal se réserve le droit de suspendre ou supprimer tout 
                compte en cas de non-respect des CGU.
              </p>
            </div>
          </section>

          {/* Obligations des clients */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              5. Obligations des clients
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>En tant que client, vous vous engagez à :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir des informations exactes lors de vos demandes</li>
                <li>Traiter les prestataires avec respect</li>
                <li>Honorer vos engagements de paiement</li>
                <li>Laisser des avis honnêtes et constructifs</li>
                <li>Ne pas utiliser la plateforme à des fins illégales</li>
              </ul>
            </div>
          </section>

          {/* Obligations des prestataires */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              6. Obligations des prestataires
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>En tant que prestataire, vous vous engagez à :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir des informations exactes sur vos compétences et tarifs</li>
                <li>Être en règle avec la législation sénégalaise (immatriculation, assurance si nécessaire)</li>
                <li>Respecter les engagements pris avec les clients</li>
                <li>Fournir des services de qualité professionnelle</li>
                <li>Respecter les délais convenus</li>
                <li>Traiter les clients avec respect et professionnalisme</li>
              </ul>
            </div>
          </section>

          {/* Abonnements */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              7. Abonnements prestataires
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>Allo Service Sénégal propose différents abonnements pour les prestataires :</p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold">Gratuit (0 CFA/mois)</p>
                  <p className="text-sm">1 service, 0 mise en avant</p>
                </div>
                <div>
                  <p className="font-semibold">Pro (5 000 CFA/mois)</p>
                  <p className="text-sm">3 services, 1 mise en avant</p>
                </div>
                <div>
                  <p className="font-semibold">Avancé (10 000 CFA/mois)</p>
                  <p className="text-sm">Services illimités, 3 mises en avant</p>
                </div>
              </div>
              <p>
                Les abonnements sont renouvelés automatiquement sauf résiliation avant 
                la date d'échéance.
              </p>
            </div>
          </section>

          {/* Paiements */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              8. Paiements
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>Les moyens de paiement acceptés sont :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wave</li>
                <li>Orange Money</li>
                <li>Free Money</li>
                <li>Carte bancaire (Visa, Mastercard via PayDunya)</li>
                <li>Espèces (entre client et prestataire)</li>
              </ul>
              <p>
                Le règlement des services se fait directement entre le client et le 
                prestataire. Allo Service Sénégal peut proposer un service de paiement 
                sécurisé en option.
              </p>
            </div>
          </section>

          {/* Avis */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              9. Avis et évaluations
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Après chaque service, les clients peuvent laisser un avis et une note 
                sur le prestataire. Ces avis doivent être :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Honnêtes et basés sur une expérience réelle</li>
                <li>Respectueux et non diffamatoires</li>
                <li>Pertinents par rapport au service reçu</li>
              </ul>
              <p>
                Allo Service Sénégal se réserve le droit de supprimer tout avis ne 
                respectant pas ces critères.
              </p>
            </div>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              10. Limitation de responsabilité
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Allo Service Sénégal agit uniquement en tant qu'intermédiaire et ne peut 
                être tenu responsable :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>De la qualité des services fournis par les prestataires</li>
                <li>Des litiges entre clients et prestataires</li>
                <li>Des dommages résultant de l'exécution d'un service</li>
                <li>De l'inexactitude des informations fournies par les utilisateurs</li>
              </ul>
              <p>
                En cas de litige, les parties sont invitées à trouver une solution 
                amiable. Allo Service Sénégal peut jouer un rôle de médiateur sur demande.
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              11. Propriété intellectuelle
            </h2>
            <div className="text-gray-700">
              <p>
                Tous les contenus de la plateforme (logo, textes, images, design) sont 
                la propriété d'Allo Service Sénégal. Toute reproduction sans autorisation 
                est interdite.
              </p>
            </div>
          </section>

          {/* Modification des CGU */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              12. Modification des CGU
            </h2>
            <div className="text-gray-700">
              <p>
                Allo Service Sénégal se réserve le droit de modifier les présentes CGU 
                à tout moment. Les utilisateurs seront informés des modifications par 
                email ou notification sur la plateforme. L'utilisation continue de la 
                plateforme vaut acceptation des nouvelles CGU.
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              13. Droit applicable et juridiction
            </h2>
            <div className="text-gray-700">
              <p>
                Les présentes CGU sont régies par le droit sénégalais. En cas de litige, 
                et après échec de toute tentative de règlement amiable, les tribunaux de 
                Dakar seront seuls compétents.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              14. Contact
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>Pour toute question concernant ces CGU :</p>
              <p><strong>Email :</strong> support@alloservicesenegal.com</p>
              <p><strong>Téléphone :</strong> +221 78 788 64 64</p>
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
