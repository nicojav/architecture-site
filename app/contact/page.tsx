import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Modern Remodeling & Architecture',
  description: 'Get in touch with our team to discuss your architectural project needs.',
};

export default function ContactPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            We'd love to hear about your project. Contact us to schedule a consultation 
            or learn more about our services.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Address</h3>
              <p className="text-muted-foreground">123 Architecture St<br />Design City, DC 12345</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-muted-foreground">contact@archvision.com</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-muted-foreground">(555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Office Hours</h2>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="font-medium">Monday - Friday</span>
              <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Saturday</span>
              <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Sunday</span>
              <span className="text-muted-foreground">Closed</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}