/* Pages secteur : pour chaque métier, les problèmes qu’un professionnel peut reconnaître,
   ce qu’ils lui coûtent, et un appel à l’action. Le profil recruteur suit le même cadre.
   Règles d’écriture : constats factuels (sourcés quand c’est un chiffre), impact concret sur l’activité,
   pas d’offre ni de prix ici (ils sont sur les pages services). */
import type { Sector, Source } from './secteurs.types'

export const SRC: Record<string, Source> = {
  "bl": {
    "label": "BrightLocal, Local Consumer Review Survey 2025 (étude américaine)",
    "url": "https://www.brightlocal.com/research/local-consumer-review-survey-2025/"
  },
  "tg": {
    "label": "Google, aide AdSense : « Make your mobile pages load faster » (étude Think with Google, 2016)",
    "url": "https://support.google.com/adsense/answer/7450973"
  },
  "lf": {
    "label": "Décret n° 2009-649 du 9 juin 2009, entretien annuel des chaudières (Légifrance)",
    "url": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000020723245"
  },
  "tw": {
    "label": "ClientBase, « Commission Treatwell (2026) : combien ça coûte vraiment ? »",
    "url": "https://clientbase.fr/treatwell-commission"
  },
  "pp": {
    "label": "La Caisse Idéale, « Planity prix 2026 : 74 à 114 €/mois »",
    "url": "https://www.lacaisseideale.fr/articles/planity-avis/"
  },
  "ph": {
    "label": "Planity, page institut de beauté (chiffre annoncé par l’éditeur, à revérifier)",
    "url": "https://info.planity.com/votre-metier/institut-beaute"
  },
  "vr": {
    "label": "eCar18, « Vroomly : fonctionnement, prix et avis » (commission limitée à 10 %)",
    "url": "https://ecar18.fr/vroomly/"
  },
  "ct": {
    "label": "Service-Public, contrôle technique d’une voiture",
    "url": "https://www.service-public.gouv.fr/particuliers/vosdroits/F2878"
  },
  "rin": {
    "label": "Barreau de Paris, code de déontologie, article 10 (publicité et sollicitation)",
    "url": "https://codedeonto.avocatparis.org/index.php?option=com_deonto&view=articles&layout=pdf&id=161"
  },
  "ap": {
    "label": "Yes We Blog, durée moyenne d’un recrutement (d’après l’APEC)",
    "url": "https://yesweblog.fr/duree-moyenne-processus-recrutement/"
  }
}

