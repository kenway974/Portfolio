# Pages secteur et roue de l'accueil (zone `.vx`)

Règles propres à la roue des secteurs (`SectorWheel.tsx`) et aux pages `/secteurs/*` et `/profil`.
Elles priment sur `../MASTER.md` ; tout ce qui n'est pas précisé ici suit le MASTER.

Styles : `frontend/src/styles/volcan.css`, tout rangé sous `.vx`. Les variables de `.vx`
(`--text`, `--text-2`, `--text-3`, `--line`, `--lava-soft`) sont des **alias** des variables
globales : ne pas y redéfinir de couleur.

## Ce qui diffère du site

- **Récit couleur** : chaque page part du rouge lave (ce qui se passe aujourd'hui) et remonte
  vers l'or (ce qui change). La lueur en bas d'écran suit la progression (`--pg`).
- **Mise en page plus étroite** : colonne de 640px, plus aérée (`clamp(64px, 10vw, 96px)` entre blocs).
- **Mouvement plus présent, mais toujours déclenché** par une action : défilement, clic, choix.
  Un seul effet fort par section (mots qui montent, fissure, bascule épinglée, halo du CTA).
- **Cartes** : rayon 14px, fond légèrement teinté de lave pour les problèmes (`.pb article`).
- **Boutons** : `.vx .btn`, pilule dorée ; `.btn-sm` pour les actions secondaires dans une carte.

## Toujours vrai ici aussi

- Sans JavaScript ou avec « réduire les animations », tout est visible dans son état final
  (classe `rv-ready` posée par le JS, état final sans `.is-live`).
- Liens et boutons d'action : 44px de haut minimum.
