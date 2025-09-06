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

const features = [
  {
    icon: MapPin,
    title: "Real-time Bus Tracking",
    description: "Track buses live on interactive maps with precise GPS locations and estimated arrival times.",
    color: "text-primary"
  },
  {
    icon: Clock,
    title: "Smart Schedules",
    description: "Access complete timetables, plan your journey, and receive timely notifications.",
    color: "text-accent"
  },
  {
    icon: Smartphone,
    title: "Route Information",
    description: "Complete route details, stops, and connections to help you navigate the transport network.",
    color: "text-secondary-foreground"
  },
  {
    icon: Moon,
    title: "Dark & Light Mode",
    description: "Seamlessly switch between themes for comfortable viewing in any lighting condition.",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed and low bandwidth usage, perfect for all network conditions.",
    color: "text-accent"
  },
  {
    icon: Accessibility,
    title: "Accessible Design",
    description: "Built with accessibility in mind, ensuring everyone can use public transport effectively.",
    color: "text-secondary-foreground"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is protected with industry-standard security and privacy measures.",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Help improve the service by reporting issues and sharing feedback with the community.",
    color: "text-accent"
  }
]

export function Features() {
  return (
    <section className="py-24 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Everything You Need for
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Smarter Commuting
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            NavGati combines cutting-edge technology with user-friendly design to revolutionize 
            your public transport experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-soft transition-spring group"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`inline-flex w-12 h-12 rounded-lg bg-muted/50 items-center justify-center group-hover:scale-110 transition-spring ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
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