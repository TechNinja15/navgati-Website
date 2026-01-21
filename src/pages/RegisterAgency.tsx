
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Building2, Phone, Bus, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import LeafletMapBuilder from "@/components/LeafletMapBuilder";
import ErrorBoundary from "@/components/ErrorBoundary";

interface BusRoute {
    id: number;
    stops: string[];
}

const RegisterAgency = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        agencyName: "",
        city: "",
        contactNo: "",
        busCount: "",
    });

    const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBusCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value) || 0;
        setFormData((prev) => ({ ...prev, busCount: e.target.value }));

        setBusRoutes((prev) => {
            const newRoutes = [...prev];
            if (count > newRoutes.length) {
                for (let i = newRoutes.length; i < count; i++) {
                    newRoutes.push({ id: i + 1, stops: [] });
                }
            } else {
                newRoutes.length = count;
            }
            return newRoutes;
        });
    };

    const addStop = (routeIndex: number, stop: string) => {
        setBusRoutes((prev) => {
            const newRoutes = [...prev];
            newRoutes[routeIndex].stops.push(stop);
            return newRoutes;
        });
    };

    const removeStop = (routeIndex: number, stopIndex: number) => {
        setBusRoutes((prev) => {
            const newRoutes = [...prev];
            newRoutes[routeIndex].stops.splice(stopIndex, 1);
            return newRoutes;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Agency Registration Data:", { ...formData, busRoutes });

        toast({
            title: "Registration Successful",
            description: "Your agency and routes have been registered.",
        });

        setTimeout(() => {
            navigate("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="container mx-auto px-4 py-8">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Register Agency</h1>
                        <p className="text-muted-foreground">Join our network and manage your fleet</p>
                    </div>

                    <div className="bg-card border rounded-lg p-6 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="agencyName">Agency Name</Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="agencyName"
                                            name="agencyName"
                                            placeholder="Enter agency name"
                                            className="pl-9"
                                            value={formData.agencyName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Select
                                        value={formData.city}
                                        onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                                    >
                                        <SelectTrigger className="w-full pl-9 relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                                            <SelectValue placeholder="Select city" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="RAIPUR">Raipur</SelectItem>
                                            <SelectItem value="BHILAI">Bhilai</SelectItem>
                                            <SelectItem value="BILASPUR">Bilaspur</SelectItem>
                                            <SelectItem value="DURG">Durg</SelectItem>
                                            <SelectItem value="KORBA">Korba</SelectItem>
                                            <SelectItem value="JAGDALPUR">Jagdalpur</SelectItem>
                                            <SelectItem value="AMBIKAPUR">Ambikapur</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contactNo">Contact Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="contactNo"
                                            name="contactNo"
                                            type="tel"
                                            placeholder="Enter contact number"
                                            className="pl-9"
                                            value={formData.contactNo}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="busCount">Number of Buses</Label>
                                    <div className="relative">
                                        <Bus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="busCount"
                                            name="busCount"
                                            type="number"
                                            min="1"
                                            placeholder="Enter number of buses"
                                            className="pl-9"
                                            value={formData.busCount}
                                            onChange={handleBusCountChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Route Builders */}
                            <div className="space-y-8 mt-8">
                                {busRoutes.map((route, index) => (
                                    <div key={index} className="border rounded-lg p-4 bg-muted/30 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-semibold text-lg flex items-center">
                                                <Bus className="w-5 h-5 mr-2 text-primary" />
                                                BUS {index + 1} Route Config
                                            </h3>
                                            <span className="text-sm text-muted-foreground">{route.stops.length} Stops</span>
                                        </div>

                                        <ErrorBoundary>
                                            <LeafletMapBuilder
                                                stops={route.stops}
                                                onAddStop={(stop) => addStop(index, stop)}
                                                onRemoveStop={(stopIndex) => removeStop(index, stopIndex)}
                                                city={formData.city} // Pass selected city for filtering
                                            />
                                        </ErrorBoundary>
                                    </div>
                                ))}
                            </div>

                            <Button type="submit" size="lg" className="w-full bg-gradient-primary hover:shadow-lg transition-all duration-300">
                                Register Agency
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterAgency;
