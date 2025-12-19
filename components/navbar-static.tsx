"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function NavbarStatic() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [supabaseAvailable, setSupabaseAvailable] = useState(false)

  useEffect(() => {
    const initSupabase = async () => {
      try {
        const supabase = createClient()
        setSupabaseAvailable(true)

        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.warn("Supabase not available:", error)
        setSupabaseAvailable(false)
      } finally {
        setLoading(false)
      }
    }
    initSupabase()
  }, [])

  const handleLogout = async () => {
    if (supabaseAvailable) {
      try {
        const supabase = createClient()
        await supabase.auth.signOut()
      } catch (error) {
        console.warn("Logout failed:", error)
      }
    }
    setUser(null)
    window.location.href = "/"
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🚗</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Pak Auto Care</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-gray-700 hover:text-red-600 transition">
              Products
            </Link>
            <Link href="/subscription" className="text-gray-700 hover:text-red-600 transition">
              Subscription
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 transition">
              Contact
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="text-gray-700 hover:text-red-600 transition font-semibold">
              🛒 Cart
            </Link>
            {supabaseAvailable && !loading && user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/protected/profile"
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-700 transition font-semibold"
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            ) : supabaseAvailable ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
}
