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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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

  const navigate = useNavigate()
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleLogin = () => {
    if (username && password) {
      setUserRole('admin')
      toast({
        title: "Login Successful",
        description: "Welcome back, Admin!",
      })
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please enter both User ID and Password",
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
        description: "Bus coordinates are now available",
      })
    }
  }

  const handleSendLocation = () => {
    setShowPhoneInput(true)
  }

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
      // Generate mock coordinates based on current stop
      const coordinates = {
        lat: 12.9716 + (Math.random() - 0.5) * 0.1,
        lng: 77.5946 + (Math.random() - 0.5) * 0.1
      }

      const nextStops = offlineSearchResult.stops.slice(offlineSearchResult.currentStop + 1)

      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: {
          phoneNumber: phoneNumber,
          busData: {
            routeNumber: offlineSearchResult.routeNumber,
            busNumber: offlineSearchResult.busNumber,
            city: cities.find(c => c.value === offlineSearchResult.city)?.label || offlineSearchResult.city,
            route: offlineSearchResult.route,
            currentStop: offlineSearchResult.stops[offlineSearchResult.currentStop],
            nextStops: nextStops,
            coordinates: coordinates
          }
        }
      })

      if (error) {
        throw error
      }

      toast({
        title: "SMS Sent Successfully",
        description: `Location details sent to ${phoneNumber}`,
      })

      setPhoneNumber("")
      setShowPhoneInput(false)
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

                      {/* Coordinates Display */}
                      {showCoordinates && (
                        <div className="bg-background rounded-lg p-4 mb-4 border border-border shadow-sm">
                          <h4 className="font-semibold mb-2 flex items-center gap-2 text-primary">
                            <MapPin className="w-4 h-4" />
                            Bus Coordinates
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="p-3 bg-muted rounded-md">
                              <span className="font-medium block text-xs text-muted-foreground uppercase">Latitude</span>
                              <span className="font-mono text-lg">{(12.9716 + (Math.random() - 0.5) * 0.1).toFixed(6)}</span>
                            </div>
                            <div className="p-3 bg-muted rounded-md">
                              <span className="font-medium block text-xs text-muted-foreground uppercase">Longitude</span>
                              <span className="font-mono text-lg">{(77.5946 + (Math.random() - 0.5) * 0.1).toFixed(6)}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button onClick={handleSendLocation} variant="default" className="bg-gradient-primary">
                              <Share2 className="w-4 h-4 mr-2" />
                              Send Location
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Phone Input */}
                      {showPhoneInput && (
                        <div className="bg-background rounded-lg p-4 border border-border shadow-sm">
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                            <Send className="w-4 h-4" />
                            Send SMS with Bus Location
                          </h4>
                          <div className="flex gap-3">
                            <Input
                              placeholder="Enter mobile number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleSendSMS()}
                              className="flex-1"
                            />
                            <Button
                              onClick={handleSendSMS}
                              disabled={isSendingSMS}
                              className="shrink-0 bg-gradient-primary"
                            >
                              {isSendingSMS ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4 mr-2" />
                                  Send SMS
                                </>
                              )}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            SMS will include bus location, route details, and upcoming stops.
                          </p>
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