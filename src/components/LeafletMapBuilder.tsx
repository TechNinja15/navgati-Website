
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, X, Loader2 } from "lucide-react";

// Fix for default Leaflet markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapBuilderProps {
    stops: string[];
    onAddStop: (stop: string) => void;
    onRemoveStop: (index: number) => void;
    city?: string;
}

interface StopData {
    name: string;
    lat: number;
    lng: number;
}

interface Suggestion {
    display_name: string;
    lat: string;
    lon: string;
}

// Component to handle map view updates
const AutoFitBounds = ({ points }: { points: [number, number][] }) => {
    const map = useMap();
    useEffect(() => {
        if (points.length > 0) {
            const bounds = L.latLngBounds(points);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [points, map]);
    return null;
};

// Component to handle map clicks
const MapClickHandler = ({ onLocationFound }: { onLocationFound: (data: { name: string; lat: number; lng: number }) => void }) => {
    useMapEvents({
        click: async (e) => {
            const { lat, lng } = e.latlng;
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                const data = await response.json();
                const displayName = data.display_name.split(',')[0]; // Simple name

                onLocationFound({
                    name: displayName || "Selected Location",
                    lat,
                    lng
                });
            } catch (error) {
                console.error("Reverse geocoding failed:", error);
                // Fallback for error
                onLocationFound({
                    name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
                    lat,
                    lng
                });
            }
        },
    });
    return null;
};

const LeafletMapBuilder = ({ stops, onAddStop, onRemoveStop, city = "" }: LeafletMapBuilderProps) => {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [stopDetails, setStopDetails] = useState<StopData[]>([]);
    const [tempSelectedLocation, setTempSelectedLocation] = useState<StopData | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim().length > 2) {
                fetchSuggestions(query);
            } else {
                setSuggestions([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, city]); // Re-run if city changes

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchSuggestions = async (searchQuery: string) => {
        setIsSearching(true);
        try {
            // Append city to query if available to restrict/prioritize results
            const q = city ? `${searchQuery}, ${city}` : searchQuery;
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`);
            const data = await response.json();
            setSuggestions(data);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectSuggestion = (suggestion: Suggestion) => {
        const name = suggestion.display_name.split(',')[0]; // Simple name

        onAddStop(name);

        setStopDetails(prev => [...prev, {
            name: name,
            lat: parseFloat(suggestion.lat),
            lng: parseFloat(suggestion.lon)
        }]);

        setQuery("");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleManualSearch = () => {
        if (suggestions.length > 0) {
            handleSelectSuggestion(suggestions[0]);
        } else {
            // Fallback if no suggestions are clicked but user hits enter
            // Re-trigger fetch or just ignore
            // For better UX, let's try to fetch one last time or pick best match
            fetchSuggestions(query).then(() => {
                // If after fetch we have results, pick first
                // This is a bit complex due to async, so we'll rely on user clicking for now
                // or just basic enter behavior if suggestions exist
            });
        }
    };

    const handleRemove = (index: number) => {
        onRemoveStop(index);
        setStopDetails(prev => prev.filter((_, i) => i !== index));
    };

    const points: [number, number][] = stopDetails.map(s => [s.lat, s.lng]);

    const handleMapClick = (data: { name: string; lat: number; lng: number }) => {
        setTempSelectedLocation(data);
    };

    const confirmLocationSelection = () => {
        if (tempSelectedLocation) {
            onAddStop(tempSelectedLocation.name);
            setStopDetails(prev => [...prev, tempSelectedLocation]);
            setTempSelectedLocation(null);
        }
    };

    return (
        <div className="space-y-4">
            {/* Search Input */}
            <div className="flex gap-2 relative" ref={wrapperRef}>
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                if (suggestions.length > 0) handleSelectSuggestion(suggestions[0]);
                            }
                        }}
                        placeholder={city ? `Search stop in ${city}...` : "Search stop..."}
                        className="pl-9"
                    />

                    {/* Suggestions Dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-popover text-popover-foreground rounded-md border shadow-md z-50 overflow-hidden">
                            <ul>
                                {suggestions.map((item, i) => (
                                    <li
                                        key={i}
                                        className="px-4 py-2 hover:bg-muted cursor-pointer text-sm flex items-start gap-2"
                                        onClick={() => handleSelectSuggestion(item)}
                                    >
                                        <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                                        <span className="line-clamp-2">{item.display_name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <Button
                    type="button"
                    onClick={handleManualSearch}
                    variant="secondary"
                    disabled={isSearching}
                >
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
                </Button>
            </div>

            {/* Map Container */}
            <div className="relative w-full h-[300px] rounded-md border overflow-hidden bg-muted/20 z-0">
                <MapContainer
                    center={[21.2514, 81.6296]} // Default Raipur
                    zoom={11}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {stopDetails.map((stop, index) => (
                        <Marker key={index} position={[stop.lat, stop.lng]}>
                            <Popup>
                                <div className="font-medium text-sm">
                                    <span className="inline-block bg-primary text-secondary px-1.5 rounded-full text-xs mr-2">{index + 1}</span>
                                    {stop.name}
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    {points.length > 1 && (
                        <Polyline positions={points} color="#3b82f6" weight={4} opacity={0.7} dashArray="10, 10" />
                    )}

                    <AutoFitBounds points={points} />
                    <MapClickHandler onLocationFound={handleMapClick} />

                    {/* Temporary marker for clicked location */}
                    {tempSelectedLocation && (
                        <Marker position={[tempSelectedLocation.lat, tempSelectedLocation.lng]}>
                            <Popup eventHandlers={{ remove: () => setTempSelectedLocation(null) }}>
                                <div className="p-2 space-y-2 max-w-[200px]">
                                    <p className="font-medium text-sm border-b pb-1 mb-1">{tempSelectedLocation.name}</p>
                                    <p className="text-xs text-muted-foreground mb-2">
                                        {tempSelectedLocation.lat.toFixed(4)}, {tempSelectedLocation.lng.toFixed(4)}
                                    </p>
                                    <Button
                                        size="sm"
                                        className="w-full h-7 text-xs"
                                        onClick={confirmLocationSelection}
                                    >
                                        Add as Stop
                                    </Button>
                                </div>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
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
                                onClick={() => handleRemove(index)}
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

export default LeafletMapBuilder;
