import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales - Allo Service Sénégal',
  description: 'Mentions légales de la plateforme Allo Service Sénégal',
}

export default function MentionsLegales() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-8">
          Mentions Légales
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 space-y-8">
          {/* Éditeur */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              1. Éditeur du site
            </h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>Nom de la plateforme :</strong> Allo Service Sénégal</p>
              <p><strong>Adresse :</strong> Dakar, Sénégal</p>
              <p><strong>Téléphone :</strong> +221 78 788 64 64</p>
              <p><strong>Email :</strong> support@alloservicesenegal.com</p>
              <p><strong>Directeur de la publication :</strong> Allo Service Sénégal</p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              2. Hébergement
            </h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>Hébergeur du site :</strong> Vercel Inc.</p>
              <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
              <p><strong>Site web :</strong> www.vercel.com</p>
            </div>
            <div className="text-gray-700 space-y-2 mt-4">
              <p><strong>Nom de domaine enregistré chez :</strong> LWS (Ligne Web Services)</p>
              <p><strong>Adresse :</strong> 10 rue Penthièvre, 75008 Paris, France</p>
              <p><strong>Site web :</strong> www.lws.fr</p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              3. Propriété intellectuelle
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                L'ensemble du contenu du site Allo Service Sénégal (textes, images, logos, icônes, 
                éléments graphiques, etc.) est la propriété exclusive de Allo Service Sénégal, 
                sauf mention contraire.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation de tout 
                ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, 
                est interdite, sauf autorisation écrite préalable.
              </p>
              <p>
                Toute exploitation non autorisée du site ou de son contenu sera considérée comme 
                constitutive d'une contrefaçon et poursuivie conformément aux dispositions légales 
                en vigueur.
              </p>
            </div>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              4. Limitation de responsabilité
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Allo Service Sénégal s'efforce d'assurer l'exactitude et la mise à jour des 
                informations diffusées sur ce site. Toutefois, Allo Service Sénégal ne peut 
                garantir l'exactitude, la précision ou l'exhaustivité des informations mises 
                à disposition.
              </p>
              <p>
                Allo Service Sénégal décline toute responsabilité pour toute imprécision, 
                inexactitude ou omission portant sur des informations disponibles sur ce site.
              </p>
              <p>
                Allo Service Sénégal ne saurait être tenu responsable des dommages directs ou 
                indirects résultant de l'accès ou de l'utilisation du site, y compris 
                l'inaccessibilité, les pertes de données, détériorations, destructions ou 
                virus qui pourraient affecter l'équipement informatique de l'utilisateur.
              </p>
            </div>
          </section>

          {/* Liens hypertextes */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              5. Liens hypertextes
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Le site peut contenir des liens hypertextes vers d'autres sites. Allo Service 
                Sénégal n'exerce aucun contrôle sur ces sites et décline toute responsabilité 
                quant à leur contenu.
              </p>
              <p>
                La création de liens hypertextes vers le site Allo Service Sénégal est soumise 
                à l'accord préalable de l'éditeur.
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              6. Droit applicable
            </h2>
            <div className="text-gray-700">
              <p>
                Les présentes mentions légales sont régies par le droit sénégalais. En cas de 
                litige, les tribunaux sénégalais seront seuls compétents.
              </p>
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
