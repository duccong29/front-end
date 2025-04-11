import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Shield, DollarSign, Sparkles, Star, ArrowRight } from 'lucide-react'

export default function AboutUsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] w-full">
        <Image
          src="/images/baner.jpg?height=600&width=1200"
          alt="Cozy living space"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
        {/* <div className="absolute inset-0 opacity-70 bg-[url('/images/baner.jpg')] bg-center bg-no-repeat bg-cover"></div> */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            About Us – Connecting You to Your Perfect Home
          </h1>
          <p className="text-lg md:text-xl text-white max-w-3xl">
            We are dedicated to helping you find the ideal rental property that feels like home,
            with a seamless experience from search to move-in.
          </p>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Founded in 2015, our mission has always been to revolutionize the rental experience.
            We believe finding your next home should be exciting, not stressful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-muted-foreground">
              To connect people with their perfect rental homes through technology and exceptional service.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-muted-foreground">
              Integrity, transparency, and customer satisfaction are at the core of everything we do.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Promise</h3>
            <p className="text-muted-foreground">
              We're committed to providing a seamless, stress-free rental experience for every customer.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We stand out from the competition with our commitment to quality, service, and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="overflow-hidden">
              <div className="h-64 relative">
                <Image
                  src="/images/apartment1.jpg?height=400&width=600"
                  alt="Modern apartment living room"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Home className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Wide Range of Options</h3>
                </div>
                <p className="text-muted-foreground">
                  From cozy studios to spacious family homes, we offer diverse rental options to suit every lifestyle and budget.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-64 relative">
                <Image
                  src="/images/apartment2.jpg?height=400&width=600"
                  alt="Secure apartment building"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Safety & Security</h3>
                </div>
                <p className="text-muted-foreground">
                  All our properties undergo rigorous safety checks and feature modern security systems for your peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-64 relative">
                <Image
                  src="/images/apartment2.jpg?height=400&width=600"
                  alt="Modern apartment amenities"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Modern Amenities</h3>
                </div>
                <p className="text-muted-foreground">
                  Enjoy contemporary features and amenities that enhance your living experience and provide maximum comfort.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-64 relative">
                <Image
                  src="/images/apartment4.jpg?height=400&width=600"
                  alt="Affordable apartment"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Affordable Pricing</h3>
                </div>
                <p className="text-muted-foreground">
                  We believe quality housing should be accessible, offering competitive rates and transparent pricing with no hidden fees.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="italic mb-4">
              "Finding my apartment through this platform was incredibly easy. The virtual tours were detailed, and the team was responsive and helpful throughout the process."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">New York, NY</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="italic mb-4">
              "As someone who relocates frequently for work, this service has been a game-changer. I've found great places in three different cities now!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
              <div>
                <p className="font-semibold">Michael Chen</p>
                <p className="text-sm text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="italic mb-4">
              "The customer service is exceptional. When I had an issue with my application, the team resolved it within hours. Highly recommend!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
              <div>
                <p className="font-semibold">Emily Rodriguez</p>
                <p className="text-sm text-muted-foreground">Chicago, IL</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
                      
      <section className="py-16 px-4 md:px-8 bg-blue-400 text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Find Your Perfect Rental Today!</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Browse our extensive collection of quality rental properties and discover your new home.
          </p>
          <Button asChild size="lg" variant="secondary" className="group">
            <Link href="/apartments/filtered">
              Search Properties
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our dedicated team of professionals is committed to helping you find your perfect rental home.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "David Miller", role: "Founder & CEO" },
              { name: "Jennifer Park", role: "Chief Operations Officer" },
              { name: "Robert Wilson", role: "Head of Property Management" },
              { name: "Sophia Garcia", role: "Customer Experience Director" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 rounded-full bg-background mx-auto mb-4 overflow-hidden relative">
                  <Image
                    src={`/placeholder.svg?height=160&width=160`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
