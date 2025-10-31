import { Building } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Building className="h-6 w-6" />
              <span className="font-bold">ArchVision</span>
            </Link>
            <p className="text-muted-foreground">
              Transforming spaces into extraordinary environments through innovative architectural design.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/projects" className="text-muted-foreground hover:text-primary">Projects</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/residential" className="text-muted-foreground hover:text-primary">Residential</Link></li>
              <li><Link href="/services/commercial" className="text-muted-foreground hover:text-primary">Commercial</Link></li>
              <li><Link href="/services/consulting" className="text-muted-foreground hover:text-primary">Consulting</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>123 Architecture St</li>
              <li>Design City, DC 12345</li>
              <li>contact@archvision.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ArchVision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}