import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink, ArrowLeft, Clock, Route, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"

// Mock bus data with traffic analysis and arrival times
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
    estimatedTimes: ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45"],
    arrivalTimes: ["12:05", "12:18", "12:35", "12:48", "13:05", "13:18", "13:35", "13:48"],
    trafficStatus: ["light", "moderate", "heavy", "moderate", "heavy", "moderate", "light", "light"],
    delays: [5, 3, 5, 3, 5, 3, 5, 3] // delays in minutes
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
    estimatedTimes: ["09:00", "09:20", "09:40", "10:00", "10:20", "10:40"],
    arrivalTimes: ["09:05", "09:25", "09:45", "10:05", "10:25", "10:45"],
    trafficStatus: ["moderate", "heavy", "moderate", "light", "moderate", "light"],
    delays: [5, 5, 5, 5, 5, 5]
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
    estimatedTimes: ["14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45"],
    arrivalTimes: ["14:03", "14:18", "14:35", "14:50", "15:05", "15:18", "15:35", "15:48"],
    trafficStatus: ["heavy", "heavy", "moderate", "light", "moderate", "light", "light", "light"],
    delays: [3, 3, 5, 5, 5, 3, 5, 3]
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
    estimatedTimes: ["08:00", "08:12", "08:25", "08:40", "08:55", "09:10", "09:25", "09:40", "09:55", "10:10"],
    arrivalTimes: ["08:05", "08:17", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15"],
    trafficStatus: ["light", "moderate", "light", "moderate", "light", "light", "moderate", "heavy", "moderate", "light"],
    delays: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
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
    estimatedTimes: ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15"],
    arrivalTimes: ["10:05", "10:20", "10:35", "10:50", "11:05", "11:20"],
    trafficStatus: ["moderate", "moderate", "heavy", "light", "moderate", "light"],
    delays: [5, 5, 5, 5, 5, 5]
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
    estimatedTimes: ["11:00", "11:12", "11:25", "11:40", "11:55", "12:10"],
    arrivalTimes: ["11:05", "11:17", "11:30", "11:45", "12:00", "12:15"],
    trafficStatus: ["light", "moderate", "light", "moderate", "heavy", "moderate"],
    delays: [5, 5, 5, 5, 5, 5]
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
    estimatedTimes: ["13:00", "13:10", "13:20", "13:35", "13:50", "14:05", "14:20", "14:35"],
    arrivalTimes: ["13:05", "13:15", "13:25", "13:40", "13:55", "14:10", "14:25", "14:40"],
    trafficStatus: ["moderate", "light", "moderate", "light", "heavy", "moderate", "light", "light"],
    delays: [5, 5, 5, 5, 5, 5, 5, 5]
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
    estimatedTimes: ["15:00", "15:12", "15:25", "15:40", "15:55", "16:10", "16:25"],
    arrivalTimes: ["15:08", "15:20", "15:33", "15:48", "16:03", "16:18", "16:33"],
    trafficStatus: ["heavy", "moderate", "moderate", "light", "moderate", "light", "light"],
    delays: [8, 8, 8, 8, 8, 8, 8]
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
    estimatedTimes: ["07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30"],
    arrivalTimes: ["07:05", "07:20", "07:35", "07:50", "08:05", "08:20", "08:35"],
    trafficStatus: ["light", "light", "moderate", "heavy", "moderate", "light", "light"],
    delays: [5, 5, 5, 5, 5, 5, 5]
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
    estimatedTimes: ["16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30"],
    arrivalTimes: ["16:08", "16:18", "16:38", "16:48", "17:08", "17:18", "17:38"],
    trafficStatus: ["moderate", "light", "moderate", "heavy", "moderate", "light", "light"],
    delays: [8, 3, 8, 3, 8, 3, 8]
  }
}

// Traffic analysis function
const getTrafficIcon = (status: string) => {
  switch (status) {
    case 'light': return <CheckCircle className="w-4 h-4 text-success" />
    case 'moderate': return <AlertTriangle className="w-4 h-4 text-warning" />
    case 'heavy': return <XCircle className="w-4 h-4 text-destructive" />
    default: return <Clock className="w-4 h-4 text-muted-foreground" />
  }
}

const getTrafficColor = (status: string) => {
  switch (status) {
    case 'light': return 'text-success'
    case 'moderate': return 'text-warning'  
    case 'heavy': return 'text-destructive'
    default: return 'text-muted-foreground'
  }
}

const BusTrackingPage = () => {
  const { busNumber: routeNumber } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
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
      // Create a directions URL showing the complete bus route
      const origin = encodeURIComponent(`${busInfo.stops[0]}, ${busInfo.city}, India`)
      const destination = encodeURIComponent(`${busInfo.stops[busInfo.stops.length - 1]}, ${busInfo.city}, India`)
      
      // Add all intermediate stops as waypoints (excluding first and last)
      const waypoints = busInfo.stops.slice(1, -1)
        .map((stop: string) => encodeURIComponent(`${stop}, ${busInfo.city}, India`))
        .join('/')
      
      // Construct Google Maps directions URL with waypoints
      let googleMapsUrl = `https://www.google.com/maps/dir/${origin}`
      if (waypoints) {
        googleMapsUrl += `/${waypoints}`
      }
      googleMapsUrl += `/${destination}`
      
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
            <h1 className="text-2xl font-bold mb-4">{t('busNotFound')}</h1>
            <p className="text-muted-foreground mb-6">
              {t('busNotFoundDesc').replace('{routeNumber}', `"${routeNumber}"`)}
            </p>
            <Button onClick={() => navigate('/track')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToSearch')}
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
              {t('back')}
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
                {t('routeInformation')}
              </CardTitle>
              <CardDescription>
                {t('routeInfoDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{t('currentLocation')}</span>
                  <span className="font-medium">{busInfo.stops[busInfo.currentStop]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{t('lastUpdated')}</span>
                  <span className="font-medium">{currentTime.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getTrafficIcon(busInfo.trafficStatus?.[busInfo.currentStop] || 'moderate')}
                  <span className="text-sm text-muted-foreground">{t('trafficStatus')}</span>
                  <span className={cn("font-medium", getTrafficColor(busInfo.trafficStatus?.[busInfo.currentStop] || 'moderate'))}>
                    {t(busInfo.trafficStatus?.[busInfo.currentStop] || 'moderate')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{t('liveTracking')}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Visualization */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('routeProgress')}</CardTitle>
              <CardDescription>
                {t('routeProgressDesc')}
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
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>
                                  {isPassed && t('departed')}
                                  {isCurrent && t('currentLocation').replace(':', '')}
                                  {isFuture && `${t('eta')} ${busInfo.estimatedTimes[index]}`}
                                </span>
                                {(isCurrent || isFuture) && busInfo.arrivalTimes && (
                                  <span className="text-primary font-medium">
                                    {t('arrivalTime')} {busInfo.arrivalTimes[index]}
                                  </span>
                                )}
                                {busInfo.trafficStatus && (
                                  <div className="flex items-center gap-1">
                                    {getTrafficIcon(busInfo.trafficStatus[index])}
                                    <span className={getTrafficColor(busInfo.trafficStatus[index])}>
                                      {t(busInfo.trafficStatus[index])}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {isCurrent && (
                              <Badge variant="default" className="animate-pulse">
                                {t('busHere')}
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
                <h3 className="text-lg font-medium">{t('getDetailedLocation')}</h3>
                <p className="text-muted-foreground">
                  {t('viewLocationDesc')}
                </p>
                <Button onClick={handleViewOnMap} size="lg" className="w-full md:w-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('viewOnMap')}
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