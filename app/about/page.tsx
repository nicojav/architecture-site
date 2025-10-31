import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Modern Remodeling & Architecture',
  description: 'Learn about our passion for transforming spaces and our commitment to exceptional architectural design.',
};

export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">About ArchVision</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-6">
            Founded with a vision to transform spaces into extraordinary environments, 
            ArchVision has been at the forefront of architectural innovation. Our journey 
            began with a simple belief: every space has untapped potential waiting to be 
            discovered.
          </p>
          <p className="text-muted-foreground">
            Today, we continue to push the boundaries of what's possible in architectural 
            design, bringing dreams to life through our commitment to excellence and 
            attention to detail.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="text-primary">•</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground">Client-Centered Design:</strong> Every project 
                begins with understanding your unique vision and requirements.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary">•</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground">Sustainable Practices:</strong> We integrate 
                eco-friendly solutions without compromising on style or functionality.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary">•</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground">Innovation:</strong> Leveraging the latest 
                technologies and materials to create future-proof designs.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}