const CVC: Sector = {
  slug: 'cvc',
  short: 'CVC & bâtiment',
  name: 'CVC & artisans du bâtiment',
  pitch: 'Des demandes de devis en plus, sans changer votre façon de travailler.',
  page: {
    title: 'Chauffagistes et artisans du bâtiment : chantiers perdus en ligne',
    description: 'Chauffagistes, climaticiens, artisans du bâtiment : appels manqués, fiche Google incomplète, entretiens oubliés. Les problèmes qui vous font perdre des chantiers.',
    who: 'Chauffagistes, climaticiens, artisans du bâtiment',
    h1: 'Chauffagistes et artisans du bâtiment : les chantiers que vous perdez sans le savoir',
    intro: 'Chaque jour, des gens cherchent un chauffagiste près de chez eux. Ceux qui ne vous trouvent pas, ou qui n’arrivent pas à vous joindre, appellent quelqu’un d’autre. Voici ce qui se passe le plus souvent, et ce que ça vous coûte.',
    problems: [
      {
        title: 'On ne vous trouve pas quand on cherche un chauffagiste près de chez soi',
        facts: [
          { text: '99 % des consommateurs se renseignent en ligne avant de contacter une entreprise locale.', src: ['bl'] },
          { text: 'Sur une recherche locale, Google montre d’abord une carte avec 3 entreprises, avant les sites. Sans fiche complète, vous n’y êtes pas.' },
        ],
        impact: 'Les demandes partent chez les entreprises de la carte. Vous ne les voyez jamais passer : impossible de mesurer ce que vous perdez.',
        service: 'seo-performance',
      },
      {
        title: 'Vos appels manqués pendant les chantiers partent chez le concurrent',
        facts: [
          { text: 'Les demandes arrivent par téléphone, souvent pendant un chantier.' },
          { text: 'Un appel manqué est souvent un client qui appelle l’entreprise suivante sur la carte, sans laisser de message.' },
        ],
        impact: 'Chaque panne ou urgence manquée est un chantier perdu, souvent parmi les mieux payés, et un client qui ne reviendra pas pour l’entretien.',
        service: 'application-web-sur-mesure',
      },
      {
        title: 'Vous passez vos soirées à rappeler pour trier les demandes',
        facts: [
          { text: 'Au téléphone, il faut tout demander (type de travaux, commune, budget) avant de savoir si le chantier vous intéresse.' },
          { text: 'Une partie des appels concerne des travaux ou des zones qui ne vous intéressent pas, et prend quand même du temps.' },
        ],
        impact: 'Des heures non facturées chaque semaine, et des devis préparés pour des chantiers que vous n’auriez jamais pris.',
        service: 'automatisation-ia',
      },
      {
        title: 'Votre carnet de commandes dépend du bouche-à-oreille',
        facts: [
          { text: 'Le volume de travail suit les recommandations : quand elles ralentissent, un mois calme arrive sans prévenir.' },
        ],
        impact: 'Un planning en dents de scie : des semaines surchargées, puis des creux que rien ne vient remplir.',
        service: 'creation-site-vitrine',
      },
      {
        title: 'Vos chantiers et vos avis ne se voient pas',
        facts: [
          { text: '93 % des consommateurs disent que les avis pèsent dans leur choix.', src: ['bl'] },
          { text: 'Les clients qui comparent regardent les photos de chantiers, les certifications et les avis.' },
        ],
        impact: 'Sans preuves visibles, vous êtes comparé sur le prix seul, et le client choisit l’artisan qui a l’air le plus sûr.',
        service: 'creation-site-vitrine',
      },
      {
        title: 'Vos clients oublient l’entretien annuel de leur chaudière',
        facts: [
          { text: 'L’entretien annuel des chaudières est obligatoire.', src: ['lf'] },
          { text: 'Sans rappel de votre part, le client appelle l’entreprise qu’il trouve le jour où il y pense.' },
        ],
        impact: 'Un revenu récurrent qui vous échappe chaque année, et un client qui part chez un concurrent pour son prochain dépannage.',
        service: 'automatisation-ia',
      },
    ],
  },
}

