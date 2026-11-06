// Réalisations : une page par projet.
// `kind` dit honnêtement de quoi il s'agit (client, outil interne, projet certifiant, démo).

export type RealisationKind = 'Client' | 'Outil interne' | 'Projet certifiant' | 'Démo'

export type Realisation = {
  slug: string
  name: string
  kind: RealisationKind
  /** Précision affichée à côté du type (ex. « Utilisé au quotidien »). */
  kindNote?: string
  sector: string
  /** Balise <title>. */
  title: string
  /** Meta description. */
  description: string
  h1: string
  /** Résumé pour les cartes. */
  summary: string
  lead: string
  logo: string
  url?: string
  urlLabel?: string
  repo?: string
  tech: string[]
  context: string[]
  /** Contraintes ou enjeux du projet. */
  challenges: string[]
  features: { title: string; desc: string }[]
  /** Ce que le projet démontre / résultat. */
  outcome: string[]
  /** Slugs des services liés. */
  services: string[]
}

const realisations: Realisation[] = [
  {
    slug: 'respusse',
    name: 'Respusse',
    kind: 'Client',
    sector: 'Association · Solidarité internationale',
    title: 'Respusse : site vitrine, blog et back-office pour une association',
    description: 'Site vitrine, blog et back-office sur mesure pour Respusse, association qui collecte du matériel en Île-de-France pour des écoles au Congo. Next.js, Supabase.',
    h1: 'Respusse : site et back-office pour une association de dons France–Congo',
    summary: 'Site vitrine, actualités et back-office sur mesure pour une association qui achemine du matériel d\'Île-de-France vers des écoles au Congo.',
    lead: 'Respusse collecte du matériel informatique, électrique et scolaire auprès d\'entreprises d\'Île-de-France et l\'achemine vers des écoles, mairies et associations au Congo, notamment à Kinshasa. J\'ai conçu et développé leur site et leur outil de gestion.',
    logo: '🤝',
    url: 'https://www.respusse.com',
    urlLabel: 'respusse.com',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Resend', 'Vercel'],
    context: [
      'Le site devait convaincre les entreprises franciliennes de donner leur matériel, en prouvant que la démarche va jusqu\'au bout : traçabilité, sécurité des données effacées, comptes rendus d\'usage exploitables dans un rapport RSE.',
      'Il devait aussi présenter clairement les services aux structures bénéficiaires au Congo, qui consultent le site depuis un smartphone, sur une connexion lente et coûteuse.',
    ],
    challenges: [
      'Deux audiences aux attentes opposées : des entreprises sur ordinateur, qui cherchent des preuves de sérieux, et des bénéficiaires sur mobile avec peu de débit.',
      'La contrainte de connexion lente a primé sur les effets visuels : choix des polices, quantité de JavaScript et stratégie de cache ont été pensés pour elle.',
      'L\'association devait pouvoir publier ses actualités et ses projets seule, sans passer par un développeur.',
    ],
    features: [
      { title: 'Site public', desc: 'Accueil, services par audience, fonctionnement en trois temps (collecte, envoi, utilisation), réalisations, actualités et contact.' },
      { title: 'Réalisations et actualités', desc: 'Projets passés avec photo, lieu, type de matériel et résultat, et articles de blog, alimentés depuis la base de données.' },
      { title: 'Formulaire de contact qualifié', desc: 'Choix « entreprise donatrice » ou « structure bénéficiaire », protection anti-spam, enregistrement en base et notification par email.' },
      { title: 'Back-office sur mesure', desc: 'Connexion sécurisée, gestion des articles (brouillon ou publié), des projets avec envoi d\'images et lecture des messages reçus.' },
    ],
    outcome: [
      'Une association autonome sur ses contenus, avec un site qui sert à la fois de vitrine pour les donateurs et de point d\'information pour les bénéficiaires.',
    ],
    services: ['creation-site-vitrine', 'application-web-sur-mesure', 'creation-blog', 'seo-performance'],
  },
  {
    slug: 'prospection-v2',
    name: 'Prospection v2',
    kind: 'Outil interne',
    kindNote: 'Utilisé au quotidien',
    sector: 'Prospection commerciale B2B',
    title: 'Prospection v2 : application de prospection B2B automatisée',
    description: 'Application de prospection B2B installable sur mobile : recherche d\'entreprises, qualification, préparation des appels, relances et envoi au CRM Notion.',
    h1: 'Prospection v2 : mon application de prospection, de la recherche à l\'appel',
    summary: 'Mon poste de travail quotidien de prospection : trouver des entreprises, les qualifier, préparer l\'appel, noter le résultat et planifier la relance.',
    lead: 'Pour prospecter les petites entreprises par téléphone et sur le terrain, j\'ai développé mon propre outil. Je m\'en sers tous les jours : il trouve les prospects, les qualifie, prépare chaque appel, garde le suivi et envoie les contacts intéressés dans mon CRM.',
    logo: '📇',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'PWA', 'Google Places API', 'Notion API', 'Railway', 'Sentry'],
    context: [
      'Une première version, développée avec Streamlit, trouvait des prospects mais laissait plusieurs manques : impossible de classer un prospect juste après l\'appel (la session se perdait en passant sur le téléphone), aucune vision de la santé de l\'entreprise, aucun angle d\'appel, et pas de très petits commerces locaux pour le terrain.',
      'La v2 a été repensée comme un vrai poste de travail : trouver, qualifier, préparer, appeler, noter, relancer, puis transmettre au CRM.',
    ],
    challenges: [
      'Utilisation principale sur téléphone Android, pendant les appels : chaque saisie doit être enregistrée en un geste et ne jamais se perdre.',
      'Maîtrise du budget : chaque recherche Google a un coût, estimé et plafonné avant lancement.',
      'Fiabilité : la fiche d\'appel ne doit jamais présenter une information douteuse comme une certitude.',
      'Sécurité et conformité : clés d\'API chiffrées en base, RGPD, uniquement des API officielles.',
    ],
    features: [
      { title: 'Recherche d\'entreprises', desc: 'Campagnes Google Maps et entreprises récemment créées, en France, Belgique, Suisse, Luxembourg et Monaco, exécutées en tâche de fond avec suivi en direct.' },
      { title: 'Qualification et enrichissement', desc: 'Critères, exclusions et indices de santé de l\'entreprise à partir de données publiques gratuites.' },
      { title: 'Fiche « Pour l\'appel »', desc: 'Les angles d\'appel générés par des règles fixes, sans IA générative, pour rester prévisible.' },
      { title: 'Suivi et relances', desc: 'Statut en un geste après l\'appel, prochaine action datée, écran « Aujourd\'hui » et notifications de relance.' },
      { title: 'Mode terrain', desc: 'Les petits commerces autour de moi, avec une tournée ordonnée.' },
      { title: 'Export et CRM', desc: 'Export CSV et Excel, et envoi des prospects intéressés vers Notion.' },
    ],
    outcome: [
      'Un outil utilisé au quotidien, installé comme une application sur mon téléphone.',
      'Développé en TDD avec plus de 80 % de couverture de tests, des tests de bout en bout en intégration continue, et un déploiement qui n\'a lieu que si tous les tests passent. Sauvegarde quotidienne et remontée d\'erreurs incluses.',
    ],
    services: ['automatisation-ia', 'api-donnees', 'application-mobile', 'application-web-sur-mesure'],
  },
  {
    slug: 'vite-et-gourmand',
    name: 'Vite & Gourmand',
    kind: 'Projet certifiant',
    kindNote: 'Validé dans le cadre de l\'ECF',
    sector: 'Restauration · Traiteur',
    title: 'Vite & Gourmand : site de commande en ligne pour un traiteur',
    description: 'Site de commande en ligne pour un traiteur : catalogue avec allergènes, commandes, espaces client et employé, administration. Symfony, projet ECF validé.',
    h1: 'Vite & Gourmand : commande en ligne pour un traiteur',
    summary: 'Commande en ligne pour un traiteur : menus, allergènes, zones de livraison, espace client, espace employé et administration.',
    lead: 'Vite & Gourmand est le site de commande en ligne d\'un traiteur bordelais, réalisé pour l\'évaluation (ECF) du titre professionnel Développeur Web et Web Mobile, que j\'ai validée. Un projet complet, du cahier des charges à la mise en production.',
    logo: '🍽️',
    repo: 'https://github.com/kenway974/Vite-Gourmand',
    tech: ['Symfony', 'PHP 8.4', 'Doctrine', 'Twig', 'MySQL', 'MongoDB', 'Docker', 'GitHub Actions'],
    context: [
      'Le cahier des charges décrivait un traiteur qui veut prendre ses commandes en ligne : présenter ses menus et ses plats, gérer les régimes et les allergènes, les zones de livraison et les horaires, et suivre chaque commande jusqu\'à la livraison.',
      'Il imposait une base MySQL pour les données et une base MongoDB pour les statistiques d\'activité.',
    ],
    challenges: [
      'Trois types d\'utilisateurs aux droits différents : client, employé et administrateur.',
      'Des règles métier précises : calcul des prix, zones de livraison, statuts de commande.',
      'Un niveau de sécurité de production, pas seulement de démonstration.',
    ],
    features: [
      { title: 'Catalogue', desc: 'Menus, plats, thèmes, régimes alimentaires et allergènes, avec filtres.' },
      { title: 'Commande et suivi', desc: 'Commande en ligne, calcul du prix, zones de livraison et suivi des statuts.' },
      { title: 'Espaces dédiés', desc: 'Espace client (commandes, compte), espace employé (traitement des commandes) et administration (catalogue, horaires, utilisateurs).' },
      { title: 'Avis et contact', desc: 'Dépôt et modération des avis clients, formulaire de contact.' },
      { title: 'Statistiques', desc: 'Relevés d\'activité stockés dans MongoDB, ajout de métriques sans migration.' },
      { title: 'Sécurité', desc: 'Mots de passe hachés et politique stricte, limitation des tentatives de connexion, protection CSRF, rôles hiérarchisés, en-têtes de sécurité et CSP.' },
    ],
    outcome: [
      'Projet validé lors de l\'ECF du titre professionnel Développeur Web et Web Mobile.',
      'Couvert par des tests fonctionnels et unitaires (droits, authentification, commande, en-têtes de sécurité, conformité légale) et une intégration continue avec audit des dépendances à chaque envoi de code.',
    ],
    services: ['site-e-commerce', 'application-web-sur-mesure', 'securite-conformite', 'maintenance-hebergement'],
  },
  {
    slug: 'monchauff',
    name: 'MonChauff',
    kind: 'Démo',
    sector: 'Artisans · Chauffage, ventilation, climatisation',
    title: 'MonChauff : site et tunnel d\'acquisition pour chauffagiste (démo)',
    description: 'Démo d\'un site et tunnel d\'acquisition pour chauffagiste : estimation de devis en ligne avec PDF, prise de rendez-vous, avis, blog, back-office et connexion CRM.',
    h1: 'MonChauff : site et tunnel d\'acquisition pour chauffagiste',
    summary: 'Un modèle clé en main pour artisans du chauffage : estimation de devis en ligne avec PDF, prise de rendez-vous, avis, blog et back-office.',
    lead: 'MonChauff est un modèle complet de site et de tunnel d\'acquisition pour les entreprises de chauffage, ventilation et climatisation. Il est entièrement configurable, pour être adapté rapidement à chaque artisan.',
    logo: '🔥',
    url: 'https://jp-topaz.vercel.app',
    urlLabel: 'Voir la démo',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'PDFKit', 'Nodemailer'],
    context: [
      'Les artisans reçoivent beaucoup de demandes peu qualifiées et passent du temps à établir des devis qui n\'aboutissent pas. L\'idée : un site qui qualifie le prospect, lui donne une première estimation et facilite la prise de rendez-vous.',
    ],
    challenges: [
      'Aucun nom d\'entreprise en dur dans le code : tout se configure, pour dupliquer le site d\'un client à l\'autre.',
      'S\'adapter aux outils déjà utilisés par l\'artisan : CRM et calendrier.',
    ],
    features: [
      { title: 'Estimation de devis', desc: 'Le prospect répond à quelques questions (type de bien, service, surface) et reçoit une fourchette de prix et un devis PDF par email.' },
      { title: 'Prise de rendez-vous', desc: 'Créneaux gérés en interne ou synchronisés avec Google Calendar ou Calendly.' },
      { title: 'Avis clients et blog', desc: 'Page d\'avis avec dépôt en ligne, et blog géré depuis l\'administration pour le référencement.' },
      { title: 'Back-office', desc: 'Gestion des prospects, des créneaux, des articles et des avis, derrière une authentification.' },
      { title: 'CRM interchangeable', desc: 'Connexion à HubSpot ou Pipedrive par des adaptateurs, sans modifier le reste du code.' },
    ],
    outcome: [
      'Un modèle prêt à être adapté à un artisan réel, qui montre ce qu\'un site peut faire au-delà de la simple vitrine : qualifier, estimer et planifier.',
    ],
    services: ['creation-site-vitrine', 'landing-page', 'application-web-sur-mesure', 'automatisation-ia', 'api-donnees'],
  },
  {
    slug: 'maison-camelia',
    name: 'Maison Camélia',
    kind: 'Démo',
    sector: 'Beauté · Instituts et ongleries',
    title: 'Maison Camélia : site d\'institut de beauté avec réservation (démo)',
    description: 'Démo de site pour institut de beauté et onglerie : prestations avec prix, réservation en ligne en 5 étapes avec acompte, galerie avant/après. Next.js, statique.',
    h1: 'Maison Camélia : site d\'institut de beauté avec réservation en ligne',
    summary: 'Un modèle de site pour instituts de beauté : 25 prestations, réservation en ligne avec acompte et galerie avant/après.',
    lead: 'Maison Camélia est un institut fictif qui sert de démonstration à un modèle de site pour instituts de beauté et ongleries. Le modèle est conçu pour être présenté aux salons, puis adapté à chacun.',
    logo: '🌸',
    url: 'https://instituts-zeta.vercel.app',
    urlLabel: 'Voir la démo',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    context: [
      'Les instituts perdent du temps au téléphone pour les prises de rendez-vous et subissent des rendez-vous non honorés. Le site devait mettre en valeur les prestations et rendre la réservation, avec acompte, aussi simple que possible.',
    ],
    challenges: [
      'Un site entièrement statique : aucune base de données ni serveur à maintenir, hébergement gratuit possible.',
      'Tout le contenu centralisé dans quelques fichiers, et des photos détectées automatiquement, pour adapter le site à un salon sans toucher au code.',
    ],
    features: [
      { title: 'Prestations', desc: '25 soins en cartes filtrables par univers, avec prix et durées.' },
      { title: 'Réservation en 5 étapes', desc: 'Prestation, date et créneau, coordonnées, récapitulatif, acompte, puis confirmation.' },
      { title: 'Galerie avant / après', desc: 'Comparateurs à faire glisser et grille de réalisations.' },
      { title: 'Contact', desc: 'Formulaire validé, horaires avec statut ouvert ou fermé en direct, carte.' },
    ],
    outcome: [
      'Un modèle de démonstration (les paiements n\'y sont pas réels), prêt à être personnalisé pour un institut.',
    ],
    services: ['creation-site-vitrine', 'application-web-sur-mesure'],
  },
  {
    slug: 'little-stars',
    name: 'Little Stars',
    kind: 'Démo',
    sector: 'Petite enfance · Assistante maternelle',
    title: 'Little Stars : site vitrine pour assistante maternelle (démo)',
    description: 'Démo de site vitrine pour une assistante maternelle : présentation de l\'accueil, informations pratiques et demande de visite. React, Vite, TypeScript.',
    h1: 'Little Stars : site vitrine pour assistante maternelle',
    summary: 'Un site vitrine chaleureux pour une assistante maternelle : accueil, informations pratiques et demande de visite.',
    lead: 'Little Stars est un site vitrine de démonstration pour une assistante maternelle agréée. Il présente l\'accueil des enfants de 3 mois à 6 ans et invite les parents à demander une visite.',
    logo: '⭐',
    url: 'https://daycare-three.vercel.app',
    urlLabel: 'Voir la démo',
    tech: ['React', 'Vite', 'TypeScript'],
    context: [
      'Pour un parent, choisir une assistante maternelle est avant tout une question de confiance. Le site devait rassurer : cadre, bienveillance, agrément, organisation de la journée et informations pratiques.',
    ],
    challenges: [
      'Un ton chaleureux et rassurant, sans en faire trop.',
      'Un seul objectif clair : obtenir une demande de visite, avec des places limitées.',
    ],
    features: [
      { title: 'Présentation', desc: 'L\'accueil, le cadre, les activités et les engagements.' },
      { title: 'Informations pratiques', desc: 'Âges accueillis, horaires, organisation, agrément.' },
      { title: 'Demande de visite', desc: 'Un formulaire simple pour prendre contact.' },
    ],
    outcome: [
      'Un site vitrine simple et rapide, adapté à une activité indépendante qui vit de la confiance et du bouche-à-oreille.',
    ],
    services: ['creation-site-vitrine'],
  },
]

export default realisations

export const getRealisation = (slug: string) => realisations.find(r => r.slug === slug)
