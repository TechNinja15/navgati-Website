import {
  Smartphone,
  Zap,
  Users,
  Shield,
  MapPin,
  Clock,
  Moon,
  Sun,
  Accessibility
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: MapPin,
      title: t('realTimeBusTracking'),
      description: t('realTimeBusTrackingDesc'),
      color: "text-primary"
    },
    {
      icon: Clock,
      title: t('smartSchedules'),
      description: t('smartSchedulesDesc'),
      color: "text-accent"
    },
    {
      icon: Smartphone,
      title: t('routeInformationTitle'),
      description: t('routeInformationDesc'),
      color: "text-secondary-foreground"
    },
    {
      icon: Moon,
      title: t('darkLightMode'),
      description: t('darkLightModeDesc'),
      color: "text-primary"
    },
    {
      icon: Zap,
      title: t('lightningFast'),
      description: t('lightningFastDesc'),
      color: "text-accent"
    },
    {
      icon: Accessibility,
      title: t('accessibleDesign'),
      description: t('accessibleDesignDesc'),
      color: "text-secondary-foreground"
    },
    {
      icon: Shield,
      title: t('privacyFirst'),
      description: t('privacyFirstDesc'),
      color: "text-primary"
    },
    {
      icon: Users,
      title: t('communityDriven'),
      description: t('communityDrivenDesc'),
      color: "text-accent"
    }
  ]

  return (
    <section className="py-24 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t('featuresTitle1')}
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              {t('featuresTitle2')}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('featuresSubtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`inline-flex w-14 h-14 rounded-2xl bg-muted/50 items-center justify-center group-hover:scale-110 group-hover:bg-background shadow-sm transition-all duration-300 ${feature.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}