const INSTITUTS: Sector = {
  slug: 'instituts',
  short: 'Instituts',
  name: 'Instituts de beauté',
  pitch: 'Des créneaux creux qui se remplissent, sans passer plus de temps au téléphone.',
  page: {
    title: 'Instituts de beauté : réservations et clientes perdues en ligne',
    description: 'Instituts de beauté, esthéticiennes, spas : réservations manquées, commissions des plateformes, créneaux vides. Les problèmes qui vous coûtent des clientes.',
    who: 'Instituts de beauté, esthéticiennes, spas',
    h1: 'Instituts de beauté : les réservations qui vous échappent, et ce qu’elles vous coûtent',
    intro: 'En ce moment, des clientes cherchent un institut dans votre ville. Celles qui ne vous trouvent pas, ou qui n’arrivent pas à réserver, vont ailleurs sans que vous le sachiez.',
    problems: [
      {
        title: 'Vos clientes réservent ailleurs pendant que vous êtes en soin',
        facts: [
          { text: 'Chaque rendez-vous passe par un appel ou un message, souvent pendant un soin : la réponse arrive plus tard.' },
          { text: 'Entre-temps, la cliente a parfois réservé dans un autre institut.' },
        ],
        impact: 'Un créneau qui reste vide, et une cliente qui prend l’habitude d’un autre institut.',
        service: 'application-web-sur-mesure',
      },
      {
        title: 'Les demandes du soir attendent le lendemain',
        facts: [
          { text: 'Selon Planity, la moitié des rendez-vous pris en ligne le sont en dehors des heures d’ouverture.', src: ['ph'] },
        ],
        impact: 'Sans réservation en ligne, une partie de la demande vous arrive en retard, quand la cliente a déjà choisi.',
        service: 'application-web-sur-mesure',
      },
      {
        title: 'Sur les plateformes, vous êtes une ligne parmi vos concurrentes',
        facts: [
          { text: 'Sur Planity, votre institut apparaît dans une liste, à côté des autres instituts de la ville.' },
          { text: 'L’abonnement coûte entre 74 et 114 € par mois, et la page est la même pour tous les instituts.', src: ['pp'] },
        ],
        impact: 'Vous payez pour être comparée à vos concurrentes, sans pouvoir montrer votre ambiance ni ce qui vous distingue.',
        service: 'creation-site-vitrine',
      },
      {
        title: 'Chaque nouvelle cliente vous coûte une commission',
        facts: [
          { text: 'Treatwell prend 25 % sur le premier rendez-vous de chaque nouvelle cliente venue de sa plateforme.', src: ['tw'] },
          { text: 'Les clientes venues par Treatwell reviennent souvent par Treatwell, où elles voient à nouveau les autres instituts.' },
        ],
        impact: 'Une marge réduite sur chaque nouvelle cliente, et une fidélité qui appartient à la plateforme plutôt qu’à vous.',
        service: 'application-web-sur-mesure',
      },
      {
        title: 'Instagram montre votre travail, mais Google ne vous montre pas',
        facts: [
          { text: 'Une personne qui cherche « institut de beauté + votre ville » sur Google ne voit pas votre compte Instagram.' },
          { text: 'Sur Instagram, les réservations passent par des messages privés, à gérer à la main entre deux soins.' },
        ],
        impact: 'Vos demandes suivent le rythme de vos publications : quand vous publiez moins, elles baissent.',
        service: 'seo-performance',
      },
      {
        title: 'Vos créneaux creux restent vides',
        facts: [
          { text: 'Certains jours et certaines heures se remplissent mal, et rien ne prévient vos clientes qu’une place s’est libérée.' },
        ],
        impact: 'Une cabine vide est un chiffre d’affaires perdu pour de bon : un créneau non vendu ne se rattrape pas.',
        service: 'automatisation-ia',
      },
    ],
  },
}

