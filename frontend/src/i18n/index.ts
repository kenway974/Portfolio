import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  fr: {
    translation: {
      nav: {
        services: 'Services',
        projects: 'Réalisations',
        til: 'TIL',
        blog: 'Blog',
        contact: 'Contact',
        cta: 'Parlons de votre projet',
      },
      hero: {
        badge: 'Développeur web freelance',
        headline: 'Un site qui vend. Pas juste une vitrine.',
        sub: 'J\'aide les TPE et PME à construire une présence en ligne qui attire, convainc et convertit — sans la complexité ni les coûts d\'une agence.',
        cta: 'Parlons de votre projet',
        ctaSecondary: 'Voir mes réalisations',
        scroll: 'Défiler',
      },
      services: {
        label: 'Ce que je fais',
        heading: 'Des solutions adaptées à votre activité.',
        items: [
          {
            title: 'Site vitrine',
            desc: 'Une présence professionnelle qui inspire confiance et reflète votre image de marque. Design soigné, performant, optimisé pour le référencement.',
          },
          {
            title: 'E-commerce',
            desc: 'Vendez en ligne 24h/24. Une boutique rapide, sécurisée et conçue pour convertir vos visiteurs en acheteurs.',
          },
          {
            title: 'Landing page',
            desc: 'Une page dédiée pour transformer vos visiteurs en prospects ou en clients. Conçue pour l\'acquisition et la conversion.',
          },
          {
            title: 'API & Automatisation',
            desc: 'Des fonctionnalités sur mesure ou des process automatisés pour ajouter une vraie valeur à votre site et faire gagner du temps à votre équipe.',
          },
        ],
      },
      projects: {
        label: 'Réalisations',
        heading: 'Des projets construits avec exigence.',
        visit: 'Voir le projet →',
      },
      process: {
        label: 'Comment ça marche',
        heading: 'Simple. Transparent. Efficace.',
        steps: [
          {
            num: '01',
            title: 'On échange',
            desc: 'Vous m\'expliquez votre activité, vos objectifs, vos contraintes. Je pose les bonnes questions — sans jargon technique.',
          },
          {
            num: '02',
            title: 'Je conçois & développe',
            desc: 'Design, intégration, développement — je prends tout en main ou travaille avec vous, étape par étape.',
          },
          {
            num: '03',
            title: 'Vous lancez',
            desc: 'Livraison, mise en ligne, formation si besoin. Je reste disponible après le lancement.',
          },
        ],
      },
      about: {
        label: 'À propos',
        heading: 'Un développeur, pas une agence.',
        body1: 'Je m\'appelle Kenny, développeur web freelance originaire de La Réunion. J\'accompagne les entreprises qui veulent une vraie présence en ligne — sans se perdre dans la complexité d\'une agence.',
        body2: 'Je prends en main vos projets de A à Z : du premier brief à la mise en ligne. Pas de jargon, des solutions adaptées à votre réalité, et un suivi simple — où que vous soyez.',
        stat1_value: '2–4 sem.',
        stat1_label: 'Délai de livraison',
        stat2_value: '< 48h',
        stat2_label: 'Délai de réponse',
        stat3_value: 'A → Z',
        stat3_label: 'Brief à mise en ligne',
      },
      til: {
        label: 'Today I Learned',
        heading: 'Ce que j\'apprends au quotidien.',
        desc: 'Chaque sujet que je découvre, expliqué simplement — avec une métaphore, des exemples concrets et une mise en pratique.',
        read: 'Lire →',
        all: 'Tous les sujets',
        back: '← Retour au TIL',
        fields: {
          explication: 'Explication',
          metaphore: 'Métaphore',
          exemple: 'Exemple concret',
          pratique: 'Mise en pratique',
          synthese: 'En résumé',
        },
      },
      blog: {
        label: 'Blog',
        heading: 'Ressources pour les entreprises.',
        read: 'Lire l\'article →',
        all: 'Tous les articles',
        back: '← Retour au blog',
      },
      contact: {
        label: 'Contact',
        heading: 'Parlons de votre projet.',
        subheading: 'Décrivez votre projet en quelques lignes et je vous réponds sous 48h.',
        name: 'Votre nom',
        email: 'Votre email',
        service: 'Type de projet',
        message: 'Décrivez votre projet',
        services: {
          vitrine: 'Site vitrine',
          ecommerce: 'E-commerce',
          landing: 'Landing page',
          api: 'API & Automatisation',
          other: 'Autre projet',
        },
        submit: 'Envoyer',
        submitting: 'Envoi en cours...',
        success: 'Message envoyé ! Je vous réponds sous 48h.',
        error: 'Une erreur est survenue. Réessayez ou contactez-moi directement.',
      },
      footer: {
        rights: 'Tous droits réservés.',
        available: 'Disponible pour de nouveaux projets',
      },
    },
  },
  en: {
    translation: {
      nav: {
        services: 'Services',
        projects: 'Work',
        til: 'TIL',
        blog: 'Blog',
        contact: 'Contact',
        cta: 'Let\'s talk',
      },
      hero: {
        badge: 'Freelance web developer',
        headline: 'A site that sells. Not just a showcase.',
        sub: 'I help small businesses build an online presence that attracts, convinces and converts — without the complexity or cost of an agency.',
        cta: 'Let\'s talk about your project',
        ctaSecondary: 'See my work',
        scroll: 'Scroll',
      },
      services: {
        label: 'What I do',
        heading: 'Solutions tailored to your business.',
        items: [
          {
            title: 'Showcase website',
            desc: 'A professional presence that builds trust and reflects your brand. Clean design, fast, optimised for search engines.',
          },
          {
            title: 'E-commerce',
            desc: 'Sell online 24/7. A fast, secure store designed to convert visitors into buyers.',
          },
          {
            title: 'Landing page',
            desc: 'A dedicated page to turn visitors into leads or customers. Built for acquisition and conversion.',
          },
          {
            title: 'API & Automation',
            desc: 'Custom features or automated workflows to add real value to your site and save your team time.',
          },
        ],
      },
      projects: {
        label: 'Work',
        heading: 'Projects built with care.',
        visit: 'View project →',
      },
      process: {
        label: 'How it works',
        heading: 'Simple. Transparent. Effective.',
        steps: [
          {
            num: '01',
            title: 'We talk',
            desc: 'You tell me about your business, goals and constraints. I ask the right questions — no technical jargon.',
          },
          {
            num: '02',
            title: 'I design & build',
            desc: 'Design, integration, development — I take care of everything or work alongside you, step by step.',
          },
          {
            num: '03',
            title: 'You launch',
            desc: 'Delivery, go-live, training if needed. I stay available after launch.',
          },
        ],
      },
      about: {
        label: 'About',
        heading: 'A developer, not an agency.',
        body1: 'I\'m Kenny, a freelance web developer from La Réunion island. I help businesses build a real online presence — without getting lost in agency complexity.',
        body2: 'I handle your projects from A to Z: from the first brief to going live. No jargon, solutions adapted to your reality, and straightforward support — wherever you are.',
        stat1_value: '2–4 wks',
        stat1_label: 'Delivery time',
        stat2_value: '< 48h',
        stat2_label: 'Response time',
        stat3_value: 'A → Z',
        stat3_label: 'Brief to launch',
      },
      til: {
        label: 'Today I Learned',
        heading: 'What I learn every day.',
        desc: 'Every concept I discover, explained simply — with a metaphor, real-world examples and hands-on practice.',
        read: 'Read →',
        all: 'All topics',
        back: '← Back to TIL',
        fields: {
          explication: 'Explanation',
          metaphore: 'Metaphor',
          exemple: 'Real-world example',
          pratique: 'Hands-on practice',
          synthese: 'Summary',
        },
      },
      blog: {
        label: 'Blog',
        heading: 'Resources for businesses.',
        read: 'Read article →',
        all: 'All posts',
        back: '← Back to blog',
      },
      contact: {
        label: 'Contact',
        heading: 'Let\'s talk about your project.',
        subheading: 'Describe your project briefly and I\'ll get back to you within 48h.',
        name: 'Your name',
        email: 'Your email',
        service: 'Project type',
        message: 'Describe your project',
        services: {
          vitrine: 'Showcase website',
          ecommerce: 'E-commerce',
          landing: 'Landing page',
          api: 'API & Automation',
          other: 'Other project',
        },
        submit: 'Send message',
        submitting: 'Sending...',
        success: 'Message sent! I\'ll reply within 48h.',
        error: 'Something went wrong. Try again or email me directly.',
      },
      footer: {
        rights: 'All rights reserved.',
        available: 'Available for new projects',
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
