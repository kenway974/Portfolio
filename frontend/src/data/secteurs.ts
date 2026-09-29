/* Données des pages secteur de l'écran d'accueil.
   Règles d'écriture : chaque ligne dit d'abord ce que le dirigeant gagne, puis comment ;
   constats factuels ; délais réalistes (une livraison n'est jamais présentée comme un résultat).
   Chronologie d'un pack pour une situation = pre + (starts de la situation ou lead) + steps. */
import type { Sector, Source } from './secteurs.types'

export const SRC: Record<string, Source> = {
  "bl": {
    "label": "BrightLocal, Local Consumer Review Survey 2025 (étude américaine)",
    "url": "https://www.brightlocal.com/research/local-consumer-review-survey-2025/"
  },
  "gg": {
    "label": "Google Search Central, « Avez-vous besoin d’un SEO ? »",
    "url": "https://developers.google.com/search/docs/fundamentals/do-i-need-seo"
  },
  "ub": {
    "label": "Unbounce, Conversion Benchmark Report, médiane sur 41 000 pages",
    "url": "https://unbounce.com/average-conversion-rates-landing-pages/"
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

export const ADS_NOTE = "reversé intégralement à Google ou à Meta, sans marge. Le montant se fixe ensemble selon votre zone et votre concurrence."

export const SECTORS: Sector[] = [
  {
    "short": "CVC & bâtiment",
    "name": "CVC & artisans du bâtiment",
    "pitch": "Des demandes de devis en plus, sans changer votre façon de travailler.",
    "page": {
      "who": "Chauffagistes, climaticiens, artisans du bâtiment",
      "hook": "Chaque jour, des gens de votre secteur cherchent un chauffagiste. Ceux qui ne vous trouvent pas, vous ne les voyez jamais passer.",
      "situations": [
        {
          "label": "je passe par le bouche-à-oreille",
          "facts": [
            {
              "text": "99 % des consommateurs se renseignent en ligne avant de contacter une entreprise locale. Ceux qui ne vous connaissent pas encore tombent sur d’autres entreprises, sans que vous le sachiez.",
              "src": [
                "bl"
              ]
            },
            {
              "text": "Le volume de travail dépend des recommandations : quand elles ralentissent, un mois calme arrive sans prévenir, et rien ne vient le remplir."
            },
            {
              "text": "Les demandes arrivent par téléphone, souvent pendant les chantiers, et se traitent en rappelant le soir."
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 1",
                "icon": "pin",
                "title": "On vous trouve sur Google",
                "text": "Votre fiche est créée et vérifiée en quelques jours."
              },
              {
                "when": "Semaine 2",
                "icon": "site",
                "title": "Vos recommandés voient votre travail",
                "text": "Et vous demandent un devis sans appeler."
              }
            ]
          ]
        },
        {
          "label": "des gens tombent sur mon site et m’appellent",
          "facts": [
            {
              "text": "Chaque demande passe par un appel : pendant un chantier, il est manqué, ou il faut rappeler le soir."
            },
            {
              "text": "Au téléphone, il faut tout demander (type de travaux, commune, budget) avant de savoir si le chantier vous intéresse."
            },
            {
              "text": "Sur une recherche locale, Google montre d’abord une carte avec 3 entreprises, avant les sites. Sans fiche complète, une partie des clients s’arrête à la carte et appelle quelqu’un d’autre."
            },
            {
              "text": "Plus de la moitié des visiteurs sur mobile quittent une page qui met plus de 3 secondes à charger.",
              "src": [
                "tg"
              ]
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 1",
                "icon": "pin",
                "title": "Vous entrez sur la carte Google",
                "text": "Là où les clients choisissent en premier."
              },
              {
                "when": "Semaine 2",
                "icon": "form",
                "title": "Un devis en une minute sur mobile",
                "text": "Votre site est repris : rapide et clair."
              }
            ]
          ]
        },
        {
          "label": "des gens me trouvent sur Google Maps et m’appellent",
          "facts": [
            {
              "text": "La fiche donne un numéro et des avis, pas le détail des services, des zones et des réalisations : tout se règle au téléphone."
            },
            {
              "text": "Une partie des appels concerne des travaux ou des zones qui ne vous intéressent pas, et prend quand même du temps."
            },
            {
              "text": "Pendant un chantier, un appel manqué est souvent un client qui appelle l’entreprise suivante sur la carte, souvent sans laisser de message."
            },
            {
              "text": "Les clients qui comparent s’appuient sur ce qu’ils voient : photos de chantiers, certifications, avis. 93 % des consommateurs disent que les avis pèsent dans leur choix.",
              "src": [
                "bl"
              ]
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 1",
                "icon": "phone",
                "title": "Moins d’appels hors zone",
                "text": "Votre fiche montre services, zones et chantiers."
              },
              {
                "when": "Semaine 2",
                "icon": "site",
                "title": "Vos réalisations en un clic",
                "text": "Le client demande un devis sans appeler."
              }
            ]
          ]
        }
      ],
      "packs": [
        {
          "num": "Pack 1",
          "name": "Site + Google",
          "price": "300 €",
          "delay": "Livré en 2 semaines",
          "items": [
            {
              "g": "Les gens qui cherchent un chauffagiste près de chez eux tombent de plus en plus sur vous",
              "h": "Un site construit pour Google, et votre fiche Google créée ou complétée"
            },
            {
              "g": "Un client peut vous demander un devis à toute heure, même quand vous êtes sur un chantier",
              "h": "Un formulaire de contact"
            },
            {
              "g": "Pendant 3 mois après la livraison, votre place sur Google continue de progresser et votre site reste rapide et en ligne",
              "h": "Je surveille et j’améliore le site et la fiche"
            }
          ],
          "steps": [
            {
              "when": "Mois 1 à 3",
              "icon": "pin",
              "title": "Vous apparaissez sur la carte Google",
              "text": "Premiers contacts de gens qui cherchent un chauffagiste près de chez eux."
            },
            {
              "when": "Mois 4 à 12",
              "icon": "trend",
              "title": "Vous montez sur « chauffagiste + ville »",
              "text": "Environ 20 demandes pour 300 visites par mois. Google annonce 4 mois à 1 an.",
              "src": [
                "gg",
                "ub"
              ]
            }
          ]
        },
        {
          "num": "Pack 2",
          "name": "Site complet + devis en ligne + pub Google",
          "price": "700 €",
          "ads": "+ budget pub Google, à partir de 300 €",
          "delay": "Livré en 3 semaines",
          "base": true,
          "items": [
            {
              "g": "Quand une chaudière tombe en panne dans votre zone, votre annonce apparaît en haut de Google dès le premier jour",
              "h": "Un mois de pub Google sur les recherches d’urgence et de dépannage, mise en place et pilotage"
            },
            {
              "g": "Vous savez avant de rappeler si le chantier vous intéresse",
              "h": "Les demandes arrivent avec le type de travaux, la commune et des photos"
            },
            {
              "g": "Chaque client trouve directement le service qu’il cherche",
              "h": "Une page par service et par ville d’intervention"
            }
          ],
          "steps": [
            {
              "when": "Semaines 1 à 3",
              "icon": "form",
              "title": "Des demandes déjà triées",
              "text": "Travaux, commune et photos avant même de rappeler."
            },
            {
              "when": "Semaine 3",
              "icon": "megaphone",
              "title": "En haut de Google sur les urgences",
              "text": "Je lance et je pilote la pub Google."
            },
            {
              "when": "Semaines 3 à 7",
              "icon": "inbox",
              "title": "Premières demandes possibles",
              "text": "Quelques-unes avec 300 € : les clics d’urgence coûtent cher."
            },
            {
              "when": "Mois 1 à 12",
              "icon": "trend",
              "title": "Google prend le relais",
              "text": "La carte d’abord, puis les recherches par ville."
            }
          ]
        },
        {
          "num": "Pack 3",
          "name": "Site premium + pub Google et Facebook + vidéos de chantiers",
          "price": "1 200 €",
          "ads": "+ budget pub Google et Meta, à partir de 300 €",
          "delay": "Livré en 4 semaines",
          "base": true,
          "items": [
            {
              "g": "Les propriétaires qui préparent un projet (pompe à chaleur, clim) voient vos vrais chantiers et pensent à vous avant de demander des devis ailleurs",
              "h": "Une pub Facebook et Instagram soignée, avec vos vidéos de chantiers tournées en une demi-journée"
            },
            {
              "g": "Vos clients reviennent chaque année sans que vous ayez à les relancer",
              "h": "Rappel automatique de l’entretien annuel obligatoire"
            },
            {
              "g": "Votre note Google monte et rassure ceux qui comparent",
              "h": "Une demande d’avis envoyée automatiquement après chaque chantier"
            }
          ],
          "steps": [
            {
              "when": "Semaine 1",
              "icon": "video",
              "title": "Une demi-journée de tournage",
              "text": "Je filme vos chantiers et je monte tout."
            },
            {
              "when": "Semaines 3 à 7",
              "icon": "megaphone",
              "title": "Pannes et projets, touchés en même temps",
              "text": "Google pour l’urgence, Facebook et Instagram pour les projets."
            },
            {
              "when": "Après chaque chantier",
              "icon": "star",
              "title": "Votre note monte",
              "text": "La demande d’avis part toute seule."
            },
            {
              "when": "Chaque année",
              "icon": "bell",
              "title": "Vos clients reviennent",
              "text": "Rappel automatique de l’entretien obligatoire.",
              "src": [
                "lf"
              ]
            },
            {
              "when": "Mois 4 à 12",
              "icon": "trend",
              "title": "Vous montez sur « chauffagiste + ville »",
              "text": "Environ 20 demandes pour 300 visites par mois. Google annonce 4 mois à 1 an.",
              "src": [
                "gg",
                "ub"
              ]
            }
          ]
        }
      ],
      "sub": "Trois offres, de la plus simple à la plus complète, chacune contient la précédente. Ce qui marche aujourd’hui reste en place : les nouvelles demandes arrivent en plus. Les mois calmes se remplissent ; les mois chargés, vous choisissez vos chantiers."
    },
    "slug": "cvc"
  },
  {
    "short": "Instituts",
    "name": "Instituts de beauté",
    "pitch": "Des créneaux creux qui se remplissent, sans passer plus de temps au téléphone.",
    "page": {
      "who": "Instituts de beauté, esthéticiennes, spas",
      "hook": "En ce moment, des clientes cherchent un institut dans votre ville. Celles qui ne vous trouvent pas réservent ailleurs, sans que vous le sachiez.",
      "situations": [
        {
          "label": "mes clientes réservent par téléphone ou par message",
          "facts": [
            {
              "text": "Chaque rendez-vous passe par un appel ou un message, souvent pendant un soin : la réponse arrive plus tard, et la cliente a parfois réservé ailleurs entre-temps."
            },
            {
              "text": "Selon Planity, la moitié des rendez-vous pris en ligne le sont en dehors des heures d’ouverture : sans réservation en ligne, ces demandes attendent le lendemain.",
              "src": [
                "ph"
              ]
            },
            {
              "text": "Les clientes qui ne vous connaissent pas cherchent sur Google ou sur les plateformes de réservation, et y trouvent d’autres instituts : vous ne voyez jamais ces clientes passer.",
              "src": [
                "bl"
              ]
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 2",
                "icon": "site",
                "title": "On vous contacte en un clic",
                "text": "Votre site montre votre ambiance et vos soins."
              }
            ],
            [
              {
                "when": "Semaines 1 à 3",
                "icon": "calendar",
                "title": "Fini le téléphone en plein soin",
                "text": "Réservation en ligne 24 h/24, rappel la veille."
              }
            ]
          ]
        },
        {
          "label": "je passe par Planity pour mes réservations",
          "facts": [
            {
              "text": "Sur Planity, votre institut apparaît dans une liste, à côté des autres instituts de la ville : la cliente compare, et peut réserver chez une concurrente."
            },
            {
              "text": "L’abonnement coûte entre 74 et 114 € par mois, sans commission sur les rendez-vous.",
              "src": [
                "pp"
              ]
            },
            {
              "text": "La page Planity est la même pour tous les instituts : peu de place pour montrer votre ambiance, vos résultats et ce qui vous distingue."
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 2",
                "icon": "site",
                "title": "De Google à votre agenda Planity",
                "text": "Votre site renvoie vers votre réservation Planity."
              }
            ],
            [
              {
                "when": "Semaines 1 à 3",
                "icon": "calendar",
                "title": "Sans passer par la liste des concurrentes",
                "text": "Vos pages soins mènent droit à votre agenda Planity."
              }
            ]
          ]
        },
        {
          "label": "je passe par Treatwell pour mes réservations",
          "facts": [
            {
              "text": "Treatwell prend 25 % sur le premier rendez-vous de chaque nouvelle cliente venue de sa plateforme.",
              "src": [
                "tw"
              ]
            },
            {
              "text": "Sur Treatwell aussi, votre institut apparaît au milieu des concurrentes de la ville."
            },
            {
              "text": "Les clientes venues par Treatwell reviennent souvent par Treatwell, où elles voient à nouveau les autres instituts."
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 2",
                "icon": "site",
                "title": "De Google à votre réservation",
                "text": "Votre site renvoie vers votre outil actuel."
              }
            ],
            [
              {
                "when": "Semaines 1 à 3",
                "icon": "coin",
                "title": "0 % de commission sur les nouvelles clientes",
                "text": "Réservation directe au lieu des 25 % Treatwell.",
                "src": [
                  "tw"
                ]
              }
            ]
          ]
        },
        {
          "label": "mes clientes me découvrent surtout sur Instagram",
          "facts": [
            {
              "text": "Instagram montre votre travail, mais la réservation passe par des messages privés, à gérer à la main entre deux soins."
            },
            {
              "text": "Une personne qui cherche « institut de beauté + votre ville » sur Google ne voit pas votre compte Instagram, et réserve dans un institut qui apparaît sur Google."
            },
            {
              "text": "Le volume de demandes suit le rythme de vos publications : quand vous publiez moins, les demandes baissent."
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 2",
                "icon": "site",
                "title": "Un lien au lieu des messages",
                "text": "Votre site, en lien dans votre bio Instagram."
              }
            ],
            [
              {
                "when": "Semaines 1 à 3",
                "icon": "calendar",
                "title": "Plus de rendez-vous gérés à la main",
                "text": "Réservation en ligne, rappel la veille."
              }
            ]
          ]
        }
      ],
      "packs": [
        {
          "num": "Pack 1",
          "name": "Google Maps + site à votre image",
          "price": "350 €",
          "delay": "Livré en 2 semaines",
          "items": [
            {
              "g": "Les clientes qui cherchent un soin dans votre ville tombent sur votre institut, et pas seulement sur une liste de concurrentes",
              "h": "Votre fiche Google complète (soins, photos, horaires) et un site vitrine"
            },
            {
              "g": "Elles réservent comme d’habitude, sans que vous changiez d’outil",
              "h": "Un bouton relié à votre réservation actuelle (Planity, Treatwell, téléphone)"
            },
            {
              "g": "Pendant 3 mois après la livraison, votre place sur Google continue de progresser et votre site reste rapide et en ligne",
              "h": "Je surveille et j’améliore le site et la fiche"
            }
          ],
          "steps": [
            {
              "when": "Mois 1 à 3",
              "icon": "pin",
              "title": "Vous apparaissez sur la carte Google",
              "text": "Premiers contacts de gens qui cherchent un institut près de chez eux."
            },
            {
              "when": "Mois 4 à 12",
              "icon": "trend",
              "title": "Vous montez sur « institut de beauté + ville »",
              "text": "Environ 20 demandes pour 300 visites par mois. Google annonce 4 mois à 1 an.",
              "src": [
                "gg",
                "ub"
              ]
            }
          ],
          "pre": [
            {
              "when": "Semaine 1",
              "icon": "pin",
              "title": "Vous apparaissez sur Google Maps",
              "text": "Fiche complétée : soins, photos, horaires."
            }
          ]
        },
        {
          "num": "Pack 2",
          "name": "Site + pages soins + réservation directe",
          "price": "750 €",
          "delay": "Livré en 3 semaines",
          "base": true,
          "items": [
            {
              "g": "Vous sortez sur Google pour les soins qui rapportent le plus : épilation laser, soin visage, ongles…",
              "h": "Une page par soin phare, construite pour Google"
            },
            {
              "g": "Les nouvelles clientes venues de Google réservent chez vous, sans commission de plateforme",
              "h": "Réservation directe sur votre site, avec rappel la veille. Si vous êtes sur Planity, on garde votre outil"
            },
            {
              "g": "Votre note Google monte, et rassure celles qui comparent",
              "h": "Un QR code en cabine et un message prêt à envoyer pour demander un avis"
            }
          ],
          "steps": [
            {
              "when": "Mois 1 à 3",
              "icon": "star",
              "title": "Votre note Google monte",
              "text": "QR code en cabine et message d’avis prêt à envoyer."
            },
            {
              "when": "Mois 4 à 12",
              "icon": "trend",
              "title": "Visible sur vos soins phares",
              "text": "Laser, visage, ongles : moins de concurrence en ligne.",
              "src": [
                "gg"
              ]
            }
          ]
        },
        {
          "num": "Pack 3",
          "name": "Site + réservation + Instagram + pub locale",
          "price": "1 200 €",
          "ads": "+ budget pub Meta, à partir de 150 €",
          "delay": "Livré en 4 semaines",
          "base": true,
          "items": [
            {
              "g": "Les femmes de votre quartier découvrent vos soins en vidéo et réservent",
              "h": "Tournage d’une demi-journée, 10 à 15 vidéos publiées tous les 2 à 3 jours"
            },
            {
              "g": "Vos créneaux creux se remplissent",
              "h": "Un mois de pub Instagram locale, sur les jours et les soins à remplir"
            },
            {
              "g": "Vous vendez des bons cadeaux à Noël et à la fête des mères, sans rien gérer",
              "h": "Bons cadeaux payés en ligne"
            }
          ],
          "steps": [
            {
              "when": "Semaine 1",
              "icon": "video",
              "title": "Une demi-journée de tournage",
              "text": "Je filme l’institut et vos soins."
            },
            {
              "when": "Semaines 2 à 6",
              "icon": "video",
              "title": "Vos soins en vidéo sur Instagram",
              "text": "Une publication tous les 2 à 3 jours."
            },
            {
              "when": "Semaines 3 à 7",
              "icon": "megaphone",
              "title": "Vos créneaux creux se remplissent",
              "text": "Pub locale sur les jours à remplir."
            },
            {
              "when": "Avant les fêtes",
              "icon": "gift",
              "title": "Des bons cadeaux vendus seuls",
              "text": "Paiement en ligne, rien à gérer."
            }
          ]
        }
      ],
      "sub": "Trois offres, de la plus simple à la plus complète, chacune contient la précédente. Vos clientes habituelles réservent comme avant : les nouvelles arrivent en plus, et remplissent d’abord les créneaux qui restent vides."
    },
    "slug": "instituts"
  },
  {
    "short": "Garages",
    "name": "Garages & carrosseries",
    "pitch": "Un atelier qui se remplit, sans passer plus de temps au téléphone.",
    "page": {
      "who": "Garages et carrosseries indépendants",
      "hook": "Chaque semaine, des automobilistes du coin cherchent un garage. Ceux qui ne vous trouvent pas vont ailleurs, et vous ne le voyez pas.",
      "situations": [
        {
          "label": "je travaille surtout avec mes habitués et le bouche-à-oreille",
          "facts": [
            {
              "text": "99 % des consommateurs se renseignent en ligne avant de contacter une entreprise locale. Les automobilistes qui ne vous connaissent pas tombent sur d’autres garages, sans que vous le sachiez.",
              "src": [
                "bl"
              ]
            },
            {
              "text": "Vos habitués reviennent quand ils y pensent : entre deux révisions, rien ne les rappelle chez vous."
            },
            {
              "text": "Les demandes arrivent par téléphone, pendant que vous êtes sous un véhicule."
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 1",
                "icon": "pin",
                "title": "On vous trouve sur Google",
                "text": "Fiche complète : prestations et numéro."
              },
              {
                "when": "Semaine 2",
                "icon": "form",
                "title": "Un devis sans appeler",
                "text": "Même quand vous êtes à l’atelier."
              }
            ]
          ]
        },
        {
          "label": "des gens me trouvent sur Google Maps et m’appellent",
          "facts": [
            {
              "text": "La fiche donne un numéro et des avis, pas vos prestations ni vos prix indicatifs : beaucoup d’appels commencent par « combien pour… »."
            },
            {
              "text": "Sur la carte, le client compare les notes. 93 % des consommateurs disent que les avis pèsent dans leur choix.",
              "src": [
                "bl"
              ]
            },
            {
              "text": "Pendant une intervention, un appel manqué part souvent vers le garage suivant sur la carte."
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 1",
                "icon": "phone",
                "title": "Moins de « combien pour… »",
                "text": "Prestations et prix indicatifs sur votre fiche."
              },
              {
                "when": "Semaine 2",
                "icon": "site",
                "title": "Un devis depuis votre fiche",
                "text": "Votre site est relié à la fiche."
              }
            ]
          ]
        },
        {
          "label": "je reçois des clients via iDGarages ou Vroomly",
          "facts": [
            {
              "text": "Ces plateformes prennent une commission sur les rendez-vous : jusqu’à 10 % chez Vroomly.",
              "src": [
                "vr"
              ]
            },
            {
              "text": "Le client choisit sur un comparateur, souvent au prix, au milieu des garages de la zone."
            },
            {
              "text": "Pour sa prochaine révision, il repasse par le comparateur, où il voit à nouveau vos concurrents."
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 1",
                "icon": "pin",
                "title": "Vos clients vous retrouvent en direct",
                "text": "Votre fiche Google, hors comparateur."
              },
              {
                "when": "Semaine 2",
                "icon": "coin",
                "title": "La prochaine fois, sans commission",
                "text": "Ils vous contactent sur votre site."
              }
            ],
            [
              {
                "when": "Semaines 1 à 3",
                "icon": "calendar",
                "title": "Rendez-vous en direct, sans commission",
                "text": "Prise de rendez-vous sur votre site."
              }
            ]
          ]
        }
      ],
      "packs": [
        {
          "num": "Pack 1",
          "name": "Site + Google",
          "price": "300 €",
          "delay": "Livré en 2 semaines",
          "items": [
            {
              "g": "Les automobilistes du coin qui cherchent un garage tombent de plus en plus sur vous",
              "h": "Un site construit pour Google, et votre fiche Google complète"
            },
            {
              "g": "Un client peut demander un devis sans appeler",
              "h": "Un formulaire de contact"
            },
            {
              "g": "Pendant 3 mois après la livraison, votre place sur Google continue de progresser et votre site reste rapide et en ligne",
              "h": "Je surveille et j’améliore le site et la fiche"
            }
          ],
          "steps": [
            {
              "when": "Mois 1 à 3",
              "icon": "pin",
              "title": "Vous apparaissez sur la carte Google",
              "text": "Premiers contacts de gens qui cherchent un garage près de chez eux."
            },
            {
              "when": "Mois 4 à 12",
              "icon": "trend",
              "title": "Vous montez sur « garage + ville »",
              "text": "Environ 20 demandes pour 300 visites par mois. Google annonce 4 mois à 1 an.",
              "src": [
                "gg",
                "ub"
              ]
            }
          ]
        },
        {
          "num": "Pack 2",
          "name": "Site + rendez-vous atelier + pub Google",
          "price": "700 €",
          "ads": "+ budget pub Google, à partir de 300 €",
          "delay": "Livré en 3 semaines",
          "base": true,
          "items": [
            {
              "g": "Votre garage apparaît en haut de Google sur « révision », « pneus » ou « carrosserie + votre ville »",
              "h": "Un mois de pub Google, mise en place et pilotage"
            },
            {
              "g": "Les clients choisissent eux-mêmes un créneau d’atelier : moins de temps au téléphone, un planning rempli à l’avance",
              "h": "Prise de rendez-vous en ligne"
            }
          ],
          "steps": [
            {
              "when": "Semaine 3",
              "icon": "megaphone",
              "title": "En haut de Google : révision, pneus, carrosserie",
              "text": "Je lance et je pilote la pub."
            },
            {
              "when": "Semaines 3 à 7",
              "icon": "inbox",
              "title": "Premiers rendez-vous possibles",
              "text": "Quelques-uns avec 300 € de budget."
            },
            {
              "when": "Mois 1 à 12",
              "icon": "trend",
              "title": "Google prend le relais",
              "text": "La carte d’abord, puis les recherches par ville."
            }
          ],
          "lead": [
            {
              "when": "Semaines 1 à 3",
              "icon": "calendar",
              "title": "Un planning rempli à l’avance",
              "text": "Les clients choisissent leur créneau en ligne."
            }
          ]
        },
        {
          "num": "Pack 3",
          "name": "Rendez-vous + rappels + avis + vidéos avant/après",
          "price": "1 200 €",
          "ads": "+ budget pub Google, à partir de 300 €",
          "delay": "Livré en 4 semaines",
          "base": true,
          "items": [
            {
              "g": "Vos clients reviennent pour leur révision, et pour préparer leur contrôle technique chez vous",
              "h": "Rappel automatique aux bonnes dates"
            },
            {
              "g": "Votre note Google monte après chaque passage à l’atelier",
              "h": "Demande d’avis automatique"
            },
            {
              "g": "Vos réparations de carrosserie font envie en vidéo",
              "h": "10 vidéos avant/après publiées sur Instagram et Facebook"
            }
          ],
          "steps": [
            {
              "when": "Après chaque passage",
              "icon": "star",
              "title": "Votre note monte",
              "text": "Demande d’avis automatique."
            },
            {
              "when": "Semaines 2 à 6",
              "icon": "video",
              "title": "Vos avant/après en vidéo",
              "text": "10 vidéos sur Instagram et Facebook."
            },
            {
              "when": "Chaque année et avant le CT",
              "icon": "bell",
              "title": "Vos clients reviennent",
              "text": "Rappel de la révision et avant le contrôle technique.",
              "src": [
                "ct"
              ]
            }
          ]
        }
      ],
      "sub": "Trois offres, de la plus simple à la plus complète, chacune contient la précédente. Vos habitués ne changent rien : les nouveaux clients arrivent en plus, et remplissent les jours creux de l’atelier."
    },
    "slug": "garages"
  },
  {
    "short": "Avocats",
    "name": "Avocats",
    "pitch": "Des dossiers en plus, sans démarcher.",
    "page": {
      "who": "Avocats et petits cabinets",
      "hook": "Des personnes cherchent un avocat dans votre domaine et votre ville. Celles qui ne vous trouvent pas choisissent un confrère, sans que vous le sachiez.",
      "note": "La publicité des avocats est autorisée par l’article 10 du règlement intérieur national, à condition de donner une information sincère. La sollicitation personnalisée n’est permise que par écrit. Toutes les offres ci-dessous respectent ce cadre.",
      "noteSrc": "rin",
      "situations": [
        {
          "label": "mes clients viennent par recommandation",
          "facts": [
            {
              "text": "Le volume de dossiers dépend des recommandations de confrères et d’anciens clients : quand elles ralentissent, rien ne vient compenser."
            },
            {
              "text": "Le client recommandé vérifie en ligne avant d’appeler : 99 % des consommateurs se renseignent en ligne avant de contacter un professionnel local.",
              "src": [
                "bl"
              ]
            },
            {
              "text": "Les premiers échanges servent souvent à expliquer vos domaines et vos honoraires, avant même de parler du dossier."
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 1",
                "icon": "pin",
                "title": "Vos recommandés vous trouvent",
                "text": "Votre fiche Google, créée ou complétée."
              },
              {
                "when": "Semaine 2",
                "icon": "site",
                "title": "Vos domaines compris avant l’appel",
                "text": "Domaines, honoraires pratiqués, contact."
              }
            ]
          ]
        },
        {
          "label": "des clients me trouvent sur des annuaires d’avocats",
          "facts": [
            {
              "text": "Sur un annuaire, votre profil est à côté de dizaines de confrères du même domaine : le client compare, souvent sur le prix de la première consultation."
            },
            {
              "text": "La présentation est la même pour tous : peu de place pour montrer votre approche et vos dossiers types."
            },
            {
              "text": "Le client cherche d’abord « avocat + domaine + ville » sur Google, où les annuaires apparaissent souvent avant les cabinets."
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 1",
                "icon": "pin",
                "title": "Visible hors des annuaires",
                "text": "Votre cabinet sur Google Maps."
              },
              {
                "when": "Semaine 2",
                "icon": "site",
                "title": "Ce qui vous distingue, enfin visible",
                "text": "Votre approche et vos domaines, sur votre site."
              }
            ]
          ]
        },
        {
          "label": "j’ai un site, mais il amène peu de demandes",
          "facts": [
            {
              "text": "Beaucoup de sites de cabinet présentent le cabinet, mais pas chaque domaine : ils ne sortent pas sur « avocat divorce + ville »."
            },
            {
              "text": "Sans prise de rendez-vous en ligne, le client doit appeler aux heures du cabinet."
            },
            {
              "text": "Plus de la moitié des visiteurs sur mobile quittent une page qui met plus de 3 secondes à charger.",
              "src": [
                "tg"
              ]
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 1",
                "icon": "pin",
                "title": "Votre cabinet sur la carte",
                "text": "Fiche Google reliée à votre site."
              },
              {
                "when": "Semaine 2",
                "icon": "form",
                "title": "Une demande en une minute sur mobile",
                "text": "Site repris : rapide et clair."
              }
            ]
          ]
        }
      ],
      "packs": [
        {
          "num": "Pack 1",
          "name": "Site cabinet + Google",
          "price": "400 €",
          "delay": "Livré en 2 semaines",
          "items": [
            {
              "g": "Les clients trouvent votre cabinet et comprennent vos domaines avant d’appeler",
              "h": "Un site clair et votre fiche Google"
            },
            {
              "g": "Un client peut exposer sa situation à toute heure",
              "h": "Un formulaire de contact"
            },
            {
              "g": "Pendant 3 mois après la livraison, votre place sur Google continue de progresser et votre site reste rapide et en ligne",
              "h": "Je surveille et j’améliore le site et la fiche"
            }
          ],
          "steps": [
            {
              "when": "Mois 1 à 3",
              "icon": "pin",
              "title": "Vous apparaissez sur la carte Google",
              "text": "Premiers contacts de gens qui cherchent un avocat près de chez eux."
            },
            {
              "when": "Mois 4 à 12",
              "icon": "trend",
              "title": "Vous montez sur « avocat + ville »",
              "text": "Environ 20 demandes pour 300 visites par mois. Google annonce 4 mois à 1 an.",
              "src": [
                "gg",
                "ub"
              ]
            }
          ]
        },
        {
          "num": "Pack 2",
          "name": "Site + pages par domaine + consultation en ligne",
          "price": "850 €",
          "delay": "Livré en 3 semaines",
          "base": true,
          "items": [
            {
              "g": "Le client qui cherche « avocat divorce + votre ville » tombe sur la bonne page",
              "h": "Une page par domaine de droit"
            },
            {
              "g": "Les consultations sont réservées et payées d’avance : moins de rendez-vous non honorés",
              "h": "Prise de rendez-vous et paiement en ligne"
            }
          ],
          "steps": [
            {
              "when": "Semaines 1 à 3",
              "icon": "calendar",
              "title": "Consultations payées d’avance",
              "text": "Moins de rendez-vous non honorés."
            },
            {
              "when": "Mois 4 à 12",
              "icon": "trend",
              "title": "Visible par domaine",
              "text": "« Avocat divorce + ville » mène à votre page.",
              "src": [
                "gg"
              ]
            }
          ]
        },
        {
          "num": "Pack 3",
          "name": "Consultations + pub Google par domaine",
          "price": "1 200 €",
          "ads": "+ budget pub Google, à partir de 300 €",
          "delay": "Livré en 4 semaines",
          "base": true,
          "items": [
            {
              "g": "Votre cabinet apparaît en haut de Google quand quelqu’un cherche un avocat dans votre domaine",
              "h": "Un mois de pub Google par domaine, dans le respect des règles de la profession"
            },
            {
              "g": "Vous remontez aussi sans payer, au fil des mois",
              "h": "Des articles qui répondent aux questions fréquentes de vos clients"
            }
          ],
          "steps": [
            {
              "when": "Semaine 3",
              "icon": "megaphone",
              "title": "En haut de Google, par domaine",
              "text": "Pub pilotée, conforme à l’article 10.",
              "src": [
                "rin"
              ]
            },
            {
              "when": "Semaines 3 à 7",
              "icon": "inbox",
              "title": "Premières demandes possibles",
              "text": "Plus de budget sur les domaines concurrentiels."
            },
            {
              "when": "Mois 1 à 12",
              "icon": "doc",
              "title": "Les articles prennent le relais",
              "text": "Ils répondent aux questions de vos clients."
            }
          ]
        }
      ],
      "sub": "Trois offres, de la plus simple à la plus complète, chacune contient la précédente. Les recommandations continuent de fonctionner : les nouveaux clients arrivent en plus, dans les domaines que vous choisissez."
    },
    "slug": "avocats"
  },
  {
    "short": "ESN / agences",
    "name": "ESN & agences web",
    "pitch": "Un développeur fullstack en renfort, sans délai de recrutement.",
    "page": {
      "who": "ESN, agences web, studios",
      "hook": "Les projets que vous refusez faute de temps partent chez vos concurrents, avec leurs clients. Vous pouvez les garder.",
      "cumulative": false,
      "situations": [
        {
          "label": "j’ai un pic de charge sur un projet en cours",
          "facts": [
            {
              "text": "Recruter un cadre prend en moyenne 45 à 60 jours.",
              "src": [
                "ap"
              ]
            },
            {
              "text": "Pendant ce temps, l’équipe en place absorbe la charge, ou le planning glisse."
            },
            {
              "text": "Un recrutement engage sur la durée, alors que le pic est souvent temporaire."
            }
          ]
        },
        {
          "label": "je refuse des projets faute de temps",
          "facts": [
            {
              "text": "Chaque projet refusé est un chiffre d’affaires qui part chez un concurrent, avec le client."
            },
            {
              "text": "Les petits sites vitrines mobilisent des développeurs expérimentés sur des tâches à faible marge."
            },
            {
              "text": "Les projets plus complexes demandent une capacité que l’équipe n’a pas toujours au bon moment."
            }
          ]
        },
        {
          "label": "je sous-traite déjà à des freelances",
          "facts": [
            {
              "text": "Trouver un freelance disponible et fiable prend du temps, à chaque nouveau projet."
            },
            {
              "text": "La qualité varie d’un freelance à l’autre, et la reprise du code coûte cher quand elle est nécessaire."
            },
            {
              "text": "Sans interlocuteur régulier, chaque projet repart de zéro : cadrage, outils, habitudes."
            }
          ]
        }
      ],
      "packs": [
        {
          "num": "Offre 1",
          "name": "Renfort à la journée",
          "price": "200 € / jour",
          "delay": "Démarrage sous une semaine",
          "items": [
            {
              "g": "Votre projet avance sans attendre un recrutement de plusieurs semaines",
              "h": "Un développeur fullstack intégré à votre équipe, sur vos outils"
            },
            {
              "g": "Vous ajustez selon votre charge, sans contrat de travail",
              "h": "React, Next.js, Node, TypeScript, PostgreSQL"
            }
          ],
          "steps": [
            {
              "when": "Jour 1",
              "icon": "rocket",
              "title": "Démarrage immédiat",
              "text": "Cadrage, accès au dépôt et aux outils."
            },
            {
              "when": "Semaine 1",
              "icon": "code",
              "title": "Premières contributions",
              "text": "Relues par votre équipe."
            },
            {
              "when": "Jour 45",
              "icon": "check",
              "title": "Environ 30 jours de dev livrés",
              "text": "Quand un recrutement aboutirait à peine.",
              "src": [
                "ap"
              ]
            },
            {
              "when": "Ensuite",
              "icon": "calendar",
              "title": "Vous ajustez selon la charge",
              "text": "Sans contrat ni période d’essai."
            }
          ]
        },
        {
          "num": "Offre 2",
          "name": "Site vitrine en marque blanche",
          "price": "600 € par site",
          "delay": "Livré en 2 semaines",
          "items": [
            {
              "g": "Vous vendez plus de sites sans agrandir l’équipe",
              "h": "Je produis, vous livrez sous votre nom"
            },
            {
              "g": "Chaque site est prêt pour Google dès la livraison",
              "h": "3 mois d’optimisation inclus"
            }
          ],
          "steps": [
            {
              "when": "Semaine 1",
              "icon": "site",
              "title": "Maquette validée par vous",
              "text": "D’après le brief de votre client."
            },
            {
              "when": "Semaine 2",
              "icon": "check",
              "title": "Livré sous votre nom",
              "text": "Prêt à présenter à votre client."
            },
            {
              "when": "Mois 1 à 3",
              "icon": "trend",
              "title": "Optimisation incluse",
              "text": "Référencement, vitesse, sécurité."
            }
          ]
        },
        {
          "num": "Offre 3",
          "name": "Projet sur mesure en marque blanche",
          "price": "1 200 € par projet",
          "delay": "Livré en 4 semaines",
          "items": [
            {
              "g": "Vous acceptez les projets plus complexes sans les confier à une grosse structure",
              "h": "Réservation, espace client, paiement, intégrations par API"
            },
            {
              "g": "Votre client final ne voit que vous",
              "h": "Livraison et documentation à votre nom"
            }
          ],
          "steps": [
            {
              "when": "Semaine 1",
              "icon": "doc",
              "title": "Périmètre clair dès le départ",
              "text": "Cadrage et spécifications validés."
            },
            {
              "when": "Semaines 2 et 3",
              "icon": "code",
              "title": "Un point par semaine",
              "text": "Et une version de test à montrer."
            },
            {
              "when": "Semaine 4",
              "icon": "check",
              "title": "Livré et documenté à votre nom",
              "text": "Votre équipe peut le reprendre."
            }
          ]
        }
      ],
      "sub": "Trois façons de travailler ensemble, selon votre besoin. Votre équipe garde son organisation : la charge en plus passe par moi."
    },
    "slug": "esn"
  },
  {
    "short": "Recruteur",
    "name": "Recruteurs",
    "pitch": "Vous recrutez ? Mon profil technique en deux minutes.",
    "page": {
      "kind": "profile",
      "who": "Recruteurs, CTO, responsables techniques",
      "hook": "Développeur fullstack junior : je m’adapte à la stack, pas l’inverse.",
      "intro": "Je conçois, je code et je mets en ligne des applications web complètes : interface, API, base de données, déploiement. Voici l’essentiel en deux minutes.",
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
            "Railway"
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
      "cvNote": "CV sur demande, envoyé sous 24 heures."
    },
    "slug": "recruteur"
  },
  {
    "short": "Autre projet",
    "name": "Autre projet",
    "pitch": "Des clients en plus, quel que soit votre métier, sans changer votre façon de travailler.",
    "page": {
      "who": "Commerces, indépendants, associations",
      "hook": "Des gens cherchent votre métier près de chez eux. Ceux qui ne vous trouvent pas, vous ne les voyez jamais passer.",
      "situations": [
        {
          "label": "je passe par le bouche-à-oreille",
          "facts": [
            {
              "text": "99 % des consommateurs se renseignent en ligne avant de contacter une entreprise locale. Ceux qui ne vous connaissent pas trouvent d’autres entreprises, sans que vous le sachiez.",
              "src": [
                "bl"
              ]
            },
            {
              "text": "Le volume de clients dépend des recommandations : les périodes calmes arrivent sans prévenir, et rien ne vient les remplir."
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 1",
                "icon": "pin",
                "title": "On vous trouve sur Google",
                "text": "Votre fiche est créée."
              },
              {
                "when": "Semaine 2",
                "icon": "form",
                "title": "Un contact à toute heure",
                "text": "Votre site, avec formulaire."
              }
            ]
          ]
        },
        {
          "label": "on me trouve en ligne, mais ça rapporte peu",
          "facts": [
            {
              "text": "Un site ou une fiche sans prise de contact claire laisse partir les visiteurs sans qu’ils se manifestent."
            },
            {
              "text": "Plus de la moitié des visiteurs sur mobile quittent une page qui met plus de 3 secondes à charger.",
              "src": [
                "tg"
              ]
            },
            {
              "text": "Sans suivi, il est difficile de savoir ce que votre présence en ligne rapporte."
            }
          ],
          "starts": [
            [
              {
                "when": "Semaine 1",
                "icon": "pin",
                "title": "Une fiche qui montre votre activité",
                "text": "Services, horaires, photos."
              },
              {
                "when": "Semaine 2",
                "icon": "form",
                "title": "Un contact en une minute sur mobile",
                "text": "Site repris : rapide et clair."
              }
            ]
          ]
        }
      ],
      "packs": [
        {
          "num": "Pack 1",
          "name": "Site + Google",
          "price": "300 €",
          "delay": "Livré en 2 semaines",
          "items": [
            {
              "g": "Les gens qui cherchent votre métier près de chez eux tombent sur vous",
              "h": "Un site construit pour Google et votre fiche Google"
            },
            {
              "g": "Un client peut vous contacter à toute heure",
              "h": "Un formulaire de contact"
            },
            {
              "g": "Pendant 3 mois après la livraison, votre place sur Google continue de progresser et votre site reste rapide et en ligne",
              "h": "Je surveille et j’améliore le site et la fiche"
            }
          ],
          "steps": [
            {
              "when": "Mois 1 à 3",
              "icon": "pin",
              "title": "Vous apparaissez sur la carte Google",
              "text": "Premiers contacts de gens qui cherchent votre métier près de chez eux."
            },
            {
              "when": "Mois 4 à 12",
              "icon": "trend",
              "title": "Vous montez sur « votre métier + ville »",
              "text": "Environ 20 demandes pour 300 visites par mois. Google annonce 4 mois à 1 an.",
              "src": [
                "gg",
                "ub"
              ]
            }
          ]
        },
        {
          "num": "Pack 2",
          "name": "Site complet + prise de contact adaptée + pub",
          "price": "700 €",
          "ads": "+ budget pub Meta, à partir de 150 €",
          "delay": "Livré en 3 semaines",
          "base": true,
          "items": [
            {
              "g": "Les demandes arrivent complètes, selon votre métier",
              "h": "Devis, réservation ou formulaire sur mesure"
            },
            {
              "g": "Des gens de votre zone vous découvrent dès le premier mois",
              "h": "Un mois de pub, mise en place et pilotage"
            }
          ],
          "steps": [
            {
              "when": "Semaines 1 à 3",
              "icon": "form",
              "title": "Des demandes complètes",
              "text": "Devis, réservation ou formulaire adapté."
            },
            {
              "when": "Semaines 3 à 7",
              "icon": "megaphone",
              "title": "Découvert sans attendre Google",
              "text": "Quelques contacts avec 150 €, sans garantie."
            }
          ]
        },
        {
          "num": "Pack 3",
          "name": "Site sur mesure + pub + contenu",
          "price": "1 200 €",
          "ads": "+ budget pub Google et Meta, à partir de 300 €",
          "delay": "Livré en 4 semaines",
          "base": true,
          "items": [
            {
              "g": "Votre présence en ligne travaille sur tous les fronts à la fois",
              "h": "Pub Google et Meta, vidéos ou visuels selon votre métier"
            },
            {
              "g": "Vous n’avez rien à gérer",
              "h": "Je m’occupe de la production et de la publication"
            }
          ],
          "steps": [
            {
              "when": "Semaines 2 à 6",
              "icon": "video",
              "title": "Votre activité mise en avant",
              "text": "Vidéos ou visuels publiés pour vous."
            },
            {
              "when": "Semaines 3 à 7",
              "icon": "megaphone",
              "title": "Deux canaux en même temps",
              "text": "Google pour ceux qui cherchent, Meta pour les autres."
            }
          ]
        }
      ],
      "sub": "Trois offres, de la plus simple à la plus complète, chacune contient la précédente. Ce qui marche aujourd’hui reste en place : les nouveaux clients arrivent en plus, d’abord dans les périodes calmes."
    },
    "slug": "autre-projet"
  }
]