const GARAGES: Sector = {
  slug: 'garages',
  short: 'Garages',
  name: 'Garages & carrosseries',
  pitch: 'Un atelier qui se remplit, sans passer plus de temps au téléphone.',
  page: {
    title: 'Garages et carrosseries : les clients que vous perdez en ligne',
    description: 'Garages et carrosseries indépendants : appels manqués, commissions des comparateurs, clients qui ne reviennent pas. Les problèmes qui vident votre atelier.',
    who: 'Garages et carrosseries indépendants',
    h1: 'Garages et carrosseries : les clients qui vont ailleurs sans que vous le voyiez',
    intro: 'Chaque semaine, des automobilistes du coin cherchent un garage. Ceux qui ne vous trouvent pas, ou qui tombent sur votre répondeur, prennent rendez-vous ailleurs.',
    problems: [
      {
        title: 'Les automobilistes du coin ne vous trouvent pas',
        facts: [
          { text: '99 % des consommateurs se renseignent en ligne avant de contacter une entreprise locale.', src: ['bl'] },
          { text: 'Sur la carte Google, seuls quelques garages apparaissent avant tous les autres.' },
        ],
        impact: 'Ils prennent rendez-vous chez le garage qui apparaît en premier, même s’il est plus loin ou plus cher.',
        service: 'seo-performance',
      },
      {
        title: 'Le téléphone sonne quand vous êtes sous un véhicule',
        facts: [
          { text: 'Les demandes arrivent par téléphone, pendant les interventions.' },
          { text: 'Un appel manqué part souvent vers le garage suivant sur la carte.' },
        ],
        impact: 'Chaque appel manqué est une réparation perdue, et chaque sonnerie interrompt votre travail.',
        service: 'application-web-sur-mesure',
      },
      {
        title: 'Vos appels commencent tous par « combien pour… »',
        facts: [
          { text: 'Votre fiche Google donne un numéro et des avis, pas vos prestations ni vos prix indicatifs.' },
        ],
        impact: 'Du temps passé à donner des prix au téléphone, souvent à des gens qui comparent et ne viendront pas.',
        service: 'creation-site-vitrine',
      },
      {
        title: 'Les comparateurs prennent une commission, et vos clients',
        facts: [
          { text: 'Les plateformes de réservation prennent une commission sur les rendez-vous : jusqu’à 10 % chez Vroomly.', src: ['vr'] },
          { text: 'Le client choisit souvent au prix, et repasse par le comparateur pour sa prochaine révision.' },
        ],
        impact: 'Vous payez pour un client qui ne vous restera pas fidèle, et vous êtes poussé à baisser vos prix.',
        service: 'application-web-sur-mesure',
      },
      {
        title: 'Vos clients oublient de revenir',
        facts: [
          { text: 'Vos habitués reviennent quand ils y pensent : entre deux révisions, rien ne les rappelle chez vous.' },
          { text: 'Le contrôle technique revient à date fixe, et le client cherche alors un garage.', src: ['ct'] },
        ],
        impact: 'Révisions, pneus, contrôle technique : des visites régulières qui partent chez le premier garage venu.',
        service: 'automatisation-ia',
      },
      {
        title: 'Votre note Google ne reflète pas votre travail',
        facts: [
          { text: 'Sur la carte, le client compare les notes. 93 % des consommateurs disent que les avis pèsent dans leur choix.', src: ['bl'] },
        ],
        impact: 'Avec peu d’avis, le client choisit le garage d’à côté sans même vous appeler.',
        service: 'automatisation-ia',
      },
    ],
  },
}

const AVOCATS: Sector = {
  slug: 'avocats',
  short: 'Avocats',
  name: 'Avocats',
  pitch: 'Des dossiers en plus, sans démarcher.',
  page: {
    title: 'Avocats : pourquoi des clients choisissent un confrère en ligne',
    description: 'Avocats et petits cabinets : dépendance aux recommandations, annuaires, site qui n’amène pas de dossiers. Les problèmes qui font choisir un confrère.',
    who: 'Avocats et petits cabinets',
    h1: 'Avocats : pourquoi des clients choisissent un confrère avant même de vous appeler',
    intro: 'Des personnes cherchent un avocat dans votre domaine et votre ville. Celles qui ne vous trouvent pas, ou qui ne comprennent pas ce que vous traitez, choisissent un confrère.',
    problems: [
      {
        title: 'Votre activité dépend des recommandations',
        facts: [
          { text: 'Le volume de dossiers suit les recommandations de confrères et d’anciens clients : quand elles ralentissent, rien ne vient compenser.' },
        ],
        impact: 'Des périodes creuses imprévisibles, et du mal à développer les domaines que vous voulez vraiment traiter.',
        service: 'creation-site-vitrine',
      },
      {
        title: 'Même recommandé, le client vérifie en ligne',
        facts: [
          { text: '99 % des consommateurs se renseignent en ligne avant de contacter un professionnel local.', src: ['bl'] },
        ],
        impact: 'Un site absent, daté ou vague fait douter un client pourtant déjà convaincu par la recommandation.',
        service: 'refonte-migration-site',
      },
      {
        title: 'Vous n’apparaissez pas sur « avocat + domaine + ville »',
        facts: [
          { text: 'Beaucoup de sites de cabinet présentent le cabinet, mais pas chaque domaine de droit.' },
          { text: 'Sur ces recherches, les annuaires apparaissent souvent avant les cabinets.' },
        ],
        impact: 'Les clients qui cherchent exactement votre spécialité tombent sur un annuaire, puis sur un confrère.',
        service: 'seo-performance',
      },
      {
        title: 'Sur les annuaires, on vous compare au prix de la consultation',
        facts: [
          { text: 'Votre profil est à côté de dizaines de confrères du même domaine, avec la même présentation pour tous.' },
        ],
        impact: 'Vous êtes choisi pour votre tarif plutôt que pour votre expertise, ce qui tire vos honoraires vers le bas.',
        service: 'creation-site-vitrine',
      },
      {
        title: 'Vos premiers échanges servent à expliquer vos honoraires',
        facts: [
          { text: 'Les premiers échanges servent souvent à présenter vos domaines et vos honoraires, avant même de parler du dossier.' },
        ],
        impact: 'Du temps non facturé, parfois avec des personnes dont le dossier ne relève pas de votre domaine.',
        service: 'creation-blog',
      },
      {
        title: 'On ne peut vous joindre qu’aux heures du cabinet',
        facts: [
          { text: 'Sans prise de rendez-vous en ligne, le client doit appeler aux heures d’ouverture.' },
          { text: 'Plus de la moitié des visiteurs sur mobile quittent une page qui met plus de 3 secondes à charger.', src: ['tg'] },
        ],
        impact: 'Un client qui cherche un avocat le soir, après un problème, contacte le premier cabinet qui lui propose un rendez-vous.',
        service: 'application-web-sur-mesure',
      },
    ],
    note: {
      text: 'La publicité des avocats est autorisée par l’article 10 du règlement intérieur national, à condition de donner une information sincère. La sollicitation personnalisée n’est permise que par écrit. Tout ce que je mets en place respecte ce cadre.',
      src: 'rin',
    },
  },
}

