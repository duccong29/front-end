import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button';

const UserFooter: React.FC = () => {
  return (
    <footer className="inset-x-0 bottom-0 w-full bg-primary text-primary-foreground mt-auto">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            We are a company dedicated to providing innovative solutions for your business needs.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:underline">Home</a></li>
            <li><a href="#" className="text-sm hover:underline">Services</a></li>
            <li><a href="#" className="text-sm hover:underline">Products</a></li>
            <li><a href="#" className="text-sm hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">123 Business Street</p>
          <p className="text-sm">City, State 12345</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
          <p className="text-sm">Email: info@example.com</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Button size="icon" variant="ghost">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button size="icon" variant="ghost">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button size="icon" variant="ghost">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button size="icon" variant="ghost">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center">
        <p className="text-sm">&copy; 2024 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}
export default UserFooter;