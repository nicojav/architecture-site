import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedProjects from "@/components/featured-projects";
import { featuredProjects } from "@/lib/projects-data";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Space<br />
            Into Something Extraordinary
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            We specialize in architectural transformations that breathe new life into existing spaces.
            Discover our portfolio of before & after projects.
          </p>
          <Button asChild size="lg">
            <Link href="/projects">
              View Our Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Projects */}
      <FeaturedProjects projects={featuredProjects} />

      {/* Services Section */}
      <section className="py-20 bg-muted flex justify-center">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Residential Remodeling</h3>
              <p className="text-muted-foreground">Transform your home with our expert residential remodeling services.</p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Commercial Renovation</h3>
              <p className="text-muted-foreground">Modernize your business space with our commercial renovation expertise.</p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Architectural Design</h3>
              <p className="text-muted-foreground">Get professional architectural designs that match your vision.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}