const ESN: Sector = {
  slug: 'esn',
  short: 'ESN / agences',
  name: 'ESN & agences web',
  pitch: 'Un développeur fullstack en renfort, sans délai de recrutement.',
  page: {
    title: 'ESN et agences web : pics de charge et projets refusés',
    description: 'ESN, agences web et studios : pics de charge, projets refusés faute de temps, freelances à recruter à chaque projet. Ce que ça coûte, et comment l’éviter.',
    who: 'ESN, agences web, studios',
    h1: 'ESN et agences web : ce que vous coûtent les pics de charge et les projets refusés',
    intro: 'Les projets que vous refusez faute de temps partent chez vos concurrents, avec leurs clients. Voici les situations les plus fréquentes, et leur coût réel.',
    problems: [
      {
        title: 'Un pic de charge, et le planning glisse',
        facts: [
          { text: 'Recruter un cadre prend en moyenne 45 à 60 jours.', src: ['ap'] },
          { text: 'Pendant ce temps, l’équipe en place absorbe la charge, ou le planning glisse.' },
        ],
        impact: 'Retards, heures supplémentaires et clients mécontents, alors que le pic sera peut-être passé quand la recrue arrivera.',
        service: 'conseil-cadrage-mvp',
      },
      {
        title: 'Vous refusez des projets faute de temps',
        facts: [
          { text: 'Chaque projet refusé part chez un concurrent, avec le client.' },
        ],
        impact: 'Un chiffre d’affaires perdu, et un client qui découvre un concurrent pour ses prochains projets.',
        service: 'conseil-cadrage-mvp',
      },
      {
        title: 'Vos développeurs expérimentés font des sites vitrines',
        facts: [
          { text: 'Les petits sites mobilisent des développeurs expérimentés sur des tâches à faible marge.' },
        ],
        impact: 'Une marge faible sur ces projets, et moins de temps pour ceux qui comptent vraiment.',
        service: 'creation-site-vitrine',
      },
      {
        title: 'Trouver un freelance fiable prend du temps à chaque projet',
        facts: [
          { text: 'Trouver un freelance disponible et fiable prend du temps, à chaque nouveau projet.' },
          { text: 'La qualité varie d’un freelance à l’autre, et la reprise du code coûte cher quand elle devient nécessaire.' },
        ],
        impact: 'Un risque sur la qualité livrée à votre client, et des heures de recherche non facturables.',
        service: 'maintenance-hebergement',
      },
      {
        title: 'Un recrutement engage sur la durée pour un besoin temporaire',
        facts: [
          { text: 'Le pic de charge est souvent temporaire, alors qu’un recrutement engage sur des années.' },
          { text: 'Sans interlocuteur régulier, chaque projet sous-traité repart de zéro : cadrage, outils, habitudes.' },
        ],
        impact: 'Une masse salariale fixe pour une charge variable, ou des semaines d’intégration perdues à chaque projet.',
        service: 'conseil-cadrage-mvp',
      },
    ],
  },
}

