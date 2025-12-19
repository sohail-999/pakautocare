"use client"

import { NavbarStatic } from "@/components/navbar-static"
import { Footer } from "@/components/footer"
import { Background3D } from "@/components/3d-page-background"
import { PageTransition } from "@/components/page-transition"

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-rose-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Background3D type="car-wash" />
      </div>

      <div className="relative z-10">
        <NavbarStatic />

        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">About Pak Auto Care</h1>

          <div className="space-y-8">
            {/* Our Story */}
            <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                Pak Auto Care was founded with a mission to provide premium automotive care products specifically
                designed for Pakistani vehicles and climate conditions. We understand the unique challenges that
                vehicles face in Pakistan's harsh climate, from intense UV rays to dust and pollution.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To deliver professional-grade automotive care products that protect and enhance the appearance of
                vehicles while being accessible to all car enthusiasts in Pakistan.
              </p>
            </div>

            {/* Why We're Different */}
            <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Why We're Different</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Products formulated for Pakistani climate conditions</li>
                <li>Professional-grade quality at affordable prices</li>
                <li>Expert customer support from automotive enthusiasts</li>
                <li>Fast delivery across Pakistan</li>
                <li>100% satisfaction guarantee</li>
              </ul>
            </div>

            {/* Our Facility */}
            <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Facility</h2>
              <p className="text-gray-700 leading-relaxed">
                Located in Lahore, our state-of-the-art facility produces all our products using premium ingredients and
                strict quality control measures. Every product is tested to ensure it meets our high standards.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white/95 backdrop-blur border border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Ready to Transform Your Vehicle?</h2>
            <p className="text-gray-600 mb-6">Explore our premium product collection today</p>
            <PageTransition
              href="/products"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition"
            >
              Shop Now
            </PageTransition>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
