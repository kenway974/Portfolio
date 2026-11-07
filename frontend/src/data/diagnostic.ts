// Questions du diagnostic (/diagnostic) et règles de recommandation.
// Chaque réponse ajoute des points aux services concernés (slugs de services.ts) ;
// les services les mieux notés sont proposés à la fin.

export type Option = {
  id: string
  label: string
  hint?: string
  /** Points ajoutés aux services (slug → points). */
  scores?: Record<string, number>
  /** Page secteur correspondante (slug de secteurs.ts). */
  sector?: string
}

export type Question = {
  id: string
  title: string
  help?: string
  multiple?: boolean
  options: Option[]
}

export const QUESTIONS: Question[] = [
  {
    id: 'profil',
    title: 'Vous êtes…',
    help: 'Pour vous proposer des offres pensées pour votre métier.',
    options: [
      { id: 'artisan', label: 'Artisan du bâtiment', hint: 'Chauffage, climatisation, rénovation…', sector: 'cvc' },
      { id: 'institut', label: 'Institut de beauté', hint: 'Esthétique, onglerie, spa, bien-être', sector: 'instituts' },
      { id: 'garage', label: 'Garage ou carrosserie', sector: 'garages' },
      { id: 'avocat', label: 'Avocat ou cabinet', sector: 'avocats' },
      { id: 'commerce', label: 'Commerce, indépendant ou association', sector: 'autre-projet' },
      { id: 'pme', label: 'PME ou entreprise de services', hint: 'Une équipe, des process, des outils' },
      { id: 'startup', label: 'Startup ou porteur de projet', hint: 'Une idée de produit à lancer', scores: { 'conseil-cadrage-mvp': 2 } },
      { id: 'esn', label: 'ESN, agence web ou studio', hint: 'Besoin de renfort ou de sous-traitance', sector: 'esn', scores: { 'conseil-cadrage-mvp': 1 } },
    ],
  },
  {
    id: 'situation',
    title: 'Où en êtes-vous aujourd\'hui ?',
    options: [
      { id: 'aucun', label: 'Je n\'ai pas encore de site', scores: { 'creation-site-vitrine': 4, 'seo-performance': 1 } },
      { id: 'date', label: 'Mon site est daté, lent ou difficile à modifier', scores: { 'refonte-migration-site': 4, 'seo-performance': 1, 'site-wordpress': 1 } },
      { id: 'peu', label: 'J\'ai un site, mais il m\'apporte peu de clients', scores: { 'seo-performance': 4, 'landing-page': 2, 'creation-blog': 1 } },
      { id: 'outils', label: 'Mon activité tourne sur Excel, des emails et des outils qui ne se parlent pas', scores: { 'automatisation-ia': 3, 'application-web-sur-mesure': 2, 'api-donnees': 2 } },
      { id: 'projet', label: 'J\'ai un projet d\'application ou de produit', scores: { 'conseil-cadrage-mvp': 3, 'application-web-sur-mesure': 3, 'application-mobile': 1 } },
      { id: 'existant', label: 'J\'ai un site ou une application à reprendre ou à faire évoluer', scores: { 'maintenance-hebergement': 4, 'securite-conformite': 1 } },
    ],
  },
  {
    id: 'objectifs',
    title: 'Qu\'est-ce que vous voulez obtenir ?',
    help: 'Plusieurs réponses possibles.',
    multiple: true,
    options: [
      { id: 'google', label: 'Être trouvé sur Google', scores: { 'seo-performance': 3, 'creation-site-vitrine': 1, 'creation-blog': 1 } },
      { id: 'demandes', label: 'Recevoir plus de demandes de contact ou de devis', scores: { 'landing-page': 2, 'creation-site-vitrine': 2, 'seo-performance': 1 } },
      { id: 'vendre', label: 'Vendre en ligne', scores: { 'site-e-commerce': 6 } },
      { id: 'reservation', label: 'Prise de rendez-vous ou réservation en ligne', scores: { 'application-web-sur-mesure': 3 } },
      { id: 'paiement', label: 'Paiement, acomptes ou abonnements en ligne', scores: { 'application-web-sur-mesure': 2, 'site-e-commerce': 1 } },
      { id: 'espace', label: 'Un espace client ou un back-office', scores: { 'application-web-sur-mesure': 3 } },
      { id: 'mobile', label: 'Une application sur téléphone', scores: { 'application-mobile': 5 } },
      { id: 'temps', label: 'Gagner du temps sur les tâches répétitives', scores: { 'automatisation-ia': 4 } },
      { id: 'ia', label: 'Utiliser l\'IA dans mon activité', scores: { 'automatisation-ia': 3 } },
      { id: 'connecter', label: 'Connecter mes outils entre eux', hint: 'CRM, compta, agenda, paiement…', scores: { 'api-donnees': 4 } },
      { id: 'donnees', label: 'Mieux exploiter mes données', hint: 'Tableaux de bord, exports, reporting', scores: { 'api-donnees': 2, 'application-web-sur-mesure': 2 } },
      { id: 'modifier', label: 'Modifier mon site moi-même', scores: { 'site-wordpress': 3 } },
      { id: 'securite', label: 'Sécuriser mon site, être en règle', hint: 'RGPD, accessibilité', scores: { 'securite-conformite': 4 } },
      { id: 'maintenance', label: 'Que quelqu\'un s\'occupe de mon site au quotidien', scores: { 'maintenance-hebergement': 4 } },
      { id: 'conseil', label: 'Être conseillé avant de me lancer', scores: { 'conseil-cadrage-mvp': 4 } },
      { id: 'renfort', label: 'Renforcer mon équipe technique', scores: { 'conseil-cadrage-mvp': 3 } },
    ],
  },
  {
    id: 'delai',
    title: 'Quand souhaitez-vous démarrer ?',
    options: [
      { id: 'urgent', label: 'Le plus vite possible', hint: 'Moins d\'un mois' },
      { id: 'trimestre', label: 'Dans les 3 prochains mois' },
      { id: 'souple', label: 'Pas de date précise', hint: 'Je me renseigne' },
    ],
  },
  {
    id: 'budget',
    title: 'Quel budget envisagez-vous ?',
    help: 'Une fourchette suffit : elle sert à vous proposer la solution la plus adaptée, pas la plus chère.',
    options: [
      { id: 'moins-500', label: 'Moins de 500 €' },
      { id: '500-1500', label: 'De 500 à 1 500 €' },
      { id: '1500-5000', label: 'De 1 500 à 5 000 €' },
      { id: 'plus-5000', label: 'Plus de 5 000 €' },
      { id: 'nsp', label: 'Je ne sais pas encore' },
    ],
  },
]

