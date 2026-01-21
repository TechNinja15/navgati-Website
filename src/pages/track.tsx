import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Search, Bus, Compass, Share2, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/LanguageContext"
import { supabase } from "@/integrations/supabase/client"

// Mock bus data - in a real app, this would come from an API
const busData = {
  "18": {
    routeNumber: "18",
    busNumber: "KA01AB1234",
    route: "Electronic City - Majestic",
    city: "bangalore",
    currentStop: 4,
    availableSeats: 15,
    totalSeats: 45,
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
    coordinates: {
      "Electronic City Phase 1": { lat: 12.8452, lng: 77.6602 },
      "Bommanahalli": { lat: 12.9089, lng: 77.6239 },
      "HSR Layout": { lat: 12.9121, lng: 77.6446 },
      "Koramangala": { lat: 12.9352, lng: 77.6245 },
      "Richmond Road": { lat: 12.9660, lng: 77.6067 },
      "MG Road": { lat: 12.9756, lng: 77.6066 },
      "Cubbon Park": { lat: 12.9760, lng: 77.5929 },
      "Majestic": { lat: 12.9767, lng: 77.5713 }
    }
  },
  "42": {
    routeNumber: "42",
    busNumber: "MH01CD5678",
    route: "Andheri - CST",
    city: "mumbai",
    currentStop: 2,
    availableSeats: 8,
    totalSeats: 40,
    stops: [
      "Andheri Station",
      "Bandra",
      "Dadar",
      "Lower Parel",
      "Grant Road",
      "CST"
    ],
    coordinates: {
      "Andheri Station": { lat: 19.1197, lng: 72.8464 },
      "Bandra": { lat: 19.0596, lng: 72.8295 },
      "Dadar": { lat: 19.0178, lng: 72.8478 },
      "Lower Parel": { lat: 18.9953, lng: 72.8315 },
      "Grant Road": { lat: 18.9620, lng: 72.8159 },
      "CST": { lat: 18.9401, lng: 72.8354 }
    }
  },
  "65": {
    routeNumber: "65",
    busNumber: "DL01EF9012",
    route: "Connaught Place - Dwarka",
    city: "delhi",
    currentStop: 6,
    availableSeats: 22,
    totalSeats: 50,
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
    coordinates: {
      "Connaught Place": { lat: 28.6304, lng: 77.2177 },
      "Rajouri Garden": { lat: 28.6493, lng: 77.1219 },
      "Tilak Nagar": { lat: 28.6366, lng: 77.0965 },
      "Subhash Nagar": { lat: 28.6360, lng: 77.1085 },
      "Tagore Garden": { lat: 28.6433, lng: 77.1145 },
      "Rajouri Garden Metro": { lat: 28.6493, lng: 77.1219 },
      "Dwarka Sector 21": { lat: 28.5524, lng: 77.0583 },
      "Dwarka": { lat: 28.5921, lng: 77.0460 }
    }
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
    coordinates: {
      "Amritsar ISBT": { lat: 31.6268, lng: 74.8765 },
      "Hall Gate": { lat: 31.6286, lng: 74.8722 },
      "Alpha One Mall": { lat: 31.6368, lng: 74.9080 },
      "Guru Nanak Dev University (GNDU)": { lat: 31.6340, lng: 74.8258 },
      "Chheharta": { lat: 31.6094, lng: 74.7932 },
      "Verka": { lat: 31.6706, lng: 74.9358 },
      "Attari Road": { lat: 31.6022, lng: 74.6067 },
      "Jalandhar Road": { lat: 31.6340, lng: 75.0000 },
      "Ranjit Avenue": { lat: 31.6560, lng: 74.8647 },
      "Khasa": { lat: 31.6333, lng: 74.7500 }
    }
  },
  "2": {
    routeNumber: "2",
    busNumber: "PB02LD3456",
    route: "Ludhiana Route",
    city: "punjab",
    currentStop: 2,
    availableSeats: 6,
    totalSeats: 42,
    stops: [
      "Amar Shaheed Sukdev Interstate Bus Terminal",
      "Sherpur Chowk",
      "Focal Point",
      "Madhuban",
      "Punjabi Mata Nagar Chowk",
      "Khalsa College"
    ],
    coordinates: {
      "Amar Shaheed Sukdev Interstate Bus Terminal": { lat: 30.9010, lng: 75.8573 },
      "Sherpur Chowk": { lat: 30.8926, lng: 75.8797 },
      "Focal Point": { lat: 30.8800, lng: 75.9200 },
      "Madhuban": { lat: 30.8850, lng: 75.8400 },
      "Punjabi Mata Nagar Chowk": { lat: 30.8900, lng: 75.8200 },
      "Khalsa College": { lat: 30.9050, lng: 75.8450 }
    }
  },
  "3": {
    routeNumber: "3",
    busNumber: "PB03JL4567",
    route: "Jalandhar Route",
    city: "punjab",
    currentStop: 1,
    availableSeats: 18,
    totalSeats: 44,
    stops: [
      "Saheed Bhagat Singh Interstate Bus Terminal",
      "PAP Chowk",
      "Rama Mandi Chowk",
      "Chandpur",
      "Patara",
      "Khalsa College"
    ],
    coordinates: {
      "Saheed Bhagat Singh Interstate Bus Terminal": { lat: 31.3260, lng: 75.5762 },
      "PAP Chowk": { lat: 31.3000, lng: 75.6000 },
      "Rama Mandi Chowk": { lat: 31.3100, lng: 75.6200 },
      "Chandpur": { lat: 31.3300, lng: 75.5500 },
      "Patara": { lat: 31.3400, lng: 75.6500 },
      "Khalsa College": { lat: 31.3200, lng: 75.5800 }
    }
  },
  "4": {
    routeNumber: "4",
    busNumber: "PB04PT5678",
    route: "Patiala Route",
    city: "punjab",
    currentStop: 4,
    availableSeats: 25,
    totalSeats: 46,
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
    coordinates: {
      "Patiala Bus Stand": { lat: 30.3398, lng: 76.3869 },
      "Sanauri Adda": { lat: 30.3300, lng: 76.4000 },
      "Sama Chungi": { lat: 30.3400, lng: 76.3700 },
      "Punjabi University": { lat: 30.3551, lng: 76.4526 },
      "Bhagwanpur": { lat: 30.3600, lng: 76.4600 },
      "Power Colony": { lat: 30.3200, lng: 76.3500 },
      "Model Town": { lat: 30.3450, lng: 76.3800 },
      "Rajbaha Road": { lat: 30.3350, lng: 76.3900 }
    }
  },
  "5": {
    routeNumber: "5",
    busNumber: "PB05BT6789",
    route: "Bathinda Route",
    city: "punjab",
    currentStop: 3,
    availableSeats: 14,
    totalSeats: 40,
    stops: [
      "Bathinda Bus Stand",
      "Ganpati Tower",
      "Amarpura Bus Stop – In Adarsh Nagar",
      "Old Bus Stand",
      "PRTC Workshop",
      "Partap Nagar",
      "Ambuja Bus Stop – In Partap Nagar"
    ],
    coordinates: {
      "Bathinda Bus Stand": { lat: 30.2110, lng: 74.9455 },
      "Ganpati Tower": { lat: 30.2200, lng: 74.9500 },
      "Amarpura Bus Stop – In Adarsh Nagar": { lat: 30.2150, lng: 74.9600 },
      "Old Bus Stand": { lat: 30.2100, lng: 74.9400 },
      "PRTC Workshop": { lat: 30.2300, lng: 74.9300 },
      "Partap Nagar": { lat: 30.2250, lng: 74.9550 },
      "Ambuja Bus Stop – In Partap Nagar": { lat: 30.2200, lng: 74.9650 }
    }
  },
  // Raipur Routes
  "6": {
    routeNumber: "6",
    busNumber: "CG01RP7890",
    route: "Raipur Bus Stand - Telibandha",
    city: "raipur",
    currentStop: 2,
    availableSeats: 30,
    totalSeats: 52,
    stops: [
      "Raipur Bus Stand",
      "Jaistambh Chowk",
      "Pandri",
      "Marine Drive",
      "Telibandha Stadium",
      "Energy Park",
      "Telibandha"
    ],
    coordinates: {
      "Raipur Bus Stand": { lat: 21.2658, lng: 81.6369 }, // Pandri Bus Stand
      "Jaistambh Chowk": { lat: 21.2334, lng: 81.6337 },
      "Pandri": { lat: 21.2658, lng: 81.6369 },
      "Marine Drive": { lat: 21.2375, lng: 81.6665 }, // Corrected to Telibandha Talab area
      "Telibandha Stadium": { lat: 21.2370, lng: 81.6670 },
      "Energy Park": { lat: 21.2290, lng: 81.6918 }, // Urja Park
      "Telibandha": { lat: 21.2379, lng: 81.6669 }
    }
  },
  "7": {
    routeNumber: "7",
    busNumber: "CG02RP8901",
    route: "New Market - Shankar Nagar",
    city: "raipur",
    currentStop: 4,
    availableSeats: 9,
    totalSeats: 48,
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
    coordinates: {
      "New Market": { lat: 21.2355, lng: 81.6300 },
      "Gol Bazaar": { lat: 21.2380, lng: 81.6350 },
      "Civil Lines": { lat: 21.2400, lng: 81.6450 },
      "VIP Road": { lat: 21.1596, lng: 81.7246 }, // Corrected towards Airport/VIP road
      "Shankar Nagar": { lat: 21.2580, lng: 81.6550 },
      "Byron Bazaar": { lat: 21.2450, lng: 81.6400 },
      "Moudhapara": { lat: 21.2480, lng: 81.6320 },
      "Tatibandh": { lat: 21.2550, lng: 81.5800 }
    }
  },
  "8": {
    routeNumber: "8",
    busNumber: "CG03RP9012",
    route: "Railway Station - GE Road",
    city: "raipur",
    currentStop: 1,
    availableSeats: 20,
    totalSeats: 45,
    stops: [
      "Raipur Railway Station",
      "Fafadih",
      "Gudhiyari",
      "Kota",
      "GE Road",
      "Devendra Nagar"
    ],
    coordinates: {
      "Raipur Railway Station": { lat: 21.2536, lng: 81.6322 },
      "Fafadih": { lat: 21.2600, lng: 81.6350 },
      "Gudhiyari": { lat: 21.2650, lng: 81.6200 },
      "Kota": { lat: 21.2680, lng: 81.5900 },
      "GE Road": { lat: 21.2400, lng: 81.6000 },
      "Devendra Nagar": { lat: 21.2600, lng: 81.6500 }
    }
  },
  "9": {
    routeNumber: "9",
    busNumber: "CG04RP0123",
    route: "Magneto Mall - Ring Road",
    city: "raipur",
    currentStop: 3,
    availableSeats: 3,
    totalSeats: 42,
    stops: [
      "Magneto Mall",
      "City Mall 36",
      "Avanti Vihar",
      "Daldal Seoni",
      "Ring Road No. 1",
      "Priyadarshini Nagar",
      "Amlidih"
    ],
    coordinates: {
      "Magneto Mall": { lat: 21.2345, lng: 81.6789 },
      "City Mall 36": { lat: 21.2310, lng: 81.6840 },
      "Avanti Vihar": { lat: 21.2420, lng: 81.6720 },
      "Daldal Seoni": { lat: 21.2550, lng: 81.6800 },
      "Ring Road No. 1": { lat: 21.2200, lng: 81.6500 },
      "Priyadarshini Nagar": { lat: 21.2150, lng: 81.6400 },
      "Amlidih": { lat: 21.2000, lng: 81.6600 }
    }
  },
  "10": {
    routeNumber: "10",
    busNumber: "CG05RP1234",
    route: "Pandri - Mowa",
    city: "raipur",
    currentStop: 5,
    availableSeats: 16,
    totalSeats: 50,
    stops: [
      "Pandri",
      "Samta Colony",
      "Sarona",
      "Bhatagaon",
      "Urla",
      "Sejbahar",
      "Mowa"
    ],
    coordinates: {
      "Pandri": { lat: 21.2658, lng: 81.6369 },
      "Samta Colony": { lat: 21.2500, lng: 81.6100 },
      "Sarona": { lat: 21.2550, lng: 81.5700 },
      "Bhatagaon": { lat: 21.2180, lng: 81.6210 }, // Corrected to New ISBT
      "Urla": { lat: 21.3200, lng: 81.6000 }, // Moved further north (Industrial area)
      "Sejbahar": { lat: 21.1400, lng: 81.6900 }, // Validated south
      "Mowa": { lat: 21.2750, lng: 81.6700 }
    }
  }
}

