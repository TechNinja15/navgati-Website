import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { Footer } from "@/components/footer"

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

export default Index;
