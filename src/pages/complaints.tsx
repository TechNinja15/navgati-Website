import { useState } from "react"
import { ArrowLeft, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Complaints() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    busNumber: "",
    routeNumber: "",
    complaint: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Complaint Submitted",
        description: "Thank you for your feedback. We'll review your complaint shortly.",
      })
      setFormData({ name: "", busNumber: "", routeNumber: "", complaint: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 bg-gradient-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Report an Issue
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Help us improve NavGati by reporting any issues you've encountered. 
              Your feedback is valuable in making public transport better for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Submit Your Complaint</CardTitle>
                  <CardDescription>
                    Please provide detailed information about the issue you encountered.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="busNumber">Bus Number</Label>
                        <Input
                          id="busNumber"
                          name="busNumber"
                          placeholder="e.g., DL1PC9999"
                          value={formData.busNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="routeNumber">Bus Route Number</Label>
                        <Input
                          id="routeNumber"
                          name="routeNumber"
                          placeholder="e.g., 543, AC-12"
                          value={formData.routeNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complaint">Complaint Details</Label>
                      <Textarea
                        id="complaint"
                        name="complaint"
                        placeholder="Describe the issue you encountered in detail..."
                        value={formData.complaint}
                        onChange={handleInputChange}
                        rows={6}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:shadow-medium transition-spring"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit Complaint
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Information Sidebar */}
            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    For urgent issues or emergencies:
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Emergency Helpline</p>
                    <p className="text-sm text-muted-foreground">📞 1800-123-4567</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">✉️ support@navgati.gov.in</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Incorrect bus timing information</li>
                    <li>• GPS tracking not working</li>
                    <li>• Route information outdated</li>
                    <li>• App performance issues</li>
                    <li>• Accessibility concerns</li>
                    <li>• Driver behavior complaints</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}