const AUTRE: Sector = {
  slug: 'autre-projet',
  short: 'Autre projet',
  name: 'Autre projet',
  pitch: 'Des clients en plus, quel que soit votre métier, sans changer votre façon de travailler.',
  page: {
    title: 'Commerces et indépendants : les clients que vous perdez en ligne',
    description: 'Commerces, indépendants, associations : invisibles sur Google, visiteurs qui ne contactent pas, tâches répétitives. Les problèmes qui vous coûtent des clients.',
    who: 'Commerces, indépendants, associations',
    h1: 'Commerces, indépendants, associations : les clients que vous ne voyez jamais passer',
    intro: 'Des gens cherchent votre métier près de chez eux. Ceux qui ne vous trouvent pas, ou qui ne savent pas comment vous contacter, vont ailleurs.',
    problems: [
      {
        title: 'On ne vous trouve pas quand on cherche votre métier près de chez soi',
        facts: [
          { text: '99 % des consommateurs se renseignent en ligne avant de contacter une entreprise locale.', src: ['bl'] },
        ],
        impact: 'Les nouveaux clients vont chez ceux qui apparaissent, et vous dépendez de ceux qui vous connaissent déjà.',
        service: 'seo-performance',
      },
      {
        title: 'Votre activité dépend du bouche-à-oreille',
        facts: [
          { text: 'Le volume de clients suit les recommandations : les périodes calmes arrivent sans prévenir.' },
        ],
        impact: 'Des mois creux que rien ne vient remplir, et un chiffre d’affaires difficile à prévoir.',
        service: 'creation-site-vitrine',
      },
      {
        title: 'Des visiteurs viennent, mais ne vous contactent pas',
        facts: [
          { text: 'Un site ou une fiche sans prise de contact claire laisse partir les visiteurs sans qu’ils se manifestent.' },
        ],
        impact: 'Vous avez fait le plus dur, être trouvé, et le client repart sans laisser de trace.',
        service: 'landing-page',
      },
      {
        title: 'Votre site est lent sur mobile',
        facts: [
          { text: 'Plus de la moitié des visiteurs sur mobile quittent une page qui met plus de 3 secondes à charger.', src: ['tg'] },
        ],
        impact: 'Une partie de vos visiteurs part avant même d’avoir lu ce que vous proposez.',
        service: 'seo-performance',
      },
      {
        title: 'Vous ne savez pas ce que votre présence en ligne vous rapporte',
        facts: [
          { text: 'Sans suivi des visites et des demandes, il est difficile de savoir ce qui fonctionne.' },
        ],
        impact: 'Impossible de savoir s’il faut investir plus, moins ou ailleurs : vous décidez à l’aveugle.',
        service: 'seo-performance',
      },
      {
        title: 'Des tâches répétitives vous prennent des heures',
        facts: [
          { text: 'Relances, devis, confirmations, factures : une partie de la semaine part dans des tâches qui se répètent.' },
        ],
        impact: 'Des heures qui ne sont ni facturées ni consacrées à vos clients.',
        service: 'automatisation-ia',
      },
    ],
  },
}

