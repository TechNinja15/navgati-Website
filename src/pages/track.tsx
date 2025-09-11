import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Search, Bus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock bus data - in a real app, this would come from an API
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
    ]
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
    ]
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
    ]
  }
}

const cities = [
  { value: "bangalore", label: "Bangalore" },
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "chennai", label: "Chennai" },
  { value: "pune", label: "Pune" },
  { value: "hyderabad", label: "Hyderabad" }
]

const TrackPage = () => {
  const [selectedCity, setSelectedCity] = useState("")
  const [routeNumber, setRouteNumber] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isSearched, setIsSearched] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSearch = () => {
    if (!selectedCity) {
      toast({
        title: "City Required",
        description: "Please select a city first.",
        variant: "destructive"
      })
      return
    }
    
    if (!routeNumber.trim()) {
      toast({
        title: "Route Number Required",
        description: "Please enter a route number to search.",
        variant: "destructive"
      })
      return
    }

    setIsSearched(true)
    const foundBus = busData[routeNumber]
    
    if (foundBus && foundBus.city === selectedCity) {
      setSearchResult(foundBus)
      toast({
        title: "Bus Found!",
        description: `Found route ${foundBus.routeNumber} - Bus ${foundBus.busNumber}`,
      })
    } else {
      setSearchResult(null)
      toast({
        title: "No Bus Found",
        description: "No bus found with the provided route number in the selected city.",
        variant: "destructive"
      })
    }
  }

  const handleTrackBus = () => {
    if (searchResult) {
      navigate(`/bus-tracking/${searchResult.routeNumber}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
              <MapPin className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Track Your Bus
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your city and bus number to get real-time location updates and route information.
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
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
                className="w-full md:w-auto"
                size="lg"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Bus
              </Button>
            </CardContent>
          </Card>

          {/* Search Results */}
          {isSearched && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bus className="w-5 h-5" />
                  Search Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {searchResult ? (
                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-primary mb-2">
                            Route {searchResult.routeNumber} - Bus {searchResult.busNumber}
                          </h3>
                          <p className="text-muted-foreground mb-1">
                            Route: {searchResult.route}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Currently at: {searchResult.stops[searchResult.currentStop]}
                          </p>
                        </div>
                        <Button onClick={handleTrackBus} size="lg">
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
                      Please check the route number and try again.
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