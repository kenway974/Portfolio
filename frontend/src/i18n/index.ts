import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: {
        about: 'About',
        projects: 'Projects',
        blog: 'Blog',
        contact: 'Contact',
      },
      hero: {
        greeting: 'Hello, I\'m',
        name: 'Alex Moreau',
        role: 'Full-Stack Developer',
        tagline: 'I build fast, reliable web products for startups and businesses that care about quality.',
        cta: 'Work with me',
        scroll: 'Scroll to explore',
      },
      about: {
        label: 'About',
        heading: 'Engineering with purpose.',
        body1: 'I\'m a freelance full-stack developer with 7+ years building production systems — from fintech APIs to editorial platforms. I focus on clean architecture, performance, and shipping on time.',
        body2: 'My clients are founders, product teams, and agencies who need a developer they can trust to own the problem, not just execute tickets.',
        stat1_value: '7+',
        stat1_label: 'Years experience',
        stat2_value: '40+',
        stat2_label: 'Projects shipped',
        stat3_value: '98%',
        stat3_label: 'Client satisfaction',
      },
      projects: {
        label: 'Projects',
        heading: 'Selected work.',
        visit: 'Visit →',
      },
      blog: {
        label: 'Blog',
        heading: 'Thoughts on building.',
        read: 'Read article →',
        all: 'All posts',
        back: '← Back to blog',
      },
      testimonials: {
        label: 'Testimonials',
        heading: 'What clients say.',
        items: [
          {
            quote: 'Alex delivered a complex API integration in half the time we expected. The code was clean, documented, and the handover was seamless.',
            author: 'Sophie Lambert',
            role: 'CTO, NovaPay',
          },
          {
            quote: 'Working with Alex felt like having a senior engineer in-house. Proactive, communicative, and technically excellent.',
            author: 'Romain Duval',
            role: 'Founder, Orbita',
          },
          {
            quote: 'Not just a developer — a product thinker. Alex pushed back on the right things and saved us from costly mistakes.',
            author: 'Clara Petit',
            role: 'Product Lead, Lumina',
          },
        ],
      },
      contact: {
        label: 'Contact',
        heading: 'Let\'s build something.',
        subheading: 'Tell me about your project and I\'ll get back to you within 24 hours.',
        name: 'Your name',
        email: 'Your email',
        service: 'Service type',
        message: 'Tell me about your project',
        services: {
          full: 'Full website creation',
          redesign: 'Website redesign',
          frontend: 'Frontend only',
          backend: 'Backend only',
          review: 'Code review',
        },
        submit: 'Send message',
        submitting: 'Sending...',
        success: 'Message sent! I\'ll reply within 24h.',
        error: 'Something went wrong. Try again or email me directly.',
      },
      footer: {
        rights: 'All rights reserved.',
        available: 'Available for freelance work',
      },
    },
  },
  fr: {
    translation: {
      nav: {
        about: 'À propos',
        projects: 'Projets',
        blog: 'Blog',
        contact: 'Contact',
      },
      hero: {
        greeting: 'Bonjour, je suis',
        name: 'Alex Moreau',
        role: 'Développeur Full-Stack',
        tagline: 'Je crée des produits web rapides et fiables pour les startups et entreprises qui misent sur la qualité.',
        cta: 'Travaillons ensemble',
        scroll: 'Défiler pour explorer',
      },
      about: {
        label: 'À propos',
        heading: 'Développement avec intention.',
        body1: 'Développeur full-stack freelance avec plus de 7 ans d\'expérience — des APIs fintech aux plateformes éditoriales. Je me concentre sur une architecture propre, la performance et le respect des délais.',
        body2: 'Mes clients sont des fondateurs, des équipes produit et des agences qui ont besoin d\'un développeur en qui ils peuvent avoir confiance.',
        stat1_value: '7+',
        stat1_label: 'Ans d\'expérience',
        stat2_value: '40+',
        stat2_label: 'Projets livrés',
        stat3_value: '98%',
        stat3_label: 'Satisfaction client',
      },
      projects: {
        label: 'Projets',
        heading: 'Travaux sélectionnés.',
        visit: 'Visiter →',
      },
      blog: {
        label: 'Blog',
        heading: 'Réflexions sur le développement.',
        read: 'Lire l\'article →',
        all: 'Tous les articles',
        back: '← Retour au blog',
      },
      testimonials: {
        label: 'Témoignages',
        heading: 'Ce que disent les clients.',
        items: [
          {
            quote: 'Alex a livré une intégration API complexe en deux fois moins de temps que prévu. Le code était propre, documenté, et la passation fut impeccable.',
            author: 'Sophie Lambert',
            role: 'CTO, NovaPay',
          },
          {
            quote: 'Travailler avec Alex, c\'était comme avoir un ingénieur senior en interne. Proactif, communicatif et techniquement excellent.',
            author: 'Romain Duval',
            role: 'Fondateur, Orbita',
          },
          {
            quote: 'Pas seulement un développeur — un vrai penseur produit. Alex a su remettre en question les bons éléments et nous a évité des erreurs coûteuses.',
            author: 'Clara Petit',
            role: 'Product Lead, Lumina',
          },
        ],
      },
      contact: {
        label: 'Contact',
        heading: 'Construisons quelque chose.',
        subheading: 'Parlez-moi de votre projet et je vous réponds sous 24 heures.',
        name: 'Votre nom',
        email: 'Votre email',
        service: 'Type de service',
        message: 'Parlez-moi de votre projet',
        services: {
          full: 'Création de site complet',
          redesign: 'Refonte de site',
          frontend: 'Frontend uniquement',
          backend: 'Backend uniquement',
          review: 'Revue de code',
        },
        submit: 'Envoyer le message',
        submitting: 'Envoi en cours...',
        success: 'Message envoyé ! Je vous réponds sous 24h.',
        error: 'Une erreur est survenue. Réessayez ou contactez-moi directement.',
      },
      footer: {
        rights: 'Tous droits réservés.',
        available: 'Disponible pour des missions freelance',
      },
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
