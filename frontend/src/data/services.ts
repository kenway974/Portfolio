// Pages services : une page par intention de recherche.
// Les paragraphes qui commencent par « - » sont rendus en liste à puces.

export type ServiceCategory =
  | 'Sites web'
  | 'Applications'
  | 'Back-end & données'
  | 'Automatisation & IA'
  | 'Qualité & conformité'
  | 'Accompagnement'

export type Service = {
  slug: string
  /** Nom court : menus, cartes, fil d'Ariane. */
  name: string
  category: ServiceCategory
  /** Balise <title>. */
  title: string
  /** Meta description (150-160 caractères). */
  description: string
  h1: string
  /** Chapô sous le H1. */
  lead: string
  /** Résumé pour les cartes (accueil, page Services). */
  summary: string
  includes: { title: string; desc: string }[]
  sections: { heading: string; body: string[] }[]
  faq: { q: string; a: string }[]
  /** Prix d'appel, repris des offres par secteur. */
  price?: { from: string; detail: string }
  /** Slugs des réalisations liées. */
  projects: string[]
  /** Slugs des services liés. */
  related: string[]
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'Sites web',
  'Applications',
  'Back-end & données',
  'Automatisation & IA',
  'Qualité & conformité',
  'Accompagnement',
]

const services: Service[] = [
  // ─────────────────────────────── SITES WEB ───────────────────────────────
  {
    slug: 'creation-site-vitrine',
    name: 'Site vitrine',
    category: 'Sites web',
    title: 'Création de site vitrine sur mesure | Développeur web freelance',
    description: 'Création de site vitrine professionnel par un développeur web freelance : design sur mesure, rapide, optimisé pour Google et pensé pour générer des contacts.',
    h1: 'Création de site vitrine professionnel',
    lead: 'Un site qui présente clairement votre activité, inspire confiance au premier coup d\'œil et transforme vos visiteurs en demandes de contact. Conçu sur mesure, rapide, et trouvable sur Google.',
    summary: 'Une présence en ligne professionnelle qui inspire confiance et génère des demandes de contact.',
    price: { from: '300 €', detail: 'Un site construit pour Google, votre fiche Google et un formulaire de contact, livrés en 2 semaines, avec 3 mois de suivi.' },
    includes: [
      { title: 'Design sur mesure', desc: 'Une identité visuelle adaptée à votre activité, pas un thème générique que vos concurrents utilisent aussi.' },
      { title: 'Rédaction et structure', desc: 'Des pages organisées autour de ce que cherchent vos clients, avec des textes clairs et des appels à l\'action.' },
      { title: 'Référencement de base', desc: 'Balises, URLs, sitemap, données structurées et vitesse : tout ce qu\'il faut pour que Google comprenne et classe votre site.' },
      { title: 'Formulaire de contact', desc: 'Les demandes arrivent directement dans votre boîte mail, avec une protection anti-spam.' },
      { title: 'Mobile d\'abord', desc: 'La majorité de vos visiteurs arrive depuis un téléphone : le site est pensé pour eux en priorité.' },
      { title: 'Mise en ligne complète', desc: 'Nom de domaine, hébergement, certificat HTTPS, Google Search Console : vous n\'avez rien à configurer.' },
    ],
    sections: [
      {
        heading: 'À quoi sert un site vitrine ?',
        body: [
          'Un site vitrine présente votre entreprise, vos services, vos réalisations et la façon de vous contacter. Il ne vend pas directement en ligne : son rôle est de rassurer et de déclencher une prise de contact, un appel ou une visite.',
          'C\'est souvent le premier contact entre un prospect et votre entreprise. Avant d\'appeler un artisan, de réserver chez un praticien ou de demander un devis à un prestataire, la plupart des gens vérifient le site. S\'il est lent, daté ou confus, ils passent au suivant sans vous le dire.',
        ],
      },
      {
        heading: 'Ce qui fait un bon site vitrine',
        body: [
          '- Un message compris en cinq secondes : ce que vous faites, pour qui, et pourquoi vous plutôt qu\'un autre.',
          '- Des preuves : réalisations, avis clients, chiffres, certifications, photos réelles.',
          '- Un contact toujours à portée de main : bouton d\'appel, formulaire court, horaires, zone d\'intervention.',
          '- Une page par service, pour être trouvé sur chaque recherche de vos clients plutôt que sur une seule.',
          '- Un chargement rapide, surtout sur mobile : chaque seconde perdue fait fuir des visiteurs.',
        ],
      },
      {
        heading: 'Sur mesure ou WordPress ?',
        body: [
          'Les deux sont possibles et je vous oriente selon votre situation. Un site développé sur mesure (Next.js, React) est plus rapide, plus sûr et ne demande presque aucune maintenance : idéal si votre contenu change peu.',
          'WordPress est pertinent si vous voulez modifier vous-même vos pages et publier souvent. Dans ce cas, je le configure proprement, sans empiler les extensions, pour qu\'il reste rapide et sécurisé.',
        ],
      },
      {
        heading: 'Combien coûte un site vitrine ?',
        body: [
          'Mon offre de base démarre à 300 € : un site construit pour Google, votre fiche Google, un formulaire de contact et trois mois de suivi, livrés en deux semaines. Selon votre métier, on peut y ajouter un devis ou une réservation en ligne, de la publicité ou des vidéos.',
          'Au-delà, le prix dépend du nombre de pages, de la part de design sur mesure, de la rédaction des textes et des fonctionnalités ajoutées : prise de rendez-vous, multilingue, blog, galerie.',
          'Après un premier échange, je vous envoie un devis détaillé et gratuit, ligne par ligne, sous 48 h. Pas de frais cachés, pas d\'abonnement imposé : le site vous appartient.',
        ],
      },
      {
        heading: 'Comment se déroule le projet ?',
        body: [
          '- Échange de cadrage : votre activité, vos clients, vos concurrents, vos objectifs.',
          '- Arborescence et maquette : vous validez la structure et le design avant le développement.',
          '- Développement et intégration des contenus, avec un lien de prévisualisation pour suivre l\'avancement.',
          '- Mise en ligne, configuration Google et prise en main : vous savez comment tout fonctionne.',
        ],
      },
    ],
    faq: [
      { q: 'Combien de temps faut-il pour créer un site vitrine ?', a: 'L\'offre de base est livrée en deux semaines. Un site plus complet demande en général trois à quatre semaines. Le délai dépend surtout de la disponibilité des contenus (textes, photos) et du nombre d\'allers-retours sur la maquette.' },
      { q: 'Est-ce que je pourrai modifier mon site moi-même ?', a: 'Oui si vous le souhaitez : je peux ajouter un espace d\'administration simple ou utiliser WordPress. Sinon, je m\'occupe des modifications ponctuelles dans le cadre d\'un forfait de maintenance.' },
      { q: 'Le site sera-t-il bien référencé sur Google ?', a: 'Le site est livré avec des bases techniques SEO solides : structure, balises, vitesse, données structurées, sitemap. Le positionnement dépend ensuite de la concurrence et du contenu publié dans le temps, mais vous partez sur des fondations saines.' },
      { q: 'Je n\'ai ni logo ni textes, est-ce un problème ?', a: 'Non. On peut partir de zéro : je vous aide à structurer votre message et à rédiger des textes orientés vers vos clients. Pour le logo, je peux vous orienter vers une solution adaptée à votre budget.' },
      { q: 'Le site m\'appartient-il ?', a: 'Oui, entièrement. Le code, le nom de domaine et les contenus sont à vous. Vous restez libre de changer de prestataire quand vous le voulez.' },
    ],
    projects: ['respusse', 'maison-camelia', 'monchauff', 'little-stars'],
    related: ['landing-page', 'site-wordpress', 'seo-performance', 'maintenance-hebergement'],
  },
  {
    slug: 'landing-page',
    name: 'Landing page',
    category: 'Sites web',
    title: 'Création de landing page qui convertit | Développeur freelance',
    description: 'Création de landing page optimisée pour la conversion : message ciblé, chargement rapide, formulaire efficace et suivi des résultats de vos campagnes.',
    h1: 'Création de landing page qui convertit',
    lead: 'Une page unique, construite autour d\'une seule offre et d\'une seule action : remplir un formulaire, réserver un appel, acheter. Idéale pour vos campagnes publicitaires, un lancement ou une offre précise.',
    summary: 'Une page dédiée à une offre et à une action, pensée pour transformer vos visiteurs en prospects.',
    includes: [
      { title: 'Structure orientée conversion', desc: 'Promesse, bénéfices, preuves, objections, appel à l\'action : chaque bloc a un rôle précis.' },
      { title: 'Rédaction persuasive', desc: 'Des textes écrits pour votre cible, avec ses mots, ses problèmes et ses objections.' },
      { title: 'Vitesse maximale', desc: 'Une page légère qui s\'affiche instantanément, même sur mobile : un critère clé pour vos campagnes payantes.' },
      { title: 'Formulaire et intégrations', desc: 'Envoi des prospects vers votre CRM, votre outil d\'emailing ou votre agenda de prise de rendez-vous.' },
      { title: 'Suivi des conversions', desc: 'Mesure des visites, des clics et des formulaires envoyés, compatible Google Ads et Meta Ads.' },
      { title: 'Variantes A/B', desc: 'Tester plusieurs titres ou offres pour améliorer le taux de conversion avec des données réelles.' },
    ],
    sections: [
      {
        heading: 'Landing page ou site vitrine : quelle différence ?',
        body: [
          'Un site vitrine présente toute votre entreprise et laisse le visiteur explorer. Une landing page fait l\'inverse : elle retire toutes les distractions (menu, liens secondaires) pour concentrer l\'attention sur une seule offre et une seule action.',
          'C\'est pour cela qu\'elle convertit mieux sur une campagne. Si vous payez chaque clic venant de Google Ads ou de Meta, envoyer ce trafic sur votre page d\'accueil revient souvent à gaspiller une partie de votre budget.',
        ],
      },
      {
        heading: 'Quand utiliser une landing page ?',
        body: [
          '- Une campagne publicitaire (Google Ads, Meta, LinkedIn) sur un service précis.',
          '- Le lancement d\'un produit, d\'une formation ou d\'une offre saisonnière.',
          '- La collecte de prospects avec un contenu gratuit : guide, audit, simulateur.',
          '- La validation d\'une idée avant de développer un produit complet.',
          '- Une inscription à un événement, un webinaire ou une liste d\'attente.',
        ],
      },
      {
        heading: 'Les éléments d\'une landing page efficace',
        body: [
          'Un titre qui reprend exactement la promesse de l\'annonce, une preuve sociale visible sans scroller, des bénéfices concrets plutôt qu\'une liste de caractéristiques, une réponse aux objections principales et un appel à l\'action répété aux bons endroits.',
          'Le formulaire doit demander le strict nécessaire : chaque champ en plus fait baisser le nombre de demandes. On peut ensuite qualifier les prospects par email ou par téléphone.',
        ],
      },
      {
        heading: 'Prix et délais',
        body: [
          'Une landing page se réalise généralement en une à deux semaines. Le prix dépend de la rédaction, du design, des intégrations (CRM, emailing, prise de rendez-vous) et du suivi des conversions à mettre en place.',
          'Je vous envoie un devis détaillé et gratuit sous 48 h après un premier échange sur votre offre et votre cible.',
        ],
      },
    ],
    faq: [
      { q: 'Une landing page peut-elle être référencée sur Google ?', a: 'Oui, si elle cible une recherche précise et contient assez de contenu utile. Mais son usage principal reste les campagnes payantes et les réseaux sociaux, où le trafic est déjà ciblé.' },
      { q: 'Peut-on l\'ajouter à mon site existant ?', a: 'Oui. Elle peut vivre sur votre domaine actuel (par exemple votre-site.fr/offre) ou sur un sous-domaine, quelle que soit la technologie de votre site.' },
      { q: 'Comment savoir si elle fonctionne ?', a: 'On mesure le taux de conversion : la part de visiteurs qui réalise l\'action attendue. Le suivi est mis en place dès la mise en ligne, et on peut tester des variantes pour l\'améliorer.' },
      { q: 'Faut-il une landing page par campagne ?', a: 'Idéalement, une par offre ou par cible. Plus la page correspond au message de l\'annonce, meilleur est le taux de conversion et moins chaque prospect vous coûte.' },
    ],
    projects: ['monchauff'],
    related: ['creation-site-vitrine', 'seo-performance', 'automatisation-ia'],
  },
  {
    slug: 'site-e-commerce',
    name: 'Site e-commerce',
    category: 'Sites web',
    title: 'Création de site e-commerce | Développeur e-commerce freelance',
    description: 'Création de boutique en ligne sur Shopify, WooCommerce ou sur mesure : paiement sécurisé, gestion des stocks, livraison et référencement des produits.',
    h1: 'Création de site e-commerce',
    lead: 'Vendez en ligne avec une boutique rapide, sécurisée et simple à gérer au quotidien. Shopify, WooCommerce ou développement sur mesure : je choisis avec vous la solution adaptée à votre catalogue et à votre budget.',
    summary: 'Une boutique en ligne rapide et sécurisée, simple à gérer, pensée pour vendre.',
    includes: [
      { title: 'Catalogue produits', desc: 'Fiches produits, variantes (tailles, couleurs), catégories, filtres et recherche.' },
      { title: 'Paiement sécurisé', desc: 'Carte bancaire, Apple Pay, Google Pay, paiement en plusieurs fois, via Stripe ou la solution de votre plateforme.' },
      { title: 'Livraison et retrait', desc: 'Frais de port par zone ou par poids, transporteurs, click & collect, livraison locale.' },
      { title: 'Gestion des commandes', desc: 'Suivi des commandes, emails automatiques, factures, gestion des stocks et des retours.' },
      { title: 'SEO e-commerce', desc: 'Fiches produits et catégories optimisées, données structurées Produit, URLs propres.' },
      { title: 'Conformité', desc: 'CGV, mentions légales, cookies et RGPD, accessibilité : les obligations d\'une boutique en ligne.' },
    ],
    sections: [
      {
        heading: 'Shopify, WooCommerce ou sur mesure ?',
        body: [
          '- Shopify : tout est hébergé et maintenu pour vous. Idéal pour démarrer vite et gérer seul sa boutique, avec un abonnement mensuel et des commissions selon le forfait.',
          '- WooCommerce : l\'extension e-commerce de WordPress. Plus flexible, sans commission de plateforme, mais demande un hébergement et une maintenance sérieux.',
          '- Sur mesure : pour les besoins qu\'aucune plateforme ne couvre bien : commande avec règles métier (traiteur, configurateur, abonnements), intégration poussée avec vos outils, ou volumes importants.',
          'Je vous recommande la solution la plus simple qui couvre vraiment votre besoin, pas la plus chère.',
        ],
      },
      {
        heading: 'Ce qui fait vendre une boutique en ligne',
        body: [
          'Des photos de qualité, des fiches produits qui répondent aux questions avant qu\'on les pose (dimensions, délais, retours), un tunnel de commande court, des frais de livraison annoncés tôt et des moyens de paiement familiers.',
          'La vitesse compte aussi : une boutique lente perd des ventes à chaque étape, surtout sur mobile où se fait aujourd\'hui une grande partie des achats.',
        ],
      },
      {
        heading: 'Vos obligations légales en ligne',
        body: [
          'Une boutique en ligne doit afficher des mentions légales, des conditions générales de vente, une politique de confidentialité, gérer le consentement aux cookies et respecter le droit de rétractation. Depuis juin 2025, l\'accessibilité numérique s\'applique aussi à une grande partie des sites e-commerce, avec une exemption pour les microentreprises.',
          'Je vous accompagne sur la partie technique de ces obligations pour que la boutique soit conforme dès sa mise en ligne.',
        ],
      },
      {
        heading: 'Prix d\'un site e-commerce',
        body: [
          'Le coût dépend de la plateforme choisie, du nombre de produits à intégrer, du design, des modes de livraison et des connexions avec vos outils (comptabilité, stock, CRM, logistique).',
          'Après un échange sur votre catalogue et votre façon de vendre, je vous envoie un devis gratuit et détaillé sous 48 h, en incluant les coûts récurrents (abonnement, hébergement, commissions) pour que vous ayez une vision complète.',
        ],
      },
    ],
    faq: [
      { q: 'Combien de temps pour lancer une boutique en ligne ?', a: 'Pour une boutique Shopify ou WooCommerce avec un catalogue raisonnable, comptez généralement trois à six semaines. Un développement sur mesure demande plus de temps selon les fonctionnalités.' },
      { q: 'Pourrai-je ajouter mes produits moi-même ?', a: 'Oui. Quelle que soit la solution, vous gérez vos produits, vos stocks et vos commandes depuis une interface d\'administration, et je vous forme à son utilisation.' },
      { q: 'Peut-on migrer ma boutique existante ?', a: 'Oui : produits, clients, commandes et URLs peuvent être migrés, avec des redirections pour conserver votre référencement. Voir la page Refonte et migration de site.' },
      { q: 'Quels moyens de paiement proposer ?', a: 'Au minimum la carte bancaire, Apple Pay et Google Pay. Selon votre panier moyen, le paiement en plusieurs fois et PayPal peuvent augmenter les ventes.' },
    ],
    projects: ['vite-et-gourmand'],
    related: ['application-web-sur-mesure', 'refonte-migration-site', 'securite-conformite', 'seo-performance'],
  },
  {
    slug: 'site-wordpress',
    name: 'Site WordPress',
    category: 'Sites web',
    title: 'Développeur WordPress freelance : création et refonte',
    description: 'Développeur WordPress freelance : création de site, thème sur mesure, WooCommerce, optimisation de la vitesse, sécurité et maintenance de sites WordPress.',
    h1: 'Développeur WordPress freelance',
    lead: 'Un site WordPress propre, rapide et sécurisé, que vous pouvez modifier vous-même sans risquer de tout casser. Création, refonte, optimisation ou reprise d\'un site existant.',
    summary: 'Un WordPress propre, rapide et sécurisé que vous gérez vous-même en toute autonomie.',
    includes: [
      { title: 'Création de site', desc: 'Un site WordPress complet, avec un thème léger personnalisé plutôt qu\'un thème surchargé.' },
      { title: 'Thème et blocs sur mesure', desc: 'Des blocs Gutenberg adaptés à vos contenus, pour modifier vos pages sans toucher au code.' },
      { title: 'WooCommerce', desc: 'Ajout ou configuration d\'une boutique en ligne sur votre site WordPress.' },
      { title: 'Optimisation de la vitesse', desc: 'Cache, images, nettoyage des extensions inutiles, hébergement adapté.' },
      { title: 'Sécurité', desc: 'Mises à jour, sauvegardes automatiques, protection de l\'administration, nettoyage après piratage.' },
      { title: 'Formation', desc: 'Une prise en main concrète pour publier, modifier et gérer votre site en autonomie.' },
    ],
    sections: [
      {
        heading: 'Pourquoi choisir WordPress ?',
        body: [
          'WordPress fait tourner une très grande part des sites web dans le monde. Son atout principal : vous modifiez vos textes, vos images et vos articles vous-même, depuis une interface que beaucoup de gens connaissent déjà.',
          'Il convient bien aux sites vitrines qui évoluent souvent, aux blogs et aux petites boutiques. Il demande en contrepartie un minimum de maintenance : mises à jour, sauvegardes et surveillance.',
        ],
      },
      {
        heading: 'Les problèmes WordPress les plus courants',
        body: [
          '- Un site lent, à cause d\'un thème trop lourd ou de dizaines d\'extensions.',
          '- Des extensions abandonnées qui ouvrent des failles de sécurité.',
          '- Un site piraté, redirigé vers des pages frauduleuses ou bloqué par Google.',
          '- Un constructeur de pages qui rend chaque modification compliquée.',
          '- Un ancien prestataire injoignable, sans accès ni sauvegarde.',
          'Je peux reprendre votre site existant, faire un état des lieux et corriger ces problèmes, ou repartir sur une base saine si c\'est plus raisonnable.',
        ],
      },
      {
        heading: 'Ma façon de travailler avec WordPress',
        body: [
          'Le moins d\'extensions possible, un thème léger, du code propre pour les besoins spécifiques et un hébergement adapté. Le résultat : un site plus rapide, moins exposé aux failles et plus simple à maintenir.',
          'Si WordPress n\'est pas adapté à votre besoin, je vous le dis, et je vous propose une alternative plus pertinente.',
        ],
      },
    ],
    faq: [
      { q: 'WordPress est-il gratuit ?', a: 'Le logiciel est gratuit et open source. Les coûts viennent de l\'hébergement, du nom de domaine, d\'éventuels thèmes ou extensions payants, et du temps de création et de maintenance.' },
      { q: 'Mon site WordPress est très lent, que faire ?', a: 'Un audit permet d\'identifier la cause : hébergement, thème, extensions, images, base de données. Les corrections apportent souvent un gain important sans refaire le site.' },
      { q: 'Mon site WordPress a été piraté, pouvez-vous m\'aider ?', a: 'Oui : nettoyage, suppression des fichiers malveillants, changement des accès, mise à jour, puis renforcement de la sécurité pour éviter une nouvelle attaque.' },
      { q: 'Faut-il un contrat de maintenance ?', a: 'C\'est fortement recommandé pour WordPress : les mises à jour régulières et les sauvegardes sont la meilleure protection contre les failles et les pannes.' },
    ],
    projects: [],
    related: ['creation-site-vitrine', 'maintenance-hebergement', 'refonte-migration-site', 'seo-performance'],
  },
  {
    slug: 'creation-blog',
    name: 'Blog et site éditorial',
    category: 'Sites web',
    title: 'Création de blog professionnel pour entreprise | Freelance',
    description: 'Création de blog d\'entreprise optimisé pour le référencement : architecture des contenus, catégories, interface de publication simple et performances.',
    h1: 'Création de blog professionnel',
    lead: 'Un blog d\'entreprise bien construit attire chaque mois des visiteurs depuis Google, montre votre expertise et nourrit vos prospects. Je crée la plateforme et la structure qui rendent vos articles visibles.',
    summary: 'Un blog d\'entreprise structuré pour le référencement, simple à alimenter au quotidien.',
    includes: [
      { title: 'Plateforme de publication', desc: 'Une interface simple pour écrire, illustrer et publier vos articles, sur WordPress ou sur mesure.' },
      { title: 'Architecture SEO', desc: 'Catégories, URLs, maillage interne et pages thématiques pensés pour le référencement.' },
      { title: 'Données structurées', desc: 'Balisage Article, auteur, fil d\'Ariane : pour des résultats Google plus riches.' },
      { title: 'Images de partage', desc: 'Un visuel généré pour chaque article, prêt pour LinkedIn, Facebook ou WhatsApp.' },
      { title: 'Lecture agréable', desc: 'Typographie soignée, sommaire, temps de lecture, articles liés.' },
      { title: 'Newsletter', desc: 'Inscription et envoi des nouveaux articles à vos abonnés, si besoin.' },
    ],
    sections: [
      {
        heading: 'Pourquoi un blog pour une entreprise ?',
        body: [
          'Vos clients se posent des questions avant d\'acheter : combien ça coûte, quelle solution choisir, comment éviter les erreurs. Un article qui répond bien à ces questions peut apparaître sur Google pendant des années et vous amener des visiteurs qualifiés sans payer de publicité.',
          'Le blog sert aussi de preuve d\'expertise : un prospect qui a lu deux ou trois de vos articles arrive en confiance au premier rendez-vous.',
        ],
      },
      {
        heading: 'Ce qui fait la différence côté technique',
        body: [
          '- Une structure par thèmes, pour que Google comprenne vos domaines d\'expertise.',
          '- Des liens entre articles et vers vos pages services, pour guider le lecteur vers le contact.',
          '- Des pages rapides et lisibles sur mobile.',
          '- Un sitemap à jour automatiquement et des dates de publication et de mise à jour fiables.',
        ],
      },
      {
        heading: 'Et le contenu ?',
        body: [
          'Je peux vous aider à définir une liste de sujets à partir des recherches de vos clients, et à organiser un calendrier réaliste. La régularité compte plus que le volume : mieux vaut un bon article par mois qu\'une rafale suivie de six mois de silence.',
        ],
      },
    ],
    faq: [
      { q: 'Combien d\'articles faut-il publier ?', a: 'Il n\'y a pas de nombre magique. Un article complet et utile par mois, tenu dans la durée, donne de meilleurs résultats que beaucoup d\'articles courts et superficiels.' },
      { q: 'Le blog peut-il être ajouté à mon site actuel ?', a: 'Oui, sur votre domaine (par exemple votre-site.fr/blog), ce qui est préférable pour le référencement plutôt qu\'un sous-domaine séparé.' },
      { q: 'Combien de temps avant de voir des résultats ?', a: 'Le référencement naturel est un travail de moyen terme : les premiers effets apparaissent souvent après quelques mois, et s\'accumulent ensuite avec chaque nouvel article.' },
    ],
    projects: ['respusse', 'monchauff'],
    related: ['creation-site-vitrine', 'seo-performance', 'site-wordpress'],
  },
  {
    slug: 'refonte-migration-site',
    name: 'Refonte et migration',
    category: 'Sites web',
    title: 'Refonte de site internet et migration sans perte de SEO',
    description: 'Refonte de site internet, migration de plateforme ou de technologie sans perdre votre référencement : audit, redirections 301, reprise des contenus et suivi.',
    h1: 'Refonte et migration de site internet',
    lead: 'Votre site est daté, lent ou impossible à faire évoluer ? Je le refonds ou le migre vers une technologie adaptée, en conservant votre référencement, vos contenus et vos données.',
    summary: 'Moderniser ou changer de technologie sans perdre votre référencement ni vos données.',
    includes: [
      { title: 'Audit de l\'existant', desc: 'Pages qui génèrent du trafic, mots-clés, liens entrants, contenus à garder ou à fusionner.' },
      { title: 'Nouvelle structure', desc: 'Une arborescence repensée autour de vos services et des recherches de vos clients.' },
      { title: 'Redirections 301', desc: 'Chaque ancienne URL est redirigée vers la bonne nouvelle page pour conserver le référencement.' },
      { title: 'Migration des contenus', desc: 'Pages, articles, produits, clients, commandes : repris proprement, sans ressaisie manuelle.' },
      { title: 'Changement de technologie', desc: 'WordPress vers Next.js, Wix vers WordPress, ancien code vers une base moderne, etc.' },
      { title: 'Suivi après mise en ligne', desc: 'Surveillance dans Google Search Console des erreurs et du trafic dans les semaines qui suivent.' },
    ],
    sections: [
      {
        heading: 'Quand refaire son site ?',
        body: [
          '- Le site n\'est pas adapté au mobile ou s\'affiche mal sur certains écrans.',
          '- Il est lent, et les visiteurs partent avant la fin du chargement.',
          '- Le design ne reflète plus votre entreprise ou vos tarifs actuels.',
          '- Vous ne pouvez pas le modifier sans appeler un développeur pour chaque détail.',
          '- Il ne génère aucune demande de contact.',
          '- La technologie n\'est plus maintenue ou le prestataire a disparu.',
        ],
      },
      {
        heading: 'Le vrai risque d\'une refonte : perdre son référencement',
        body: [
          'Beaucoup de refontes font chuter le trafic Google du jour au lendemain. La cause est presque toujours la même : des URLs qui changent sans redirection, des pages supprimées qui recevaient des visites, ou des contenus raccourcis.',
          'C\'est pour cela que chaque refonte commence par un inventaire des pages et de leur trafic, et se termine par un plan de redirections testé avant la mise en ligne.',
        ],
      },
      {
        heading: 'Migration de technologie',
        body: [
          'Changer de technologie a du sens quand l\'actuelle vous coûte trop cher en maintenance, bride vos performances ou empêche d\'ajouter des fonctionnalités. Je migre progressivement si nécessaire, pour que votre activité ne soit jamais interrompue.',
          'Les données (clients, commandes, contenus) sont transférées par scripts et vérifiées, pas recopiées à la main.',
        ],
      },
    ],
    faq: [
      { q: 'Vais-je perdre mon référencement Google ?', a: 'Pas si la migration est bien préparée : redirections 301, conservation des contenus qui performent, balises reprises et suivi après la mise en ligne. Une légère fluctuation temporaire est normale.' },
      { q: 'Faut-il tout refaire ou peut-on garder une partie ?', a: 'Ça dépend de l\'état du site. Un audit permet de décider entre une amélioration de l\'existant et une refonte complète, avec les coûts de chaque option.' },
      { q: 'Mon site sera-t-il hors ligne pendant la refonte ?', a: 'Non. Le nouveau site est construit à part, sur une adresse de prévisualisation, puis basculé en une fois quand tout est validé.' },
      { q: 'Je n\'ai plus les accès à mon site, que faire ?', a: 'C\'est fréquent. On peut généralement récupérer l\'accès au nom de domaine et à l\'hébergement via les registraires, et reconstruire le site à partir de sa version en ligne.' },
    ],
    projects: [],
    related: ['creation-site-vitrine', 'seo-performance', 'api-donnees', 'site-wordpress'],
  },

  // ────────────────────────────── APPLICATIONS ─────────────────────────────
  {
    slug: 'application-web-sur-mesure',
    name: 'Application web sur mesure',
    category: 'Applications',
    title: 'Développement d\'application web sur mesure | Freelance',
    description: 'Développement d\'application web sur mesure : réservation en ligne, paiement, espace client, back-office, tableaux de bord. Adaptée à votre métier.',
    h1: 'Développement d\'application web sur mesure',
    lead: 'Quand les logiciels du marché ne collent pas à votre façon de travailler, je développe l\'outil qu\'il vous faut : réservation, commande, espace client, back-office, tableaux de bord. Accessible depuis un navigateur, sur ordinateur comme sur mobile.',
    summary: 'L\'outil métier qu\'il vous faut : réservation, paiement, espace client, back-office, tableaux de bord.',
    price: { from: '700 €', detail: 'Un site avec devis, réservation ou prise de rendez-vous en ligne, livré en 3 semaines. Les applications plus complètes sont chiffrées sur devis.' },
    includes: [
      { title: 'Réservation en ligne', desc: 'Créneaux, disponibilités, acomptes, rappels automatiques et synchronisation avec votre agenda.' },
      { title: 'Paiement en ligne', desc: 'Paiements uniques, acomptes, abonnements et factures avec Stripe.' },
      { title: 'Espace client', desc: 'Compte sécurisé où vos clients suivent leurs commandes, documents, rendez-vous ou dossiers.' },
      { title: 'Back-office', desc: 'Une interface d\'administration pour gérer vos contenus, clients, commandes et équipes.' },
      { title: 'Tableaux de bord', desc: 'Vos indicateurs clés en temps réel, et des rapports exportables.' },
      { title: 'Intégrations', desc: 'Connexion avec vos outils existants : CRM, comptabilité, emailing, calendrier.' },
    ],
    sections: [
      {
        heading: 'Pourquoi une application sur mesure ?',
        body: [
          'Les logiciels standards couvrent souvent 80 % du besoin, et vous obligent à contourner les 20 % restants avec des tableurs, des copier-coller et des échanges d\'emails. Une application sur mesure reprend votre processus réel et supprime ces tâches répétitives.',
          'Vous ne payez pas d\'abonnement par utilisateur, et l\'outil évolue avec votre entreprise plutôt que selon la feuille de route d\'un éditeur.',
        ],
      },
      {
        heading: 'Exemples d\'applications',
        body: [
          '- Prise de rendez-vous avec acompte pour un institut, un cabinet ou un artisan.',
          '- Commande en ligne avec règles métier : minimum de commande, zones de livraison, délais de préparation.',
          '- Estimation de devis en ligne avec génération automatique du devis en PDF.',
          '- Extranet client pour partager documents, avancement et factures.',
          '- Outil interne de suivi : prospects, interventions, stocks, plannings.',
        ],
      },
      {
        heading: 'Comment je construis votre application',
        body: [
          'On commence par cadrer le besoin et identifier le cœur de valeur : ce qui doit exister dès la première version, et ce qui peut attendre. Je livre ensuite par étapes courtes, pour que vous puissiez tester et réorienter en cours de route.',
          'La sécurité et la qualité sont intégrées dès le départ : authentification solide, droits par rôle, protection des données, tests automatisés et sauvegardes. Votre application doit pouvoir tourner des années.',
        ],
      },
      {
        heading: 'Technologies',
        body: [
          'Selon le projet : Next.js, React et TypeScript côté interface ; Node.js, Python (FastAPI) ou PHP (Symfony) côté serveur ; PostgreSQL, MySQL ou Supabase pour les données ; Stripe pour le paiement. Le choix se fait selon votre besoin et votre budget, pas selon la mode.',
        ],
      },
    ],
    faq: [
      { q: 'Combien coûte une application web sur mesure ?', a: 'Un site avec devis, réservation ou prise de rendez-vous en ligne démarre à 700 €. Au-delà, le coût dépend du nombre de fonctionnalités et de leur complexité. Commencer par une première version limitée à l\'essentiel permet de maîtriser le budget et de valider l\'usage avant d\'aller plus loin. Je vous envoie un devis détaillé après cadrage.' },
      { q: 'Combien de temps faut-il pour développer une application ?', a: 'Une première version utilisable prend généralement de quelques semaines à quelques mois selon le périmètre. Les livraisons intermédiaires vous permettent de tester bien avant la fin.' },
      { q: 'Application web ou application mobile ?', a: 'Une application web fonctionne dans le navigateur, sur tous les appareils, sans passer par les stores. Elle peut même s\'installer sur le téléphone comme une app. Une application native se justifie surtout pour des usages très mobiles ou des fonctions spécifiques du téléphone.' },
      { q: 'Qui est propriétaire du code ?', a: 'Vous. Le code source vous est remis, documenté, et vous restez libre de le faire évoluer avec qui vous voulez.' },
    ],
    projects: ['vite-et-gourmand', 'maison-camelia', 'monchauff', 'prospection-v2', 'respusse'],
    related: ['application-mobile', 'api-donnees', 'automatisation-ia', 'conseil-cadrage-mvp'],
  },
  {
    slug: 'application-mobile',
    name: 'Application mobile',
    category: 'Applications',
    title: 'Développement d\'application mobile : PWA ou native',
    description: 'Développement d\'application mobile iOS et Android : application installable (PWA) ou React Native, notifications, paiement, mode hors connexion.',
    h1: 'Développement d\'application mobile',
    lead: 'Une application sur le téléphone de vos clients ou de vos équipes, installable, rapide et utilisable sur le terrain. Je vous aide à choisir entre une application web installable (PWA) et une application native, puis je la développe.',
    summary: 'Une application installable sur iOS et Android, pour vos clients ou vos équipes sur le terrain.',
    includes: [
      { title: 'Application installable (PWA)', desc: 'Une icône sur l\'écran d\'accueil, sans passer par les stores, et une seule version pour tous les téléphones.' },
      { title: 'Application React Native', desc: 'Une vraie application iOS et Android publiée sur l\'App Store et Google Play, quand c\'est nécessaire.' },
      { title: 'Notifications push', desc: 'Rappels, alertes et relances envoyés directement sur le téléphone.' },
      { title: 'Paiement et abonnements', desc: 'Achat, abonnement et facturation intégrés à l\'application.' },
      { title: 'Saisie qui ne se perd pas', desc: 'Les données saisies sur le terrain sont conservées même en cas de coupure réseau.' },
      { title: 'Back-office associé', desc: 'Une interface web pour gérer les contenus, les utilisateurs et les données de l\'app.' },
    ],
    sections: [
      {
        heading: 'PWA ou application native : comment choisir ?',
        body: [
          'Une PWA (Progressive Web App) est un site web qui s\'installe comme une application. Elle coûte moins cher, se met à jour instantanément et fonctionne sur tous les appareils. C\'est le bon choix pour la majorité des outils métier et des services clients.',
          'Une application native (React Native) se justifie si vous avez besoin d\'être présent sur les stores, d\'utiliser intensivement des fonctions du téléphone (Bluetooth, capteurs, arrière-plan) ou de proposer une expérience très poussée.',
          'Je vous conseille sur l\'option la plus adaptée avant de commencer, pour ne pas payer une complexité inutile.',
        ],
      },
      {
        heading: 'Pour quels usages ?',
        body: [
          '- Une app pour vos clients : réservation, fidélité, commande, suivi.',
          '- Un outil terrain pour vos équipes : interventions, photos, signatures, comptes rendus.',
          '- Un outil de prospection ou de vente utilisé en déplacement.',
          '- La version mobile d\'une application web existante.',
        ],
      },
    ],
    faq: [
      { q: 'Une PWA peut-elle aller sur l\'App Store ?', a: 'Pas directement. Elle s\'installe depuis le navigateur. Si la présence sur les stores est indispensable, une application React Native est plus adaptée.' },
      { q: 'Faut-il développer deux applications pour iOS et Android ?', a: 'Non. Une PWA ou une application React Native partagent le même code pour les deux plateformes, ce qui réduit fortement les coûts.' },
      { q: 'L\'application peut-elle fonctionner sans réseau ?', a: 'Oui, selon les besoins : consultation hors connexion, ou saisie conservée et envoyée automatiquement au retour du réseau.' },
    ],
    projects: ['prospection-v2'],
    related: ['application-web-sur-mesure', 'api-donnees', 'conseil-cadrage-mvp'],
  },

  // ─────────────────────────── BACK-END & DONNÉES ──────────────────────────
  {
    slug: 'api-donnees',
    name: 'API et données',
    category: 'Back-end & données',
    title: 'Développement et intégration d\'API, bases de données, scraping',
    description: 'Développeur back-end freelance : création et intégration d\'API, connexion de vos outils (CRM, paiement, ERP), bases de données, migration de données et scraping.',
    h1: 'Développement d\'API et gestion des données',
    lead: 'Vos outils ne se parlent pas, vos données sont éparpillées dans des fichiers Excel ou bloquées dans un vieux logiciel ? Je crée les API, les connexions et les bases de données qui font circuler l\'information automatiquement.',
    summary: 'Connecter vos outils entre eux, structurer vos données et les faire circuler automatiquement.',
    includes: [
      { title: 'Développement d\'API', desc: 'API REST documentées (OpenAPI), sécurisées et testées, pour vos applications ou vos partenaires.' },
      { title: 'Intégration d\'API', desc: 'Connexion de votre site ou de vos outils à un CRM, un ERP, Stripe, Google, Notion, HubSpot, etc.' },
      { title: 'Bases de données', desc: 'Conception, création et optimisation de bases PostgreSQL, MySQL ou Supabase.' },
      { title: 'Migration de données', desc: 'Transfert fiable d\'un outil à un autre, avec nettoyage et vérification.' },
      { title: 'Scraping et collecte', desc: 'Récupération automatisée de données publiques, dans le respect des conditions d\'utilisation.' },
      { title: 'Reporting', desc: 'Tableaux de bord et exports pour suivre votre activité à partir de vos vraies données.' },
    ],
    sections: [
      {
        heading: 'Qu\'est-ce qu\'une API, concrètement ?',
        body: [
          'Une API est une porte d\'entrée qui permet à deux logiciels d\'échanger des informations sans intervention humaine. Par exemple : un formulaire de votre site qui crée automatiquement un contact dans votre CRM, ou une commande qui met à jour votre stock et votre comptabilité.',
          'Bien conçues, les API suppriment les ressaisies, les oublis et les erreurs de copie, et vous donnent une vision fiable de votre activité.',
        ],
      },
      {
        heading: 'Exemples de connexions',
        body: [
          '- Site web → CRM (HubSpot, Pipedrive, Notion) pour chaque nouveau prospect.',
          '- Boutique → comptabilité et facturation.',
          '- Prise de rendez-vous → Google Calendar ou Calendly.',
          '- Recherche d\'entreprises via Google Maps et les registres publics pour la prospection.',
          '- Widget intégrable sur le site de vos clients, alimenté par votre propre API.',
        ],
      },
      {
        heading: 'Bases de données et migration',
        body: [
          'Une base de données bien conçue évite les doublons, garantit la cohérence des informations et reste rapide quand les volumes augmentent. Je conçois le modèle avec vous, puis je le mets en place avec des sauvegardes et des droits d\'accès adaptés.',
          'Pour une migration, les données sont extraites, nettoyées, transformées et vérifiées par scripts, avec un essai à blanc avant la bascule définitive.',
        ],
      },
      {
        heading: 'Scraping : ce qui est possible',
        body: [
          'Le scraping permet de collecter des données publiques en volume : annuaires, prix, annonces, informations d\'entreprises. Je privilégie toujours les API officielles quand elles existent, et je respecte les conditions d\'utilisation des sites et le RGPD.',
        ],
      },
    ],
    faq: [
      { q: 'Mon logiciel n\'a pas d\'API, peut-on quand même le connecter ?', a: 'Souvent oui : via des exports automatisés, des webhooks, un accès direct à la base de données ou, en dernier recours, de l\'automatisation de navigateur.' },
      { q: 'Le scraping est-il légal ?', a: 'La collecte de données publiques est possible dans un cadre précis : respect des conditions d\'utilisation, pas de contournement de protection, et respect du RGPD pour les données personnelles. On vérifie ensemble ce cadre avant de commencer.' },
      { q: 'Pouvez-vous reprendre une API développée par quelqu\'un d\'autre ?', a: 'Oui. Je commence par un audit du code et de la documentation, puis je corrige, sécurise et fais évoluer l\'existant.' },
    ],
    projects: ['prospection-v2', 'monchauff'],
    related: ['automatisation-ia', 'application-web-sur-mesure', 'refonte-migration-site'],
  },

  // ─────────────────────────── AUTOMATISATION & IA ─────────────────────────
  {
    slug: 'automatisation-ia',
    name: 'Automatisation et IA',
    category: 'Automatisation & IA',
    title: 'Automatisation et intégration d\'IA pour entreprises | Freelance',
    description: 'Automatisation de tâches, agents IA, chatbots et génération automatique de documents pour TPE et PME. Gagnez des heures chaque semaine sur les tâches répétitives.',
    h1: 'Automatisation des tâches et intégration d\'IA',
    lead: 'Relances, saisies, devis, comptes rendus, tri des emails : une partie de votre semaine part dans des tâches répétitives. Je les automatise, avec ou sans intelligence artificielle, pour que votre équipe se concentre sur ce qui rapporte.',
    summary: 'Automatiser les tâches répétitives et intégrer l\'IA là où elle fait vraiment gagner du temps.',
    includes: [
      { title: 'Automatisation de tâches', desc: 'Scripts et workflows (Make, Zapier, n8n ou code sur mesure) qui enchaînent les actions à votre place.' },
      { title: 'Intégration d\'IA', desc: 'Résumés, classement, extraction d\'informations, rédaction assistée, intégrés à vos outils.' },
      { title: 'Agents IA', desc: 'Des assistants capables d\'enchaîner plusieurs étapes : rechercher, analyser, préparer, proposer.' },
      { title: 'Chatbot', desc: 'Un assistant qui répond aux questions de vos clients à partir de vos propres contenus.' },
      { title: 'Génération de documents', desc: 'Devis, factures, contrats, rapports en PDF générés automatiquement à partir de vos données.' },
      { title: 'Notifications et relances', desc: 'Emails, SMS ou messages envoyés au bon moment, sans y penser.' },
    ],
    sections: [
      {
        heading: 'Que peut-on automatiser ?',
        body: [
          '- Le traitement des demandes entrantes : tri, réponse de premier niveau, création dans le CRM.',
          '- La prospection : recherche d\'entreprises, qualification, préparation des appels, relances.',
          '- Les devis et documents : génération en PDF à partir d\'un formulaire ou d\'une fiche client.',
          '- Le reporting : collecte des chiffres et envoi d\'un récapitulatif chaque semaine.',
          '- Les rappels : rendez-vous, échéances, paiements, renouvellements.',
          'Une bonne règle : si une tâche se répète chaque semaine et suit toujours les mêmes étapes, elle peut probablement être automatisée.',
        ],
      },
      {
        heading: 'L\'IA, oui, mais là où elle est utile',
        body: [
          'L\'intelligence artificielle est très efficace pour comprendre du texte, résumer, classer ou rédiger un premier jet. Elle l\'est beaucoup moins pour des calculs exacts ou des décisions qui doivent être fiables à 100 %.',
          'Je combine donc règles fixes et IA selon les cas, avec une validation humaine sur ce qui compte. Le résultat est un système prévisible, dont les coûts d\'utilisation sont maîtrisés.',
        ],
      },
      {
        heading: 'Comment on procède',
        body: [
          'On liste ensemble les tâches qui vous prennent du temps, on estime le gain de chacune, puis on commence par l\'automatisation qui rapporte le plus pour le moins d\'effort. Chaque automatisation est documentée et surveillée : en cas d\'erreur, vous êtes prévenu.',
        ],
      },
    ],
    faq: [
      { q: 'Make, Zapier, n8n ou développement sur mesure ?', a: 'Les outils no-code sont parfaits pour des enchaînements simples et rapides à mettre en place. Le code sur mesure devient plus intéressant quand les volumes, la logique métier ou les coûts d\'abonnement augmentent. Je vous conseille selon votre cas.' },
      { q: 'Mes données sont-elles en sécurité avec l\'IA ?', a: 'On choisit des fournisseurs et des réglages adaptés à la sensibilité de vos données, on limite ce qui est envoyé au strict nécessaire, et on respecte le RGPD.' },
      { q: 'Combien de temps peut-on gagner ?', a: 'Ça dépend des tâches, mais l\'automatisation de quelques processus répétitifs libère souvent plusieurs heures par semaine. On estime le gain avant de commencer pour prioriser.' },
    ],
    projects: ['prospection-v2', 'monchauff'],
    related: ['api-donnees', 'application-web-sur-mesure', 'conseil-cadrage-mvp'],
  },

  // ─────────────────────────── QUALITÉ & CONFORMITÉ ────────────────────────
  {
    slug: 'seo-performance',
    name: 'SEO et performance',
    category: 'Qualité & conformité',
    title: 'Audit SEO technique et optimisation des performances',
    description: 'Audit SEO technique et optimisation de la vitesse de votre site : indexation, Core Web Vitals, structure, données structurées. Un plan d\'action clair et chiffré.',
    h1: 'Audit SEO technique et optimisation des performances',
    lead: 'Votre site n\'apparaît pas sur Google ou met trop de temps à charger ? J\'analyse ce qui bloque, je vous explique les priorités en langage clair, et je corrige.',
    summary: 'Être trouvé sur Google et charger vite : audit, plan d\'action et corrections.',
    includes: [
      { title: 'Audit technique', desc: 'Indexation, erreurs, pages en double, balises, structure des URLs, maillage interne.' },
      { title: 'Vitesse et Core Web Vitals', desc: 'Mesure et amélioration des indicateurs de performance utilisés par Google.' },
      { title: 'Structure et mots-clés', desc: 'Une page par intention de recherche, avec des titres et des contenus alignés sur ce que cherchent vos clients.' },
      { title: 'Données structurées', desc: 'Balisage schema.org (entreprise, services, articles, produits, FAQ) pour des résultats plus riches.' },
      { title: 'Google Search Console', desc: 'Configuration, lecture des rapports et suivi des positions et des clics.' },
      { title: 'Plan d\'action priorisé', desc: 'Les corrections classées par impact et par effort, avec ce que je peux faire pour vous.' },
    ],
    sections: [
      {
        heading: 'Pourquoi mon site n\'apparaît pas sur Google ?',
        body: [
          '- Les pages ne sont pas indexées : blocage technique, erreurs, site non déclaré à Google.',
          '- Le site ne cible aucune recherche précise : une seule page générique pour tous les services.',
          '- Le contenu est trop mince pour répondre aux questions des visiteurs.',
          '- Le site est lent ou mal adapté au mobile.',
          '- Aucun autre site ne parle de vous ni ne vous cite.',
          'Un audit identifie lesquelles de ces causes vous concernent, et dans quel ordre les traiter.',
        ],
      },
      {
        heading: 'La vitesse, un enjeu de chiffre d\'affaires',
        body: [
          'Un site lent perd des visiteurs avant même qu\'ils voient votre offre, et Google en tient compte dans son classement. Les causes habituelles : images trop lourdes, trop de scripts, polices mal chargées, hébergement sous-dimensionné, extensions inutiles.',
          'Les corrections sont souvent rapides et leur effet se mesure immédiatement.',
        ],
      },
      {
        heading: 'Ce que vous recevez',
        body: [
          'Un rapport clair, sans jargon inutile, avec pour chaque problème : ce qui se passe, pourquoi c\'est important et comment le corriger. Je peux ensuite réaliser les corrections moi-même, ou accompagner votre prestataire actuel.',
        ],
      },
    ],
    faq: [
      { q: 'En combien de temps verrai-je des résultats ?', a: 'Les corrections techniques sont prises en compte en quelques jours à quelques semaines. Le gain de positions sur des recherches concurrentielles demande généralement plusieurs mois de travail régulier.' },
      { q: 'Garantissez-vous la première position sur Google ?', a: 'Non, et personne ne peut le garantir honnêtement. Je garantis un travail méthodique sur ce qui dépend de votre site, mesuré dans Google Search Console.' },
      { q: 'L\'audit fonctionne-t-il sur WordPress, Shopify ou Wix ?', a: 'Oui. Les principes sont les mêmes ; seules les corrections possibles varient selon la plateforme.' },
    ],
    projects: ['respusse'],
    related: ['creation-site-vitrine', 'refonte-migration-site', 'creation-blog', 'securite-conformite'],
  },
  {
    slug: 'securite-conformite',
    name: 'Sécurité et conformité',
    category: 'Qualité & conformité',
    title: 'Audit sécurité, RGPD et accessibilité de site web',
    description: 'Audit de sécurité et de code, mise en conformité RGPD (cookies, formulaires) et accessibilité numérique (RGAA, WCAG) de votre site ou application web.',
    h1: 'Sécurité, RGPD et accessibilité de votre site',
    lead: 'Un site piraté, une amende RGPD ou un site inutilisable pour une partie de vos clients coûtent cher. J\'audite votre site ou votre application, je corrige les failles et je le mets en conformité.',
    summary: 'Audit de sécurité et de code, conformité RGPD et accessibilité numérique.',
    includes: [
      { title: 'Audit de sécurité', desc: 'Recherche des failles courantes : injections, accès non protégés, mots de passe, en-têtes, dépendances vulnérables.' },
      { title: 'Audit de code', desc: 'Qualité, maintenabilité, dette technique et risques, avec des recommandations priorisées.' },
      { title: 'Conformité RGPD', desc: 'Bandeau cookies conforme, formulaires, durées de conservation, politique de confidentialité, sous-traitants.' },
      { title: 'Accessibilité', desc: 'Audit selon les critères RGAA / WCAG et corrections : contrastes, clavier, lecteurs d\'écran, formulaires.' },
      { title: 'Corrections', desc: 'Mise en œuvre des corrections, pas seulement un rapport.' },
      { title: 'Prévention', desc: 'Sauvegardes, mises à jour, surveillance et tests automatisés pour éviter les régressions.' },
    ],
    sections: [
      {
        heading: 'Sécurité : les failles les plus fréquentes',
        body: [
          '- Logiciels et extensions non mis à jour.',
          '- Formulaires et pages d\'administration mal protégés.',
          '- Mots de passe faibles ou stockés sans protection.',
          '- Clés d\'API et secrets visibles dans le code.',
          '- Absence de sauvegarde exploitable en cas de problème.',
          'Je les vérifie méthodiquement, je vous explique les risques réels et je corrige en commençant par les plus graves.',
        ],
      },
      {
        heading: 'RGPD : ce que votre site doit respecter',
        body: [
          'Dès que votre site collecte des données personnelles (formulaire, compte client, statistiques, cookies publicitaires), vous avez des obligations : informer clairement, recueillir un consentement valable pour les cookies non essentiels, limiter les données collectées et leur durée de conservation, et sécuriser leur stockage.',
          'Je mets en place la partie technique de ces obligations et je vous aide à documenter vos traitements.',
        ],
      },
      {
        heading: 'Accessibilité : une obligation qui s\'étend',
        body: [
          'L\'accessibilité numérique permet aux personnes en situation de handicap d\'utiliser votre site. Depuis juin 2025, elle s\'impose à de nombreux services en ligne, dont une grande partie des sites e-commerce, avec une exemption pour les microentreprises.',
          'Au-delà de l\'obligation, un site accessible est plus simple à utiliser pour tout le monde et mieux compris par les moteurs de recherche.',
        ],
      },
    ],
    faq: [
      { q: 'Mon site est-il concerné par l\'obligation d\'accessibilité ?', a: 'Ça dépend de votre activité et de la taille de votre entreprise. Les microentreprises (moins de 10 salariés et moins de 2 millions d\'euros de chiffre d\'affaires) sont en grande partie exemptées. On vérifie votre situation ensemble.' },
      { q: 'Un bandeau cookies suffit-il pour être conforme au RGPD ?', a: 'Non. Il doit permettre de refuser aussi facilement que d\'accepter, et bloquer réellement les cookies avant consentement. Le RGPD couvre aussi vos formulaires, vos durées de conservation et vos sous-traitants.' },
      { q: 'Pouvez-vous auditer une application développée par une autre équipe ?', a: 'Oui. C\'est même une bonne pratique avant une reprise, une levée de fonds ou une mise en production importante.' },
    ],
    projects: ['vite-et-gourmand', 'prospection-v2'],
    related: ['maintenance-hebergement', 'seo-performance', 'site-e-commerce'],
  },
  {
    slug: 'maintenance-hebergement',
    name: 'Maintenance et hébergement',
    category: 'Qualité & conformité',
    title: 'Maintenance de site web, hébergement et reprise de projet',
    description: 'Maintenance de site et d\'application web : mises à jour, sauvegardes, correction de bugs, reprise de projet abandonné, hébergement, déploiement et tests automatisés.',
    h1: 'Maintenance de site web et reprise de projet',
    lead: 'Un site ou une application, ça vit : mises à jour, bugs, évolutions, hébergement. Je m\'en occupe pour vous, et je reprends aussi les projets laissés en plan par un ancien prestataire.',
    summary: 'Mises à jour, sauvegardes, bugs, hébergement, et reprise des projets laissés en plan.',
    includes: [
      { title: 'Mises à jour et sauvegardes', desc: 'Logiciels, dépendances et extensions à jour, sauvegardes automatiques testées.' },
      { title: 'Correction de bugs', desc: 'Diagnostic et correction des erreurs, y compris sur du code que je n\'ai pas écrit.' },
      { title: 'Reprise de projet', desc: 'Audit, documentation et remise sur pied d\'un projet abandonné ou mal en point.' },
      { title: 'Hébergement et domaine', desc: 'Choix de l\'hébergement, nom de domaine, emails, certificats HTTPS, DNS.' },
      { title: 'Déploiement et CI/CD', desc: 'Mises en ligne automatisées et sûres, avec retour arrière possible.' },
      { title: 'Tests automatisés', desc: 'Des tests qui vérifient l\'essentiel à chaque modification, pour éviter les régressions.' },
    ],
    sections: [
      {
        heading: 'Pourquoi maintenir son site ?',
        body: [
          'Un site non maintenu se dégrade : failles de sécurité, extensions qui cassent, certificats expirés, formulaires qui n\'envoient plus rien sans que personne ne s\'en aperçoive. Le coût d\'une réparation en urgence est presque toujours supérieur à celui d\'une maintenance régulière.',
        ],
      },
      {
        heading: 'Reprendre un projet existant',
        body: [
          'Votre développeur est parti, l\'agence ne répond plus, ou le projet n\'avance plus ? Je commence par un état des lieux : accès, code, hébergement, dette technique, risques. Vous recevez un diagnostic honnête et un plan pour stabiliser puis faire évoluer le projet.',
          'Je documente au fur et à mesure, pour que vous ne soyez plus jamais dépendant d\'une seule personne.',
        ],
      },
      {
        heading: 'Hébergement, déploiement et CI/CD',
        body: [
          'Je mets en place des hébergements adaptés à chaque projet (Vercel, Railway, hébergeurs français, serveurs dédiés) et des déploiements automatisés : chaque modification est testée automatiquement avant d\'être mise en ligne. Résultat : moins de pannes, des mises en production sans stress et un retour arrière immédiat en cas de problème.',
        ],
      },
    ],
    faq: [
      { q: 'Proposez-vous des forfaits de maintenance mensuels ?', a: 'Oui, adaptés à la taille et à la criticité de votre site : mises à jour, sauvegardes, surveillance et un volume de modifications inclus.' },
      { q: 'Intervenez-vous sur un site que vous n\'avez pas créé ?', a: 'Oui, c\'est une grande partie de ce travail. Je commence toujours par un audit pour comprendre l\'existant avant de le modifier.' },
      { q: 'Que se passe-t-il si mon site tombe en panne ?', a: 'La surveillance détecte la panne, je diagnostique et je rétablis le service, en restaurant une sauvegarde si nécessaire.' },
    ],
    projects: ['vite-et-gourmand', 'prospection-v2'],
    related: ['securite-conformite', 'site-wordpress', 'refonte-migration-site'],
  },

  // ───────────────────────────── ACCOMPAGNEMENT ────────────────────────────
  {
    slug: 'conseil-cadrage-mvp',
    name: 'Conseil, cadrage et MVP',
    category: 'Accompagnement',
    title: 'Conseil technique, cahier des charges et MVP pour TPE et PME',
    description: 'Accompagnement technique des TPE et PME : choix des outils, cahier des charges, cadrage de projet et définition d\'un MVP. Des décisions éclairées, sans jargon.',
    h1: 'Conseil technique, cahier des charges et MVP',
    lead: 'Vous avez un projet numérique mais pas d\'équipe technique pour vous guider ? Je vous aide à faire les bons choix, à rédiger un cahier des charges clair et à définir une première version utile, avant d\'investir.',
    summary: 'Choisir les bons outils, cadrer votre projet et définir une première version utile.',
    price: { from: '200 € / jour', detail: 'Renfort en équipe à la journée, démarrage sous une semaine. Le cadrage et le cahier des charges sont chiffrés sur devis.' },
    includes: [
      { title: 'Conseil technique', desc: 'Quels outils choisir, quoi développer, quoi acheter, quoi éviter : des recommandations claires.' },
      { title: 'Cahier des charges', desc: 'Un document précis qui décrit le besoin, pour obtenir des devis comparables et éviter les malentendus.' },
      { title: 'Cadrage de projet', desc: 'Objectifs, utilisateurs, parcours, priorités, budget et planning réalistes.' },
      { title: 'Définition du MVP', desc: 'Identifier les fonctionnalités indispensables d\'une première version pour tester vite et à moindre coût.' },
      { title: 'Montée en compétence', desc: 'Aider votre équipe à adopter les outils numériques et à travailler avec eux au quotidien.' },
      { title: 'Renfort d\'équipe', desc: 'Je peux aussi rejoindre ponctuellement une équipe existante pour accélérer un projet.' },
    ],
    sections: [
      {
        heading: 'Pour qui ?',
        body: [
          'Pour les dirigeants de TPE et PME qui veulent mieux utiliser le numérique sans avoir de responsable technique en interne : choisir un logiciel, digitaliser un processus, lancer un nouveau service, ou simplement comprendre ce que proposent les prestataires.',
          'Je ne remplace pas un directeur technique à plein temps : j\'apporte un regard technique indépendant pour vous aider à décider et à avancer.',
        ],
      },
      {
        heading: 'Pourquoi un cahier des charges ?',
        body: [
          'Sans cahier des charges, chaque prestataire imagine un projet différent, les devis sont impossibles à comparer et les malentendus apparaissent en cours de route, quand ils coûtent le plus cher.',
          'Un bon cahier des charges décrit le contexte, les utilisateurs, les fonctionnalités par priorité, les contraintes et les critères de réussite. Il vous appartient et vous pouvez le présenter à n\'importe quel prestataire.',
        ],
      },
      {
        heading: 'MVP : lancer petit pour apprendre vite',
        body: [
          'Un MVP (produit minimum viable) est la plus petite version de votre projet qui apporte déjà de la valeur à de vrais utilisateurs. Il permet de vérifier que le besoin existe et que la solution fonctionne, avant d\'investir dans toutes les fonctionnalités.',
          'Le travail consiste surtout à trier : ce qui est indispensable maintenant, ce qui peut attendre, et ce qui n\'est peut-être pas nécessaire du tout.',
        ],
      },
    ],
    faq: [
      { q: 'Pouvez-vous rédiger un cahier des charges sans réaliser le projet ?', a: 'Oui. Le cahier des charges vous appartient : vous pouvez le confier au prestataire de votre choix, ou me demander un devis pour la réalisation.' },
      { q: 'Combien de temps prend un cadrage ?', a: 'Selon la taille du projet, de quelques échanges à quelques semaines. On commence par un premier rendez-vous pour comprendre le besoin et estimer le travail.' },
      { q: 'Proposez-vous des missions de renfort en équipe ?', a: 'Oui : un développeur fullstack intégré à votre équipe, sur vos outils, à partir de 200 € par jour avec un démarrage sous une semaine. Je peux aussi produire des sites et des projets en marque blanche pour les agences.' },
    ],
    projects: ['prospection-v2', 'respusse'],
    related: ['application-web-sur-mesure', 'automatisation-ia', 'application-mobile'],
  },
]

export default services

export const getService = (slug: string) => services.find(s => s.slug === slug)
