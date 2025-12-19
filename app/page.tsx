"use client"

import { Hero3D } from "@/components/hero-3d"
import { NavbarStatic } from "@/components/navbar-static"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Background3D } from "@/components/3d-page-background"

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-rose-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Background3D type="car-shine" />
      </div>

      <div className="relative z-10">
        <NavbarStatic />
        <Hero3D />

        {/* Features Section with Auto Care Visuals */}
        <section className="relative py-20 px-4 bg-water-effect">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Premium Auto Care Excellence</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional-grade automotive care products designed for Pakistan's challenging climate
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Premium Quality Card */}
              <div className="car-care-card group">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
                  <p className="text-muted-foreground">
                    Professional-grade products tested for Pakistani climate conditions with UV protection.
                  </p>
                </div>
              </div>

              {/* Fast Delivery Card */}
              <div className="car-care-card group">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                  <p className="text-muted-foreground">
                    Quick shipping across Pakistan with real-time tracking and secure packaging.
                  </p>
                </div>
              </div>

              {/* Water Resistant Card */}
              <div className="car-care-card group">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">💧</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Water Resistant</h3>
                  <p className="text-muted-foreground">
                    Advanced formulas that repel water and protect against harsh weather conditions.
                  </p>
                </div>
              </div>

              {/* Safe for All Paints Card */}
              <div className="car-care-card group">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Safe for All Paints</h3>
                  <p className="text-muted-foreground">
                    Gentle yet effective formulas safe for all paint types and finishes.
                  </p>
                </div>
              </div>

              {/* Expert Support Card */}
              <div className="car-care-card group">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
                  <p className="text-muted-foreground">
                    24/7 customer support from automotive care experts ready to help.
                  </p>
                </div>
              </div>

              {/* Performance Tested Card */}
              <div className="car-care-card group">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Performance Tested</h3>
                  <p className="text-muted-foreground">
                    Rigorously tested for durability and performance in extreme conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48"></div>

          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Transform Your Vehicle Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Pak Auto Care for professional results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors"
              >
                Explore Products
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-primary text-primary hover:bg-primary/5 rounded-lg font-semibold transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
