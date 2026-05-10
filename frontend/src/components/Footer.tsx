import { useTranslation } from 'react-i18next'
import './Footer.css'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="footer__logo">✦ Alex Moreau</span>
          <span className="footer__available">{t('footer.available')}</span>
        </div>
        <p className="footer__copy">
          © {year} Alex Moreau — {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
