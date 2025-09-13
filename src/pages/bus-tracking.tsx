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
  },
  // Punjab Routes
  "1": {
    routeNumber: "1",
    busNumber: "PB01AS2345",
    route: "Amritsar Route",
    city: "punjab",
    currentStop: 3,
    stops: [
      "Amritsar ISBT",
      "Hall Gate",
      "Alpha One Mall",
      "Guru Nanak Dev University (GNDU)",
      "Chheharta",
      "Verka",
      "Attari Road",
      "Jalandhar Road",
      "Ranjit Avenue",
      "Khasa"
    ],
    estimatedTimes: ["08:00", "08:12", "08:25", "08:40", "08:55", "09:10", "09:25", "09:40", "09:55", "10:10"]
  },
  "2": {
    routeNumber: "2",
    busNumber: "PB02LD3456",
    route: "Ludhiana Route",
    city: "punjab",
    currentStop: 2,
    stops: [
      "Amar Shaheed Sukdev Interstate Bus Terminal",
      "Sherpur Chowk",
      "Focal Point",
      "Madhuban",
      "Punjabi Mata Nagar Chowk",
      "Khalsa College"
    ],
    estimatedTimes: ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15"]
  },
  "3": {
    routeNumber: "3",
    busNumber: "PB03JL4567",
    route: "Jalandhar Route",
    city: "punjab",
    currentStop: 1,
    stops: [
      "Saheed Bhagat Singh Interstate Bus Terminal",
      "PAP Chowk",
      "Rama Mandi Chowk",
      "Chandpur",
      "Patara",
      "Khalsa College"
    ],
    estimatedTimes: ["11:00", "11:12", "11:25", "11:40", "11:55", "12:10"]
  },
  "4": {
    routeNumber: "4",
    busNumber: "PB04PT5678",
    route: "Patiala Route",
    city: "punjab",
    currentStop: 4,
    stops: [
      "Patiala Bus Stand",
      "Sanauri Adda",
      "Sama Chungi",
      "Punjabi University",
      "Bhagwanpur",
      "Power Colony",
      "Model Town",
      "Rajbaha Road"
    ],
    estimatedTimes: ["13:00", "13:10", "13:20", "13:35", "13:50", "14:05", "14:20", "14:35"]
  },
  "5": {
    routeNumber: "5",
    busNumber: "PB05BT6789",
    route: "Bathinda Route",
    city: "punjab",
    currentStop: 3,
    stops: [
      "Bathinda Bus Stand",
      "Ganpati Tower",
      "Amarpura Bus Stop – In Adarsh Nagar",
      "Old Bus Stand",
      "PRTC Workshop",
      "Partap Nagar",
      "Ambuja Bus Stop – In Partap Nagar"
    ],
    estimatedTimes: ["15:00", "15:12", "15:25", "15:40", "15:55", "16:10", "16:25"]
  },
  // Raipur Routes
  "6": {
    routeNumber: "6",
    busNumber: "CG01RP7890",
    route: "Raipur Bus Stand - Telibandha",
    city: "raipur",
    currentStop: 2,
    stops: [
      "Raipur Bus Stand",
      "Jaistambh Chowk",
      "Pandri",
      "Marine Drive",
      "Telibandha Stadium",
      "Energy Park",
      "Telibandha"
    ],
    estimatedTimes: ["07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30"]
  },
  "7": {
    routeNumber: "7",
    busNumber: "CG02RP8901",
    route: "New Market - Shankar Nagar",
    city: "raipur",
    currentStop: 4,
    stops: [
      "New Market",
      "Gol Bazaar",
      "Civil Lines",
      "VIP Road",
      "Shankar Nagar",
      "Byron Bazaar",
      "Moudhapara",
      "Tatibandh"
    ],
    estimatedTimes: ["09:00", "09:10", "09:20", "09:35", "09:50", "10:05", "10:20", "10:35"]
  },
  "8": {
    routeNumber: "8",
    busNumber: "CG03RP9012",
    route: "Railway Station - GE Road",
    city: "raipur",
    currentStop: 1,
    stops: [
      "Raipur Railway Station",
      "Fafadih",
      "Gudhiyari",
      "Kota",
      "GE Road",
      "Devendra Nagar"
    ],
    estimatedTimes: ["11:00", "11:15", "11:30", "11:45", "12:00", "12:15"]
  },
  "9": {
    routeNumber: "9",
    busNumber: "CG04RP0123",
    route: "Magneto Mall - Ring Road",
    city: "raipur",
    currentStop: 3,
    stops: [
      "Magneto Mall",
      "City Mall 36",
      "Avanti Vihar",
      "Daldal Seoni",
      "Ring Road No. 1",
      "Priyadarshini Nagar",
      "Amlidih"
    ],
    estimatedTimes: ["13:00", "13:12", "13:25", "13:40", "13:55", "14:10", "14:25"]
  },
  "10": {
    routeNumber: "10",
    busNumber: "CG05RP1234",
    route: "Pandri - Mowa",
    city: "raipur",
    currentStop: 5,
    stops: [
      "Pandri",
      "Samta Colony",
      "Sarona",
      "Bhatagaon",
      "Urla",
      "Sejbahar",
      "Mowa"
    ],
    estimatedTimes: ["16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30"]
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
      const location = `${busInfo.stops[busInfo.currentStop]}, ${busInfo.city}, India`
      const query = encodeURIComponent(location)
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
      
      // Try to open in new tab, fallback to same tab if blocked
      const newWindow = window.open(googleMapsUrl, '_blank', 'noopener,noreferrer')
      if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        // Popup blocked, open in same tab
        window.location.href = googleMapsUrl
      }
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