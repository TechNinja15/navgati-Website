import { Bus, Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                <Bus className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                NavGati
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('navGatiTagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  {t('downloadApp')}
                </Link>
              </li>
              <li>
                <Link to="/complaints" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  {t('reportIssue')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>support@navgati.gov.in</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-primary/20 transition-colors shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="leading-tight py-1">Transport Department<br />Government of India</span>
              </li>
            </ul>
          </div>

          {/* Transport Authority */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">{t('transportAuthority')}</h3>
            <a
              href="https://morth.nic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <span>{t('ministryName')}</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-xs text-muted-foreground">
              {t('govInitiative')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              {t('copyrightText')}
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t('privacyPolicy')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t('termsOfService')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t('accessibility')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}