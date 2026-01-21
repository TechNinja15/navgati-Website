
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoogleMapBuilderProps {
    stops: string[];
    onAddStop: (stop: string) => void;
    onRemoveStop: (index: number) => void;
}

const GoogleMapBuilder = ({ stops, onAddStop, onRemoveStop }: GoogleMapBuilderProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize Google Maps
    useEffect(() => {
        const initMap = async () => {
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

            if (!apiKey) {
                setError("Missing Google Maps API Key. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file.");
                return;
            }

            const loader = new Loader({
                apiKey: apiKey,
                version: "weekly",
                libraries: ["places", "geometry"],
            });

            try {
                const google = await loader.load();

                if (mapRef.current) {
                    const mapInstance = new google.maps.Map(mapRef.current, {
                        center: { lat: 21.2514, lng: 81.6296 }, // Default to Raipur
                        zoom: 12,
                        mapTypeControl: false,
                        streetViewControl: false,
                        fullscreenControl: false,
                    });

                    const ds = new google.maps.DirectionsService();
                    const dr = new google.maps.DirectionsRenderer({
                        map: mapInstance,
                        suppressMarkers: false, // We want markers for stops
                        preserveViewport: false,
                    });

                    setMap(mapInstance);
                    setDirectionsService(ds);
                    setDirectionsRenderer(dr);
                    setIsLoaded(true);
                }
            } catch (e) {
                console.error("Error loading Google Maps:", e);
                setError("Failed to load Google Maps. Please check your API Key.");
            }
        };

        initMap();
    }, []);

    // Initialize Autocomplete
    useEffect(() => {
        if (isLoaded && inputRef.current && !autocomplete) {
            const ac = new google.maps.places.Autocomplete(inputRef.current, {
                fields: ["formatted_address", "geometry", "name"],
                componentRestrictions: { country: "in" }, // Restrict to India
            });

            ac.addListener("place_changed", () => {
                const place = ac.getPlace();
                if (place.geometry && place.geometry.location) {
                    // You can use the place info here if needed
                    // For now, we just pass the name/address to the parent
                    // But effectively we are waiting for the user to click "Add"
                }
            });

            setAutocomplete(ac);
        }
    }, [isLoaded, autocomplete]);

    // Update Route when stops change
    useEffect(() => {
        if (isLoaded && directionsService && directionsRenderer && stops.length > 1) {
            const origin = stops[0];
            const destination = stops[stops.length - 1];
            const waypoints = stops.slice(1, -1).map(stop => ({
                location: stop,
                stopover: true,
            }));

            directionsService.route({
                origin: origin,
                destination: destination,
                waypoints: waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                    directionsRenderer.setDirections(result);
                } else {
                    console.error("Directions request failed due to " + status);
                }
            });
        } else if (directionsRenderer) {
            // Clear route if less than 2 stops
            // directionsRenderer.setDirections({ routes: [] }); // This might throw type error
            // Better to just setMap(null) and re-set it, or clear directions object
            directionsRenderer.setMap(null);
            if (map) directionsRenderer.setMap(map);
        }
    }, [stops, isLoaded, directionsService, directionsRenderer, map]);

    const handleAddClick = () => {
        if (inputRef.current && inputRef.current.value.trim() !== "") {
            onAddStop(inputRef.current.value);
            inputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-4">
            {/* Search Input */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                        ref={inputRef}
                        placeholder="Search bus stop..."
                        className="pl-9"
                    />
                </div>
                <Button type="button" onClick={handleAddClick} variant="secondary">
                    Add Stop
                </Button>
            </div>

            {/* Map Container */}
            <div className="relative w-full h-[300px] rounded-md border overflow-hidden bg-muted/20">
                {error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-muted-foreground bg-muted/50">
                        <AlertCircle className="w-8 h-8 mb-2 text-warning" />
                        <p className="text-sm font-medium">{error}</p>
                        <p className="text-xs mt-1">Stops list will still work manually.</p>
                    </div>
                ) : (
                    <div ref={mapRef} className="w-full h-full" />
                )}
            </div>

            {/* Stops List */}
            <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">Route Stops Sequence</h4>
                <div className="flex flex-wrap gap-2">
                    {stops.length === 0 && <span className="text-sm text-muted-foreground italic">No stops added.</span>}
                    {stops.map((stop, index) => (
                        <div key={index} className="flex items-center gap-1 bg-secondary/50 px-3 py-1.5 rounded-full text-sm">
                            <span className="w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full font-bold">
                                {index + 1}
                            </span>
                            <span>{stop}</span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 ml-1 hover:bg-destructive/20 hover:text-destructive rounded-full"
                                onClick={() => onRemoveStop(index)}
                            >
                                <X className="w-3 h-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GoogleMapBuilder;
