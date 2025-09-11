import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink, ArrowLeft, Clock, Route } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock bus data - same as in track.tsx
const busData = {
  "18": {
    routeNumber: "18",
    busNumber: "KA01AB1234",
    route: "Electronic City - Majestic",
    city: "bangalore",
    currentStop: 4,
    stops: [
      "Electronic City Phase 1",
      "Bommanahalli",
      "HSR Layout",
      "Koramangala",
      "Richmond Road",
      "MG Road",
      "Cubbon Park",
      "Majestic"
    ],
    estimatedTimes: ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45"]
  },
  "42": {
    routeNumber: "42",
    busNumber: "MH01CD5678",
    route: "Andheri - CST",
    city: "mumbai",
    currentStop: 2,
    stops: [
      "Andheri Station",
      "Bandra",
      "Dadar",
      "Lower Parel",
      "Grant Road",
      "CST"
    ],
    estimatedTimes: ["09:00", "09:20", "09:40", "10:00", "10:20", "10:40"]
  },
  "65": {
    routeNumber: "65",
    busNumber: "DL01EF9012",
    route: "Connaught Place - Dwarka",
    city: "delhi",
    currentStop: 6,
    stops: [
      "Connaught Place",
      "Rajouri Garden",
      "Tilak Nagar",
      "Subhash Nagar",
      "Tagore Garden",
      "Rajouri Garden Metro",
      "Dwarka Sector 21",
      "Dwarka"
    ],
    estimatedTimes: ["14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45"]
  }
}

const BusTrackingPage = () => {
  const { busNumber: routeNumber } = useParams()
  const navigate = useNavigate()
  const [busInfo, setBusInfo] = useState<any>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    if (routeNumber && busData[routeNumber as keyof typeof busData]) {
      setBusInfo(busData[routeNumber as keyof typeof busData])
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [routeNumber])

  const handleViewOnMap = () => {
    if (busInfo) {
      const query = encodeURIComponent(`${busInfo.stops[busInfo.currentStop]}, ${busInfo.city}`)
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
      window.open(googleMapsUrl, '_blank')
    }
  }

  if (!busInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Bus Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The route number "{routeNumber}" was not found in our system.
            </p>
            <Button onClick={() => navigate('/track')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/track')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Route {busInfo.routeNumber} - Bus {busInfo.busNumber}
              </h1>
              <p className="text-muted-foreground">{busInfo.route}</p>
            </div>
          </div>

          {/* Bus Info Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="w-5 h-5" />
                Route Information
              </CardTitle>
              <CardDescription>
                Real-time bus location and route details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Current Location:</span>
                  <span className="font-medium">{busInfo.stops[busInfo.currentStop]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">{currentTime.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Live Tracking</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Visualization */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Route Progress</CardTitle>
              <CardDescription>
                Track the bus journey along its route
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Route Line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border"></div>
                
                {/* Bus Stops */}
                <div className="space-y-6">
                  {busInfo.stops.map((stop: string, index: number) => {
                    const isCurrent = index === busInfo.currentStop
                    const isPassed = index < busInfo.currentStop
                    const isFuture = index > busInfo.currentStop
                    
                    return (
                      <div key={index} className="relative flex items-center gap-4">
                        {/* Stop Icon */}
                        <div
                          className={cn(
                            "relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 bg-background",
                            isCurrent && "border-primary bg-primary text-primary-foreground animate-pulse",
                            isPassed && "border-green-500 bg-green-500 text-white",
                            isFuture && "border-muted-foreground bg-muted"
                          )}
                        >
                          {isCurrent ? (
                            <MapPin className="w-5 h-5" />
                          ) : isPassed ? (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          ) : (
                            <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                          )}
                        </div>
                        
                        {/* Stop Info */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className={cn(
                                "font-medium",
                                isCurrent && "text-primary font-semibold"
                              )}>
                                {stop}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {isPassed && "Departed"}
                                {isCurrent && "Current Location"}
                                {isFuture && `ETA: ${busInfo.estimatedTimes[index]}`}
                              </p>
                            </div>
                            {isCurrent && (
                              <Badge variant="default" className="animate-pulse">
                                Bus Here
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* View on Map Button */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium">Get Detailed Location</h3>
                <p className="text-muted-foreground">
                  View the exact location of Route {busInfo.routeNumber} (Bus {busInfo.busNumber}) on Google Maps
                </p>
                <Button onClick={handleViewOnMap} size="lg" className="w-full md:w-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default BusTrackingPage