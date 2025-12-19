"use client"

import { useState } from "react"
import { NavbarStatic } from "@/components/navbar-static"
import { Footer } from "@/components/footer"
import { Background3D } from "@/components/3d-page-background"
import { PageTransition } from "@/components/page-transition"

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      name: "Starter",
      price: 2999,
      description: "Perfect for car enthusiasts",
      features: ["1 car shampoo", "1 microfiber towel", "Monthly delivery", "10% discount on store"],
    },
    {
      name: "Professional",
      price: 5999,
      description: "For serious detailers",
      features: [
        "2 premium products",
        "2 microfiber towels",
        "Bi-weekly delivery",
        "20% discount on store",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: 9999,
      description: "Complete car care",
      features: [
        "4 premium products",
        "4 microfiber towels",
        "Weekly delivery",
        "30% discount on store",
        "24/7 priority support",
        "Exclusive products",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-rose-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Background3D type="car-shine" />
      </div>

      <div className="relative z-10">
        <NavbarStatic />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">The Detailer's Crate</h1>
            <p className="text-xl text-gray-600">Premium car care products delivered to your door every month</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg overflow-hidden transition transform ${
                  plan.popular
                    ? "bg-primary text-primary-foreground shadow-2xl scale-105 border-2 border-primary"
                    : "bg-white/95 backdrop-blur border border-gray-200 hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="bg-yellow-400 text-gray-900 px-3 py-1 text-center text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3
                    className={`text-2xl font-bold mb-2 ${plan.popular ? "text-primary-foreground" : "text-gray-900"}`}
                  >
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.popular ? "text-primary-foreground/80" : "text-gray-600"}`}>
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span
                      className={`text-4xl font-bold ${plan.popular ? "text-primary-foreground" : "text-gray-900"}`}
                    >
                      Rs {plan.price}
                    </span>
                    <span className={plan.popular ? "text-primary-foreground/80" : "text-gray-600"}>/month</span>
                  </div>

                  <ul className={`space-y-3 mb-6 ${plan.popular ? "text-primary-foreground/90" : "text-gray-700"}`}>
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className={`text-lg ${plan.popular ? "text-yellow-300" : "text-primary"}`}>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <PageTransition
                    href={`/checkout?plan=${plan.name.toLowerCase()}`}
                    className={`w-full py-3 rounded-lg font-bold transition ${
                      plan.popular
                        ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    Subscribe Now
                  </PageTransition>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Explore Our Products</h2>
            <p className="text-gray-600 mb-6">Check out our full collection of premium car care products</p>
            <PageTransition
              href="/products"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
            >
              View All Products
            </PageTransition>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