const RECRUTEUR: Sector = {
  "slug": "recruteur",
  "short": "Recruteur",
  "name": "Recruteurs",
  "pitch": "Vous recrutez ? Mon profil technique en deux minutes.",
  "page": {
    "kind": "profile",
    "title": "Développeur fullstack junior : profil de Kenny Pignolet",
    "description": "Développeur fullstack junior (React, Next.js, Node.js, Symfony, PostgreSQL) : compétences, projets en production et façon de travailler, à lire en deux minutes.",
    "who": "Recruteurs, CTO, responsables techniques",
    "h1": "Développeur fullstack junior : je m’adapte à la stack, pas l’inverse.",
    "intro": "Je conçois, je code et je mets en ligne des applications web complètes : interface, API, base de données, déploiement. Voici l’essentiel en deux minutes.",
    "availability": "Disponible immédiatement · Île-de-France · CDI, CDD ou mission freelance",
    "skills": [
      {
        "label": "Interface",
        "items": [
          {
            "g": "Des interfaces animées, vivantes, presque comme un jeu vidéo",
            "h": "Scènes, transitions, animations au défilement et au clic : l’accueil de ce site en est un exemple."
          },
          {
            "g": "Des interfaces qui font agir, puis revenir",
            "h": "Parcours pensés pour transformer un visiteur en contact, puis en utilisateur fidèle : acquisition et rétention."
          },
          {
            "g": "Des écrans qui marchent partout",
            "h": "Mobile d’abord, utilisables au clavier, rapides à charger."
          }
        ]
      },
      {
        "label": "Serveur",
        "items": [
          {
            "g": "Un code factorisé, facile à reprendre",
            "h": "Découper, mutualiser, bien nommer : quelqu’un d’autre peut continuer derrière moi."
          },
          {
            "g": "Des API claires et documentées",
            "h": "Des contrats d’API écrits pour être intégrés par d’autres équipes."
          },
          {
            "g": "De la logique métier qui tient la route",
            "h": "Règles, calculs, algorithmes : de l’estimation immobilière à l’optimisation de tournées."
          }
        ]
      },
      {
        "label": "Données",
        "items": [
          {
            "g": "Modéliser les données d’un vrai métier",
            "h": "Tables, relations et droits d’accès qui suivent le fonctionnement réel de l’activité."
          }
        ]
      },
      {
        "label": "Mise en ligne",
        "items": [
          {
            "g": "Livrer jusqu’en production",
            "h": "Déploiement, nom de domaine, e-mails automatiques : le projet tourne pour de vrai, pas seulement sur mon poste."
          }
        ]
      },
      {
        "label": "Adaptation",
        "items": [
          {
            "g": "Prendre en main une nouvelle stack rapidement",
            "h": "Formé sur Symfony, j’ai livré en Next.js, Node.js et Python : je m’adapte au projet, pas l’inverse."
          }
        ]
      },
      {
        "label": "Qualité et suivi",
        "items": [
          {
            "g": "Tester avant de livrer",
            "h": "Tests automatisés sur mes projets (Vitest, PHPUnit, pytest), et sur ce site : tests de bout en bout avec Playwright et contrôle d’accessibilité automatique."
          },
          {
            "g": "Une vérification à chaque envoi de code",
            "h": "GitHub Actions : lint, typage, tests et audit des dépendances avant chaque mise en ligne."
          },
          {
            "g": "Suivre un client après la livraison",
            "h": "Respusse : première version livrée, puis des mois d’ajustements du back-office et de fiabilisation du site avec l’association."
          },
          {
            "g": "Expliquer clairement à quelqu’un qui n’est pas technique",
            "h": "Trois ans de vente et de service client : comprendre un besoin, le reformuler, rester clair."
          }
        ]
      }
    ],
    "stack": [
      {
        "label": "Interface",
        "items": [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS"
        ]
      },
      {
        "label": "Serveur",
        "items": [
          "Symfony",
          "PHP",
          "Node.js",
          "Express",
          "Fastify"
        ]
      },
      {
        "label": "Données",
        "items": [
          "PostgreSQL",
          "Supabase"
        ]
      },
      {
        "label": "Mise en ligne",
        "items": [
          "Vercel",
          "Railway",
          "Docker",
          "GitHub Actions"
        ]
      },
      {
        "label": "Tests",
        "items": [
          "Vitest",
          "PHPUnit",
          "pytest",
          "Playwright"
        ]
      },
      {
        "label": "Algorithmes",
        "items": [
          "Python"
        ]
      }
    ],
    "projects": [
      {
        "name": "Respusse",
        "proves": "Une application en production, utilisée par une vraie association",
        "desc": "Gestion des dons et des échanges de matériel entre la France et le Congo, avec back-office.",
        "stack": "Next.js · TypeScript · Supabase · Resend",
        "url": "https://www.respusse.com",
        "link": "Voir le site"
      },
      {
        "name": "Robin des Bois",
        "proves": "Une API publique conçue et documentée",
        "desc": "Suivi de l’activité politique française : votes, textes de loi, mandats, avec documentation OpenAPI.",
        "stack": "Fastify · Next.js · Node.js",
        "url": "https://robin-des-bois-api.vercel.app",
        "link": "Voir l’API"
      },
      {
        "name": "EstimoServer",
        "proves": "Une API métier intégrable chez des clients",
        "desc": "Estimation immobilière multi-agences, calcul du prix au m², avec démonstration sur l’Île-de-France.",
        "stack": "Node.js · Express · Railway",
        "url": "https://estimoserver-production.up.railway.app",
        "link": "Voir la démo"
      },
      {
        "name": "Dispatch",
        "proves": "De l’algorithmique appliquée à un vrai problème",
        "desc": "Répartition automatique des livraisons pour des coursiers à Paris : distances, regroupement, tournées.",
        "stack": "Python · VRP",
        "url": "https://github.com/kenway974/dispatch",
        "link": "Voir le code"
      }
    ],
    "path": [
      {
        "period": "2026",
        "title": "Développeur web freelance, micro-entrepreneur",
        "detail": "Respusse livré en production pour une association, puis sites et outils sur mesure pour des TPE."
      },
      {
        "period": "Fév. 2024 – oct. 2026",
        "title": "Livreur à Paris (CDI)",
        "detail": "Autonomie, fiabilité et organisation, en parallèle de ma formation."
      },
      {
        "period": "2024 – février 2027",
        "title": "Titre professionnel Développeur Web et Web Mobile (Studi)",
        "detail": "Formation à distance. Examen prévu en février 2027."
      },
      {
        "period": "2020 – 2023",
        "title": "Vente et service client",
        "detail": "Vendeur, conseiller et inventoriste."
      },
      {
        "period": "La Réunion",
        "title": "Baccalauréat scientifique, mention assez bien",
        "detail": ""
      }
    ],
    "work": [
      "Je livre jusqu’à la mise en ligne, pas seulement du code sur mon poste.",
      "Code lisible, documenté, relu : quelqu’un d’autre peut le reprendre.",
      "J’apprends vite, et je partage ce que j’apprends sur LinkedIn."
    ],
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/kenway974"
      },
      {
        "label": "LinkedIn",
        "url": "https://www.linkedin.com/in/kenny-pignolet"
      }
    ],
    "cv": {
      "url": "/cv-kenny-pignolet.pdf",
      "label": "Télécharger mon CV (PDF)"
    },
    "cvNote": "Mon CV tient sur une page. Pour échanger, écrivez-moi depuis la page contact."
  }
}

export const SECTORS: Sector[] = [CVC, INSTITUTS, GARAGES, AVOCATS, ESN, RECRUTEUR, AUTRE]

/** Adresse de la page d’un secteur. Le profil recruteur a sa propre adresse. */
export const sectorPath = (slug: string) => (slug === 'recruteur' ? '/profil' : `/secteurs/${slug}`)