const cities = [
  { value: "bangalore", label: "Bangalore" },
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "chennai", label: "Chennai" },
  { value: "pune", label: "Pune" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "punjab", label: "Punjab" },
  { value: "raipur", label: "Raipur" }
]

const TrackPage = () => {
  const [userRole, setUserRole] = useState<'none' | 'passenger' | 'admin'>('none')
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Search states
  const [selectedCity, setSelectedCity] = useState("")
  const [routeNumber, setRouteNumber] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isSearched, setIsSearched] = useState(false)

  // Offline tracking states
  const [offlineSelectedCity, setOfflineSelectedCity] = useState("")
  const [offlineRouteNumber, setOfflineRouteNumber] = useState("")
  const [offlineSearchResult, setOfflineSearchResult] = useState<any>(null)
  const [showCoordinates, setShowCoordinates] = useState(false)
  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isOfflineSearched, setIsOfflineSearched] = useState(false)
  const [isSendingSMS, setIsSendingSMS] = useState(false)
  const [smsLanguage, setSmsLanguage] = useState<'english' | 'hindi' | 'chhattisgarhi'>('english')

  const navigate = useNavigate()
  const { toast } = useToast()
  const { t } = useLanguage()

  const smsTranslations = {
    english: {
      header: "🚍 *NavGati Bus Status*",
      bus: "*Bus:*",
      location: "*Location:*",
      coords: "*Coords:*",
      upcoming: "*Upcoming Stops & ETA:*",
      lastStop: "Bus is at the final stop."
    },
    hindi: {
      header: "🚍 *नवगति बस स्थिति*",
      bus: "*बस:*",
      location: "*स्थान:*",
      coords: "*निर्देशांक:*",
      upcoming: "*आगामी स्टॉप और आगमन समय:*",
      lastStop: "बस अंतिम स्टॉप पर है।"
    },
    chhattisgarhi: {
      header: "🚍 *नवगति बस के हाल*",
      bus: "*बस नंबर:*",
      location: "*अभी कहाँ हे:*",
      coords: "*जगह:*",
      upcoming: "*अगाड़ी के स्टॉप:*",
      lastStop: "बस आखिरी स्टॉप में हे।"
    }
  }

  const getTranslatedMessage = (busData: any, lang: 'english' | 'hindi' | 'chhattisgarhi') => {
    if (!busData) return ""

    const t = smsTranslations[lang]
    const currentStopName = busData.stops[busData.currentStop]
    const nextStops = busData.stops.slice(busData.currentStop + 1)

    let message = `${t.header}\n\n`
    message += `${t.bus} ${busData.busNumber} (${busData.routeNumber})\n`
    message += `${t.location} ${currentStopName}\n`
    message += `${t.coords} ${busData.coordinates?.[currentStopName]?.lat.toFixed(6)}, ${busData.coordinates?.[currentStopName]?.lng.toFixed(6)}\n\n`

    if (nextStops.length > 0) {
      message += `${t.upcoming}\n`
      nextStops.forEach((stop: string, index: number) => {
        const eta = new Date(Date.now() + (index + 1) * 15 * 60000)
        const timeString = eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        message += `• ${stop}: ${timeString}\n`
      })
    } else {
      message += `${t.lastStop}\n`
    }

    return message
  }

  const handleLogin = () => {
    if (username === "navgati150706" && password === "12345678") {
      setUserRole('admin')
      toast({
        title: "Login Successful",
        description: "Welcome back, Admin!",
      })
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your User ID and Password",
        variant: "destructive"
      })
    }
  }

  const handlePassengerLogin = () => {
    setUserRole('passenger')
    toast({
      title: "Welcome Passenger",
      description: "You have access to bus search features.",
    })
  }

  const handleSearch = () => {
    if (!selectedCity) {
      toast({
        title: t('cityRequired'),
        description: t('cityRequiredDesc'),
        variant: "destructive"
      })
      return
    }

    if (!routeNumber.trim()) {
      toast({
        title: t('routeNumberRequired'),
        description: t('routeNumberRequiredDesc'),
        variant: "destructive"
      })
      return
    }

    setIsSearched(true)
    const foundBus = busData[routeNumber as keyof typeof busData]

    if (foundBus && foundBus.city === selectedCity) {
      setSearchResult(foundBus)
      toast({
        title: t('busFound'),
        description: t('busFoundDesc').replace('{routeNumber}', foundBus.routeNumber).replace('{busNumber}', foundBus.busNumber),
      })
    } else {
      setSearchResult(null)
      const selectedCityName = cities.find(c => c.value === selectedCity)?.label || selectedCity
      toast({
        title: t('noBusFound'),
        description: t('noBusFoundDesc').replace('{routeNumber}', routeNumber).replace('{city}', selectedCityName),
        variant: "destructive"
      })
    }
  }

  const handleTrackBus = () => {
    if (searchResult) {
      navigate(`/bus-tracking/${searchResult.routeNumber}`)
    }
  }

  // Offline tracking functions
  const handleOfflineSearch = () => {
    if (!offlineSelectedCity) {
      toast({
        title: "City Required",
        description: "Please select a city to search for buses",
        variant: "destructive"
      })
      return
    }

    if (!offlineRouteNumber.trim()) {
      toast({
        title: "Route Number Required",
        description: "Please enter a route number to search",
        variant: "destructive"
      })
      return
    }

    setIsOfflineSearched(true)
    const foundBus = busData[offlineRouteNumber as keyof typeof busData]

    if (foundBus && foundBus.city === offlineSelectedCity) {
      setOfflineSearchResult(foundBus)
      setShowCoordinates(false)
      setShowPhoneInput(false)
      toast({
        title: "Bus Found",
        description: `Found bus ${foundBus.busNumber} on route ${foundBus.routeNumber}`,
      })
    } else {
      setOfflineSearchResult(null)
      setShowCoordinates(false)
      setShowPhoneInput(false)
      const selectedCityName = cities.find(c => c.value === offlineSelectedCity)?.label || offlineSelectedCity
      toast({
        title: "No Bus Found",
        description: `No bus found with route ${offlineRouteNumber} in ${selectedCityName}`,
        variant: "destructive"
      })
    }
  }

  const handleGiveCoordinates = () => {
    if (offlineSearchResult) {
      setShowCoordinates(true)
      toast({
        title: "Coordinates Retrieved",
        description: "Bus details and SMS generator are now available",
      })
    }
  }

  // const handleSendLocation = () => { // Removed, logic moved to inline button }

  const handleSendSMS = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone Number Required",
        description: "Please enter a phone number to send the location",
        variant: "destructive"
      })
      return
    }

    if (!offlineSearchResult) {
      toast({
        title: "No Bus Data",
        description: "Please search for a bus first",
        variant: "destructive"
      })
      return
    }

    setIsSendingSMS(true)

    try {
      const currentStopName = offlineSearchResult.stops[offlineSearchResult.currentStop]
      const stopCoords = offlineSearchResult.coordinates?.[currentStopName] || {
        lat: 0,
        lng: 0
      }

      const nextStops = offlineSearchResult.stops.slice(offlineSearchResult.currentStop + 1)

      // Use the helper to get the message in the selected language
      const message = getTranslatedMessage(offlineSearchResult, smsLanguage)

      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: {
          phoneNumber: phoneNumber,
          message: message,
          busData: {
            routeNumber: offlineSearchResult.routeNumber,
            busNumber: offlineSearchResult.busNumber,
            city: cities.find(c => c.value === offlineSearchResult.city)?.label || offlineSearchResult.city,
            route: offlineSearchResult.route,
            currentStop: currentStopName,
            nextStops: nextStops,
            coordinates: {
              lat: stopCoords.lat,
              lng: stopCoords.lng
            }
          }
        }
      })

      if (error) {
        throw error
      }

      toast({
        title: "SMS Sent Successfully",
        description: `Status sent in ${smsLanguage} to ${phoneNumber}`,
      })

      setPhoneNumber("")
    } catch (error: any) {

      console.error('Error sending SMS:', error)
      toast({
        title: "Failed to Send SMS",
        description: error.message || "An error occurred while sending the SMS",
        variant: "destructive"
      })
    } finally {
      setIsSendingSMS(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 shadow-soft">
              <MapPin className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              {t('trackYourBus')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('trackSubtitle')}
            </p>
          </div>

          {/* Login Card */}
          {userRole === 'none' && (
            <Card className="max-w-md mx-auto shadow-medium border-primary/10">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-heading">Login Required</CardTitle>
                <CardDescription>
                  Please login to access advanced tracking features or continue as a passenger.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">User ID</label>
                    <Input
                      placeholder="Enter User ID"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full bg-gradient-primary shadow-soft hover:shadow-medium transition-all"
                    onClick={handleLogin}
                  >
                    Login as Admin
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue as</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                  onClick={handlePassengerLogin}
                >
                  <Bus className="w-4 h-4 mr-2" />
                  Passenger
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Search Form - Visible to ALL authenticated users */}
          {userRole !== 'none' && (
            <Card className="mb-8 shadow-soft border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Search className="w-5 h-5 text-primary" />
                  Search Bus
                </CardTitle>
                <CardDescription>
                  Select your city and enter the bus number to track its location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select City</label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Route Number</label>
                    <Input
                      placeholder="Enter route number (e.g., 18, 42, 65)"
                      value={routeNumber}
                      onChange={(e) => setRouteNumber(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSearch}
                  className="w-full md:w-auto bg-gradient-primary hover:shadow-lg transition-all"
                  size="lg"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Bus
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Track Offline - Visible ONLY to ADMINS */}
          {userRole === 'admin' && (
            <Card className="mb-8 shadow-soft border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Compass className="w-5 h-5 text-accent" />
                  Track Offline
                </CardTitle>
                <CardDescription>
                  Get bus coordinates and share location via SMS without internet tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select City</label>
                    <Select value={offlineSelectedCity} onValueChange={setOfflineSelectedCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Route Number</label>
                    <Input
                      placeholder="Enter route number (e.g., 18, 42, 65)"
                      value={offlineRouteNumber}
                      onChange={(e) => setOfflineRouteNumber(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleOfflineSearch()}
                    />
                  </div>
                </div>
                <Button
                  onClick={handleOfflineSearch}
                  className="w-full md:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all"
                  size="lg"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Bus (Offline)
                </Button>

                {/* Offline Search Results */}
                {isOfflineSearched && offlineSearchResult && (
                  <div className="mt-6 space-y-4">
                    <div className="bg-muted/50 rounded-lg p-6 border border-border/50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                            Route {offlineSearchResult.routeNumber} - Bus {offlineSearchResult.busNumber}
                          </h3>
                          <p className="text-muted-foreground mb-1">
                            Route: {offlineSearchResult.route}
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">
                            Currently at: {offlineSearchResult.stops[offlineSearchResult.currentStop]}
                          </p>
                          <p className="text-sm font-medium text-primary">
                            Seats: {offlineSearchResult.availableSeats}/{offlineSearchResult.totalSeats}
                          </p>
                        </div>
                        <Button onClick={handleGiveCoordinates} size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                          <MapPin className="w-4 h-4 mr-2" />
                          Give Coordinates
                        </Button>
                      </div>

                      {/* Live Bus Status & SMS Section */}
                      {showCoordinates && offlineSearchResult && (
                        <div className="space-y-6">
                          {/* 1. Live Bus Status Card */}
                          <div className="bg-background rounded-lg p-6 border border-border shadow-sm">
                            <h4 className="font-semibold mb-4 flex items-center gap-2 text-primary text-lg">
                              <MapPin className="w-5 h-5" />
                              Live Bus Status
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Current Location */}
                              <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                                <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Current Stop</h5>
                                <div className="space-y-1">
                                  <p className="text-xl font-bold text-primary">
                                    {offlineSearchResult.stops[offlineSearchResult.currentStop]}
                                  </p>
                                  <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground bg-background/50 p-1.5 rounded w-fit">
                                    <span>{offlineSearchResult.coordinates?.[offlineSearchResult.stops[offlineSearchResult.currentStop]]?.lat.toFixed(6)}</span>
                                    <span className="text-border">|</span>
                                    <span>{offlineSearchResult.coordinates?.[offlineSearchResult.stops[offlineSearchResult.currentStop]]?.lng.toFixed(6)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Bus Info */}
                              <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                                <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Bus Details</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Bus Number:</span>
                                    <span className="font-medium">{offlineSearchResult.busNumber}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Route:</span>
                                    <span className="font-medium">{offlineSearchResult.routeNumber}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Next Stop:</span>
                                    <span className="font-medium">
                                      {offlineSearchResult.stops[offlineSearchResult.currentStop + 1] || "Terminus"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 2. SMS Generator Section */}
                          <div className="bg-background rounded-lg p-6 border border-border shadow-sm">
                            <h4 className="font-semibold mb-4 flex items-center justify-between text-primary text-lg">
                              <span className="flex items-center gap-2">
                                <Send className="w-5 h-5" />
                                SMS Generator
                              </span>
                            </h4>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Message Preview */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className="text-sm font-medium text-muted-foreground">Message Preview</label>
                                  <Select
                                    value={smsLanguage}
                                    onValueChange={(value: any) => setSmsLanguage(value)}
                                  >
                                    <SelectTrigger className="w-[140px] h-8 text-xs">
                                      <SelectValue placeholder="Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="english">English</SelectItem>
                                      <SelectItem value="hindi">Hindi</SelectItem>
                                      <SelectItem value="chhattisgarhi">Chhattisgarhi</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="bg-muted p-4 rounded-md border border-border text-sm font-mono whitespace-pre-wrap h-full max-h-[300px] overflow-y-auto shadow-inner">
                                  {getTranslatedMessage(offlineSearchResult, smsLanguage)}
                                </div>
                              </div>

                              {/* Send Controls */}
                              <div className="flex flex-col justify-center space-y-4">
                                <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
                                  <label className="text-sm font-medium mb-2 block">Recipient Mobile Number</label>
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Enter 10-digit number"
                                      value={phoneNumber}
                                      onChange={(e) => setPhoneNumber(e.target.value)}
                                      onKeyDown={(e) => e.key === 'Enter' && handleSendSMS()}
                                      className="flex-1 bg-background"
                                    />
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    The message shown in the preview will be sent to this number.
                                  </p>
                                </div>

                                <Button
                                  onClick={handleSendSMS}
                                  disabled={isSendingSMS}
                                  size="lg"
                                  className="w-full bg-gradient-primary shadow-soft hover:shadow-lg transition-all"
                                >
                                  {isSendingSMS ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                                      Sending SMS...
                                    </>
                                  ) : (
                                    <>
                                      <Send className="w-4 h-4 mr-2" />
                                      Send Status SMS
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* No Bus Found Message for Offline */}
                {isOfflineSearched && !offlineSearchResult && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-full mb-4">
                      <Bus className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Bus Found</h3>
                    <p className="text-muted-foreground">
                      No bus was found with route number "{offlineRouteNumber}" in {cities.find(c => c.value === offlineSelectedCity)?.label}.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Search Results - Visible to ALL authenticated users */}
          {userRole !== 'none' && isSearched && (
            <Card className="shadow-soft border-primary/10 transition-all duration-300 animate-accordion-down">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Bus className="w-5 h-5 text-primary" />
                  Search Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {searchResult ? (
                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-6 border border-border/50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                            Route {searchResult.routeNumber} - Bus {searchResult.busNumber}
                          </h3>
                          <p className="text-muted-foreground mb-1">
                            Route: {searchResult.route}
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">
                            Currently at: {searchResult.stops[searchResult.currentStop]}
                          </p>
                          <p className="text-sm font-medium text-primary">
                            Seats: {searchResult.availableSeats}/{searchResult.totalSeats}
                          </p>
                        </div>
                        <Button onClick={handleTrackBus} size="lg" className="bg-gradient-primary hover:shadow-lg transition-all">
                          <MapPin className="w-4 h-4 mr-2" />
                          Track Bus
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-full mb-4">
                      <Bus className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Bus Found</h3>
                    <p className="text-muted-foreground">
                      No bus was found with route number "{routeNumber}" in {cities.find(c => c.value === selectedCity)?.label}.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default TrackPage