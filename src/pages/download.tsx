import { ArrowLeft, Download, Smartphone, Star, Users, Shield } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function DownloadPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 bg-gradient-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Download NavGati App
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get the full NavGati experience on your mobile device. Track buses in real-time, 
              plan your journey, and stay updated with the latest transport information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - App Info */}
            <div className="space-y-8">
              {/* Download Buttons */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Available Now</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-primary hover:shadow-large transition-spring group"
                    onClick={() => window.open("https://play.google.com", "_blank")}
                  >
                    <Download className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform" />
                    Download for Android
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="hover:shadow-medium transition-spring"
                    onClick={() => window.open("https://apps.apple.com", "_blank")}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download for iOS
                  </Button>
                </div>
              </div>

              {/* App Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-sm text-muted-foreground">Downloads</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-2">
                    <Star className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/30 rounded-lg mx-auto mb-2">
                    <Shield className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Key Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span className="text-muted-foreground">Real-time bus tracking with GPS precision</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <span className="text-muted-foreground">Smart route planning and optimization</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary-foreground rounded-full mt-2"></div>
                    <span className="text-muted-foreground">Offline schedule access and notifications</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span className="text-muted-foreground">Dark and light mode support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - App Preview */}
            <div className="flex justify-center">
              <Card className="w-full max-w-md shadow-large">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">NavGati Mobile</CardTitle>
                  <CardDescription>Version 2.1.0</CardDescription>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <Badge variant="secondary">Free</Badge>
                    <Badge variant="outline">No Ads</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Screenshots placeholder */}
                  <div className="aspect-[9/16] bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">App Screenshots</p>
                  </div>
                  
                  {/* System Requirements */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">System Requirements</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Android 6.0+ or iOS 12.0+</p>
                      <p>• 50 MB available storage</p>
                      <p>• Internet connection required</p>
                      <p>• GPS for location services</p>
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="bg-success/10 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-success" />
                      <span className="font-semibold text-success">Verified Safe</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This app has been verified by the Indian government and follows 
                      all data protection guidelines.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Why Choose NavGati?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  NavGati is an official government initiative designed to modernize public 
                  transport in India. Built with cutting-edge technology and user privacy 
                  in mind.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Government verified and secure</li>
                  <li>✓ No hidden fees or subscriptions</li>
                  <li>✓ Regular updates and improvements</li>
                  <li>✓ 24/7 customer support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Having trouble with the download or installation? Our support team 
                  is here to help you get started.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Support:</strong> support@navgati.gov.in
                  </p>
                  <p className="text-sm">
                    <strong>Helpline:</strong> 1800-123-4567
                  </p>
                </div>
                <Link to="/complaints">
                  <Button variant="outline" size="sm" className="mt-3">
                    Report an Issue
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}