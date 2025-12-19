"use client"

import type React from "react"
import { useState } from "react"
import { NavbarStatic } from "@/components/navbar-static"
import { Footer } from "@/components/footer"
import { Background3D } from "@/components/3d-page-background"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { PageTransition } from "@/components/page-transition"

export const dynamic = 'force-dynamic'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    postal_code: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save profile",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      console.log("[v0] Saving profile with data:", formData)
      const { error } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          postal_code: formData.postal_code,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      )

      if (error) {
        console.error("[v0] Error saving profile:", error)
        throw error
      }

      console.log("[v0] Profile saved successfully")
      toast({
        title: "Success",
        description: "Profile saved successfully!",
      })

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        postal_code: "",
      })
    } catch (error) {
      console.error("[v0] Error saving profile:", error)
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-rose-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Background3D type="car-wash" />
      </div>

      <div className="relative z-10">
        <NavbarStatic />

        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-12 text-balance text-gray-900">Contact Us</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Section */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur rounded-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                <p className="text-gray-600 text-sm mb-6">Our contact information</p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📞</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+92 (300) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@pakautocarecom</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📍</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">Lahore, Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">🕐</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur rounded-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">Your Profile</h2>
                <p className="text-gray-600 text-sm mb-6">Update your contact information</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="full_name" className="text-sm font-medium text-gray-900">
                        Full Name
                      </label>
                      <input
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-900">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-900">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium text-gray-900">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm font-medium text-gray-900">
                        Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="postal_code" className="text-sm font-medium text-gray-900">
                        Postal Code
                      </label>
                      <input
                        id="postal_code"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        placeholder="Enter your postal code"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-semibold transition-colors disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Profile"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white/95 backdrop-blur border border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Explore Our Products</h2>
            <p className="text-gray-600 mb-6">Check out our premium collection of automotive care products</p>
            <PageTransition
              href="/products"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition"
            >
              View Products
            </PageTransition>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