export type Answers = Record<string, string[]>

/** Classe les services selon les réponses. */
export function rankServices(answers: Answers): string[] {
  const scores: Record<string, number> = {}
  for (const q of QUESTIONS) {
    for (const id of answers[q.id] ?? []) {
      const option = q.options.find(o => o.id === id)
      for (const [slug, pts] of Object.entries(option?.scores ?? {})) {
        scores[slug] = (scores[slug] ?? 0) + pts
      }
    }
  }
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([slug]) => slug)
  return ranked.length ? ranked : ['conseil-cadrage-mvp']
}

/** Page secteur liée au profil choisi, s'il y en a une. */
export function sectorFor(answers: Answers): string | undefined {
  const profil = QUESTIONS[0].options.find(o => o.id === answers.profil?.[0])
  return profil?.sector
}

/** Libellés des réponses, pour le récapitulatif et le message envoyé. */
export function answerLabels(answers: Answers) {
  return QUESTIONS.map(q => ({
    question: q.title,
    labels: (answers[q.id] ?? []).map(id => q.options.find(o => o.id === id)?.label ?? id),
  })).filter(a => a.labels.length)
}

/** Message envoyé avec la demande : le récapitulatif du diagnostic, et le mot ajouté par le visiteur. */
export function diagnosticMessage(answers: Answers, suggestedServices: string[], note = ''): string {
  return [
    'Bonjour,',
    '',
    'Voici le résultat de mon diagnostic :',
    ...answerLabels(answers).map(r => `- ${r.question.replace('…', '').trim()} : ${r.labels.join(', ')}`),
    `- Services suggérés : ${suggestedServices.join(', ')}`,
    ...(note.trim() ? ['', `Mon projet en quelques mots : ${note.trim()}`] : []),
  ].join('\n')
}
