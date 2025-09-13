import { ArrowRight, MapPin, Clock, Route } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <MapPin className="w-4 h-4 mr-2" />
            NexGen Accessible Vehical Guidance and tracking Intelligence
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="block">Next-Generation</span>
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Transport Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
            NavGati brings real-time bus tracking, intelligent route planning, and seamless 
            schedule management to transform your daily commute experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/download">
              <Button size="lg" className="bg-gradient-primary hover:shadow-large transition-spring group">
                Download App
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/complaints">
              <Button variant="outline" size="lg" className="hover:shadow-medium transition-spring">
                Report Issue
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Real-time Tracking</h3>
              <p className="text-sm text-muted-foreground">Live bus locations and accurate arrival times</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">Smart Schedules</h3>
              <p className="text-sm text-muted-foreground">Intelligent schedule planning and notifications</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mx-auto">
                <Route className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold">Route Optimization</h3>
              <p className="text-sm text-muted-foreground">Find the fastest routes to your destination</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}