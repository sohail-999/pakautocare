"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const supabase = createClient()

  const handleCreateAdmin = async () => {
    setLoading(true)
    setMessage("Creating admin account...")

    try {
      // First, create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: "sohail20338@gmail.com",
        password: "Admin@123456",
        options: {
          data: {
            full_name: "Admin",
            is_admin: true,
          },
        },
      })

      if (authError) {
        console.log("[v0] Auth error:", authError)
        setMessage(`Error: ${authError.message}`)
        setLoading(false)
        return
      }

      console.log("[v0] Auth user created:", authData.user?.id)

      // Create admin profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user?.id,
        email: "sohail20338@gmail.com",
        full_name: "Admin",
        is_admin: true,
      })

      if (profileError) {
        console.log("[v0] Profile error:", profileError)
        setMessage(`Error creating profile: ${profileError.message}`)
        setLoading(false)
        return
      }

      setMessage("✅ Admin account created! Email: sohail20338@gmail.com | Password: Admin@123456. You can now login.")
    } catch (error) {
      console.log("[v0] Setup error:", error)
      setMessage(`Error: ${error}`)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Pak Auto Care Setup</h1>

        <div className="space-y-4">
          <p className="text-gray-600 text-center">Click the button below to create the default admin account.</p>

          <Button
            onClick={handleCreateAdmin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
          >
            {loading ? "Creating..." : "Create Admin Account"}
          </Button>

          {message && (
            <div
              className={`p-4 rounded text-center text-sm ${message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {message}
            </div>
          )}

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-4">After creating the admin account, you can login at:</p>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full bg-transparent">
                Go to Login
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t">
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
