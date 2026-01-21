
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Copy, Home, Bus, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const RegistrationSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const data = location.state;

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center p-8">
                    <div className="flex justify-center mb-4">
                        <FileText className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <CardTitle className="mb-2">No Registration Data Found</CardTitle>
                    <CardDescription className="mb-6">
                        It looks like you navigated here directly. Please register an agency first.
                    </CardDescription>
                    <Button onClick={() => navigate("/")} className="w-full">
                        Return to Home
                    </Button>
                </Card>
            </div>
        );
    }

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: `${label} copied to clipboard`,
            duration: 2000,
        });
    };

    return (
        <div className="min-h-screen bg-muted/20 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Success Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-2">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Registration Successful!</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Your agency <strong>{data.agencyName}</strong> has been registered successfully.
                        Below are the generated credentials for your bus drivers.
                    </p>
                </div>

                {/* Credentials Card */}
                <Card className="shadow-lg border-primary/20">
                    <CardHeader className="bg-muted/30 pb-4 border-b">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Bus className="w-5 h-5 text-primary" />
                                    Driver Credentials
                                </CardTitle>
                                <CardDescription>
                                    Share these login details with your drivers securely.
                                </CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(data.registeredBuses, null, 2), "All credentials")}>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy JSON
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Bus #</TableHead>
                                    <TableHead>Plate Number</TableHead>
                                    <TableHead>Route ID</TableHead>
                                    <TableHead>User ID</TableHead>
                                    <TableHead>Password</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.registeredBuses.map((bus: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">Bus {index + 1}</TableCell>
                                        <TableCell>
                                            <span className="font-mono bg-muted px-2 py-1 rounded text-xs">
                                                {bus.plateNumber || "N/A"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs">{bus.routeId}</TableCell>
                                        <TableCell>
                                            <span className="font-mono font-bold text-primary">
                                                {bus.userId}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded text-xs select-all">
                                                {bus.password}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                onClick={() => copyToClipboard(`ID: ${bus.userId}\nPass: ${bus.password}`, `Credentials for ${bus.plateNumber}`)}
                                                title="Copy Credentials"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="flex justify-center pt-4">
                    <Link to="/">
                        <Button size="lg" className="w-full md:w-auto min-w-[200px]">
                            <Home className="w-4 h-4 mr-2" />
                            Return to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccess;
