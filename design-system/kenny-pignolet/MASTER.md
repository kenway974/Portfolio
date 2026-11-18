# Design system : Kenny Pignolet, portfolio

Source de vérité des règles visuelles du site. Les **valeurs** vivent dans
`frontend/src/styles/globals.css` (`:root`) ; ce fichier dit **comment et pourquoi** s'en servir.
Une page peut avoir ses propres règles dans `pages/<page>.md` : elles priment sur celles-ci.

Dernière mise à jour : 18 novembre 2026 (audit UI, PR #20 et suivante).

## Identité

- **Thème sombre uniquement.** Pas de mode clair prévu.
- **Palette du drapeau de La Réunion** : or volcanique (action), bleu océan (secondaire), rouge lave (problème).
- **Ton** : sobre, précis, chaleureux. Un seul effet fort par section, jamais de décoration gratuite.
- **Cible** : dirigeants de TPE/PME non techniques, souvent sur mobile. Lisibilité avant effet.

## Couleurs

Toujours passer par les variables, jamais de couleur en dur dans un composant.

| Rôle | Variable | Valeur | Usage |
|---|---|---|---|
| Fond | `--black` | `#060507` | Fond de page |
| Surfaces | `--surface`, `--surface-2`, `--surface-3` | `#0d0b0f` → `#1b1720` | Cartes, champs, survol |
| Texte | `--text-primary` | `#f5efe8` | Titres, texte principal |
| Texte secondaire | `--text-secondary` | 80 % | Paragraphes (≈ 11:1) |
| Texte discret | `--text-muted` | 66 % | Méta, aides (≈ 7,5:1) |
| Action principale | `--accent` + `--on-accent` | `#e89c1a` + noir | Fond des CTA (8,9:1) |
| Accent texte | `--accent-bright` | `#f5c842` | Liens, labels, focus, icônes |
| Secondaire | `--accent-blue` + `--on-blue` | `#1a4fa0` + blanc | CTA du menu uniquement (7,9:1) |
| Problème | `--lava` / `--lava-text` | `#e63946` / `#f08a93` | Constats négatifs, pages secteur |
| Ligne décorative | `--line-deco`, `--border` | ~10 % | Séparateurs, bord de carte |
| Ligne de contrôle | `--line-control` | 38 % | Contour de champ, bouton-icône (≥ 3:1) |
| Ligne d'accent | `--border-accent` | or 32 % | Bouton secondaire, tags, survol |

**Règles**
- **Un seul CTA doré (`btn-primary`) par écran.** Le reste en `btn-ghost`.
- **Le bleu porte toujours du texte blanc** : le noir sur bleu ne fait que 2,6:1.
- **Rouge lave = problème, or = solution.** Ne pas les employer comme décoration ailleurs.
- **Contour d'un élément interactif sans texte** (champ, flèche, case) : `--line-control`, jamais `--border`.
- **Aucun violet** : c'est un reste d'un ancien thème, supprimé.

## Typographie

- **Titres** : Familjen Grotesk (500 / 600 / 700), `--font-display`.
- **Texte** : DM Sans (400 / 500 / 600), `--font-body`.
- Polices auto-hébergées via `@fontsource` (RGPD) : ne pas ajouter Google Fonts.

| Rôle | Taille |
|---|---|
| Titre de hero | `clamp(2rem, 4.5vw, 4rem)`, 800 |
| Titre de section (`.section-heading`) | `clamp(2.2rem, 4vw, 3.5rem)`, 700 |
| Titre de carte | 1.1 à 1.2rem, 700 |
| Texte | 1rem, interligne 1.65 |
| Label en majuscules (`.label`) | `--fs-xs` (0.75rem), espacement 0.12 à 0.18em |
| **Minimum absolu** | **`--fs-xs` = 12px**. Champs de formulaire : **16px** (sinon iOS zoome) |

- Une seule balise `<h1>` par page, niveaux sans saut (vérifié par les tests SEO).
- Largeur de lecture : 60 à 75 caractères (`max-width: 60ch` environ).

## Formes et espacements

| Variable | Valeur | Pour |
|---|---|---|
| `--r-sm` | 8px | Champs, options de formulaire, lien d'évitement |
| `--r-md` | 14px | Cartes (services, réalisations, blog) |
| `--r-pill` | 999px | Boutons, tags, pastilles, filtres |

- Espacements sur une grille de 4px (4, 8, 12, 16, 24, 32, 48, 64, 96).
- Sections : `--section-padding` = `clamp(5rem, 10vw, 9rem)`.
- Conteneur : `.container`, 1180px max, marges `clamp(1.25rem, 4vw, 2.5rem)`.
- Pas d'ombres portées sur les cartes : le relief vient de la surface et de la bordure.

## Composants

- **`btn-primary`** : pilule dorée, texte noir. Survol : légère montée (2px) et halo.
- **`btn-ghost`** : pilule transparente, contour or, texte or.
- **Carte (`content-card`, `project-card`)** : `--surface-2`, bordure `--border`, rayon 14px.
  Survol : bordure `--border-accent` et montée de 3px max.
- **Tag (`tech-tag`)** : pilule, fond or 10 %, contour `--border-accent`, `--fs-xs`.
- **Icônes** : `Icon.tsx` (interface) et `ProjectIcon.tsx` (réalisations). SVG au trait 1,75
  sur 24×24, à la taille du texte, toujours `aria-hidden`.
  **Pas d'emoji ni de caractère (← → ✓) comme icône.** Le ✦ du logo est une exception (marque).
- **Bouton sans texte** : `aria-label` obligatoire, 44×44px minimum.

## Interaction et accessibilité

- **Focus** : `:focus-visible` global, contour 2px `--accent-bright`, décalage 3px. Ne jamais le retirer.
- **Cibles tactiles** : 44×44px minimum (au moins 24px exigés par WCAG 2.2).
- **Contrastes** : texte ≥ 4,5:1, contour de contrôle ≥ 3:1. Les tests axe (e2e) vérifient le texte,
  pas toujours les contours : calculer à la main en cas de doute.
- **Menu mobile** : `inert` + `visibility: hidden` quand il est fermé, Échap le ferme et rend le focus.
- Le contenu doit rester lisible **sans JavaScript** (site pré-rendu) : ne rien masquer par défaut en CSS.

## Mouvement

| Variable | Valeur | Pour |
|---|---|---|
| `--dur-fast` | 150ms | Sorties, retours visuels |
| `--dur-base` | 250ms | Entrées, changements d'état |
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrées (décélération) |

- Animer **uniquement `transform` et `opacity`** (jamais `height`, `max-height`, `top`).
- Sortie plus courte que l'entrée (environ 65 %).
- Apparition au défilement : `useScrollReveal` + `.reveal`, qui ne masque que les sections hors écran.
- **`prefers-reduced-motion`** : tout s'affiche dans son état final. Obligatoire pour toute animation.
- Animations permanentes au strict minimum (24 étoiles dans le hero, respiration du cratère).

## À éviter

- Couleurs en dur, violet, texte noir sur bleu.
- Texte sous 12px, champs sous 16px.
- Emojis ou caractères comme icônes.
- Deux CTA dorés côte à côte.
- Rayons hors échelle (2px, 4px, 16px…).
- Contenu masqué par défaut en attendant le JavaScript.
